/**
 * Corrigi bug da lib dropzone, que rotaciona incorretamente imagens capturadas por cameras ipad e outras
 * Utiliza EXPLICITAMENTE as libs exif e load-image.all abaixo.
 * @param image_file
 * @param dropzone_instance
 */
function dropzone_fix_image_vertical_images_rotation_error(image_file, dropzone_instance) {

    window.loadImage.parseMetaData(image_file, function (data) {

        // use embedded thumbnail if exists.
        if (data.exif) {
            var thumbnail = data.exif.get('Thumbnail');
            var orientation = data.exif.get('Orientation');

            if (thumbnail && orientation) {
                window.loadImage(thumbnail, function (img) {
                    dropzone_instance.emit('thumbnail', image_file, img.toDataURL());
                }, {orientation: orientation});
                return img;
            }
        }
        // use default implementation for PNG, etc.
        dropzone_instance.createThumbnail(image_file);
    });

}

function dropzone_upload_without_files(dropzone_instance){
    var blob = new Blob();
    blob.upload = { 'chunked': dropzone_instance.defaultOptions.chunking };
    dropzone_instance.uploadFile(blob);
}

/**
 * Funcao para carregar thumbnails lidando com imagens forceRotation
 * @param mockfile_with_url_image
 * @param dropzone_instance
 */
function dropzone_load_image_vertical_from_mockfile(mockfile_with_url_image, dropzone_instance){
    /*Carrega informacoes de uma imagem por url*/
    window.loadImage(
        mockfile_with_url_image.imageUrl,
        function (img, data) {

            // console.log("Original image head: ", data.imageHead);
            // console.log("Exif data: ", data.exif); // requires exif extension
            // console.log("IPTC data: ", data.iptc); // requires iptc extension

            if(!data.exif){
                // TNC !!!
                dropzone_instance.createThumbnailFromUrl(
                    mockfile_with_url_image,
                    dropzone_instance.options.thumbnailWidth,
                    dropzone_instance.options.thumbnailHeight,
                    dropzone_instance.options.thumbnailMethod,
                    true,
                    function (thumbnail) {
                        dropzone_instance.emit('thumbnail', mockfile_with_url_image, thumbnail);
                        dropzone_instance.emit("complete", mockfile_with_url_image);
                    }
                );

                return false;
            }

            var thumbnail = data.exif.get('Thumbnail');
            var orientation = data.exif.get('Orientation');

            if (thumbnail && orientation) {
                window.loadImage(thumbnail, function (img,data) {
                    dropzone_instance.emit('thumbnail', mockfile_with_url_image, img.toDataURL());
                    dropzone_instance.emit("complete", mockfile_with_url_image);
                }, {orientation: orientation});
                return true;
            } else {

                // TNC !!!
                dropzone_instance.createThumbnailFromUrl(
                    mockfile_with_url_image,
                    dropzone_instance.options.thumbnailWidth,
                    dropzone_instance.options.thumbnailHeight,
                    dropzone_instance.options.thumbnailMethod,
                    true,
                    function (thumbnail) {
                        dropzone_instance.emit('thumbnail', mockfile_with_url_image, thumbnail);
                        dropzone_instance.emit("complete", mockfile_with_url_image);
                    }
                );

                return false;

            }
        },
        { meta: true }
    );

}

function dropzone_createThumbnailFromMockFile(mockFile,dropzone_instance){

    dropzone_instance.files.push(mockFile);

    // Call the default addedfile event handler
    dropzone_instance.emit('addedfile', mockFile);

    /*Carrega informacoes de uma imagem por url*/
    window.loadImage(
        mockFile.imageUrl,
        function (img, data) {

            console.log("Original image head: ", data.imageHead);
            console.log("Exif data: ", data.exif); // requires exif extension
            console.log("IPTC data: ", data.iptc); // requires iptc extension

            var thumbnail = data.exif.get('Thumbnail');
            var orientation = data.exif.get('Orientation');

            if (thumbnail && orientation) {
                window.loadImage(thumbnail, function (img) {
                    dropzone_instance.emit('thumbnail', mockFile, img.toDataURL());
                    dropzone_instance.emit("complete", mockFile);
                }, {orientation: orientation});
                return;
            }
        },
        { meta: true }
    );

    // Make sure that there is no progress bar, etc...
    dropzone_instance.emit('complete', mockFile);

    // emit sucess event
    dropzone_instance.emit('success', mockFile);



    // If you use the maxFiles option, make sure you adjust it to the
    // correct amount:
//                    var existingFileCount = {$maxFiles}; // The number of files already uploaded
//                    myDropzone.options.maxFiles = myDropzone.options.maxFiles - existingFileCount;
}


// exif lib - https://github.com/exif-js/exif-js
(function () {

    var debug = false;

    var root = this;

    var EXIF = function (obj) {
        if (obj instanceof EXIF) return obj;
        if (!(this instanceof EXIF)) return new EXIF(obj);
        this.EXIFwrapped = obj;
    };

    if (typeof exports !== 'undefined') {
        if (typeof module !== 'undefined' && module.exports) {
            exports = module.exports = EXIF;
        }
        exports.EXIF = EXIF;
    } else {
        root.EXIF = EXIF;
    }

    var ExifTags = EXIF.Tags = {

        // version tags
        0x9000: "ExifVersion",             // EXIF version
        0xA000: "FlashpixVersion",         // Flashpix format version

        // colorspace tags
        0xA001: "ColorSpace",              // Color space information tag

        // image configuration
        0xA002: "PixelXDimension",         // Valid width of meaningful image
        0xA003: "PixelYDimension",         // Valid height of meaningful image
        0x9101: "ComponentsConfiguration", // Information about channels
        0x9102: "CompressedBitsPerPixel",  // Compressed bits per pixel

        // user information
        0x927C: "MakerNote",               // Any desired information written by the manufacturer
        0x9286: "UserComment",             // Comments by user

        // related file
        0xA004: "RelatedSoundFile",        // Name of related sound file

        // date and time
        0x9003: "DateTimeOriginal",        // Date and time when the original image was generated
        0x9004: "DateTimeDigitized",       // Date and time when the image was stored digitally
        0x9290: "SubsecTime",              // Fractions of seconds for DateTime
        0x9291: "SubsecTimeOriginal",      // Fractions of seconds for DateTimeOriginal
        0x9292: "SubsecTimeDigitized",     // Fractions of seconds for DateTimeDigitized

        // picture-taking conditions
        0x829A: "ExposureTime",            // Exposure time (in seconds)
        0x829D: "FNumber",                 // F number
        0x8822: "ExposureProgram",         // Exposure program
        0x8824: "SpectralSensitivity",     // Spectral sensitivity
        0x8827: "ISOSpeedRatings",         // ISO speed rating
        0x8828: "OECF",                    // Optoelectric conversion factor
        0x9201: "ShutterSpeedValue",       // Shutter speed
        0x9202: "ApertureValue",           // Lens aperture
        0x9203: "BrightnessValue",         // Value of brightness
        0x9204: "ExposureBias",            // Exposure bias
        0x9205: "MaxApertureValue",        // Smallest F number of lens
        0x9206: "SubjectDistance",         // Distance to subject in meters
        0x9207: "MeteringMode",            // Metering mode
        0x9208: "LightSource",             // Kind of light source
        0x9209: "Flash",                   // Flash status
        0x9214: "SubjectArea",             // Location and area of main subject
        0x920A: "FocalLength",             // Focal length of the lens in mm
        0xA20B: "FlashEnergy",             // Strobe energy in BCPS
        0xA20C: "SpatialFrequencyResponse",    //
        0xA20E: "FocalPlaneXResolution",   // Number of pixels in width direction per FocalPlaneResolutionUnit
        0xA20F: "FocalPlaneYResolution",   // Number of pixels in height direction per FocalPlaneResolutionUnit
        0xA210: "FocalPlaneResolutionUnit",    // Unit for measuring FocalPlaneXResolution and FocalPlaneYResolution
        0xA214: "SubjectLocation",         // Location of subject in image
        0xA215: "ExposureIndex",           // Exposure index selected on camera
        0xA217: "SensingMethod",           // Image sensor type
        0xA300: "FileSource",              // Image source (3 == DSC)
        0xA301: "SceneType",               // Scene type (1 == directly photographed)
        0xA302: "CFAPattern",              // Color filter array geometric pattern
        0xA401: "CustomRendered",          // Special processing
        0xA402: "ExposureMode",            // Exposure mode
        0xA403: "WhiteBalance",            // 1 = auto white balance, 2 = manual
        0xA404: "DigitalZoomRation",       // Digital zoom ratio
        0xA405: "FocalLengthIn35mmFilm",   // Equivalent foacl length assuming 35mm film camera (in mm)
        0xA406: "SceneCaptureType",        // Type of scene
        0xA407: "GainControl",             // Degree of overall image gain adjustment
        0xA408: "Contrast",                // Direction of contrast processing applied by camera
        0xA409: "Saturation",              // Direction of saturation processing applied by camera
        0xA40A: "Sharpness",               // Direction of sharpness processing applied by camera
        0xA40B: "DeviceSettingDescription",    //
        0xA40C: "SubjectDistanceRange",    // Distance to subject

        // other tags
        0xA005: "InteroperabilityIFDPointer",
        0xA420: "ImageUniqueID"            // Identifier assigned uniquely to each image
    };

    var TiffTags = EXIF.TiffTags = {
        0x0100: "ImageWidth",
        0x0101: "ImageHeight",
        0x8769: "ExifIFDPointer",
        0x8825: "GPSInfoIFDPointer",
        0xA005: "InteroperabilityIFDPointer",
        0x0102: "BitsPerSample",
        0x0103: "Compression",
        0x0106: "PhotometricInterpretation",
        0x0112: "Orientation",
        0x0115: "SamplesPerPixel",
        0x011C: "PlanarConfiguration",
        0x0212: "YCbCrSubSampling",
        0x0213: "YCbCrPositioning",
        0x011A: "XResolution",
        0x011B: "YResolution",
        0x0128: "ResolutionUnit",
        0x0111: "StripOffsets",
        0x0116: "RowsPerStrip",
        0x0117: "StripByteCounts",
        0x0201: "JPEGInterchangeFormat",
        0x0202: "JPEGInterchangeFormatLength",
        0x012D: "TransferFunction",
        0x013E: "WhitePoint",
        0x013F: "PrimaryChromaticities",
        0x0211: "YCbCrCoefficients",
        0x0214: "ReferenceBlackWhite",
        0x0132: "DateTime",
        0x010E: "ImageDescription",
        0x010F: "Make",
        0x0110: "Model",
        0x0131: "Software",
        0x013B: "Artist",
        0x8298: "Copyright"
    };

    var GPSTags = EXIF.GPSTags = {
        0x0000: "GPSVersionID",
        0x0001: "GPSLatitudeRef",
        0x0002: "GPSLatitude",
        0x0003: "GPSLongitudeRef",
        0x0004: "GPSLongitude",
        0x0005: "GPSAltitudeRef",
        0x0006: "GPSAltitude",
        0x0007: "GPSTimeStamp",
        0x0008: "GPSSatellites",
        0x0009: "GPSStatus",
        0x000A: "GPSMeasureMode",
        0x000B: "GPSDOP",
        0x000C: "GPSSpeedRef",
        0x000D: "GPSSpeed",
        0x000E: "GPSTrackRef",
        0x000F: "GPSTrack",
        0x0010: "GPSImgDirectionRef",
        0x0011: "GPSImgDirection",
        0x0012: "GPSMapDatum",
        0x0013: "GPSDestLatitudeRef",
        0x0014: "GPSDestLatitude",
        0x0015: "GPSDestLongitudeRef",
        0x0016: "GPSDestLongitude",
        0x0017: "GPSDestBearingRef",
        0x0018: "GPSDestBearing",
        0x0019: "GPSDestDistanceRef",
        0x001A: "GPSDestDistance",
        0x001B: "GPSProcessingMethod",
        0x001C: "GPSAreaInformation",
        0x001D: "GPSDateStamp",
        0x001E: "GPSDifferential"
    };

    // EXIF 2.3 Spec
    var IFD1Tags = EXIF.IFD1Tags = {
        0x0100: "ImageWidth",
        0x0101: "ImageHeight",
        0x0102: "BitsPerSample",
        0x0103: "Compression",
        0x0106: "PhotometricInterpretation",
        0x0111: "StripOffsets",
        0x0112: "Orientation",
        0x0115: "SamplesPerPixel",
        0x0116: "RowsPerStrip",
        0x0117: "StripByteCounts",
        0x011A: "XResolution",
        0x011B: "YResolution",
        0x011C: "PlanarConfiguration",
        0x0128: "ResolutionUnit",
        0x0201: "JpegIFOffset",    // When image format is JPEG, this value show offset to JPEG data stored.(aka "ThumbnailOffset" or "JPEGInterchangeFormat")
        0x0202: "JpegIFByteCount", // When image format is JPEG, this value shows data size of JPEG image (aka "ThumbnailLength" or "JPEGInterchangeFormatLength")
        0x0211: "YCbCrCoefficients",
        0x0212: "YCbCrSubSampling",
        0x0213: "YCbCrPositioning",
        0x0214: "ReferenceBlackWhite"
    };

    var StringValues = EXIF.StringValues = {
        ExposureProgram: {
            0: "Not defined",
            1: "Manual",
            2: "Normal program",
            3: "Aperture priority",
            4: "Shutter priority",
            5: "Creative program",
            6: "Action program",
            7: "Portrait mode",
            8: "Landscape mode"
        },
        MeteringMode: {
            0: "Unknown",
            1: "Average",
            2: "CenterWeightedAverage",
            3: "Spot",
            4: "MultiSpot",
            5: "Pattern",
            6: "Partial",
            255: "Other"
        },
        LightSource: {
            0: "Unknown",
            1: "Daylight",
            2: "Fluorescent",
            3: "Tungsten (incandescent light)",
            4: "Flash",
            9: "Fine weather",
            10: "Cloudy weather",
            11: "Shade",
            12: "Daylight fluorescent (D 5700 - 7100K)",
            13: "Day white fluorescent (N 4600 - 5400K)",
            14: "Cool white fluorescent (W 3900 - 4500K)",
            15: "White fluorescent (WW 3200 - 3700K)",
            17: "Standard light A",
            18: "Standard light B",
            19: "Standard light C",
            20: "D55",
            21: "D65",
            22: "D75",
            23: "D50",
            24: "ISO studio tungsten",
            255: "Other"
        },
        Flash: {
            0x0000: "Flash did not fire",
            0x0001: "Flash fired",
            0x0005: "Strobe return light not detected",
            0x0007: "Strobe return light detected",
            0x0009: "Flash fired, compulsory flash mode",
            0x000D: "Flash fired, compulsory flash mode, return light not detected",
            0x000F: "Flash fired, compulsory flash mode, return light detected",
            0x0010: "Flash did not fire, compulsory flash mode",
            0x0018: "Flash did not fire, auto mode",
            0x0019: "Flash fired, auto mode",
            0x001D: "Flash fired, auto mode, return light not detected",
            0x001F: "Flash fired, auto mode, return light detected",
            0x0020: "No flash function",
            0x0041: "Flash fired, red-eye reduction mode",
            0x0045: "Flash fired, red-eye reduction mode, return light not detected",
            0x0047: "Flash fired, red-eye reduction mode, return light detected",
            0x0049: "Flash fired, compulsory flash mode, red-eye reduction mode",
            0x004D: "Flash fired, compulsory flash mode, red-eye reduction mode, return light not detected",
            0x004F: "Flash fired, compulsory flash mode, red-eye reduction mode, return light detected",
            0x0059: "Flash fired, auto mode, red-eye reduction mode",
            0x005D: "Flash fired, auto mode, return light not detected, red-eye reduction mode",
            0x005F: "Flash fired, auto mode, return light detected, red-eye reduction mode"
        },
        SensingMethod: {
            1: "Not defined",
            2: "One-chip color area sensor",
            3: "Two-chip color area sensor",
            4: "Three-chip color area sensor",
            5: "Color sequential area sensor",
            7: "Trilinear sensor",
            8: "Color sequential linear sensor"
        },
        SceneCaptureType: {
            0: "Standard",
            1: "Landscape",
            2: "Portrait",
            3: "Night scene"
        },
        SceneType: {
            1: "Directly photographed"
        },
        CustomRendered: {
            0: "Normal process",
            1: "Custom process"
        },
        WhiteBalance: {
            0: "Auto white balance",
            1: "Manual white balance"
        },
        GainControl: {
            0: "None",
            1: "Low gain up",
            2: "High gain up",
            3: "Low gain down",
            4: "High gain down"
        },
        Contrast: {
            0: "Normal",
            1: "Soft",
            2: "Hard"
        },
        Saturation: {
            0: "Normal",
            1: "Low saturation",
            2: "High saturation"
        },
        Sharpness: {
            0: "Normal",
            1: "Soft",
            2: "Hard"
        },
        SubjectDistanceRange: {
            0: "Unknown",
            1: "Macro",
            2: "Close view",
            3: "Distant view"
        },
        FileSource: {
            3: "DSC"
        },

        Components: {
            0: "",
            1: "Y",
            2: "Cb",
            3: "Cr",
            4: "R",
            5: "G",
            6: "B"
        }
    };

    function addEvent(element, event, handler) {
        if (element.addEventListener) {
            element.addEventListener(event, handler, false);
        } else if (element.attachEvent) {
            element.attachEvent("on" + event, handler);
        }
    }

    function imageHasData(img) {
        return !!(img.exifdata);
    }


    function base64ToArrayBuffer(base64, contentType) {
        contentType = contentType || base64.match(/^data\:([^\;]+)\;base64,/mi)[1] || ''; // e.g. 'data:image/jpeg;base64,...' => 'image/jpeg'
        base64 = base64.replace(/^data\:([^\;]+)\;base64,/gmi, '');
        var binary = atob(base64);
        var len = binary.length;
        var buffer = new ArrayBuffer(len);
        var view = new Uint8Array(buffer);
        for (var i = 0; i < len; i++) {
            view[i] = binary.charCodeAt(i);
        }
        return buffer;
    }

    function objectURLToBlob(url, callback) {
        var http = new XMLHttpRequest();
        http.open("GET", url, true);
        http.responseType = "blob";
        http.onload = function (e) {
            if (this.status == 200 || this.status === 0) {
                callback(this.response);
            }
        };
        http.send();
    }

    function getImageData(img, callback) {
        function handleBinaryFile(binFile) {
            var data = findEXIFinJPEG(binFile);
            img.exifdata = data || {};
            var iptcdata = findIPTCinJPEG(binFile);
            img.iptcdata = iptcdata || {};
            if (EXIF.isXmpEnabled) {
                var xmpdata = findXMPinJPEG(binFile);
                img.xmpdata = xmpdata || {};
            }
            if (callback) {
                callback.call(img);
            }
        }

        if (img.src) {
            if (/^data\:/i.test(img.src)) { // Data URI
                var arrayBuffer = base64ToArrayBuffer(img.src);
                handleBinaryFile(arrayBuffer);

            } else if (/^blob\:/i.test(img.src)) { // Object URL
                var fileReader = new FileReader();
                fileReader.onload = function (e) {
                    handleBinaryFile(e.target.result);
                };
                objectURLToBlob(img.src, function (blob) {
                    fileReader.readAsArrayBuffer(blob);
                });
            } else {
                var http = new XMLHttpRequest();
                http.onload = function () {
                    if (this.status == 200 || this.status === 0) {
                        handleBinaryFile(http.response);
                    } else {
                        throw "Could not load image";
                    }
                    http = null;
                };
                http.open("GET", img.src, true);
                http.responseType = "arraybuffer";
                http.send(null);
            }
        } else if (self.FileReader && (img instanceof self.Blob || img instanceof self.File)) {
            var fileReader = new FileReader();
            fileReader.onload = function (e) {
                if (debug) console.log("Got file of length " + e.target.result.byteLength);
                handleBinaryFile(e.target.result);
            };

            fileReader.readAsArrayBuffer(img);
        }
    }

    function findEXIFinJPEG(file) {
        var dataView = new DataView(file);

        if (debug) console.log("Got file of length " + file.byteLength);
        if ((dataView.getUint8(0) != 0xFF) || (dataView.getUint8(1) != 0xD8)) {
            if (debug) console.log("Not a valid JPEG");
            return false; // not a valid jpeg
        }

        var offset = 2,
            length = file.byteLength,
            marker;

        while (offset < length) {
            if (dataView.getUint8(offset) != 0xFF) {
                if (debug) console.log("Not a valid marker at offset " + offset + ", found: " + dataView.getUint8(offset));
                return false; // not a valid marker, something is wrong
            }

            marker = dataView.getUint8(offset + 1);
            if (debug) console.log(marker);

            // we could implement handling for other markers here,
            // but we're only looking for 0xFFE1 for EXIF data

            if (marker == 225) {
                if (debug) console.log("Found 0xFFE1 marker");

                return readEXIFData(dataView, offset + 4, dataView.getUint16(offset + 2) - 2);

                // offset += 2 + file.getShortAt(offset+2, true);

            } else {
                offset += 2 + dataView.getUint16(offset + 2);
            }

        }

    }

    function findIPTCinJPEG(file) {
        var dataView = new DataView(file);

        if (debug) console.log("Got file of length " + file.byteLength);
        if ((dataView.getUint8(0) != 0xFF) || (dataView.getUint8(1) != 0xD8)) {
            if (debug) console.log("Not a valid JPEG");
            return false; // not a valid jpeg
        }

        var offset = 2,
            length = file.byteLength;


        var isFieldSegmentStart = function (dataView, offset) {
            return (
                dataView.getUint8(offset) === 0x38 &&
                dataView.getUint8(offset + 1) === 0x42 &&
                dataView.getUint8(offset + 2) === 0x49 &&
                dataView.getUint8(offset + 3) === 0x4D &&
                dataView.getUint8(offset + 4) === 0x04 &&
                dataView.getUint8(offset + 5) === 0x04
            );
        };

        while (offset < length) {

            if (isFieldSegmentStart(dataView, offset)) {

                // Get the length of the name header (which is padded to an even number of bytes)
                var nameHeaderLength = dataView.getUint8(offset + 7);
                if (nameHeaderLength % 2 !== 0) nameHeaderLength += 1;
                // Check for pre photoshop 6 format
                if (nameHeaderLength === 0) {
                    // Always 4
                    nameHeaderLength = 4;
                }

                var startOffset = offset + 8 + nameHeaderLength;
                var sectionLength = dataView.getUint16(offset + 6 + nameHeaderLength);

                return readIPTCData(file, startOffset, sectionLength);

                break;

            }


            // Not the marker, continue searching
            offset++;

        }

    }

    var IptcFieldMap = {
        0x78: 'caption',
        0x6E: 'credit',
        0x19: 'keywords',
        0x37: 'dateCreated',
        0x50: 'byline',
        0x55: 'bylineTitle',
        0x7A: 'captionWriter',
        0x69: 'headline',
        0x74: 'copyright',
        0x0F: 'category'
    };

    function readIPTCData(file, startOffset, sectionLength) {
        var dataView = new DataView(file);
        var data = {};
        var fieldValue, fieldName, dataSize, segmentType, segmentSize;
        var segmentStartPos = startOffset;
        while (segmentStartPos < startOffset + sectionLength) {
            if (dataView.getUint8(segmentStartPos) === 0x1C && dataView.getUint8(segmentStartPos + 1) === 0x02) {
                segmentType = dataView.getUint8(segmentStartPos + 2);
                if (segmentType in IptcFieldMap) {
                    dataSize = dataView.getInt16(segmentStartPos + 3);
                    segmentSize = dataSize + 5;
                    fieldName = IptcFieldMap[segmentType];
                    fieldValue = getStringFromDB(dataView, segmentStartPos + 5, dataSize);
                    // Check if we already stored a value with this name
                    if (data.hasOwnProperty(fieldName)) {
                        // Value already stored with this name, create multivalue field
                        if (data[fieldName] instanceof Array) {
                            data[fieldName].push(fieldValue);
                        }
                        else {
                            data[fieldName] = [data[fieldName], fieldValue];
                        }
                    }
                    else {
                        data[fieldName] = fieldValue;
                    }
                }

            }
            segmentStartPos++;
        }
        return data;
    }


    function readTags(file, tiffStart, dirStart, strings, bigEnd) {
        var entries = file.getUint16(dirStart, !bigEnd),
            tags = {},
            entryOffset, tag,
            i;

        for (i = 0; i < entries; i++) {
            entryOffset = dirStart + i * 12 + 2;
            tag = strings[file.getUint16(entryOffset, !bigEnd)];
            if (!tag && debug) console.log("Unknown tag: " + file.getUint16(entryOffset, !bigEnd));
            tags[tag] = readTagValue(file, entryOffset, tiffStart, dirStart, bigEnd);
        }
        return tags;
    }


    function readTagValue(file, entryOffset, tiffStart, dirStart, bigEnd) {
        var type = file.getUint16(entryOffset + 2, !bigEnd),
            numValues = file.getUint32(entryOffset + 4, !bigEnd),
            valueOffset = file.getUint32(entryOffset + 8, !bigEnd) + tiffStart,
            offset,
            vals, val, n,
            numerator, denominator;

        switch (type) {
            case 1: // byte, 8-bit unsigned int
            case 7: // undefined, 8-bit byte, value depending on field
                if (numValues == 1) {
                    return file.getUint8(entryOffset + 8, !bigEnd);
                } else {
                    offset = numValues > 4 ? valueOffset : (entryOffset + 8);
                    vals = [];
                    for (n = 0; n < numValues; n++) {
                        vals[n] = file.getUint8(offset + n);
                    }
                    return vals;
                }

            case 2: // ascii, 8-bit byte
                offset = numValues > 4 ? valueOffset : (entryOffset + 8);
                return getStringFromDB(file, offset, numValues - 1);

            case 3: // short, 16 bit int
                if (numValues == 1) {
                    return file.getUint16(entryOffset + 8, !bigEnd);
                } else {
                    offset = numValues > 2 ? valueOffset : (entryOffset + 8);
                    vals = [];
                    for (n = 0; n < numValues; n++) {
                        vals[n] = file.getUint16(offset + 2 * n, !bigEnd);
                    }
                    return vals;
                }

            case 4: // long, 32 bit int
                if (numValues == 1) {
                    return file.getUint32(entryOffset + 8, !bigEnd);
                } else {
                    vals = [];
                    for (n = 0; n < numValues; n++) {
                        vals[n] = file.getUint32(valueOffset + 4 * n, !bigEnd);
                    }
                    return vals;
                }

            case 5:    // rational = two long values, first is numerator, second is denominator
                if (numValues == 1) {
                    numerator = file.getUint32(valueOffset, !bigEnd);
                    denominator = file.getUint32(valueOffset + 4, !bigEnd);
                    val = new Number(numerator / denominator);
                    val.numerator = numerator;
                    val.denominator = denominator;
                    return val;
                } else {
                    vals = [];
                    for (n = 0; n < numValues; n++) {
                        numerator = file.getUint32(valueOffset + 8 * n, !bigEnd);
                        denominator = file.getUint32(valueOffset + 4 + 8 * n, !bigEnd);
                        vals[n] = new Number(numerator / denominator);
                        vals[n].numerator = numerator;
                        vals[n].denominator = denominator;
                    }
                    return vals;
                }

            case 9: // slong, 32 bit signed int
                if (numValues == 1) {
                    return file.getInt32(entryOffset + 8, !bigEnd);
                } else {
                    vals = [];
                    for (n = 0; n < numValues; n++) {
                        vals[n] = file.getInt32(valueOffset + 4 * n, !bigEnd);
                    }
                    return vals;
                }

            case 10: // signed rational, two slongs, first is numerator, second is denominator
                if (numValues == 1) {
                    return file.getInt32(valueOffset, !bigEnd) / file.getInt32(valueOffset + 4, !bigEnd);
                } else {
                    vals = [];
                    for (n = 0; n < numValues; n++) {
                        vals[n] = file.getInt32(valueOffset + 8 * n, !bigEnd) / file.getInt32(valueOffset + 4 + 8 * n, !bigEnd);
                    }
                    return vals;
                }
        }
    }

    /**
     * Given an IFD (Image File Directory) start offset
     * returns an offset to next IFD or 0 if it's the last IFD.
     */
    function getNextIFDOffset(dataView, dirStart, bigEnd) {
        //the first 2bytes means the number of directory entries contains in this IFD
        var entries = dataView.getUint16(dirStart, !bigEnd);

        // After last directory entry, there is a 4bytes of data,
        // it means an offset to next IFD.
        // If its value is '0x00000000', it means this is the last IFD and there is no linked IFD.

        return dataView.getUint32(dirStart + 2 + entries * 12, !bigEnd); // each entry is 12 bytes long
    }

    function readThumbnailImage(dataView, tiffStart, firstIFDOffset, bigEnd) {
        // get the IFD1 offset
        var IFD1OffsetPointer = getNextIFDOffset(dataView, tiffStart + firstIFDOffset, bigEnd);

        if (!IFD1OffsetPointer) {
            // console.log('******** IFD1Offset is empty, image thumb not found ********');
            return {};
        }
        else if (IFD1OffsetPointer > dataView.byteLength) { // this should not happen
            // console.log('******** IFD1Offset is outside the bounds of the DataView ********');
            return {};
        }
        // console.log('*******  thumbnail IFD offset (IFD1) is: %s', IFD1OffsetPointer);

        var thumbTags = readTags(dataView, tiffStart, tiffStart + IFD1OffsetPointer, IFD1Tags, bigEnd)

        // EXIF 2.3 specification for JPEG format thumbnail

        // If the value of Compression(0x0103) Tag in IFD1 is '6', thumbnail image format is JPEG.
        // Most of Exif image uses JPEG format for thumbnail. In that case, you can get offset of thumbnail
        // by JpegIFOffset(0x0201) Tag in IFD1, size of thumbnail by JpegIFByteCount(0x0202) Tag.
        // Data format is ordinary JPEG format, starts from 0xFFD8 and ends by 0xFFD9. It seems that
        // JPEG format and 160x120pixels of size are recommended thumbnail format for Exif2.1 or later.

        if (thumbTags['Compression']) {
            // console.log('Thumbnail image found!');

            switch (thumbTags['Compression']) {
                case 6:
                    // console.log('Thumbnail image format is JPEG');
                    if (thumbTags.JpegIFOffset && thumbTags.JpegIFByteCount) {
                        // extract the thumbnail
                        var tOffset = tiffStart + thumbTags.JpegIFOffset;
                        var tLength = thumbTags.JpegIFByteCount;
                        thumbTags['blob'] = new Blob([new Uint8Array(dataView.buffer, tOffset, tLength)], {
                            type: 'image/jpeg'
                        });
                    }
                    break;

                case 1:
                    console.log("Thumbnail image format is TIFF, which is not implemented.");
                    break;
                default:
                    console.log("Unknown thumbnail image format '%s'", thumbTags['Compression']);
            }
        }
        else if (thumbTags['PhotometricInterpretation'] == 2) {
            console.log("Thumbnail image format is RGB, which is not implemented.");
        }
        return thumbTags;
    }

    function getStringFromDB(buffer, start, length) {
        var outstr = "";
        for (var n = start; n < start + length; n++) {
            outstr += String.fromCharCode(buffer.getUint8(n));
        }
        return outstr;
    }

    function readEXIFData(file, start) {
        if (getStringFromDB(file, start, 4) != "Exif") {
            if (debug) console.log("Not valid EXIF data! " + getStringFromDB(file, start, 4));
            return false;
        }

        var bigEnd,
            tags, tag,
            exifData, gpsData,
            tiffOffset = start + 6;

        // test for TIFF validity and endianness
        if (file.getUint16(tiffOffset) == 0x4949) {
            bigEnd = false;
        } else if (file.getUint16(tiffOffset) == 0x4D4D) {
            bigEnd = true;
        } else {
            if (debug) console.log("Not valid TIFF data! (no 0x4949 or 0x4D4D)");
            return false;
        }

        if (file.getUint16(tiffOffset + 2, !bigEnd) != 0x002A) {
            if (debug) console.log("Not valid TIFF data! (no 0x002A)");
            return false;
        }

        var firstIFDOffset = file.getUint32(tiffOffset + 4, !bigEnd);

        if (firstIFDOffset < 0x00000008) {
            if (debug) console.log("Not valid TIFF data! (First offset less than 8)", file.getUint32(tiffOffset + 4, !bigEnd));
            return false;
        }

        tags = readTags(file, tiffOffset, tiffOffset + firstIFDOffset, TiffTags, bigEnd);

        if (tags.ExifIFDPointer) {
            exifData = readTags(file, tiffOffset, tiffOffset + tags.ExifIFDPointer, ExifTags, bigEnd);
            for (tag in exifData) {
                switch (tag) {
                    case "LightSource" :
                    case "Flash" :
                    case "MeteringMode" :
                    case "ExposureProgram" :
                    case "SensingMethod" :
                    case "SceneCaptureType" :
                    case "SceneType" :
                    case "CustomRendered" :
                    case "WhiteBalance" :
                    case "GainControl" :
                    case "Contrast" :
                    case "Saturation" :
                    case "Sharpness" :
                    case "SubjectDistanceRange" :
                    case "FileSource" :
                        exifData[tag] = StringValues[tag][exifData[tag]];
                        break;

                    case "ExifVersion" :
                    case "FlashpixVersion" :
                        exifData[tag] = String.fromCharCode(exifData[tag][0], exifData[tag][1], exifData[tag][2], exifData[tag][3]);
                        break;

                    case "ComponentsConfiguration" :
                        exifData[tag] =
                            StringValues.Components[exifData[tag][0]] +
                            StringValues.Components[exifData[tag][1]] +
                            StringValues.Components[exifData[tag][2]] +
                            StringValues.Components[exifData[tag][3]];
                        break;
                }
                tags[tag] = exifData[tag];
            }
        }

        if (tags.GPSInfoIFDPointer) {
            gpsData = readTags(file, tiffOffset, tiffOffset + tags.GPSInfoIFDPointer, GPSTags, bigEnd);
            for (tag in gpsData) {
                switch (tag) {
                    case "GPSVersionID" :
                        gpsData[tag] = gpsData[tag][0] +
                            "." + gpsData[tag][1] +
                            "." + gpsData[tag][2] +
                            "." + gpsData[tag][3];
                        break;
                }
                tags[tag] = gpsData[tag];
            }
        }

        // extract thumbnail
        tags['thumbnail'] = readThumbnailImage(file, tiffOffset, firstIFDOffset, bigEnd);

        return tags;
    }

    function findXMPinJPEG(file) {

        if (!('DOMParser' in self)) {
            // console.warn('XML parsing not supported without DOMParser');
            return;
        }
        var dataView = new DataView(file);

        if (debug) console.log("Got file of length " + file.byteLength);
        if ((dataView.getUint8(0) != 0xFF) || (dataView.getUint8(1) != 0xD8)) {
            if (debug) console.log("Not a valid JPEG");
            return false; // not a valid jpeg
        }

        var offset = 2,
            length = file.byteLength,
            dom = new DOMParser();

        while (offset < (length - 4)) {
            if (getStringFromDB(dataView, offset, 4) == "http") {
                var startOffset = offset - 1;
                var sectionLength = dataView.getUint16(offset - 2) - 1;
                var xmpString = getStringFromDB(dataView, startOffset, sectionLength)
                var xmpEndIndex = xmpString.indexOf('xmpmeta>') + 8;
                xmpString = xmpString.substring(xmpString.indexOf('<x:xmpmeta'), xmpEndIndex);

                var indexOfXmp = xmpString.indexOf('x:xmpmeta') + 10
                //Many custom written programs embed xmp/xml without any namespace. Following are some of them.
                //Without these namespaces, XML is thought to be invalid by parsers
                xmpString = xmpString.slice(0, indexOfXmp)
                    + 'xmlns:Iptc4xmpCore="http://iptc.org/std/Iptc4xmpCore/1.0/xmlns/" '
                    + 'xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" '
                    + 'xmlns:tiff="http://ns.adobe.com/tiff/1.0/" '
                    + 'xmlns:plus="http://schemas.android.com/apk/lib/com.google.android.gms.plus" '
                    + 'xmlns:ext="http://www.gettyimages.com/xsltExtension/1.0" '
                    + 'xmlns:exif="http://ns.adobe.com/exif/1.0/" '
                    + 'xmlns:stEvt="http://ns.adobe.com/xap/1.0/sType/ResourceEvent#" '
                    + 'xmlns:stRef="http://ns.adobe.com/xap/1.0/sType/ResourceRef#" '
                    + 'xmlns:crs="http://ns.adobe.com/camera-raw-settings/1.0/" '
                    + 'xmlns:xapGImg="http://ns.adobe.com/xap/1.0/g/img/" '
                    + 'xmlns:Iptc4xmpExt="http://iptc.org/std/Iptc4xmpExt/2008-02-29/" '
                    + xmpString.slice(indexOfXmp)

                var domDocument = dom.parseFromString(xmpString, 'text/xml');
                return xml2Object(domDocument);
            } else {
                offset++;
            }
        }
    }

    function xml2json(xml) {
        var json = {};

        if (xml.nodeType == 1) { // element node
            if (xml.attributes.length > 0) {
                json['@attributes'] = {};
                for (var j = 0; j < xml.attributes.length; j++) {
                    var attribute = xml.attributes.item(j);
                    json['@attributes'][attribute.nodeName] = attribute.nodeValue;
                }
            }
        } else if (xml.nodeType == 3) { // text node
            return xml.nodeValue;
        }

        // deal with children
        if (xml.hasChildNodes()) {
            for (var i = 0; i < xml.childNodes.length; i++) {
                var child = xml.childNodes.item(i);
                var nodeName = child.nodeName;
                if (json[nodeName] == null) {
                    json[nodeName] = xml2json(child);
                } else {
                    if (json[nodeName].push == null) {
                        var old = json[nodeName];
                        json[nodeName] = [];
                        json[nodeName].push(old);
                    }
                    json[nodeName].push(xml2json(child));
                }
            }
        }

        return json;
    }

    function xml2Object(xml) {
        try {
            var obj = {};
            if (xml.children.length > 0) {
                for (var i = 0; i < xml.children.length; i++) {
                    var item = xml.children.item(i);
                    var attributes = item.attributes;
                    for (var idx in attributes) {
                        var itemAtt = attributes[idx];
                        var dataKey = itemAtt.nodeName;
                        var dataValue = itemAtt.nodeValue;

                        if (dataKey !== undefined) {
                            obj[dataKey] = dataValue;
                        }
                    }
                    var nodeName = item.nodeName;

                    if (typeof (obj[nodeName]) == "undefined") {
                        obj[nodeName] = xml2json(item);
                    } else {
                        if (typeof (obj[nodeName].push) == "undefined") {
                            var old = obj[nodeName];

                            obj[nodeName] = [];
                            obj[nodeName].push(old);
                        }
                        obj[nodeName].push(xml2json(item));
                    }
                }
            } else {
                obj = xml.textContent;
            }
            return obj;
        } catch (e) {
            console.log(e.message);
        }
    }

    EXIF.enableXmp = function () {
        EXIF.isXmpEnabled = true;
    }

    EXIF.disableXmp = function () {
        EXIF.isXmpEnabled = false;
    }

    EXIF.getData = function (img, callback) {
        if (((self.Image && img instanceof self.Image)
            || (self.HTMLImageElement && img instanceof self.HTMLImageElement))
            && !img.complete)
            return false;

        if (!imageHasData(img)) {
            getImageData(img, callback);
        } else {
            if (callback) {
                callback.call(img);
            }
        }
        return true;
    }

    EXIF.getTag = function (img, tag) {
        if (!imageHasData(img)) return;
        return img.exifdata[tag];
    }

    EXIF.getIptcTag = function (img, tag) {
        if (!imageHasData(img)) return;
        return img.iptcdata[tag];
    }

    EXIF.getAllTags = function (img) {
        if (!imageHasData(img)) return {};
        var a,
            data = img.exifdata,
            tags = {};
        for (a in data) {
            if (data.hasOwnProperty(a)) {
                tags[a] = data[a];
            }
        }
        return tags;
    }

    EXIF.getAllIptcTags = function (img) {
        if (!imageHasData(img)) return {};
        var a,
            data = img.iptcdata,
            tags = {};
        for (a in data) {
            if (data.hasOwnProperty(a)) {
                tags[a] = data[a];
            }
        }
        return tags;
    }

    EXIF.pretty = function (img) {
        if (!imageHasData(img)) return "";
        var a,
            data = img.exifdata,
            strPretty = "";
        for (a in data) {
            if (data.hasOwnProperty(a)) {
                if (typeof data[a] == "object") {
                    if (data[a] instanceof Number) {
                        strPretty += a + " : " + data[a] + " [" + data[a].numerator + "/" + data[a].denominator + "]\r\n";
                    } else {
                        strPretty += a + " : [" + data[a].length + " values]\r\n";
                    }
                } else {
                    strPretty += a + " : " + data[a] + "\r\n";
                }
            }
        }
        return strPretty;
    }

    EXIF.readFromBinaryFile = function (file) {
        return findEXIFinJPEG(file);
    }

    if (typeof define === 'function' && define.amd) {
        define('exif-js', [], function () {
            return EXIF;
        });
    }
}.call(this));

// load-image.all - https://github.com/blueimp/JavaScript-Load-Image
!function (o) {
    "use strict";

    function r(t, i, a) {
        var o, n = document.createElement("img");
        return n.onerror = function (e) {
            return r.onerror(n, e, t, i, a)
        }, n.onload = function (e) {
            return r.onload(n, e, t, i, a)
        }, "string" == typeof t ? (r.fetchBlob(t, function (e) {
            e ? o = r.createObjectURL(t = e) : (o = t, a && a.crossOrigin && (n.crossOrigin = a.crossOrigin)), n.src = o
        }, a), n) : r.isInstanceOf("Blob", t) || r.isInstanceOf("File", t) ? (o = n._objectURL = r.createObjectURL(t)) ? (n.src = o, n) : r.readFile(t, function (e) {
            var t = e.target;
            t && t.result ? n.src = t.result : i && i(e)
        }) : void 0
    }

    var t = o.createObjectURL && o || o.URL && URL.revokeObjectURL && URL || o.webkitURL && webkitURL;

    function n(e, t) {
        !e._objectURL || t && t.noRevoke || (r.revokeObjectURL(e._objectURL), delete e._objectURL)
    }

    r.fetchBlob = function (e, t, i) {
        t()
    }, r.isInstanceOf = function (e, t) {
        return Object.prototype.toString.call(t) === "[object " + e + "]"
    }, r.transform = function (e, t, i, a, o) {
        i(e, o)
    }, r.onerror = function (e, t, i, a, o) {
        n(e, o), a && a.call(e, t)
    }, r.onload = function (e, t, i, a, o) {
        n(e, o), a && r.transform(e, o, a, i, {
            originalWidth: e.naturalWidth || e.width,
            originalHeight: e.naturalHeight || e.height
        })
    }, r.createObjectURL = function (e) {
        return !!t && t.createObjectURL(e)
    }, r.revokeObjectURL = function (e) {
        return !!t && t.revokeObjectURL(e)
    }, r.readFile = function (e, t, i) {
        if (o.FileReader) {
            var a = new FileReader;
            if (a.onload = a.onerror = t, a[i = i || "readAsDataURL"]) return a[i](e), a
        }
        return !1
    }, "function" == typeof define && define.amd ? define(function () {
        return r
    }) : "object" == typeof module && module.exports ? module.exports = r : o.loadImage = r
}("undefined" != typeof window && window || this), function (e) {
    "use strict";
    "function" == typeof define && define.amd ? define(["./load-image"], e) : "object" == typeof module && module.exports ? e(require("./load-image")) : e(window.loadImage)
}(function (v) {
    "use strict";
    var n = v.transform;
    v.transform = function (e, t, i, a, o) {
        n.call(v, v.scale(e, t, o), t, i, a, o)
    }, v.transformCoordinates = function () {
    }, v.getTransformedOptions = function (e, t) {
        var i, a, o, n, r = t.aspectRatio;
        if (!r) return t;
        for (a in i = {}, t) t.hasOwnProperty(a) && (i[a] = t[a]);
        return i.crop = !0, r < (o = e.naturalWidth || e.width) / (n = e.naturalHeight || e.height) ? (i.maxWidth = n * r, i.maxHeight = n) : (i.maxWidth = o, i.maxHeight = o / r), i
    }, v.renderImageToCanvas = function (e, t, i, a, o, n, r, s, l, c) {
        return e.getContext("2d").drawImage(t, i, a, o, n, r, s, l, c), e
    }, v.hasCanvasOption = function (e) {
        return e.canvas || e.crop || !!e.aspectRatio
    }, v.scale = function (e, t, i) {
        t = t || {};
        var a, o, n, r, s, l, c, d, u, f, g, p = document.createElement("canvas"),
            h = e.getContext || v.hasCanvasOption(t) && p.getContext, m = e.naturalWidth || e.width,
            S = e.naturalHeight || e.height, b = m, y = S;

        function x() {
            var e = Math.max((n || b) / b, (r || y) / y);
            1 < e && (b *= e, y *= e)
        }

        function I() {
            var e = Math.min((a || b) / b, (o || y) / y);
            e < 1 && (b *= e, y *= e)
        }

        if (h && (c = (t = v.getTransformedOptions(e, t, i)).left || 0, d = t.top || 0, t.sourceWidth ? (s = t.sourceWidth, void 0 !== t.right && void 0 === t.left && (c = m - s - t.right)) : s = m - c - (t.right || 0), t.sourceHeight ? (l = t.sourceHeight, void 0 !== t.bottom && void 0 === t.top && (d = S - l - t.bottom)) : l = S - d - (t.bottom || 0), b = s, y = l), a = t.maxWidth, o = t.maxHeight, n = t.minWidth, r = t.minHeight, h && a && o && t.crop ? (g = s / l - (b = a) / (y = o)) < 0 ? (l = o * s / a, void 0 === t.top && void 0 === t.bottom && (d = (S - l) / 2)) : 0 < g && (s = a * l / o, void 0 === t.left && void 0 === t.right && (c = (m - s) / 2)) : ((t.contain || t.cover) && (n = a = a || n, r = o = o || r), t.cover ? (I(), x()) : (x(), I())), h) {
            if (1 < (u = t.pixelRatio) && (p.style.width = b + "px", p.style.height = y + "px", b *= u, y *= u, p.getContext("2d").scale(u, u)), 0 < (f = t.downsamplingRatio) && f < 1 && b < s && y < l) for (; b < s * f;) p.width = s * f, p.height = l * f, v.renderImageToCanvas(p, e, c, d, s, l, 0, 0, p.width, p.height), d = c = 0, s = p.width, l = p.height, (e = document.createElement("canvas")).width = s, e.height = l, v.renderImageToCanvas(e, p, 0, 0, s, l, 0, 0, s, l);
            return p.width = b, p.height = y, v.transformCoordinates(p, t), v.renderImageToCanvas(p, e, c, d, s, l, 0, 0, b, y)
        }
        return e.width = b, e.height = y, e
    }
}), function (e) {
    "use strict";
    "function" == typeof define && define.amd ? define(["./load-image"], e) : "object" == typeof module && module.exports ? e(require("./load-image")) : e(window.loadImage)
}(function (p) {
    "use strict";
    var e = "undefined" != typeof Blob && (Blob.prototype.slice || Blob.prototype.webkitSlice || Blob.prototype.mozSlice);
    p.blobSlice = e && function () {
        return (this.slice || this.webkitSlice || this.mozSlice).apply(this, arguments)
    }, p.metaDataParsers = {jpeg: {65505: [], 65517: []}}, p.parseMetaData = function (e, d, u, f) {
        f = f || {};
        var g = this, t = (u = u || {}).maxMetaDataSize || 262144;
        !!("undefined" != typeof DataView && e && 12 <= e.size && "image/jpeg" === e.type && p.blobSlice) && p.readFile(p.blobSlice.call(e, 0, t), function (e) {
            if (e.target.error) return console.log(e.target.error), void d(f);
            var t, i, a, o, n = e.target.result, r = new DataView(n), s = 2, l = r.byteLength - 4, c = s;
            if (65496 === r.getUint16(0)) {
                for (; s < l && (65504 <= (t = r.getUint16(s)) && t <= 65519 || 65534 === t);) {
                    if (s + (i = r.getUint16(s + 2) + 2) > r.byteLength) {
                        console.log("Invalid meta data: Invalid segment size.");
                        break
                    }
                    if (a = p.metaDataParsers.jpeg[t]) for (o = 0; o < a.length; o += 1) a[o].call(g, r, s, i, f, u);
                    c = s += i
                }
                !u.disableImageHead && 6 < c && (n.slice ? f.imageHead = n.slice(0, c) : f.imageHead = new Uint8Array(n).subarray(0, c))
            } else console.log("Invalid JPEG file: Missing JPEG marker.");
            d(f)
        }, "readAsArrayBuffer") || d(f)
    }, p.hasMetaOption = function (e) {
        return e && e.meta
    };
    var n = p.transform;
    p.transform = function (t, i, a, o, e) {
        p.hasMetaOption(i) ? p.parseMetaData(o, function (e) {
            n.call(p, t, i, a, o, e)
        }, i, e) : n.apply(p, arguments)
    }
}), function (e) {
    "use strict";
    "function" == typeof define && define.amd ? define(["./load-image", "./load-image-meta"], e) : "object" == typeof module && module.exports ? e(require("./load-image"), require("./load-image-meta")) : e(window.loadImage)
}(function (a) {
    "use strict";
    "undefined" != typeof fetch && "undefined" != typeof Request && (a.fetchBlob = function (e, t, i) {
        if (a.hasMetaOption(i)) return fetch(new Request(e, i)).then(function (e) {
            return e.blob()
        }).then(t).catch(function (e) {
            console.log(e), t()
        });
        t()
    })
}), function (e) {
    "use strict";
    "function" == typeof define && define.amd ? define(["./load-image", "./load-image-scale", "./load-image-meta"], e) : "object" == typeof module && module.exports ? e(require("./load-image"), require("./load-image-scale"), require("./load-image-meta")) : e(window.loadImage)
}(function (l) {
    "use strict";
    var t = l.hasCanvasOption, i = l.hasMetaOption, c = l.transformCoordinates, s = l.getTransformedOptions;
    l.hasCanvasOption = function (e) {
        return !!e.orientation || t.call(l, e)
    }, l.hasMetaOption = function (e) {
        return e && !0 === e.orientation || i.call(l, e)
    }, l.transformCoordinates = function (e, t) {
        c.call(l, e, t);
        var i = e.getContext("2d"), a = e.width, o = e.height, n = e.style.width, r = e.style.height, s = t.orientation;
        if (s && !(8 < s)) switch (4 < s && (e.width = o, e.height = a, e.style.width = r, e.style.height = n), s) {
            case 2:
                i.translate(a, 0), i.scale(-1, 1);
                break;
            case 3:
                i.translate(a, o), i.rotate(Math.PI);
                break;
            case 4:
                i.translate(0, o), i.scale(1, -1);
                break;
            case 5:
                i.rotate(.5 * Math.PI), i.scale(1, -1);
                break;
            case 6:
                i.rotate(.5 * Math.PI), i.translate(0, -o);
                break;
            case 7:
                i.rotate(.5 * Math.PI), i.translate(a, -o), i.scale(-1, 1);
                break;
            case 8:
                i.rotate(-.5 * Math.PI), i.translate(-a, 0)
        }
    }, l.getTransformedOptions = function (e, t, i) {
        var a, o, n = s.call(l, e, t), r = n.orientation;
        if (!0 === r && i && i.exif && (r = i.exif.get("Orientation")), !r || 8 < r || 1 === r) return n;
        for (o in a = {}, n) n.hasOwnProperty(o) && (a[o] = n[o]);
        switch (a.orientation = r) {
            case 2:
                a.left = n.right, a.right = n.left;
                break;
            case 3:
                a.left = n.right, a.top = n.bottom, a.right = n.left, a.bottom = n.top;
                break;
            case 4:
                a.top = n.bottom, a.bottom = n.top;
                break;
            case 5:
                a.left = n.top, a.top = n.left, a.right = n.bottom, a.bottom = n.right;
                break;
            case 6:
                a.left = n.top, a.top = n.right, a.right = n.bottom, a.bottom = n.left;
                break;
            case 7:
                a.left = n.bottom, a.top = n.right, a.right = n.top, a.bottom = n.left;
                break;
            case 8:
                a.left = n.bottom, a.top = n.left, a.right = n.top, a.bottom = n.right
        }
        return 4 < a.orientation && (a.maxWidth = n.maxHeight, a.maxHeight = n.maxWidth, a.minWidth = n.minHeight, a.minHeight = n.minWidth, a.sourceWidth = n.sourceHeight, a.sourceHeight = n.sourceWidth), a
    }
}), function (e) {
    "use strict";
    "function" == typeof define && define.amd ? define(["./load-image", "./load-image-meta"], e) : "object" == typeof module && module.exports ? e(require("./load-image"), require("./load-image-meta")) : e(window.loadImage)
}(function (g) {
    "use strict";
    g.ExifMap = function () {
        return this
    }, g.ExifMap.prototype.map = {Orientation: 274}, g.ExifMap.prototype.get = function (e) {
        return this[e] || this[this.map[e]]
    }, g.getExifThumbnail = function (e, t, i) {
        if (i && !(t + i > e.byteLength)) return g.createObjectURL(new Blob([e.buffer.slice(t, t + i)]));
        console.log("Invalid Exif data: Invalid thumbnail data.")
    }, g.exifTagTypes = {
        1: {
            getValue: function (e, t) {
                return e.getUint8(t)
            }, size: 1
        }, 2: {
            getValue: function (e, t) {
                return String.fromCharCode(e.getUint8(t))
            }, size: 1, ascii: !0
        }, 3: {
            getValue: function (e, t, i) {
                return e.getUint16(t, i)
            }, size: 2
        }, 4: {
            getValue: function (e, t, i) {
                return e.getUint32(t, i)
            }, size: 4
        }, 5: {
            getValue: function (e, t, i) {
                return e.getUint32(t, i) / e.getUint32(t + 4, i)
            }, size: 8
        }, 9: {
            getValue: function (e, t, i) {
                return e.getInt32(t, i)
            }, size: 4
        }, 10: {
            getValue: function (e, t, i) {
                return e.getInt32(t, i) / e.getInt32(t + 4, i)
            }, size: 8
        }
    }, g.exifTagTypes[7] = g.exifTagTypes[1], g.getExifValue = function (e, t, i, a, o, n) {
        var r, s, l, c, d, u, f = g.exifTagTypes[a];
        if (f) {
            if (!((s = 4 < (r = f.size * o) ? t + e.getUint32(i + 8, n) : i + 8) + r > e.byteLength)) {
                if (1 === o) return f.getValue(e, s, n);
                for (l = [], c = 0; c < o; c += 1) l[c] = f.getValue(e, s + c * f.size, n);
                if (f.ascii) {
                    for (d = "", c = 0; c < l.length && "\0" !== (u = l[c]); c += 1) d += u;
                    return d
                }
                return l
            }
            console.log("Invalid Exif data: Invalid data offset.")
        } else console.log("Invalid Exif data: Invalid tag type.")
    }, g.parseExifTag = function (e, t, i, a, o) {
        var n = e.getUint16(i, a);
        o.exif[n] = g.getExifValue(e, t, i, e.getUint16(i + 2, a), e.getUint32(i + 4, a), a)
    }, g.parseExifTags = function (e, t, i, a, o) {
        var n, r, s;
        if (i + 6 > e.byteLength) console.log("Invalid Exif data: Invalid directory offset."); else {
            if (!((r = i + 2 + 12 * (n = e.getUint16(i, a))) + 4 > e.byteLength)) {
                for (s = 0; s < n; s += 1) this.parseExifTag(e, t, i + 2 + 12 * s, a, o);
                return e.getUint32(r, a)
            }
            console.log("Invalid Exif data: Invalid directory size.")
        }
    }, g.parseExifData = function (e, t, i, a, o) {
        if (!o.disableExif) {
            var n, r, s, l = t + 10;
            if (1165519206 === e.getUint32(t + 4)) if (l + 8 > e.byteLength) console.log("Invalid Exif data: Invalid segment size."); else if (0 === e.getUint16(t + 8)) {
                switch (e.getUint16(l)) {
                    case 18761:
                        n = !0;
                        break;
                    case 19789:
                        n = !1;
                        break;
                    default:
                        return void console.log("Invalid Exif data: Invalid byte alignment marker.")
                }
                42 === e.getUint16(l + 2, n) ? (r = e.getUint32(l + 4, n), a.exif = new g.ExifMap, (r = g.parseExifTags(e, l, l + r, n, a)) && !o.disableExifThumbnail && (s = {exif: {}}, r = g.parseExifTags(e, l, l + r, n, s), s.exif[513] && (a.exif.Thumbnail = g.getExifThumbnail(e, l + s.exif[513], s.exif[514]))), a.exif[34665] && !o.disableExifSub && g.parseExifTags(e, l, l + a.exif[34665], n, a), a.exif[34853] && !o.disableExifGps && g.parseExifTags(e, l, l + a.exif[34853], n, a)) : console.log("Invalid Exif data: Missing TIFF marker.")
            } else console.log("Invalid Exif data: Missing byte alignment offset.")
        }
    }, g.metaDataParsers.jpeg[65505].push(g.parseExifData)
}), function (e) {
    "use strict";
    "function" == typeof define && define.amd ? define(["./load-image", "./load-image-exif"], e) : "object" == typeof module && module.exports ? e(require("./load-image"), require("./load-image-exif")) : e(window.loadImage)
}(function (e) {
    "use strict";
    e.ExifMap.prototype.tags = {
        256: "ImageWidth",
        257: "ImageHeight",
        34665: "ExifIFDPointer",
        34853: "GPSInfoIFDPointer",
        40965: "InteroperabilityIFDPointer",
        258: "BitsPerSample",
        259: "Compression",
        262: "PhotometricInterpretation",
        274: "Orientation",
        277: "SamplesPerPixel",
        284: "PlanarConfiguration",
        530: "YCbCrSubSampling",
        531: "YCbCrPositioning",
        282: "XResolution",
        283: "YResolution",
        296: "ResolutionUnit",
        273: "StripOffsets",
        278: "RowsPerStrip",
        279: "StripByteCounts",
        513: "JPEGInterchangeFormat",
        514: "JPEGInterchangeFormatLength",
        301: "TransferFunction",
        318: "WhitePoint",
        319: "PrimaryChromaticities",
        529: "YCbCrCoefficients",
        532: "ReferenceBlackWhite",
        306: "DateTime",
        270: "ImageDescription",
        271: "Make",
        272: "Model",
        305: "Software",
        315: "Artist",
        33432: "Copyright",
        36864: "ExifVersion",
        40960: "FlashpixVersion",
        40961: "ColorSpace",
        40962: "PixelXDimension",
        40963: "PixelYDimension",
        42240: "Gamma",
        37121: "ComponentsConfiguration",
        37122: "CompressedBitsPerPixel",
        37500: "MakerNote",
        37510: "UserComment",
        40964: "RelatedSoundFile",
        36867: "DateTimeOriginal",
        36868: "DateTimeDigitized",
        37520: "SubSecTime",
        37521: "SubSecTimeOriginal",
        37522: "SubSecTimeDigitized",
        33434: "ExposureTime",
        33437: "FNumber",
        34850: "ExposureProgram",
        34852: "SpectralSensitivity",
        34855: "PhotographicSensitivity",
        34856: "OECF",
        34864: "SensitivityType",
        34865: "StandardOutputSensitivity",
        34866: "RecommendedExposureIndex",
        34867: "ISOSpeed",
        34868: "ISOSpeedLatitudeyyy",
        34869: "ISOSpeedLatitudezzz",
        37377: "ShutterSpeedValue",
        37378: "ApertureValue",
        37379: "BrightnessValue",
        37380: "ExposureBias",
        37381: "MaxApertureValue",
        37382: "SubjectDistance",
        37383: "MeteringMode",
        37384: "LightSource",
        37385: "Flash",
        37396: "SubjectArea",
        37386: "FocalLength",
        41483: "FlashEnergy",
        41484: "SpatialFrequencyResponse",
        41486: "FocalPlaneXResolution",
        41487: "FocalPlaneYResolution",
        41488: "FocalPlaneResolutionUnit",
        41492: "SubjectLocation",
        41493: "ExposureIndex",
        41495: "SensingMethod",
        41728: "FileSource",
        41729: "SceneType",
        41730: "CFAPattern",
        41985: "CustomRendered",
        41986: "ExposureMode",
        41987: "WhiteBalance",
        41988: "DigitalZoomRatio",
        41989: "FocalLengthIn35mmFilm",
        41990: "SceneCaptureType",
        41991: "GainControl",
        41992: "Contrast",
        41993: "Saturation",
        41994: "Sharpness",
        41995: "DeviceSettingDescription",
        41996: "SubjectDistanceRange",
        42016: "ImageUniqueID",
        42032: "CameraOwnerName",
        42033: "BodySerialNumber",
        42034: "LensSpecification",
        42035: "LensMake",
        42036: "LensModel",
        42037: "LensSerialNumber",
        0: "GPSVersionID",
        1: "GPSLatitudeRef",
        2: "GPSLatitude",
        3: "GPSLongitudeRef",
        4: "GPSLongitude",
        5: "GPSAltitudeRef",
        6: "GPSAltitude",
        7: "GPSTimeStamp",
        8: "GPSSatellites",
        9: "GPSStatus",
        10: "GPSMeasureMode",
        11: "GPSDOP",
        12: "GPSSpeedRef",
        13: "GPSSpeed",
        14: "GPSTrackRef",
        15: "GPSTrack",
        16: "GPSImgDirectionRef",
        17: "GPSImgDirection",
        18: "GPSMapDatum",
        19: "GPSDestLatitudeRef",
        20: "GPSDestLatitude",
        21: "GPSDestLongitudeRef",
        22: "GPSDestLongitude",
        23: "GPSDestBearingRef",
        24: "GPSDestBearing",
        25: "GPSDestDistanceRef",
        26: "GPSDestDistance",
        27: "GPSProcessingMethod",
        28: "GPSAreaInformation",
        29: "GPSDateStamp",
        30: "GPSDifferential",
        31: "GPSHPositioningError"
    }, e.ExifMap.prototype.stringValues = {
        ExposureProgram: {
            0: "Undefined",
            1: "Manual",
            2: "Normal program",
            3: "Aperture priority",
            4: "Shutter priority",
            5: "Creative program",
            6: "Action program",
            7: "Portrait mode",
            8: "Landscape mode"
        },
        MeteringMode: {
            0: "Unknown",
            1: "Average",
            2: "CenterWeightedAverage",
            3: "Spot",
            4: "MultiSpot",
            5: "Pattern",
            6: "Partial",
            255: "Other"
        },
        LightSource: {
            0: "Unknown",
            1: "Daylight",
            2: "Fluorescent",
            3: "Tungsten (incandescent light)",
            4: "Flash",
            9: "Fine weather",
            10: "Cloudy weather",
            11: "Shade",
            12: "Daylight fluorescent (D 5700 - 7100K)",
            13: "Day white fluorescent (N 4600 - 5400K)",
            14: "Cool white fluorescent (W 3900 - 4500K)",
            15: "White fluorescent (WW 3200 - 3700K)",
            17: "Standard light A",
            18: "Standard light B",
            19: "Standard light C",
            20: "D55",
            21: "D65",
            22: "D75",
            23: "D50",
            24: "ISO studio tungsten",
            255: "Other"
        },
        Flash: {
            0: "Flash did not fire",
            1: "Flash fired",
            5: "Strobe return light not detected",
            7: "Strobe return light detected",
            9: "Flash fired, compulsory flash mode",
            13: "Flash fired, compulsory flash mode, return light not detected",
            15: "Flash fired, compulsory flash mode, return light detected",
            16: "Flash did not fire, compulsory flash mode",
            24: "Flash did not fire, auto mode",
            25: "Flash fired, auto mode",
            29: "Flash fired, auto mode, return light not detected",
            31: "Flash fired, auto mode, return light detected",
            32: "No flash function",
            65: "Flash fired, red-eye reduction mode",
            69: "Flash fired, red-eye reduction mode, return light not detected",
            71: "Flash fired, red-eye reduction mode, return light detected",
            73: "Flash fired, compulsory flash mode, red-eye reduction mode",
            77: "Flash fired, compulsory flash mode, red-eye reduction mode, return light not detected",
            79: "Flash fired, compulsory flash mode, red-eye reduction mode, return light detected",
            89: "Flash fired, auto mode, red-eye reduction mode",
            93: "Flash fired, auto mode, return light not detected, red-eye reduction mode",
            95: "Flash fired, auto mode, return light detected, red-eye reduction mode"
        },
        SensingMethod: {
            1: "Undefined",
            2: "One-chip color area sensor",
            3: "Two-chip color area sensor",
            4: "Three-chip color area sensor",
            5: "Color sequential area sensor",
            7: "Trilinear sensor",
            8: "Color sequential linear sensor"
        },
        SceneCaptureType: {0: "Standard", 1: "Landscape", 2: "Portrait", 3: "Night scene"},
        SceneType: {1: "Directly photographed"},
        CustomRendered: {0: "Normal process", 1: "Custom process"},
        WhiteBalance: {0: "Auto white balance", 1: "Manual white balance"},
        GainControl: {0: "None", 1: "Low gain up", 2: "High gain up", 3: "Low gain down", 4: "High gain down"},
        Contrast: {0: "Normal", 1: "Soft", 2: "Hard"},
        Saturation: {0: "Normal", 1: "Low saturation", 2: "High saturation"},
        Sharpness: {0: "Normal", 1: "Soft", 2: "Hard"},
        SubjectDistanceRange: {0: "Unknown", 1: "Macro", 2: "Close view", 3: "Distant view"},
        FileSource: {3: "DSC"},
        ComponentsConfiguration: {0: "", 1: "Y", 2: "Cb", 3: "Cr", 4: "R", 5: "G", 6: "B"},
        Orientation: {
            1: "top-left",
            2: "top-right",
            3: "bottom-right",
            4: "bottom-left",
            5: "left-top",
            6: "right-top",
            7: "right-bottom",
            8: "left-bottom"
        }
    }, e.ExifMap.prototype.getText = function (e) {
        var t = this.get(e);
        switch (e) {
            case"LightSource":
            case"Flash":
            case"MeteringMode":
            case"ExposureProgram":
            case"SensingMethod":
            case"SceneCaptureType":
            case"SceneType":
            case"CustomRendered":
            case"WhiteBalance":
            case"GainControl":
            case"Contrast":
            case"Saturation":
            case"Sharpness":
            case"SubjectDistanceRange":
            case"FileSource":
            case"Orientation":
                return this.stringValues[e][t];
            case"ExifVersion":
            case"FlashpixVersion":
                if (!t) return;
                return String.fromCharCode(t[0], t[1], t[2], t[3]);
            case"ComponentsConfiguration":
                if (!t) return;
                return this.stringValues[e][t[0]] + this.stringValues[e][t[1]] + this.stringValues[e][t[2]] + this.stringValues[e][t[3]];
            case"GPSVersionID":
                if (!t) return;
                return t[0] + "." + t[1] + "." + t[2] + "." + t[3]
        }
        return String(t)
    }, function (e) {
        var t, i = e.tags, a = e.map;
        for (t in i) i.hasOwnProperty(t) && (a[i[t]] = t)
    }(e.ExifMap.prototype), e.ExifMap.prototype.getAll = function () {
        var e, t, i = {};
        for (e in this) this.hasOwnProperty(e) && (t = this.tags[e]) && (i[t] = this.getText(t));
        return i
    }
}), function (e) {
    "use strict";
    "function" == typeof define && define.amd ? define(["./load-image", "./load-image-meta"], e) : "object" == typeof module && module.exports ? e(require("./load-image"), require("./load-image-meta")) : e(window.loadImage)
}(function (u) {
    "use strict";
    u.IptcMap = function () {
        return this
    }, u.IptcMap.prototype.map = {ObjectName: 5}, u.IptcMap.prototype.get = function (e) {
        return this[e] || this[this.map[e]]
    }, u.parseIptcTags = function (e, t, i, a) {
        function o(e, t, i) {
            for (var a = "", o = t; o < t + i; o++) a += String.fromCharCode(e.getUint8(o));
            return a
        }

        for (var n, r, s, l = t; l < t + i;) 28 === e.getUint8(l) && 2 === e.getUint8(l + 1) && (s = e.getUint8(l + 2)) in a.iptc.tags && (r = e.getInt16(l + 3), n = o(e, l + 5, r), a.iptc.hasOwnProperty(s) ? a.iptc[s] instanceof Array ? a.iptc[s].push(n) : a.iptc[s] = [a.iptc[s], n] : a.iptc[s] = n), l++
    }, u.parseIptcData = function (e, t, i, a, o) {
        if (!o.disableIptc) {
            for (var n, r, s = t + i; t + 8 < s;) {
                if (r = t, 943868237 === (n = e).getUint32(r) && 1028 === n.getUint16(r + 4)) {
                    var l = e.getUint8(t + 7);
                    l % 2 != 0 && (l += 1), 0 === l && (l = 4);
                    var c = t + 8 + l;
                    if (s < c) {
                        console.log("Invalid IPTC data: Invalid segment offset.");
                        break
                    }
                    var d = e.getUint16(t + 6 + l);
                    if (s < t + d) {
                        console.log("Invalid IPTC data: Invalid segment size.");
                        break
                    }
                    return a.iptc = new u.IptcMap, u.parseIptcTags(e, c, d, a)
                }
                t++
            }
            console.log("No IPTC data at this offset - could be XMP")
        }
    }, u.metaDataParsers.jpeg[65517].push(u.parseIptcData)
}), function (e) {
    "use strict";
    "function" == typeof define && define.amd ? define(["./load-image", "./load-image-iptc"], e) : "object" == typeof module && module.exports ? e(require("./load-image"), require("./load-image-iptc")) : e(window.loadImage)
}(function (e) {
    "use strict";
    e.IptcMap.prototype.tags = {
        3: "ObjectType",
        4: "ObjectAttribute",
        5: "ObjectName",
        7: "EditStatus",
        8: "EditorialUpdate",
        10: "Urgency",
        12: "SubjectRef",
        15: "Category",
        20: "SupplCategory",
        22: "FixtureID",
        25: "Keywords",
        26: "ContentLocCode",
        27: "ContentLocName",
        30: "ReleaseDate",
        35: "ReleaseTime",
        37: "ExpirationDate",
        38: "ExpirationTime",
        40: "SpecialInstructions",
        42: "ActionAdvised",
        45: "RefService",
        47: "RefDate",
        50: "RefNumber",
        55: "DateCreated",
        60: "TimeCreated",
        62: "DigitalCreationDate",
        63: "DigitalCreationTime",
        65: "OriginatingProgram",
        70: "ProgramVersion",
        75: "ObjectCycle",
        80: "Byline",
        85: "BylineTitle",
        90: "City",
        92: "Sublocation",
        95: "State",
        100: "CountryCode",
        101: "CountryName",
        103: "OrigTransRef",
        105: "Headline",
        110: "Credit",
        115: "Source",
        116: "CopyrightNotice",
        118: "Contact",
        120: "Caption",
        122: "WriterEditor",
        130: "ImageType",
        131: "ImageOrientation",
        135: "LanguageID"
    }, e.IptcMap.prototype.getText = function (e) {
        var t = this.get(e);
        return String(t)
    }, function (e) {
        var t, i = e.tags, a = e.map || {};
        for (t in i) i.hasOwnProperty(t) && (a[i[t]] = t)
    }(e.IptcMap.prototype), e.IptcMap.prototype.getAll = function () {
        var e, t, i = {};
        for (e in this) this.hasOwnProperty(e) && (t = this.tags[e]) && (i[t] = this.getText(t));
        return i
    }
});
//# sourceMappingURL=load-image.all.min.js.map