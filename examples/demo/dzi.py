#!/usr/bin/env python
# -*- coding: utf-8 -*-

import os
import deepzoom
import urllib
import re

MAX_PAGES = 10
PAGE_COUNT = {}

def ensure_dir( filename ):
    directory = os.path.dirname( filename )
    if not os.path.exists( directory ):
        os.makedirs( directory )

# Create Deep Zoom Image creator with weird parameters
creator = deepzoom.ImageCreator(
    tile_size=256, 
    tile_overlap=2, 
    tile_format="tif",
    image_quality=1, 
    resize_filter="antialias"
)

tiff_list = open( 'tiffs.txt', 'r' ).read().split( '\n' )
for tiff_url in tiff_list:

    parts = re.match(
        r'http://lcweb2\.loc\.gov/master/pnp/ppmsca/(\d*)/(\d*)/(\d*)u\.tif',
        tiff_url
    ).groups()
    id = parts[ 1 ]
    fileid = parts[ 2 ]
    if id not in PAGE_COUNT:
        PAGE_COUNT[ id ] = 0

    path = tiff_url.replace( 'http://lcweb2.loc.gov/master/', '' )
    dzi_files = path.replace( 'u.tif', '_files' )

    if PAGE_COUNT[ id ] < MAX_PAGES and not os.path.exists( dzi_files ):
        print 'making directory %s' % os.path.dirname( path )
        ensure_dir( path )

        print 'downloading master tiff \n%s' % tiff_url
        tiff_file = open( path, 'wb' )
        tiff_file.write(urllib.urlopen(tiff_url).read())
        tiff_file.close()

        print 'creating dzi from %s' % path
        # Create Deep Zoom image pyramid from source
        creator.create( path, path.replace( 'u.tif', '.dzi' ) )

    PAGE_COUNT[ id ] += 1
