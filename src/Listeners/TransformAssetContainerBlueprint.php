<?php

namespace InsightMedia\StatamicPdfThumbnailer\Listeners;

use Statamic\Events\AssetContainerBlueprintFound;

class TransformAssetContainerBlueprint
{

    public function handle(AssetContainerBlueprintFound $event)
    {

        if (request()->route() && request()->route()->getName() === 'statamic.cp.assets.show') {

            $event->blueprint->ensureField('page_number', [

                'type' => 'page_number'

            ]);

        }

    }

}
