<?php
namespace app\components;

use Yii;

class Helper
{
    public static function getLastMinute() : array
    {
        $lastMinute = [];
        $format = "Y-m-d G:i:s";
        $timezone = new \DateTimeZone(Yii::$app->timeZone);
        $date = new \DateTime("now", $timezone);
        $endStr = $date->format($format);
        $startStr = date($format, strtotime($endStr) - 60);

        $lastMinute["end"] = $endStr;
        $lastMinute["start"] = $startStr;

        return $lastMinute;
    }
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