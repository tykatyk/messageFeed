<?php
namespace app\components;

use Yii;

class Helper
{
    public static function prepareSorting($sortingOrder): string
    {
        $sortBy = "";

        if($sortingOrder == "asc"){
            $sortBy .= "ORDER BY created_at ASC";
        }

        if($sortingOrder == "desc"){
            $sortBy .= "ORDER BY created_at DESC";
        }

        if($sortingOrder == "random"){
            $sortBy .= "ORDER BY RAND()";
        }

        return $sortBy;
    }
}