<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
/**
 * @property int id
 */
class Property extends Model
{
    public function tags() {
        return $this->hasMany(Tag::class, 'propertyId', 'id');
    }
}
