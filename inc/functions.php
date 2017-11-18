
<?php

  function checkLogged(){
    if($_SESSION['islogged'] && !empty($_SESSION['user']['pseudo']))
      return true;
    else return false;
  }


  function getDB(){

    try {

      $bdd= new PDO('mysql:host=localhost;dbname=sonabel','yenteck','beboila');

    } catch (Exception $e) {
      die("ERREUR ".$e->getMessage());
    }
    return $bdd;

  }

  function getData($sql){
    global $BDD ;//we use connection already opened

    $q=$BDD->query($sql);

    $rows=$q->fetchAll();

    $q->closeCursor();


    foreach ($rows as $row ) {
        $data[] = $row ;
    }
    return $data;
}

function debug($v){
  echo '<pre>';
    var_dump($v);
  echo'</pre>';
}
