<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Model;

class MeetWorkshopAttendee extends Model
{
     protected $table='meet_workshop_attendee_dtls';

    public function form()
    {
        return $this->morphTo();
    }
}
