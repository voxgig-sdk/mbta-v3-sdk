<?php
declare(strict_types=1);

// MbtaV3 SDK utility: result_headers

class MbtaV3ResultHeaders
{
    public static function call(MbtaV3Context $ctx): ?MbtaV3Result
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result) {
            if ($response && is_array($response->headers)) {
                $result->headers = $response->headers;
            } else {
                $result->headers = [];
            }
        }
        return $result;
    }
}
