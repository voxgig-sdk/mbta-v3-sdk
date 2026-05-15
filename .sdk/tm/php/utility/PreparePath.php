<?php
declare(strict_types=1);

// MbtaV3 SDK utility: prepare_path

class MbtaV3PreparePath
{
    public static function call(MbtaV3Context $ctx): string
    {
        $point = $ctx->point;
        $parts = [];
        if ($point) {
            $p = \Voxgig\Struct\Struct::getprop($point, 'parts');
            if (is_array($p)) {
                $parts = $p;
            }
        }
        return \Voxgig\Struct\Struct::join($parts, '/', true);
    }
}
