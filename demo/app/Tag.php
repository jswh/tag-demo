<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

/**
 * @property int id
 * @property int propertyId
 * @property string value
 */
class Tag extends Model
{
    public function property() {
        return $this->hasOne(Property::class, 'id', 'propertyId');
    }
}
