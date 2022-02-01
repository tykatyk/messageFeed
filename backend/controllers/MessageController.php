<?php

namespace app\controllers;

use yii\rest\Controller;
use app\models\Message;
use yii\filters\Cors;
use \yii\filters\AccessControl;

class MessageController extends Controller
{

    private $allowedSorting = ["asc", "desc", "random"];
    private $allowedFiltering = ["all", "lastMinute"];
    private $model;

    public function init()
    {
        parent::init();
        $this->model = new Message();
    }

    public function actionOptions() {
        $header = header('Access-Control-Allow-Origin: *');
    }

    public function behaviors()
    {
        $behaviors = parent::behaviors();

        $behaviors['corsFilter'] = [
            'class' => Cors::className(),
            'cors' => [
                'Origin' => ['*'],
                'Access-Control-Request-Method' => ['GET', "POST", "OPTIONS"],
                'Access-Control-Allow-Headers' => ['*'],
                'Access-Control-Max-Age' => 3600,
            ],
        ];

        $behaviors['access'] = [
            'class' => AccessControl::className(),
            'rules' => [
                [
                    'allow' => true,
                    'actions' => ["add-message", "get-messages"],
                ],
            ],
        ];

        return $behaviors;
    }

    public function actionGetMessages() : array
    {
        $result = [];
        $sortingOrder = $this->request->get("sorting", "desc");
        $filter = $this->request->get("filter", "all");

        if(!in_array($sortingOrder, $this->allowedSorting, true)){
            $result["status"] = "error";
            $result["message"] = "Unknown sorting order";
            return result;
        };

        if(!in_array($filter, $this->allowedFiltering, true)){
            $result["status"] = "error";
            $result["message"] = "Unknown filter";
            return result;
        };

        $messages = $this->model->getMessages($sortingOrder, $filter);
     
        $result["status"] = "success";
        $result["data"] = $messages;
     
        return $result;
    }

    public function actionAddMessage() : array
    {
        $result = [];
        $postData = $this->request->post();

        $this->model->header = $postData["header"];
        $this->model->content = $postData["content"];
        
        if (!$this->model->validate()) {
            $result['status'] = 'error';
            $result['message'] = 'Data is invalid';
            $this->response->statusCode = 422;
            return $result;
        }

        if (!$this->model->save()) {
            $result['status'] = 'error';
            $result['message'] = 'Unknown error';
            $this->response->statusCode = 500;
            return $result;
        }

        $result['status'] = "success";

        return $result;
    }

}
