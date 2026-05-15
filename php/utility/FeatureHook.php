<?php
declare(strict_types=1);

// MbtaV3 SDK utility: feature_hook

class MbtaV3FeatureHook
{
    public static function call(MbtaV3Context $ctx, string $name): void
    {
        if (!$ctx->client) {
            return;
        }
        $features = $ctx->client->features ?? null;
        if (!$features) {
            return;
        }
        foreach ($features as $f) {
            if (method_exists($f, $name)) {
                $f->$name($ctx);
            }
        }
    }
}
