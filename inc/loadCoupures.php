<?php
/**
 * Created by PhpStorm.
 * User: yenteck
 * Date: 13/10/17
 * Time: 23:39
 */
require_once "functions.php";


$DB=getDB();
$date=$_GET["date"];

$dd=date("Y-m-d 00:00");
$df=date("Y-m-d 23:00");

$dd=$date;


try{
    $sql="SELECT * FROM coupure WHERE '$dd' >= debut AND '$dd' <= fin";
    $rq=$DB->query($sql);
    
    if($rq){
        
        $zones=[];
        
        $rowq=$rq->fetchAll();

        foreach ($rowq as $item) {
            $zs = preg_split("/[,]+/",$item["zones"]);

            $zones[]=[
                "debut"=>$item["debut"],
                "fin"=>$item["fin"],
                "fin"=>$item["fin"],
                "zones"=>$zs
            ];

            echo json_encode($zones);
        }


    }
    //debug($rowq);
}catch(Exception $e){


}



