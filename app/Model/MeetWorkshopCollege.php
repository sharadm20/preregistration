<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Model;

class MeetWorkshopCollege extends Model
{
    protected $table='meet_workshop_form';

    public function allattendees()
    {
        return $this->morphMany('App\Model\MeetWorkshopAttendee', 'form');
    }
}
