<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use PhpOffice\PhpWord\PhpWord;
use Exception;

class MainController extends Controller
{
    public function entities($str){
        $final = htmlentities($str, ENT_QUOTES,"UTF-8");
        return $final;
    }
    public function generateAgreement(Request $data){
        if($data->has("agreementName")){
            // reading POST data
            $content = $this->entities($data->input("agreementName"));
            $tableOfParagraphs = [];
            $i = 1;
            while($data->has("paragraph".$i)){
                $helper = $this->entities($data->input("paragraph".$i));
                $tableOfParagraphs[$i-1] = $helper;
                $i++;
            }
            // making the word file basing on sent data
            $phpWord = new PhpWord();
            $mainSection = $phpWord->addSection();
            $phpWord->addParagraphStyle("centerStyle",array('align' => "center"));
            $phpWord->addFontStyle("headerStyle",array("name" => "Times New Roman","size" => 20, "color" => "black"));
            $phpWord->addFontStyle("paragraphStyle",array("name" => "Times New Roman","size" => 12, "color" => "black"));

            // making the word file basing on sent data
            $mainSection->addText($content,"headerStyle","centerStyle");
            $mainSection->addTextRun();
            for($i = 0 ; $i < count($tableOfParagraphs); $i++){
                $mainSection->addText("§".($i+1).". ".$tableOfParagraphs[$i],"paragraphStyle");
                $mainSection->addTextRun();
            }
            $objectWriter = \PhpOffice\PhpWord\IOFactory::createWriter($phpWord);
            try {
                $objectWriter->save(storage_path("agreement.docx"));
            } catch (Exception $e) {
                
            }
            return response()->download(storage_path("agreement.docx"));
        }
        else{
            return "Missing agreement's name";
        }
    }
}
