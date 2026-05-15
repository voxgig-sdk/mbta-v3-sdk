<?php
declare(strict_types=1);

// MbtaV3 SDK utility: feature_add

class MbtaV3FeatureAdd
{
    public static function call(MbtaV3Context $ctx, mixed $f): void
    {
        $ctx->client->features[] = $f;
    }
}
