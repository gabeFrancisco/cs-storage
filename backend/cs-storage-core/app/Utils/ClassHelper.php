<?php

namespace App\Utils;

class ClassHelper
{
    public static function fillFromSql(object $row, string $class, string $prefix = '')
    {
        $instance = new $class();

        foreach (get_object_vars($row) as $field => $value) {

            //If the SQL result has a model prefix field like customer_ or address_
            if ($prefix && str_starts_with($field, $prefix)) {
                $prop = substr($field, strlen($prefix));

                //Check if the prefix field exists on actual model class
                if (property_exists($instance, $prop)) {
                    $instance->$prop = $value;
                }
                elseif(!$prefix && property_exists($instance, $field)){
                    $instance->$field = $value;
                }
            }
        }
        return $instance;
    }
}
