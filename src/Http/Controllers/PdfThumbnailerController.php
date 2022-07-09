<?php

namespace InsightMedia\StatamicPdfThumbnailer\Http\Controllers;

use Statamic\Http\Resources\CP\Assets\Asset as AssetResource;
use InsightMedia\StatamicPdfThumbnailer\PdfToImage;
use Statamic\Http\Controllers\CP\CpController;
use Illuminate\Http\Request;
use Statamic\Assets\AssetContainer;
use Statamic\Facades\Asset;

class PdfThumbnailerController extends CpController
{

    public function convert(Request $request)
    {

        $asset = Asset::findByUrl($request->input('url'));

        $page = $request->has('page') ? $request->input('page') : 1;

        PdfToImage::convert($asset, $page);

        $response = ['asset' => new AssetResource($asset)];

        return response()->json($response);

    }

}
