<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use PhpOffice\PhpWord\PhpWord;
use Exception;

class MainController extends Controller
{
    public function entities($str){
        $final = htmlentities($str, ENT_QUOTES,"UTF-8");
        return $final;
    }
    public function checkIfAWayExists($way){
        $way = strtolower($way);
        $allowedWays = ["docx","html","pdf"];
        if(in_array($way,$allowedWays) == true){
            return array_search($way,$allowedWays);
        }
        else return -1;
    }
    public function generateAgreement(Request $data){
        if($data->has("agreementName") && $data->has("wayOfDownload")){
            // reading POST data
            $content = $this->entities($data->input("agreementName"));
            $wayOfDownload = $this->entities($data->input("wayOfDownload"));
            $downloadMode = $this->checkIfAWayExists($wayOfDownload);
            if($downloadMode == -1){
                return "Download method not allowed";
            }
            $tableOfParagraphs = [];
            $i = 1;
            while($data->has("paragraph".$i)){
                $helper = $this->entities($data->input("paragraph".$i));
                $tableOfParagraphs[$i-1] = $helper;
                $i++;
            }
            $tableOfSigns = [];
            $i = 1;
            while($data->has("signature".$i)){
                $helper = $this->entities($data->input("signature".$i));
                $tableOfSigns[$i-1] = $helper;
                $i++;
            }
            // making the word file basing on sent data
            $phpWord = new PhpWord();
            $mainSection = $phpWord->addSection();
            $phpWord->addParagraphStyle("centerStyle",array('align' => "center", "marginBottom" => 20));
            $phpWord->addParagraphStyle("rightStyle",array("align" => "right"));
            $phpWord->addParagraphStyle("mtStyle",array("align" => "right"));
            $phpWord->addParagraphStyle("leftStyle",array("align" => "left"));
            $phpWord->addFontStyle("headerStyle",array("name" => "Times New Roman","size" => 20, "color" => "black"));
            $phpWord->addFontStyle("paragraphStyle",array("name" => "Calibri","size" => 12, "color" => "black"));

            // making the word file basing on sent data
            $mainSection->addText($content,"headerStyle","centerStyle");
            $mainSection->addTextRun();
            for($i = 0 ; $i < count($tableOfParagraphs); $i++){
                $mainSection->addText("§".($i+1).". ".$tableOfParagraphs[$i],"paragraphStyle", "leftStyle");
                $mainSection->addTextRun();
            }
            if(count($tableOfSigns) !== 0){
                for($i = 0 ; $i < 5; $i++){
                    $mainSection->addTextRun();
                }
            }
            if(count($tableOfSigns) === 1){
                $mainSection->addText(".......................","paragraphStyle","mtStyle");
                $mainSection->addText($tableOfSigns[0],"paragraphStyle","rightStyle");
            }
            /*else if(count($tableOfSigns) === 2){
                $mainSection->addText(".......................","paragraphStyle","leftStyle");
                $mainSection->addText($tableOfSigns[0],"paragraphStyle","leftStyle");
                $mainSection->addText(".......................","paragraphStyle","rightStyle");
                $mainSection->addText($tableOfSigns[1],"paragraphStyle","rightStyle");
            }*/
            // downloading prepared file
            try {
                // choosing the extension of the file
                switch($downloadMode){
                    case 0: // downloading Word file
                        $objectWriter = \PhpOffice\PhpWord\IOFactory::createWriter($phpWord,"Word2007");
                        $objectWriter->save(storage_path("agreement.docx"));
                        return response()->download(storage_path("agreement.docx"));
                        break;
                    case 1: // downloading HTML file
                        $xmlWriter = \PhpOffice\PhpWord\IOFactory::createWriter($phpWord,'HTML');
                        $xmlWriter->save(storage_path("agreement.html"));
                        return response()->download(storage_path("agreement.html"));
                        break;
                    case 2: // downloading PDF file based on the HTML file
                        $xmlWriter = \PhpOffice\PhpWord\IOFactory::createWriter($phpWord,'HTML');
                        $xmlWriter->save(storage_path("agreement.html"));
                        $getHTMLAgreementCode = file_get_contents(storage_path("agreement.html"));
                        $getHTMLAgreementCode = substr($getHTMLAgreementCode,strrpos($getHTMLAgreementCode,"<body>")+6);
                        $getHTMLAgreementCode = substr($getHTMLAgreementCode,0,strrpos($getHTMLAgreementCode,"</body>"));
                        $getCSSAgreementData = file_get_contents(storage_path("agreementStyle.css"));
                        $mpdf = new \Mpdf\Mpdf();
                        $mpdf->writeHTML($getCSSAgreementData,\Mpdf\HTMLParserMode::HEADER_CSS);
                        $mpdf->writeHTML($getHTMLAgreementCode, \Mpdf\HTMLParserMode::HTML_BODY);
                        $toSave = $mpdf->Output("agreement.pdf","D");
                        break;
                    default:
                        break;
                }
                //Storage::disk("local")->storeAs($toSave,"Contents");
            } catch (Exception $e) {
                echo "error";
            }
            
        }
        else{
            return "Missing agreement's name";
        }
    }
}
