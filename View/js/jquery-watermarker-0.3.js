/**
 * jquery-watermarker v0.3
 * jQuery Image watermark positioning Plugin
 * @author Francois Mazerolle <fmaz008@gmail.com>
 *
 * Partially based on:
 * jquery.Jcrop.js v0.9.8
 * jQuery Image Cropping Plugin
 * @author Kelly Hallman <khallman@gmail.com>
 * Copyright (c) 2008-2009 Kelly Hallman - released under MIT License {{{
 *
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without
 * restriction, including without limitation the rights to use,
 * copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following
 * conditions:

 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.

 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 * OTHER DEALINGS IN THE SOFTWARE.

 * }}}
 */


(function ($) {

    $.Watermarker = function (obj, opt) {

        //__CONSTRUCT(obj, opt) {

        var obj = obj,
            opt = opt;

        if (typeof (obj) !== 'object') obj = $(obj)[0];
        if (typeof (opt) !== 'object') opt = {};

        //DГ©finir les options par dГ©faut
        var defaults = {

            // Styling Options

            watermark_img: 'watermark.png',
            opacity: 1.0,
            opacitySlider: null,

            x: null, //CentrГ© par dГ©faut
            y: null, //CentrГ© par dГ©faut
            w: null, //100% par dГ©faut
            h: null, //100% par dГ©faut

            position: null, //CentrГ© par dГ©faut

            // Callbacks / Event Handlers
            onChange: function () {},
            onSelect: function () {}

        };
        var options = defaults;

        //DГ©finir les options personnalisГ©s. (Г‰craser les options par dГ©faut au besoin)
        setOptions(opt);


        // ### CrГ©er les Г©lГ©ments DOM supplГ©mentaire ###
        var $origimg = $(obj);

        //CrГ©er un conteneur
        var $container = $('<div />')
            .width($origimg.width())
            .height($origimg.height())
            .css({
                position: 'relative'
            })
            .insertAfter($origimg);

        //Placer l'image originale dans le conteneur
        $container.append($origimg);

        var $wcontainer = 
            $('<div />')
            /*.resizable({
                resize: function (event, ui) {
                    setSubElemSameSizeAsContainer();updateData();
                },
                containment: 'parent'
            })*/
            .draggable({
                drag: function (event, ui) {
                    updateData();
                },
                containment: 'parent'
            })
            .css({
                position: 'absolute'
            })
            .insertAfter($origimg);

        //CrГ©er une zone div sous l'image pour le style (contour, etc.)
        var $styleContainer = $('<div />')
            .addClass('watermark')
            .css({
                position: 'absolute',
                'z-index': 1
            })
        $wcontainer.append($styleContainer);


        //CrГ©er l'image watermark
        var $waterimg = $('<img />')
            .attr('src', options.watermark_img)
            .addClass('watermark')
            .css({
                position: 'absolute',
                'z-index': 2
            })
            .load(function () {
                watermarkLoaded();
            });
        $wcontainer.append($waterimg);


        //CrГ©er le slider d'opacitГ©
        if (options.opacitySlider !== null) {
            options.opacitySlider.slider({
                min: 0,
                max: 100,
                value: options.opacity * 100,
                slide: function (event, ui) {
                    options.opacity = ui.value / 100;
                    $wcontainer.css({
                        opacity: options.opacity,
                        filter: 'alpha(opacity=' + (options.opacity * 100) + ')'
                    });
                    updateData();
                }
            });
        }

        function watermarkLoaded() {
            //### DГ©finir la position initiale du watermark

            //Trouver les coordonnГ©es afin de center le watermark
            var middleX = Math.round($origimg.width() / 2 - $waterimg.width() / 2);
            var middleY = Math.round($origimg.height() / 2 - $waterimg.height() / 2);
            var bottomY = $origimg.height() - $waterimg.height();
            var rightX = $origimg.width() - $waterimg.width();

            //DГ©terminer quelle position par dГ©faut utiliser pour le watermark.
            var posX, posY;

            if (options.x != null && options.y != null) {
                //La position prГ©cise est dГ©terminГ©e
                posX = options.x;
                posY = options.y;
            } else if (options.position != null) {
                //Une position spГ©cifique est demandГ©
                switch (options.position) {
                    case 'topleft':
                        posX = 0;
                        posY = 0;
                        break;
                    case 'topcenter':
                        posX = middleX;
                        posY = 0;
                        break;
                    case 'topright':
                        posX = rightX;
                        posY = 0;
                        break;
                    case 'centerleft':
                        posX = 0;
                        posY = middleY;
                        break;
                    case 'centercenter':
                    case 'center':
                    default:
                        posX = middleX;
                        posY = middleY;
                        break;
                    case 'centerright':
                        posX = rightX;
                        posY = middleY;
                        break;
                    case 'bottomleft':
                        posX = 0;
                        posY = bottomY;
                        break;
                    case 'bottomcenter':
                        posX = middleX;
                        posY = bottomY;
                        break;
                    case 'bottomright':
                        posX = rightX;
                        posY = bottomY;
                        break;
                }
            } else {
                //Rien est demandГ©: center.
                posX = middleX;
                posY = middleY;
            }

            //Positionner le watermark
            $wcontainer.css({
                top: posY + 'px',
                left: posX + 'px'
            });

            //Dimentionner le watermark
            //                  Si non-dГ©fini      taille de l'img     taille dГ©fini
            $wcontainer.width(options.w == null ? $waterimg.width() : options.w);
            $wcontainer.height(options.h == null ? $waterimg.height() : options.h);


            setSubElemSameSizeAsContainer();

            //DГ©finir la transparence
            $wcontainer.css({
                opacity: options.opacity,
                filter: 'alpha(opacity=' + (options.opacity * 100) + ')'
            });

            //Mettre Г  jour la position initiale
            updateData();

        }


        // } __CONSTRUCT










        function setOptions(opt) {
            if (typeof (opt) != 'object') opt = {};
            options = $.extend(options, opt);

            if (typeof (options.onChange) !== 'function')
                options.onChange = function () {};

            if (typeof (options.onSelect) !== 'function')
                options.onSelect = function () {};

        };


        function setSubElemSameSizeAsContainer() {
            $waterimg.width($wcontainer.width());
            $waterimg.height($wcontainer.height());

            //Trouver la taille des bordures de div.watermark
            var bL = removePx($styleContainer.css('borderLeftWidth'));
            var bR = removePx($styleContainer.css('borderRightWidth'));
            var bT = removePx($styleContainer.css('borderTopWidth'));
            var bB = removePx($styleContainer.css('borderBottomWidth'));

            $styleContainer.width($wcontainer.width() - bL - bR);
            $styleContainer.height($wcontainer.height() - bT - bB);
        }

        function removePx(str) {
            return parseInt(str.replace('px', ''));
        }

        function updateData() {
            var WatermarkPos = getPos($waterimg);
            var ContainerPos = getPos($container);
            options.onChange({
                x: WatermarkPos[0] - ContainerPos[0],
                y: WatermarkPos[1] - ContainerPos[1],
                w: $waterimg.width(),
                h: $waterimg.height(),
                opacity: options.opacity
            });
        }

        function getPos(obj) {
            // Updated in v0.9.4 to use built-in dimensions plugin
            var pos = $(obj).offset();
            return [pos.left, pos.top];
        };
    };





    $.fn.Watermarker = function (options) /*{{{*/ {
        function attachWhenDone(from) /*{{{*/ {
            var loadsrc = options.useImg || from.src;
            var img = new Image();
            img.onload = function () {
                $.Watermarker(from, options);
            };
            img.src = loadsrc;
        };
        /*}}}*/
        if (typeof (options) !== 'object') options = {};

        // Iterate over each object, attach Jcrop
        this.each(function () {
            // If we've already attached to this object
            if ($(this).data('Watermarker')) {
                // The API can be requested this way (undocumented)
                if (options == 'api') return $(this).data('Watermarker');
                // Otherwise, we just reset the options...
                else $(this).data('Watermarker').setOptions(options);
            }
            // If we haven't been attached, preload and attach
            else attachWhenDone(this);
        });

        // Return "this" so we're chainable a la jQuery plugin-style!
        return this;
    };


})(jQuery);