@extends('layouts.app')
@section('content')
    <div class="agreement-form-container block-center">
        {{Form::open(array("class" => "agreement-form","url" => "makingAgreement"))}}
            <input type="text" name="agreementName" id="" placeholder="Agreement name..." required="required" class="agreement-name-header"/>
            <div id="agreement-management-wrapper"></div>
            <button type="submit" class="submit-btn block-center">Download the Word file</button>
        {{Form::close()}}
    </div>
@endsection