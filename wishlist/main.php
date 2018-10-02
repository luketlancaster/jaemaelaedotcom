<?php

require_once('vendor/gsx_db.php');
$url = 'https://docs.google.com/spreadsheets/d/11_IF6m6s-oHl4Mq0xLWJ5NYAfh8S1VJEkzWqzMkv2Lw/edit?usp=sharing';
$gsx = new Gsx_db($url);
echo json_encode($gsx->get_table_by_title('birthday'));
