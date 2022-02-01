<?php

namespace app\models;

use Yii;
use yii\db\ActiveRecord;
use yii\db\Expression;
use yii\behaviors\TimestampBehavior;
use app\components\Helper;

class Message extends ActiveRecord
{

    public static function tableName() {
        return 'messages';
    }

    public function rules() : array
    {
        return [
            [['header', 'content'], 'required'],
        ];
    }

    public function behaviors()
    {
        return [
            [
                'class' => TimestampBehavior::class,
                'createdAtAttribute' => 'created_at',
                'updatedAtAttribute' => false,
                'value' => new Expression('NOW()'),
            ],
        ];
    }

    public function getMessages(string $sortingOrder, string $filter) : array
    {
        $rawQuery = Helper::prepareQuery($sortingOrder, $filter);
        $connection = Yii::$app->getDb();
        $reader = $connection->createCommand($rawQuery)->query();
        
        return $reader->readAll();
    }

}
