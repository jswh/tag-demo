<?php

namespace App\Http\Controllers;

use App\Property;
use App\Tag;
use Illuminate\Http\Request;

class PropertyTagController extends Controller
{
    /**
     * get all tags of a specific Property
     *
     * @return Response
     */
    public function index($propertyId)
    {
        $property = Property::findOrFail($propertyId);
        $property->tags;

        return $property;
    }

    /**
     * create one tag for the specific Property
     *
     * @return void
     */
    public function store($propertyId, Request $request)
    {
        $value = $request->post('value');
        Property::findOrFail($propertyId);

        $exist = Tag::where('value', $value)->where('propertyId', $propertyId)->first();
        if ($exist) {
            return $exist;
        }

        $tag = new Tag();
        $tag->value = $value;
        $tag->propertyId = $propertyId;
        $tag->save();

        return $tag;
    }

    /**
     * delete one tag
     *
     * @return void
     */
    public function destroy($tagId)
    {
        $tag = Tag::find($tagId);
        if ($tag) {
            $tag->delete();
        }

        return $tag;
    }

    /**
     * update one tag
     *
     * @return void
     */
    public function update($tagId) {
        $value = Request::capture()->input('value');
        $tag = Tag::findOrFail($tagId);
        $tag->value = $value;
        $tag->save();

        return $tag;
    }

}
