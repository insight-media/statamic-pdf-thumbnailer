<?php

namespace InsightMedia\StatamicPdfThumbnailer\Listeners;

use Statamic\Events\AssetUploaded;
use InsightMedia\StatamicPdfThumbnailer\PdfToImage;

class AssetListener
{

    public function handle(AssetUploaded $event)
    {

        if ($event->asset->isPdf()) {
            PdfToImage::convert($event->asset);
        }

    }

}
