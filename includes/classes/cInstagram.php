<?php

//class to render specific instagram data

class cInstagram{

    //set default variables
    private $instagramApiUrl = 'https://api.instagram.com/v1/';

    /**
     * initialize JSON objects into the file
     *
     * @param $client_id
     * @param array $queryString
     *
     * return JSON file
     */
    public function __construct($client_id, $queryString){
        $data = $this->getJSON($client_id, $queryString);
        $json_array = $this->renderJSONArray($data);
        $json_data = $this->encodeJSON($json_array);

        echo $json_data;
    }

    /**
     * grab all data from instagram
     *
     * @param $client_id
     * @param array $queryString
     * @return mixed
     *
     * return instagram data array
     */
    private function getJSON($client_id, $queryString){
        $url = $this->instagramApiUrl . 'users/'.$client_id.'/media/recent?'.http_build_query($queryString);
        $content = file_get_contents($url);
        $data = json_decode($content);

        return $data;
    }

    /**
     * create custom JSON array from the instagram array
     *
     * @param $data
     * @return array
     */
    private function renderJSONArray($data){
        $data_images = [];
        for($i = 0; $i < count($data->data); $i++){
            $image = [
                'location' => [
                    'latitude' => $data->data[$i]->location->latitude,
                    'longitude' => $data->data[$i]->location->longitude,
                    'name' => $data->data[$i]->location->name
                ],
                'likes' => [
                    'count' => $data->data[$i]->likes->count
                ],
                'thumbnail' => $data->data[$i]->images->thumbnail,
                'username' => $data->data[$i]->user->username
            ];
            array_push($data_images, $image);
        };

        //create custom array
        $json_array = [
            'meta' => [
                'code' => $data->meta->code
            ],
            'data' => $data_images
        ];

        return $json_array;
    }

    /**
     * convert custom array to JSON
     *
     * @param $json_array
     * @return string
     */
    private function encodeJSON($json_array){
        header("Content-Type: application/json");
        return json_encode($json_array);
    }
}