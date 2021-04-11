@extends('layouts.app')
@section('content')
    <header class="welcome-header block-center">Agreement app</header>
    <div class="describe block-center">Agreement app is a simple way to create your agreement and to save it to the Word, HTML or PDF file</div>
    <div class="links-wrapper block-center">
        <a href = "/make-agreement">
            <button class="go-to-agreement">Make an agreement</button>
        </a>
        <a href="/credits">
            <button class="go-to-agreement">Credits</button>
        </a>
    </div>
@endsection