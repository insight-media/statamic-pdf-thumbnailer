<?php

namespace InsightMedia\StatamicPdfThumbnailer;

use Illuminate\Support\Facades\Route;
use Statamic\Providers\AddonServiceProvider;
use Statamic\Events\AssetUploaded;
use Statamic\Events\AssetContainerBlueprintFound;
use InsightMedia\StatamicPdfThumbnailer\Http\Controllers\PdfThumbnailerController;
use InsightMedia\StatamicPdfThumbnailer\Listeners\AssetListener;
use InsightMedia\StatamicPdfThumbnailer\Listeners\TransformAssetContainerBlueprint;
use InsightMedia\StatamicPdfThumbnailer\Tags\Pdf;
use InsightMedia\StatamicPdfThumbnailer\Fieldtypes\PageNumber;

class ServiceProvider extends AddonServiceProvider
{

    protected $listen = [
        AssetUploaded::class => [AssetListener::class],
        AssetContainerBlueprintFound::class => [TransformAssetContainerBlueprint::class]
    ];

    protected $fieldtypes = [
        PageNumber::class
    ];

    protected $tags = [
        Pdf::class
    ];

    protected $scripts = [
        __DIR__ . '/../resources/dist/js/cp.js'
    ];

    public function bootAddon()
    {
        $this->registerCpRoutes(function () {
            Route::post('convert-pdf/', [PdfThumbnailerController::class, 'convert']);
        });
    }
}
