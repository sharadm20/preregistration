<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use DB;
use Log;
use App\Model\College;
use App\Model\MeetWorkshopCollege;
use App\Model\MeetWorkshopAttendee;

class FormController extends Controller
{
	public function __construct()
    {
         $this->middleware('jwt.auth',['except'=>['getDesignationDepartmentList']]);
    }

    public function getDesignationDepartmentList(){
    //Log::info('dept desg list');
		$department =DB::table('elsi_master.elsi_departments')->get();
		$designation=DB::table('elsi_master.elsi_designations')->get();
		$college_sub_data_array = ['department'=>$department,'designation'=>$designation];
		return json_encode($college_sub_data_array);
	}


	/**
	 * Show the form for editing the specified resource.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function formSubmit()
	{
		$req=request();
		$college=College::select('college_name','district','IS_eLSI','clg_code')->where('clg_code',$req['college'])->first();
				$is_elsi=$college->IS_eLSI;
				$clg_code=$college->clg_code;
		DB::beginTransaction();	
	try{		
   	$form=new MeetWorkshopCollege;
			$form->venue_id=$req['venue'];
			$form->state=$req['state'];
			$form->clg_code=$clg_code;
			$form->college_name=$req['college'];
			$form->no_of_attendee=$req['count'];
			$form->loi_status=$req['loi'];
			$form->is_elsi=$is_elsi;
			$form->save();
		for($i=1;$i<=$req['count'];$i++){	
		$attendee=new MeetWorkshopAttendee;
						$attendee->name =$req['name'.$i];
						$attendee->email =$req['email'.$i];
						$attendee->designation =$req['designation'.$i];
						$attendee->department =$req['department'.$i];
						$attendee->number =$req['contact'.$i];				
						$attendee->gender =$req['gender'.$i];
						$attendee->attendee_type =1;
				$form->allattendees()->save($attendee);		
			}	
		DB::commit();
		return json_encode(['status'=>'success','message'=>'Your details is successfully saved','data'=>$form]);
		}//try
		catch(Exception $e){
			Log::debug($e);
			DB::rollback();
			return json_encode(['status'=>'failed','message'=>$e]);
		}
	}
}
