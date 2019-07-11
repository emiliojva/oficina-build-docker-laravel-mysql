<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class HomeController extends Controller
{
    //
    public function index()
    {
        $urlBase = url()->current() .'/';
        return view('home.index',compact(['urlBase']));
    }
}


