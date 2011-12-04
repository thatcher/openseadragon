#!/usr/bin/env python
# -*- coding: utf-8 -*-

import deepzoom

# Specify your source image
SOURCE = "01967u.tif"

# Create Deep Zoom Image creator with weird parameters
creator = deepzoom.ImageCreator(
	tile_size=256, 
	tile_overlap=2, 
	tile_format="tif",
    image_quality=1, 
    resize_filter="anitalias"
)

# Create Deep Zoom image pyramid from source
creator.create( SOURCE, "highsmith.dzi" )
