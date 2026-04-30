<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class RendezVous extends Model
{
    protected $table = 'rendez_vous';

    protected $fillable = ['date', 'note', 'client_id'];

    public function client(): BelongsTo
    {
        return $this->belongsTo(Client::class);
    }
}
