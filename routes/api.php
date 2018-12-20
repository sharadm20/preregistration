<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::group([

    'middleware' => 'api',
    'prefix' => 'auth'

], function ($router) {

    Route::post('login', 'API\AuthController@login');
    Route::post('logout', 'API\AuthController@logout');
    Route::post('refresh', 'API\AuthController@refresh');
    Route::post('me', 'API\AuthController@me');

});

Route::group([

    'middleware' => 'jwt.auth',

], function ($router) {
Route::apiResource('college', 'API\CollegeController');
Route::apiResource('venue', 'API\VenueController');
Route::apiResource('state', 'API\StateController');
Route::get('colleges/{state}','API\CollegeController@getCollegesStateWise');

Route::post('formSubmit','API\FormController@formSubmit');
});

Route::get('desgdept','API\FormController@getDesignationDepartmentList');