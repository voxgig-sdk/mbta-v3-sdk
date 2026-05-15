<?php
declare(strict_types=1);

// MbtaV3 SDK utility: result_body

class MbtaV3ResultBody
{
    public static function call(MbtaV3Context $ctx): ?MbtaV3Result
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result && $response && $response->json_func && $response->body) {
            $result->body = ($response->json_func)();
        }
        return $result;
    }
}
