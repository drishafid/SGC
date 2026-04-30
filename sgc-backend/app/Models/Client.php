<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Client extends Model
{
    protected $fillable = ['nom', 'email', 'telephone'];

    public function rendezVous(): HasMany
    {
        return $this->hasMany(RendezVous::class);
    }
}
