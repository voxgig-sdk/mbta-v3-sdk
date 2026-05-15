<?php
declare(strict_types=1);

// MbtaV3 SDK utility: make_context

require_once __DIR__ . '/../core/Context.php';

class MbtaV3MakeContext
{
    public static function call(array $ctxmap, ?MbtaV3Context $basectx): MbtaV3Context
    {
        return new MbtaV3Context($ctxmap, $basectx);
    }
}
