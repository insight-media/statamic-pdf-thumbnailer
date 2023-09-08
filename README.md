<br>
<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://insight-media.be/images/gh/logo-dark.svg">
  <img alt="Insight Media Logo" src="https://insight-media.be/images/gh/logo-light.svg">
</picture>

# Statamic Pdf Thumbnailer

> Statamic Pdf Thumbnailer automatically generates an image per uploaded PDF asset.
> 
> Particularly useful when you want to show image previews when linking to PDF files.

## Features

- Generates an image asset of the first page for every uploaded PDF
- The uploaded PDF contains a relation to the image asset
- Includes a page number selector, when an image preview other than the first page is needed
- Includes a simple tag to show the image previews in your antlers templates

## Requirements

You should have [Imagick](https://www.php.net/manual/en/book.imagick.php) and [Ghostscript](https://www.ghostscript.com) installed. [See issues](https://github.com/spatie/pdf-to-image#issues-regarding-ghostscript) regarding Ghostscript on the underlying Spatie package page.

## How to Install

You can search for this addon in the `Tools > Addons` section of the Statamic control panel and click **install**, or run the following command from your project root:

``` bash
composer require insight-media/statamic-pdf-thumbnailer
```

## How to Use

### In your antlers templates

For example, if you have an Assets fieldtype named 'catalogs', containing some Pdf's:

``` antlers
{{ catalogs }}

    <a href="{{ url }}">
        <img src="{{ pdf :to="thumbnail" }}">
        
        <!-- or when using glide: -->
        <img src="{{ glide src=thumbnail width="200" }}">
    </a>

{{ /catalogs }}
```
