<?php
declare(strict_types=1);

// MbtaV3 SDK utility: prepare_body

class MbtaV3PrepareBody
{
    public static function call(MbtaV3Context $ctx): mixed
    {
        if ($ctx->op->input === 'data') {
            return ($ctx->utility->transform_request)($ctx);
        }
        return null;
    }
}
