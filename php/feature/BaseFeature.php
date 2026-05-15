<?php
declare(strict_types=1);

// MbtaV3 SDK base feature

class MbtaV3BaseFeature
{
    public string $version;
    public string $name;
    public bool $active;

    public function __construct()
    {
        $this->version = '0.0.1';
        $this->name = 'base';
        $this->active = true;
    }

    public function get_version(): string { return $this->version; }
    public function get_name(): string { return $this->name; }
    public function get_active(): bool { return $this->active; }

    public function init(MbtaV3Context $ctx, array $options): void {}
    public function PostConstruct(MbtaV3Context $ctx): void {}
    public function PostConstructEntity(MbtaV3Context $ctx): void {}
    public function SetData(MbtaV3Context $ctx): void {}
    public function GetData(MbtaV3Context $ctx): void {}
    public function GetMatch(MbtaV3Context $ctx): void {}
    public function SetMatch(MbtaV3Context $ctx): void {}
    public function PrePoint(MbtaV3Context $ctx): void {}
    public function PreSpec(MbtaV3Context $ctx): void {}
    public function PreRequest(MbtaV3Context $ctx): void {}
    public function PreResponse(MbtaV3Context $ctx): void {}
    public function PreResult(MbtaV3Context $ctx): void {}
    public function PreDone(MbtaV3Context $ctx): void {}
    public function PreUnexpected(MbtaV3Context $ctx): void {}
}
