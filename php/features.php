<?php
declare(strict_types=1);

// MbtaV3 SDK feature factory

require_once __DIR__ . '/feature/BaseFeature.php';
require_once __DIR__ . '/feature/TestFeature.php';


class MbtaV3Features
{
    public static function make_feature(string $name)
    {
        switch ($name) {
            case "base":
                return new MbtaV3BaseFeature();
            case "test":
                return new MbtaV3TestFeature();
            default:
                return new MbtaV3BaseFeature();
        }
    }
}
