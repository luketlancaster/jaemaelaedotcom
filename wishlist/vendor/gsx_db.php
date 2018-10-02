<?php 

class Gsx_db {

    var $google_page_id;
    var $tables;

    function __construct($spreadsheet_url) {    
        $this->google_page_id = $this->make_google_id_from_url($spreadsheet_url);
        $this->load_tables();    
    }    

    protected function load_tables(){
        //Get all worksheets in the spreadsheet 
        $url = "https://spreadsheets.google.com/feeds/worksheets/".$this->google_page_id."/public/full?alt=json";
        $json = file_get_contents($url);
        $json_decoded = json_decode($json,true);
        //the useful rows
        $array_worksheets = $json_decoded['feed']['entry'];

        $worksheets = array();
        foreach ($array_worksheets as $worksheet) {
                $worksheet_title = $worksheet['title']['$t']; 
                $url = $worksheet['link'][0]['href'] . "?alt=json"; //select the first option (xml), but ask specifically for the json format

                $worksheets[] = array(
                    'title' => $worksheet_title,
                    'url' => $url
                ); 
        }
        $this->tables = $worksheets;
    }



    public function get_table_by_title($title){

        $all_entries=array();

        //loop through all the tables, and check if the requested title matches one.
        for ($i=0; $i < count($this->tables); $i++) { 

            $table = $this->tables[$i];
            if($table['title'] == $title){
                $json = file_get_contents($table['url']);
                $json_decoded = json_decode($json,true);

                //the sorta useful bits
                $entries = $json_decoded['feed']['entry'];

                //Match found...

                foreach ($entries as $rows) {
        
                    $return_row = array();

                    foreach ($rows as $key => $value) {
                        if(!isset($value['$t'])){ continue; } //No data for this row. Skipping.

                        $value = $value['$t']; 
                        //google uses the dollar sign to delineate the first row of headings

                        if(strpos($key,'$')>0){ //if theres a dollar sign, it is one of our defined headings.

                            $key = substr($key,4); //chop off the first four characters ' gsx$ ' to define the key
                
                            $return_row += array(
                                $key => $value
                            );
                        }
                    }
                    $result[] = $return_row;
                }
                return $result;
            }
        }
    }

    public function list_tables(){
        return $this->tables;
    }

    public function make_human_readable_key($key){
        $key = str_replace("-"," ",$key);
        $key = ucwords($key);
        return $key;
    }


    public function make_google_id_from_url($spreadsheet_url){
        $strpos = strpos($spreadsheet_url,"/d/") + 3;   //Remove everything from the front of the ID
        $spreadsheet_url = substr($spreadsheet_url, $strpos); 
        $strstr = strstr($spreadsheet_url, "/", true); //Return everything before the first remaining / character
        return $strstr;
    }

}
