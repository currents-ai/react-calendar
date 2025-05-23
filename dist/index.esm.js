import { jsx, jsxs, Fragment } from 'react/jsx-runtime';
import * as React from 'react';
import React__default, { useMemo, useState, useRef, useId, createContext, useContext, useEffect, useCallback, useLayoutEffect } from 'react';
import { RiCalendarEventLine, RiCalendarLine, RiDeleteBinLine, RiCalendarCheckLine } from '@remixicon/react';
import { isSameDay, differenceInMinutes, isPast, format, getMinutes, addDays, isToday, addMinutes, differenceInDays, startOfWeek, endOfWeek, isWithinInterval, startOfDay, eachHourOfInterval, addHours, getHours, areIntervalsOverlapping, addMonths, addWeeks, addYears, differenceInCalendarDays, differenceInCalendarMonths, eachMonthOfInterval, endOfISOWeek, endOfMonth, endOfYear, getISOWeek, getMonth, getYear, getWeek, isAfter, isBefore, isDate, isSameMonth, isSameYear, max, min, setMonth, setYear, startOfISOWeek, startOfMonth, startOfYear, eachDayOfInterval, subMonths, subWeeks } from 'date-fns';
import { useSensors, useSensor, MouseSensor, TouchSensor, PointerSensor, DndContext, DragOverlay, useDraggable, useDroppable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import { Slot } from '@radix-ui/react-slot';
import { ChevronLeftIcon, ChevronRightIcon, XIcon, ChevronDownIcon, CheckIcon, ChevronUpIcon, PlusIcon } from 'lucide-react';
import { enUS } from 'date-fns/locale/en-US';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import * as LabelPrimitive from '@radix-ui/react-label';
import * as PopoverPrimitive from '@radix-ui/react-popover';
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';
import * as SelectPrimitive from '@radix-ui/react-select';
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';

var EventHeight = 24;
// Vertical gap between events in pixels - controls spacing in month view
var EventGap = 4;
// Height of hour cells in week and day views - controls the scale of time display
var WeekCellsHeight = 72;
// Number of days to show in the agenda view
var AgendaDaysToShow = 30;
// Start and end hours for the week and day views
var StartHour = 0;
var EndHour = 24;
// Default start and end times
var DefaultStartHour = 9; // 9 AM
var DefaultEndHour = 10; // 10 AM

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise, SuppressedError, Symbol, Iterator */


var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
}

function __spreadArray(to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
}

typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
    var e = new Error(message);
    return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};

function r$1(e){var t,f,n="";if("string"==typeof e||"number"==typeof e)n+=e;else if("object"==typeof e)if(Array.isArray(e)){var o=e.length;for(t=0;t<o;t++)e[t]&&(f=r$1(e[t]))&&(n&&(n+=" "),n+=f);}else for(f in e)e[f]&&(n&&(n+=" "),n+=f);return n}function clsx$1(){for(var e,t,f=0,n="",o=arguments.length;f<o;f++)(e=arguments[f])&&(t=r$1(e))&&(n&&(n+=" "),n+=t);return n}

const CLASS_PART_SEPARATOR = '-';
const createClassGroupUtils = config => {
  const classMap = createClassMap(config);
  const {
    conflictingClassGroups,
    conflictingClassGroupModifiers
  } = config;
  const getClassGroupId = className => {
    const classParts = className.split(CLASS_PART_SEPARATOR);
    // Classes like `-inset-1` produce an empty string as first classPart. We assume that classes for negative values are used correctly and remove it from classParts.
    if (classParts[0] === '' && classParts.length !== 1) {
      classParts.shift();
    }
    return getGroupRecursive(classParts, classMap) || getGroupIdForArbitraryProperty(className);
  };
  const getConflictingClassGroupIds = (classGroupId, hasPostfixModifier) => {
    const conflicts = conflictingClassGroups[classGroupId] || [];
    if (hasPostfixModifier && conflictingClassGroupModifiers[classGroupId]) {
      return [...conflicts, ...conflictingClassGroupModifiers[classGroupId]];
    }
    return conflicts;
  };
  return {
    getClassGroupId,
    getConflictingClassGroupIds
  };
};
const getGroupRecursive = (classParts, classPartObject) => {
  if (classParts.length === 0) {
    return classPartObject.classGroupId;
  }
  const currentClassPart = classParts[0];
  const nextClassPartObject = classPartObject.nextPart.get(currentClassPart);
  const classGroupFromNextClassPart = nextClassPartObject ? getGroupRecursive(classParts.slice(1), nextClassPartObject) : undefined;
  if (classGroupFromNextClassPart) {
    return classGroupFromNextClassPart;
  }
  if (classPartObject.validators.length === 0) {
    return undefined;
  }
  const classRest = classParts.join(CLASS_PART_SEPARATOR);
  return classPartObject.validators.find(({
    validator
  }) => validator(classRest))?.classGroupId;
};
const arbitraryPropertyRegex = /^\[(.+)\]$/;
const getGroupIdForArbitraryProperty = className => {
  if (arbitraryPropertyRegex.test(className)) {
    const arbitraryPropertyClassName = arbitraryPropertyRegex.exec(className)[1];
    const property = arbitraryPropertyClassName?.substring(0, arbitraryPropertyClassName.indexOf(':'));
    if (property) {
      // I use two dots here because one dot is used as prefix for class groups in plugins
      return 'arbitrary..' + property;
    }
  }
};
/**
 * Exported for testing only
 */
const createClassMap = config => {
  const {
    theme,
    prefix
  } = config;
  const classMap = {
    nextPart: new Map(),
    validators: []
  };
  const prefixedClassGroupEntries = getPrefixedClassGroupEntries(Object.entries(config.classGroups), prefix);
  prefixedClassGroupEntries.forEach(([classGroupId, classGroup]) => {
    processClassesRecursively(classGroup, classMap, classGroupId, theme);
  });
  return classMap;
};
const processClassesRecursively = (classGroup, classPartObject, classGroupId, theme) => {
  classGroup.forEach(classDefinition => {
    if (typeof classDefinition === 'string') {
      const classPartObjectToEdit = classDefinition === '' ? classPartObject : getPart(classPartObject, classDefinition);
      classPartObjectToEdit.classGroupId = classGroupId;
      return;
    }
    if (typeof classDefinition === 'function') {
      if (isThemeGetter(classDefinition)) {
        processClassesRecursively(classDefinition(theme), classPartObject, classGroupId, theme);
        return;
      }
      classPartObject.validators.push({
        validator: classDefinition,
        classGroupId
      });
      return;
    }
    Object.entries(classDefinition).forEach(([key, classGroup]) => {
      processClassesRecursively(classGroup, getPart(classPartObject, key), classGroupId, theme);
    });
  });
};
const getPart = (classPartObject, path) => {
  let currentClassPartObject = classPartObject;
  path.split(CLASS_PART_SEPARATOR).forEach(pathPart => {
    if (!currentClassPartObject.nextPart.has(pathPart)) {
      currentClassPartObject.nextPart.set(pathPart, {
        nextPart: new Map(),
        validators: []
      });
    }
    currentClassPartObject = currentClassPartObject.nextPart.get(pathPart);
  });
  return currentClassPartObject;
};
const isThemeGetter = func => func.isThemeGetter;
const getPrefixedClassGroupEntries = (classGroupEntries, prefix) => {
  if (!prefix) {
    return classGroupEntries;
  }
  return classGroupEntries.map(([classGroupId, classGroup]) => {
    const prefixedClassGroup = classGroup.map(classDefinition => {
      if (typeof classDefinition === 'string') {
        return prefix + classDefinition;
      }
      if (typeof classDefinition === 'object') {
        return Object.fromEntries(Object.entries(classDefinition).map(([key, value]) => [prefix + key, value]));
      }
      return classDefinition;
    });
    return [classGroupId, prefixedClassGroup];
  });
};

// LRU cache inspired from hashlru (https://github.com/dominictarr/hashlru/blob/v1.0.4/index.js) but object replaced with Map to improve performance
const createLruCache = maxCacheSize => {
  if (maxCacheSize < 1) {
    return {
      get: () => undefined,
      set: () => {}
    };
  }
  let cacheSize = 0;
  let cache = new Map();
  let previousCache = new Map();
  const update = (key, value) => {
    cache.set(key, value);
    cacheSize++;
    if (cacheSize > maxCacheSize) {
      cacheSize = 0;
      previousCache = cache;
      cache = new Map();
    }
  };
  return {
    get(key) {
      let value = cache.get(key);
      if (value !== undefined) {
        return value;
      }
      if ((value = previousCache.get(key)) !== undefined) {
        update(key, value);
        return value;
      }
    },
    set(key, value) {
      if (cache.has(key)) {
        cache.set(key, value);
      } else {
        update(key, value);
      }
    }
  };
};
const IMPORTANT_MODIFIER = '!';
const createParseClassName = config => {
  const {
    separator,
    experimentalParseClassName
  } = config;
  const isSeparatorSingleCharacter = separator.length === 1;
  const firstSeparatorCharacter = separator[0];
  const separatorLength = separator.length;
  // parseClassName inspired by https://github.com/tailwindlabs/tailwindcss/blob/v3.2.2/src/util/splitAtTopLevelOnly.js
  const parseClassName = className => {
    const modifiers = [];
    let bracketDepth = 0;
    let modifierStart = 0;
    let postfixModifierPosition;
    for (let index = 0; index < className.length; index++) {
      let currentCharacter = className[index];
      if (bracketDepth === 0) {
        if (currentCharacter === firstSeparatorCharacter && (isSeparatorSingleCharacter || className.slice(index, index + separatorLength) === separator)) {
          modifiers.push(className.slice(modifierStart, index));
          modifierStart = index + separatorLength;
          continue;
        }
        if (currentCharacter === '/') {
          postfixModifierPosition = index;
          continue;
        }
      }
      if (currentCharacter === '[') {
        bracketDepth++;
      } else if (currentCharacter === ']') {
        bracketDepth--;
      }
    }
    const baseClassNameWithImportantModifier = modifiers.length === 0 ? className : className.substring(modifierStart);
    const hasImportantModifier = baseClassNameWithImportantModifier.startsWith(IMPORTANT_MODIFIER);
    const baseClassName = hasImportantModifier ? baseClassNameWithImportantModifier.substring(1) : baseClassNameWithImportantModifier;
    const maybePostfixModifierPosition = postfixModifierPosition && postfixModifierPosition > modifierStart ? postfixModifierPosition - modifierStart : undefined;
    return {
      modifiers,
      hasImportantModifier,
      baseClassName,
      maybePostfixModifierPosition
    };
  };
  if (experimentalParseClassName) {
    return className => experimentalParseClassName({
      className,
      parseClassName
    });
  }
  return parseClassName;
};
/**
 * Sorts modifiers according to following schema:
 * - Predefined modifiers are sorted alphabetically
 * - When an arbitrary variant appears, it must be preserved which modifiers are before and after it
 */
const sortModifiers = modifiers => {
  if (modifiers.length <= 1) {
    return modifiers;
  }
  const sortedModifiers = [];
  let unsortedModifiers = [];
  modifiers.forEach(modifier => {
    const isArbitraryVariant = modifier[0] === '[';
    if (isArbitraryVariant) {
      sortedModifiers.push(...unsortedModifiers.sort(), modifier);
      unsortedModifiers = [];
    } else {
      unsortedModifiers.push(modifier);
    }
  });
  sortedModifiers.push(...unsortedModifiers.sort());
  return sortedModifiers;
};
const createConfigUtils = config => ({
  cache: createLruCache(config.cacheSize),
  parseClassName: createParseClassName(config),
  ...createClassGroupUtils(config)
});
const SPLIT_CLASSES_REGEX = /\s+/;
const mergeClassList = (classList, configUtils) => {
  const {
    parseClassName,
    getClassGroupId,
    getConflictingClassGroupIds
  } = configUtils;
  /**
   * Set of classGroupIds in following format:
   * `{importantModifier}{variantModifiers}{classGroupId}`
   * @example 'float'
   * @example 'hover:focus:bg-color'
   * @example 'md:!pr'
   */
  const classGroupsInConflict = [];
  const classNames = classList.trim().split(SPLIT_CLASSES_REGEX);
  let result = '';
  for (let index = classNames.length - 1; index >= 0; index -= 1) {
    const originalClassName = classNames[index];
    const {
      modifiers,
      hasImportantModifier,
      baseClassName,
      maybePostfixModifierPosition
    } = parseClassName(originalClassName);
    let hasPostfixModifier = Boolean(maybePostfixModifierPosition);
    let classGroupId = getClassGroupId(hasPostfixModifier ? baseClassName.substring(0, maybePostfixModifierPosition) : baseClassName);
    if (!classGroupId) {
      if (!hasPostfixModifier) {
        // Not a Tailwind class
        result = originalClassName + (result.length > 0 ? ' ' + result : result);
        continue;
      }
      classGroupId = getClassGroupId(baseClassName);
      if (!classGroupId) {
        // Not a Tailwind class
        result = originalClassName + (result.length > 0 ? ' ' + result : result);
        continue;
      }
      hasPostfixModifier = false;
    }
    const variantModifier = sortModifiers(modifiers).join(':');
    const modifierId = hasImportantModifier ? variantModifier + IMPORTANT_MODIFIER : variantModifier;
    const classId = modifierId + classGroupId;
    if (classGroupsInConflict.includes(classId)) {
      // Tailwind class omitted due to conflict
      continue;
    }
    classGroupsInConflict.push(classId);
    const conflictGroups = getConflictingClassGroupIds(classGroupId, hasPostfixModifier);
    for (let i = 0; i < conflictGroups.length; ++i) {
      const group = conflictGroups[i];
      classGroupsInConflict.push(modifierId + group);
    }
    // Tailwind class not in conflict
    result = originalClassName + (result.length > 0 ? ' ' + result : result);
  }
  return result;
};

/**
 * The code in this file is copied from https://github.com/lukeed/clsx and modified to suit the needs of tailwind-merge better.
 *
 * Specifically:
 * - Runtime code from https://github.com/lukeed/clsx/blob/v1.2.1/src/index.js
 * - TypeScript types from https://github.com/lukeed/clsx/blob/v1.2.1/clsx.d.ts
 *
 * Original code has MIT license: Copyright (c) Luke Edwards <luke.edwards05@gmail.com> (lukeed.com)
 */
function twJoin() {
  let index = 0;
  let argument;
  let resolvedValue;
  let string = '';
  while (index < arguments.length) {
    if (argument = arguments[index++]) {
      if (resolvedValue = toValue(argument)) {
        string && (string += ' ');
        string += resolvedValue;
      }
    }
  }
  return string;
}
const toValue = mix => {
  if (typeof mix === 'string') {
    return mix;
  }
  let resolvedValue;
  let string = '';
  for (let k = 0; k < mix.length; k++) {
    if (mix[k]) {
      if (resolvedValue = toValue(mix[k])) {
        string && (string += ' ');
        string += resolvedValue;
      }
    }
  }
  return string;
};
function createTailwindMerge(createConfigFirst, ...createConfigRest) {
  let configUtils;
  let cacheGet;
  let cacheSet;
  let functionToCall = initTailwindMerge;
  function initTailwindMerge(classList) {
    const config = createConfigRest.reduce((previousConfig, createConfigCurrent) => createConfigCurrent(previousConfig), createConfigFirst());
    configUtils = createConfigUtils(config);
    cacheGet = configUtils.cache.get;
    cacheSet = configUtils.cache.set;
    functionToCall = tailwindMerge;
    return tailwindMerge(classList);
  }
  function tailwindMerge(classList) {
    const cachedResult = cacheGet(classList);
    if (cachedResult) {
      return cachedResult;
    }
    const result = mergeClassList(classList, configUtils);
    cacheSet(classList, result);
    return result;
  }
  return function callTailwindMerge() {
    return functionToCall(twJoin.apply(null, arguments));
  };
}
const fromTheme = key => {
  const themeGetter = theme => theme[key] || [];
  themeGetter.isThemeGetter = true;
  return themeGetter;
};
const arbitraryValueRegex = /^\[(?:([a-z-]+):)?(.+)\]$/i;
const fractionRegex = /^\d+\/\d+$/;
const stringLengths = /*#__PURE__*/new Set(['px', 'full', 'screen']);
const tshirtUnitRegex = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/;
const lengthUnitRegex = /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/;
const colorFunctionRegex = /^(rgba?|hsla?|hwb|(ok)?(lab|lch))\(.+\)$/;
// Shadow always begins with x and y offset separated by underscore optionally prepended by inset
const shadowRegex = /^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/;
const imageRegex = /^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/;
const isLength = value => isNumber(value) || stringLengths.has(value) || fractionRegex.test(value);
const isArbitraryLength = value => getIsArbitraryValue(value, 'length', isLengthOnly);
const isNumber = value => Boolean(value) && !Number.isNaN(Number(value));
const isArbitraryNumber = value => getIsArbitraryValue(value, 'number', isNumber);
const isInteger = value => Boolean(value) && Number.isInteger(Number(value));
const isPercent = value => value.endsWith('%') && isNumber(value.slice(0, -1));
const isArbitraryValue = value => arbitraryValueRegex.test(value);
const isTshirtSize = value => tshirtUnitRegex.test(value);
const sizeLabels = /*#__PURE__*/new Set(['length', 'size', 'percentage']);
const isArbitrarySize = value => getIsArbitraryValue(value, sizeLabels, isNever);
const isArbitraryPosition = value => getIsArbitraryValue(value, 'position', isNever);
const imageLabels = /*#__PURE__*/new Set(['image', 'url']);
const isArbitraryImage = value => getIsArbitraryValue(value, imageLabels, isImage);
const isArbitraryShadow = value => getIsArbitraryValue(value, '', isShadow);
const isAny = () => true;
const getIsArbitraryValue = (value, label, testValue) => {
  const result = arbitraryValueRegex.exec(value);
  if (result) {
    if (result[1]) {
      return typeof label === 'string' ? result[1] === label : label.has(result[1]);
    }
    return testValue(result[2]);
  }
  return false;
};
const isLengthOnly = value =>
// `colorFunctionRegex` check is necessary because color functions can have percentages in them which which would be incorrectly classified as lengths.
// For example, `hsl(0 0% 0%)` would be classified as a length without this check.
// I could also use lookbehind assertion in `lengthUnitRegex` but that isn't supported widely enough.
lengthUnitRegex.test(value) && !colorFunctionRegex.test(value);
const isNever = () => false;
const isShadow = value => shadowRegex.test(value);
const isImage = value => imageRegex.test(value);
const getDefaultConfig = () => {
  const colors = fromTheme('colors');
  const spacing = fromTheme('spacing');
  const blur = fromTheme('blur');
  const brightness = fromTheme('brightness');
  const borderColor = fromTheme('borderColor');
  const borderRadius = fromTheme('borderRadius');
  const borderSpacing = fromTheme('borderSpacing');
  const borderWidth = fromTheme('borderWidth');
  const contrast = fromTheme('contrast');
  const grayscale = fromTheme('grayscale');
  const hueRotate = fromTheme('hueRotate');
  const invert = fromTheme('invert');
  const gap = fromTheme('gap');
  const gradientColorStops = fromTheme('gradientColorStops');
  const gradientColorStopPositions = fromTheme('gradientColorStopPositions');
  const inset = fromTheme('inset');
  const margin = fromTheme('margin');
  const opacity = fromTheme('opacity');
  const padding = fromTheme('padding');
  const saturate = fromTheme('saturate');
  const scale = fromTheme('scale');
  const sepia = fromTheme('sepia');
  const skew = fromTheme('skew');
  const space = fromTheme('space');
  const translate = fromTheme('translate');
  const getOverscroll = () => ['auto', 'contain', 'none'];
  const getOverflow = () => ['auto', 'hidden', 'clip', 'visible', 'scroll'];
  const getSpacingWithAutoAndArbitrary = () => ['auto', isArbitraryValue, spacing];
  const getSpacingWithArbitrary = () => [isArbitraryValue, spacing];
  const getLengthWithEmptyAndArbitrary = () => ['', isLength, isArbitraryLength];
  const getNumberWithAutoAndArbitrary = () => ['auto', isNumber, isArbitraryValue];
  const getPositions = () => ['bottom', 'center', 'left', 'left-bottom', 'left-top', 'right', 'right-bottom', 'right-top', 'top'];
  const getLineStyles = () => ['solid', 'dashed', 'dotted', 'double', 'none'];
  const getBlendModes = () => ['normal', 'multiply', 'screen', 'overlay', 'darken', 'lighten', 'color-dodge', 'color-burn', 'hard-light', 'soft-light', 'difference', 'exclusion', 'hue', 'saturation', 'color', 'luminosity'];
  const getAlign = () => ['start', 'end', 'center', 'between', 'around', 'evenly', 'stretch'];
  const getZeroAndEmpty = () => ['', '0', isArbitraryValue];
  const getBreaks = () => ['auto', 'avoid', 'all', 'avoid-page', 'page', 'left', 'right', 'column'];
  const getNumberAndArbitrary = () => [isNumber, isArbitraryValue];
  return {
    cacheSize: 500,
    separator: ':',
    theme: {
      colors: [isAny],
      spacing: [isLength, isArbitraryLength],
      blur: ['none', '', isTshirtSize, isArbitraryValue],
      brightness: getNumberAndArbitrary(),
      borderColor: [colors],
      borderRadius: ['none', '', 'full', isTshirtSize, isArbitraryValue],
      borderSpacing: getSpacingWithArbitrary(),
      borderWidth: getLengthWithEmptyAndArbitrary(),
      contrast: getNumberAndArbitrary(),
      grayscale: getZeroAndEmpty(),
      hueRotate: getNumberAndArbitrary(),
      invert: getZeroAndEmpty(),
      gap: getSpacingWithArbitrary(),
      gradientColorStops: [colors],
      gradientColorStopPositions: [isPercent, isArbitraryLength],
      inset: getSpacingWithAutoAndArbitrary(),
      margin: getSpacingWithAutoAndArbitrary(),
      opacity: getNumberAndArbitrary(),
      padding: getSpacingWithArbitrary(),
      saturate: getNumberAndArbitrary(),
      scale: getNumberAndArbitrary(),
      sepia: getZeroAndEmpty(),
      skew: getNumberAndArbitrary(),
      space: getSpacingWithArbitrary(),
      translate: getSpacingWithArbitrary()
    },
    classGroups: {
      // Layout
      /**
       * Aspect Ratio
       * @see https://tailwindcss.com/docs/aspect-ratio
       */
      aspect: [{
        aspect: ['auto', 'square', 'video', isArbitraryValue]
      }],
      /**
       * Container
       * @see https://tailwindcss.com/docs/container
       */
      container: ['container'],
      /**
       * Columns
       * @see https://tailwindcss.com/docs/columns
       */
      columns: [{
        columns: [isTshirtSize]
      }],
      /**
       * Break After
       * @see https://tailwindcss.com/docs/break-after
       */
      'break-after': [{
        'break-after': getBreaks()
      }],
      /**
       * Break Before
       * @see https://tailwindcss.com/docs/break-before
       */
      'break-before': [{
        'break-before': getBreaks()
      }],
      /**
       * Break Inside
       * @see https://tailwindcss.com/docs/break-inside
       */
      'break-inside': [{
        'break-inside': ['auto', 'avoid', 'avoid-page', 'avoid-column']
      }],
      /**
       * Box Decoration Break
       * @see https://tailwindcss.com/docs/box-decoration-break
       */
      'box-decoration': [{
        'box-decoration': ['slice', 'clone']
      }],
      /**
       * Box Sizing
       * @see https://tailwindcss.com/docs/box-sizing
       */
      box: [{
        box: ['border', 'content']
      }],
      /**
       * Display
       * @see https://tailwindcss.com/docs/display
       */
      display: ['block', 'inline-block', 'inline', 'flex', 'inline-flex', 'table', 'inline-table', 'table-caption', 'table-cell', 'table-column', 'table-column-group', 'table-footer-group', 'table-header-group', 'table-row-group', 'table-row', 'flow-root', 'grid', 'inline-grid', 'contents', 'list-item', 'hidden'],
      /**
       * Floats
       * @see https://tailwindcss.com/docs/float
       */
      float: [{
        float: ['right', 'left', 'none', 'start', 'end']
      }],
      /**
       * Clear
       * @see https://tailwindcss.com/docs/clear
       */
      clear: [{
        clear: ['left', 'right', 'both', 'none', 'start', 'end']
      }],
      /**
       * Isolation
       * @see https://tailwindcss.com/docs/isolation
       */
      isolation: ['isolate', 'isolation-auto'],
      /**
       * Object Fit
       * @see https://tailwindcss.com/docs/object-fit
       */
      'object-fit': [{
        object: ['contain', 'cover', 'fill', 'none', 'scale-down']
      }],
      /**
       * Object Position
       * @see https://tailwindcss.com/docs/object-position
       */
      'object-position': [{
        object: [...getPositions(), isArbitraryValue]
      }],
      /**
       * Overflow
       * @see https://tailwindcss.com/docs/overflow
       */
      overflow: [{
        overflow: getOverflow()
      }],
      /**
       * Overflow X
       * @see https://tailwindcss.com/docs/overflow
       */
      'overflow-x': [{
        'overflow-x': getOverflow()
      }],
      /**
       * Overflow Y
       * @see https://tailwindcss.com/docs/overflow
       */
      'overflow-y': [{
        'overflow-y': getOverflow()
      }],
      /**
       * Overscroll Behavior
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      overscroll: [{
        overscroll: getOverscroll()
      }],
      /**
       * Overscroll Behavior X
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      'overscroll-x': [{
        'overscroll-x': getOverscroll()
      }],
      /**
       * Overscroll Behavior Y
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      'overscroll-y': [{
        'overscroll-y': getOverscroll()
      }],
      /**
       * Position
       * @see https://tailwindcss.com/docs/position
       */
      position: ['static', 'fixed', 'absolute', 'relative', 'sticky'],
      /**
       * Top / Right / Bottom / Left
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      inset: [{
        inset: [inset]
      }],
      /**
       * Right / Left
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      'inset-x': [{
        'inset-x': [inset]
      }],
      /**
       * Top / Bottom
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      'inset-y': [{
        'inset-y': [inset]
      }],
      /**
       * Start
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      start: [{
        start: [inset]
      }],
      /**
       * End
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      end: [{
        end: [inset]
      }],
      /**
       * Top
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      top: [{
        top: [inset]
      }],
      /**
       * Right
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      right: [{
        right: [inset]
      }],
      /**
       * Bottom
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      bottom: [{
        bottom: [inset]
      }],
      /**
       * Left
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      left: [{
        left: [inset]
      }],
      /**
       * Visibility
       * @see https://tailwindcss.com/docs/visibility
       */
      visibility: ['visible', 'invisible', 'collapse'],
      /**
       * Z-Index
       * @see https://tailwindcss.com/docs/z-index
       */
      z: [{
        z: ['auto', isInteger, isArbitraryValue]
      }],
      // Flexbox and Grid
      /**
       * Flex Basis
       * @see https://tailwindcss.com/docs/flex-basis
       */
      basis: [{
        basis: getSpacingWithAutoAndArbitrary()
      }],
      /**
       * Flex Direction
       * @see https://tailwindcss.com/docs/flex-direction
       */
      'flex-direction': [{
        flex: ['row', 'row-reverse', 'col', 'col-reverse']
      }],
      /**
       * Flex Wrap
       * @see https://tailwindcss.com/docs/flex-wrap
       */
      'flex-wrap': [{
        flex: ['wrap', 'wrap-reverse', 'nowrap']
      }],
      /**
       * Flex
       * @see https://tailwindcss.com/docs/flex
       */
      flex: [{
        flex: ['1', 'auto', 'initial', 'none', isArbitraryValue]
      }],
      /**
       * Flex Grow
       * @see https://tailwindcss.com/docs/flex-grow
       */
      grow: [{
        grow: getZeroAndEmpty()
      }],
      /**
       * Flex Shrink
       * @see https://tailwindcss.com/docs/flex-shrink
       */
      shrink: [{
        shrink: getZeroAndEmpty()
      }],
      /**
       * Order
       * @see https://tailwindcss.com/docs/order
       */
      order: [{
        order: ['first', 'last', 'none', isInteger, isArbitraryValue]
      }],
      /**
       * Grid Template Columns
       * @see https://tailwindcss.com/docs/grid-template-columns
       */
      'grid-cols': [{
        'grid-cols': [isAny]
      }],
      /**
       * Grid Column Start / End
       * @see https://tailwindcss.com/docs/grid-column
       */
      'col-start-end': [{
        col: ['auto', {
          span: ['full', isInteger, isArbitraryValue]
        }, isArbitraryValue]
      }],
      /**
       * Grid Column Start
       * @see https://tailwindcss.com/docs/grid-column
       */
      'col-start': [{
        'col-start': getNumberWithAutoAndArbitrary()
      }],
      /**
       * Grid Column End
       * @see https://tailwindcss.com/docs/grid-column
       */
      'col-end': [{
        'col-end': getNumberWithAutoAndArbitrary()
      }],
      /**
       * Grid Template Rows
       * @see https://tailwindcss.com/docs/grid-template-rows
       */
      'grid-rows': [{
        'grid-rows': [isAny]
      }],
      /**
       * Grid Row Start / End
       * @see https://tailwindcss.com/docs/grid-row
       */
      'row-start-end': [{
        row: ['auto', {
          span: [isInteger, isArbitraryValue]
        }, isArbitraryValue]
      }],
      /**
       * Grid Row Start
       * @see https://tailwindcss.com/docs/grid-row
       */
      'row-start': [{
        'row-start': getNumberWithAutoAndArbitrary()
      }],
      /**
       * Grid Row End
       * @see https://tailwindcss.com/docs/grid-row
       */
      'row-end': [{
        'row-end': getNumberWithAutoAndArbitrary()
      }],
      /**
       * Grid Auto Flow
       * @see https://tailwindcss.com/docs/grid-auto-flow
       */
      'grid-flow': [{
        'grid-flow': ['row', 'col', 'dense', 'row-dense', 'col-dense']
      }],
      /**
       * Grid Auto Columns
       * @see https://tailwindcss.com/docs/grid-auto-columns
       */
      'auto-cols': [{
        'auto-cols': ['auto', 'min', 'max', 'fr', isArbitraryValue]
      }],
      /**
       * Grid Auto Rows
       * @see https://tailwindcss.com/docs/grid-auto-rows
       */
      'auto-rows': [{
        'auto-rows': ['auto', 'min', 'max', 'fr', isArbitraryValue]
      }],
      /**
       * Gap
       * @see https://tailwindcss.com/docs/gap
       */
      gap: [{
        gap: [gap]
      }],
      /**
       * Gap X
       * @see https://tailwindcss.com/docs/gap
       */
      'gap-x': [{
        'gap-x': [gap]
      }],
      /**
       * Gap Y
       * @see https://tailwindcss.com/docs/gap
       */
      'gap-y': [{
        'gap-y': [gap]
      }],
      /**
       * Justify Content
       * @see https://tailwindcss.com/docs/justify-content
       */
      'justify-content': [{
        justify: ['normal', ...getAlign()]
      }],
      /**
       * Justify Items
       * @see https://tailwindcss.com/docs/justify-items
       */
      'justify-items': [{
        'justify-items': ['start', 'end', 'center', 'stretch']
      }],
      /**
       * Justify Self
       * @see https://tailwindcss.com/docs/justify-self
       */
      'justify-self': [{
        'justify-self': ['auto', 'start', 'end', 'center', 'stretch']
      }],
      /**
       * Align Content
       * @see https://tailwindcss.com/docs/align-content
       */
      'align-content': [{
        content: ['normal', ...getAlign(), 'baseline']
      }],
      /**
       * Align Items
       * @see https://tailwindcss.com/docs/align-items
       */
      'align-items': [{
        items: ['start', 'end', 'center', 'baseline', 'stretch']
      }],
      /**
       * Align Self
       * @see https://tailwindcss.com/docs/align-self
       */
      'align-self': [{
        self: ['auto', 'start', 'end', 'center', 'stretch', 'baseline']
      }],
      /**
       * Place Content
       * @see https://tailwindcss.com/docs/place-content
       */
      'place-content': [{
        'place-content': [...getAlign(), 'baseline']
      }],
      /**
       * Place Items
       * @see https://tailwindcss.com/docs/place-items
       */
      'place-items': [{
        'place-items': ['start', 'end', 'center', 'baseline', 'stretch']
      }],
      /**
       * Place Self
       * @see https://tailwindcss.com/docs/place-self
       */
      'place-self': [{
        'place-self': ['auto', 'start', 'end', 'center', 'stretch']
      }],
      // Spacing
      /**
       * Padding
       * @see https://tailwindcss.com/docs/padding
       */
      p: [{
        p: [padding]
      }],
      /**
       * Padding X
       * @see https://tailwindcss.com/docs/padding
       */
      px: [{
        px: [padding]
      }],
      /**
       * Padding Y
       * @see https://tailwindcss.com/docs/padding
       */
      py: [{
        py: [padding]
      }],
      /**
       * Padding Start
       * @see https://tailwindcss.com/docs/padding
       */
      ps: [{
        ps: [padding]
      }],
      /**
       * Padding End
       * @see https://tailwindcss.com/docs/padding
       */
      pe: [{
        pe: [padding]
      }],
      /**
       * Padding Top
       * @see https://tailwindcss.com/docs/padding
       */
      pt: [{
        pt: [padding]
      }],
      /**
       * Padding Right
       * @see https://tailwindcss.com/docs/padding
       */
      pr: [{
        pr: [padding]
      }],
      /**
       * Padding Bottom
       * @see https://tailwindcss.com/docs/padding
       */
      pb: [{
        pb: [padding]
      }],
      /**
       * Padding Left
       * @see https://tailwindcss.com/docs/padding
       */
      pl: [{
        pl: [padding]
      }],
      /**
       * Margin
       * @see https://tailwindcss.com/docs/margin
       */
      m: [{
        m: [margin]
      }],
      /**
       * Margin X
       * @see https://tailwindcss.com/docs/margin
       */
      mx: [{
        mx: [margin]
      }],
      /**
       * Margin Y
       * @see https://tailwindcss.com/docs/margin
       */
      my: [{
        my: [margin]
      }],
      /**
       * Margin Start
       * @see https://tailwindcss.com/docs/margin
       */
      ms: [{
        ms: [margin]
      }],
      /**
       * Margin End
       * @see https://tailwindcss.com/docs/margin
       */
      me: [{
        me: [margin]
      }],
      /**
       * Margin Top
       * @see https://tailwindcss.com/docs/margin
       */
      mt: [{
        mt: [margin]
      }],
      /**
       * Margin Right
       * @see https://tailwindcss.com/docs/margin
       */
      mr: [{
        mr: [margin]
      }],
      /**
       * Margin Bottom
       * @see https://tailwindcss.com/docs/margin
       */
      mb: [{
        mb: [margin]
      }],
      /**
       * Margin Left
       * @see https://tailwindcss.com/docs/margin
       */
      ml: [{
        ml: [margin]
      }],
      /**
       * Space Between X
       * @see https://tailwindcss.com/docs/space
       */
      'space-x': [{
        'space-x': [space]
      }],
      /**
       * Space Between X Reverse
       * @see https://tailwindcss.com/docs/space
       */
      'space-x-reverse': ['space-x-reverse'],
      /**
       * Space Between Y
       * @see https://tailwindcss.com/docs/space
       */
      'space-y': [{
        'space-y': [space]
      }],
      /**
       * Space Between Y Reverse
       * @see https://tailwindcss.com/docs/space
       */
      'space-y-reverse': ['space-y-reverse'],
      // Sizing
      /**
       * Width
       * @see https://tailwindcss.com/docs/width
       */
      w: [{
        w: ['auto', 'min', 'max', 'fit', 'svw', 'lvw', 'dvw', isArbitraryValue, spacing]
      }],
      /**
       * Min-Width
       * @see https://tailwindcss.com/docs/min-width
       */
      'min-w': [{
        'min-w': [isArbitraryValue, spacing, 'min', 'max', 'fit']
      }],
      /**
       * Max-Width
       * @see https://tailwindcss.com/docs/max-width
       */
      'max-w': [{
        'max-w': [isArbitraryValue, spacing, 'none', 'full', 'min', 'max', 'fit', 'prose', {
          screen: [isTshirtSize]
        }, isTshirtSize]
      }],
      /**
       * Height
       * @see https://tailwindcss.com/docs/height
       */
      h: [{
        h: [isArbitraryValue, spacing, 'auto', 'min', 'max', 'fit', 'svh', 'lvh', 'dvh']
      }],
      /**
       * Min-Height
       * @see https://tailwindcss.com/docs/min-height
       */
      'min-h': [{
        'min-h': [isArbitraryValue, spacing, 'min', 'max', 'fit', 'svh', 'lvh', 'dvh']
      }],
      /**
       * Max-Height
       * @see https://tailwindcss.com/docs/max-height
       */
      'max-h': [{
        'max-h': [isArbitraryValue, spacing, 'min', 'max', 'fit', 'svh', 'lvh', 'dvh']
      }],
      /**
       * Size
       * @see https://tailwindcss.com/docs/size
       */
      size: [{
        size: [isArbitraryValue, spacing, 'auto', 'min', 'max', 'fit']
      }],
      // Typography
      /**
       * Font Size
       * @see https://tailwindcss.com/docs/font-size
       */
      'font-size': [{
        text: ['base', isTshirtSize, isArbitraryLength]
      }],
      /**
       * Font Smoothing
       * @see https://tailwindcss.com/docs/font-smoothing
       */
      'font-smoothing': ['antialiased', 'subpixel-antialiased'],
      /**
       * Font Style
       * @see https://tailwindcss.com/docs/font-style
       */
      'font-style': ['italic', 'not-italic'],
      /**
       * Font Weight
       * @see https://tailwindcss.com/docs/font-weight
       */
      'font-weight': [{
        font: ['thin', 'extralight', 'light', 'normal', 'medium', 'semibold', 'bold', 'extrabold', 'black', isArbitraryNumber]
      }],
      /**
       * Font Family
       * @see https://tailwindcss.com/docs/font-family
       */
      'font-family': [{
        font: [isAny]
      }],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      'fvn-normal': ['normal-nums'],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      'fvn-ordinal': ['ordinal'],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      'fvn-slashed-zero': ['slashed-zero'],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      'fvn-figure': ['lining-nums', 'oldstyle-nums'],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      'fvn-spacing': ['proportional-nums', 'tabular-nums'],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      'fvn-fraction': ['diagonal-fractions', 'stacked-fractions'],
      /**
       * Letter Spacing
       * @see https://tailwindcss.com/docs/letter-spacing
       */
      tracking: [{
        tracking: ['tighter', 'tight', 'normal', 'wide', 'wider', 'widest', isArbitraryValue]
      }],
      /**
       * Line Clamp
       * @see https://tailwindcss.com/docs/line-clamp
       */
      'line-clamp': [{
        'line-clamp': ['none', isNumber, isArbitraryNumber]
      }],
      /**
       * Line Height
       * @see https://tailwindcss.com/docs/line-height
       */
      leading: [{
        leading: ['none', 'tight', 'snug', 'normal', 'relaxed', 'loose', isLength, isArbitraryValue]
      }],
      /**
       * List Style Image
       * @see https://tailwindcss.com/docs/list-style-image
       */
      'list-image': [{
        'list-image': ['none', isArbitraryValue]
      }],
      /**
       * List Style Type
       * @see https://tailwindcss.com/docs/list-style-type
       */
      'list-style-type': [{
        list: ['none', 'disc', 'decimal', isArbitraryValue]
      }],
      /**
       * List Style Position
       * @see https://tailwindcss.com/docs/list-style-position
       */
      'list-style-position': [{
        list: ['inside', 'outside']
      }],
      /**
       * Placeholder Color
       * @deprecated since Tailwind CSS v3.0.0
       * @see https://tailwindcss.com/docs/placeholder-color
       */
      'placeholder-color': [{
        placeholder: [colors]
      }],
      /**
       * Placeholder Opacity
       * @see https://tailwindcss.com/docs/placeholder-opacity
       */
      'placeholder-opacity': [{
        'placeholder-opacity': [opacity]
      }],
      /**
       * Text Alignment
       * @see https://tailwindcss.com/docs/text-align
       */
      'text-alignment': [{
        text: ['left', 'center', 'right', 'justify', 'start', 'end']
      }],
      /**
       * Text Color
       * @see https://tailwindcss.com/docs/text-color
       */
      'text-color': [{
        text: [colors]
      }],
      /**
       * Text Opacity
       * @see https://tailwindcss.com/docs/text-opacity
       */
      'text-opacity': [{
        'text-opacity': [opacity]
      }],
      /**
       * Text Decoration
       * @see https://tailwindcss.com/docs/text-decoration
       */
      'text-decoration': ['underline', 'overline', 'line-through', 'no-underline'],
      /**
       * Text Decoration Style
       * @see https://tailwindcss.com/docs/text-decoration-style
       */
      'text-decoration-style': [{
        decoration: [...getLineStyles(), 'wavy']
      }],
      /**
       * Text Decoration Thickness
       * @see https://tailwindcss.com/docs/text-decoration-thickness
       */
      'text-decoration-thickness': [{
        decoration: ['auto', 'from-font', isLength, isArbitraryLength]
      }],
      /**
       * Text Underline Offset
       * @see https://tailwindcss.com/docs/text-underline-offset
       */
      'underline-offset': [{
        'underline-offset': ['auto', isLength, isArbitraryValue]
      }],
      /**
       * Text Decoration Color
       * @see https://tailwindcss.com/docs/text-decoration-color
       */
      'text-decoration-color': [{
        decoration: [colors]
      }],
      /**
       * Text Transform
       * @see https://tailwindcss.com/docs/text-transform
       */
      'text-transform': ['uppercase', 'lowercase', 'capitalize', 'normal-case'],
      /**
       * Text Overflow
       * @see https://tailwindcss.com/docs/text-overflow
       */
      'text-overflow': ['truncate', 'text-ellipsis', 'text-clip'],
      /**
       * Text Wrap
       * @see https://tailwindcss.com/docs/text-wrap
       */
      'text-wrap': [{
        text: ['wrap', 'nowrap', 'balance', 'pretty']
      }],
      /**
       * Text Indent
       * @see https://tailwindcss.com/docs/text-indent
       */
      indent: [{
        indent: getSpacingWithArbitrary()
      }],
      /**
       * Vertical Alignment
       * @see https://tailwindcss.com/docs/vertical-align
       */
      'vertical-align': [{
        align: ['baseline', 'top', 'middle', 'bottom', 'text-top', 'text-bottom', 'sub', 'super', isArbitraryValue]
      }],
      /**
       * Whitespace
       * @see https://tailwindcss.com/docs/whitespace
       */
      whitespace: [{
        whitespace: ['normal', 'nowrap', 'pre', 'pre-line', 'pre-wrap', 'break-spaces']
      }],
      /**
       * Word Break
       * @see https://tailwindcss.com/docs/word-break
       */
      break: [{
        break: ['normal', 'words', 'all', 'keep']
      }],
      /**
       * Hyphens
       * @see https://tailwindcss.com/docs/hyphens
       */
      hyphens: [{
        hyphens: ['none', 'manual', 'auto']
      }],
      /**
       * Content
       * @see https://tailwindcss.com/docs/content
       */
      content: [{
        content: ['none', isArbitraryValue]
      }],
      // Backgrounds
      /**
       * Background Attachment
       * @see https://tailwindcss.com/docs/background-attachment
       */
      'bg-attachment': [{
        bg: ['fixed', 'local', 'scroll']
      }],
      /**
       * Background Clip
       * @see https://tailwindcss.com/docs/background-clip
       */
      'bg-clip': [{
        'bg-clip': ['border', 'padding', 'content', 'text']
      }],
      /**
       * Background Opacity
       * @deprecated since Tailwind CSS v3.0.0
       * @see https://tailwindcss.com/docs/background-opacity
       */
      'bg-opacity': [{
        'bg-opacity': [opacity]
      }],
      /**
       * Background Origin
       * @see https://tailwindcss.com/docs/background-origin
       */
      'bg-origin': [{
        'bg-origin': ['border', 'padding', 'content']
      }],
      /**
       * Background Position
       * @see https://tailwindcss.com/docs/background-position
       */
      'bg-position': [{
        bg: [...getPositions(), isArbitraryPosition]
      }],
      /**
       * Background Repeat
       * @see https://tailwindcss.com/docs/background-repeat
       */
      'bg-repeat': [{
        bg: ['no-repeat', {
          repeat: ['', 'x', 'y', 'round', 'space']
        }]
      }],
      /**
       * Background Size
       * @see https://tailwindcss.com/docs/background-size
       */
      'bg-size': [{
        bg: ['auto', 'cover', 'contain', isArbitrarySize]
      }],
      /**
       * Background Image
       * @see https://tailwindcss.com/docs/background-image
       */
      'bg-image': [{
        bg: ['none', {
          'gradient-to': ['t', 'tr', 'r', 'br', 'b', 'bl', 'l', 'tl']
        }, isArbitraryImage]
      }],
      /**
       * Background Color
       * @see https://tailwindcss.com/docs/background-color
       */
      'bg-color': [{
        bg: [colors]
      }],
      /**
       * Gradient Color Stops From Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      'gradient-from-pos': [{
        from: [gradientColorStopPositions]
      }],
      /**
       * Gradient Color Stops Via Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      'gradient-via-pos': [{
        via: [gradientColorStopPositions]
      }],
      /**
       * Gradient Color Stops To Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      'gradient-to-pos': [{
        to: [gradientColorStopPositions]
      }],
      /**
       * Gradient Color Stops From
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      'gradient-from': [{
        from: [gradientColorStops]
      }],
      /**
       * Gradient Color Stops Via
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      'gradient-via': [{
        via: [gradientColorStops]
      }],
      /**
       * Gradient Color Stops To
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      'gradient-to': [{
        to: [gradientColorStops]
      }],
      // Borders
      /**
       * Border Radius
       * @see https://tailwindcss.com/docs/border-radius
       */
      rounded: [{
        rounded: [borderRadius]
      }],
      /**
       * Border Radius Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      'rounded-s': [{
        'rounded-s': [borderRadius]
      }],
      /**
       * Border Radius End
       * @see https://tailwindcss.com/docs/border-radius
       */
      'rounded-e': [{
        'rounded-e': [borderRadius]
      }],
      /**
       * Border Radius Top
       * @see https://tailwindcss.com/docs/border-radius
       */
      'rounded-t': [{
        'rounded-t': [borderRadius]
      }],
      /**
       * Border Radius Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      'rounded-r': [{
        'rounded-r': [borderRadius]
      }],
      /**
       * Border Radius Bottom
       * @see https://tailwindcss.com/docs/border-radius
       */
      'rounded-b': [{
        'rounded-b': [borderRadius]
      }],
      /**
       * Border Radius Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      'rounded-l': [{
        'rounded-l': [borderRadius]
      }],
      /**
       * Border Radius Start Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      'rounded-ss': [{
        'rounded-ss': [borderRadius]
      }],
      /**
       * Border Radius Start End
       * @see https://tailwindcss.com/docs/border-radius
       */
      'rounded-se': [{
        'rounded-se': [borderRadius]
      }],
      /**
       * Border Radius End End
       * @see https://tailwindcss.com/docs/border-radius
       */
      'rounded-ee': [{
        'rounded-ee': [borderRadius]
      }],
      /**
       * Border Radius End Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      'rounded-es': [{
        'rounded-es': [borderRadius]
      }],
      /**
       * Border Radius Top Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      'rounded-tl': [{
        'rounded-tl': [borderRadius]
      }],
      /**
       * Border Radius Top Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      'rounded-tr': [{
        'rounded-tr': [borderRadius]
      }],
      /**
       * Border Radius Bottom Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      'rounded-br': [{
        'rounded-br': [borderRadius]
      }],
      /**
       * Border Radius Bottom Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      'rounded-bl': [{
        'rounded-bl': [borderRadius]
      }],
      /**
       * Border Width
       * @see https://tailwindcss.com/docs/border-width
       */
      'border-w': [{
        border: [borderWidth]
      }],
      /**
       * Border Width X
       * @see https://tailwindcss.com/docs/border-width
       */
      'border-w-x': [{
        'border-x': [borderWidth]
      }],
      /**
       * Border Width Y
       * @see https://tailwindcss.com/docs/border-width
       */
      'border-w-y': [{
        'border-y': [borderWidth]
      }],
      /**
       * Border Width Start
       * @see https://tailwindcss.com/docs/border-width
       */
      'border-w-s': [{
        'border-s': [borderWidth]
      }],
      /**
       * Border Width End
       * @see https://tailwindcss.com/docs/border-width
       */
      'border-w-e': [{
        'border-e': [borderWidth]
      }],
      /**
       * Border Width Top
       * @see https://tailwindcss.com/docs/border-width
       */
      'border-w-t': [{
        'border-t': [borderWidth]
      }],
      /**
       * Border Width Right
       * @see https://tailwindcss.com/docs/border-width
       */
      'border-w-r': [{
        'border-r': [borderWidth]
      }],
      /**
       * Border Width Bottom
       * @see https://tailwindcss.com/docs/border-width
       */
      'border-w-b': [{
        'border-b': [borderWidth]
      }],
      /**
       * Border Width Left
       * @see https://tailwindcss.com/docs/border-width
       */
      'border-w-l': [{
        'border-l': [borderWidth]
      }],
      /**
       * Border Opacity
       * @see https://tailwindcss.com/docs/border-opacity
       */
      'border-opacity': [{
        'border-opacity': [opacity]
      }],
      /**
       * Border Style
       * @see https://tailwindcss.com/docs/border-style
       */
      'border-style': [{
        border: [...getLineStyles(), 'hidden']
      }],
      /**
       * Divide Width X
       * @see https://tailwindcss.com/docs/divide-width
       */
      'divide-x': [{
        'divide-x': [borderWidth]
      }],
      /**
       * Divide Width X Reverse
       * @see https://tailwindcss.com/docs/divide-width
       */
      'divide-x-reverse': ['divide-x-reverse'],
      /**
       * Divide Width Y
       * @see https://tailwindcss.com/docs/divide-width
       */
      'divide-y': [{
        'divide-y': [borderWidth]
      }],
      /**
       * Divide Width Y Reverse
       * @see https://tailwindcss.com/docs/divide-width
       */
      'divide-y-reverse': ['divide-y-reverse'],
      /**
       * Divide Opacity
       * @see https://tailwindcss.com/docs/divide-opacity
       */
      'divide-opacity': [{
        'divide-opacity': [opacity]
      }],
      /**
       * Divide Style
       * @see https://tailwindcss.com/docs/divide-style
       */
      'divide-style': [{
        divide: getLineStyles()
      }],
      /**
       * Border Color
       * @see https://tailwindcss.com/docs/border-color
       */
      'border-color': [{
        border: [borderColor]
      }],
      /**
       * Border Color X
       * @see https://tailwindcss.com/docs/border-color
       */
      'border-color-x': [{
        'border-x': [borderColor]
      }],
      /**
       * Border Color Y
       * @see https://tailwindcss.com/docs/border-color
       */
      'border-color-y': [{
        'border-y': [borderColor]
      }],
      /**
       * Border Color S
       * @see https://tailwindcss.com/docs/border-color
       */
      'border-color-s': [{
        'border-s': [borderColor]
      }],
      /**
       * Border Color E
       * @see https://tailwindcss.com/docs/border-color
       */
      'border-color-e': [{
        'border-e': [borderColor]
      }],
      /**
       * Border Color Top
       * @see https://tailwindcss.com/docs/border-color
       */
      'border-color-t': [{
        'border-t': [borderColor]
      }],
      /**
       * Border Color Right
       * @see https://tailwindcss.com/docs/border-color
       */
      'border-color-r': [{
        'border-r': [borderColor]
      }],
      /**
       * Border Color Bottom
       * @see https://tailwindcss.com/docs/border-color
       */
      'border-color-b': [{
        'border-b': [borderColor]
      }],
      /**
       * Border Color Left
       * @see https://tailwindcss.com/docs/border-color
       */
      'border-color-l': [{
        'border-l': [borderColor]
      }],
      /**
       * Divide Color
       * @see https://tailwindcss.com/docs/divide-color
       */
      'divide-color': [{
        divide: [borderColor]
      }],
      /**
       * Outline Style
       * @see https://tailwindcss.com/docs/outline-style
       */
      'outline-style': [{
        outline: ['', ...getLineStyles()]
      }],
      /**
       * Outline Offset
       * @see https://tailwindcss.com/docs/outline-offset
       */
      'outline-offset': [{
        'outline-offset': [isLength, isArbitraryValue]
      }],
      /**
       * Outline Width
       * @see https://tailwindcss.com/docs/outline-width
       */
      'outline-w': [{
        outline: [isLength, isArbitraryLength]
      }],
      /**
       * Outline Color
       * @see https://tailwindcss.com/docs/outline-color
       */
      'outline-color': [{
        outline: [colors]
      }],
      /**
       * Ring Width
       * @see https://tailwindcss.com/docs/ring-width
       */
      'ring-w': [{
        ring: getLengthWithEmptyAndArbitrary()
      }],
      /**
       * Ring Width Inset
       * @see https://tailwindcss.com/docs/ring-width
       */
      'ring-w-inset': ['ring-inset'],
      /**
       * Ring Color
       * @see https://tailwindcss.com/docs/ring-color
       */
      'ring-color': [{
        ring: [colors]
      }],
      /**
       * Ring Opacity
       * @see https://tailwindcss.com/docs/ring-opacity
       */
      'ring-opacity': [{
        'ring-opacity': [opacity]
      }],
      /**
       * Ring Offset Width
       * @see https://tailwindcss.com/docs/ring-offset-width
       */
      'ring-offset-w': [{
        'ring-offset': [isLength, isArbitraryLength]
      }],
      /**
       * Ring Offset Color
       * @see https://tailwindcss.com/docs/ring-offset-color
       */
      'ring-offset-color': [{
        'ring-offset': [colors]
      }],
      // Effects
      /**
       * Box Shadow
       * @see https://tailwindcss.com/docs/box-shadow
       */
      shadow: [{
        shadow: ['', 'inner', 'none', isTshirtSize, isArbitraryShadow]
      }],
      /**
       * Box Shadow Color
       * @see https://tailwindcss.com/docs/box-shadow-color
       */
      'shadow-color': [{
        shadow: [isAny]
      }],
      /**
       * Opacity
       * @see https://tailwindcss.com/docs/opacity
       */
      opacity: [{
        opacity: [opacity]
      }],
      /**
       * Mix Blend Mode
       * @see https://tailwindcss.com/docs/mix-blend-mode
       */
      'mix-blend': [{
        'mix-blend': [...getBlendModes(), 'plus-lighter', 'plus-darker']
      }],
      /**
       * Background Blend Mode
       * @see https://tailwindcss.com/docs/background-blend-mode
       */
      'bg-blend': [{
        'bg-blend': getBlendModes()
      }],
      // Filters
      /**
       * Filter
       * @deprecated since Tailwind CSS v3.0.0
       * @see https://tailwindcss.com/docs/filter
       */
      filter: [{
        filter: ['', 'none']
      }],
      /**
       * Blur
       * @see https://tailwindcss.com/docs/blur
       */
      blur: [{
        blur: [blur]
      }],
      /**
       * Brightness
       * @see https://tailwindcss.com/docs/brightness
       */
      brightness: [{
        brightness: [brightness]
      }],
      /**
       * Contrast
       * @see https://tailwindcss.com/docs/contrast
       */
      contrast: [{
        contrast: [contrast]
      }],
      /**
       * Drop Shadow
       * @see https://tailwindcss.com/docs/drop-shadow
       */
      'drop-shadow': [{
        'drop-shadow': ['', 'none', isTshirtSize, isArbitraryValue]
      }],
      /**
       * Grayscale
       * @see https://tailwindcss.com/docs/grayscale
       */
      grayscale: [{
        grayscale: [grayscale]
      }],
      /**
       * Hue Rotate
       * @see https://tailwindcss.com/docs/hue-rotate
       */
      'hue-rotate': [{
        'hue-rotate': [hueRotate]
      }],
      /**
       * Invert
       * @see https://tailwindcss.com/docs/invert
       */
      invert: [{
        invert: [invert]
      }],
      /**
       * Saturate
       * @see https://tailwindcss.com/docs/saturate
       */
      saturate: [{
        saturate: [saturate]
      }],
      /**
       * Sepia
       * @see https://tailwindcss.com/docs/sepia
       */
      sepia: [{
        sepia: [sepia]
      }],
      /**
       * Backdrop Filter
       * @deprecated since Tailwind CSS v3.0.0
       * @see https://tailwindcss.com/docs/backdrop-filter
       */
      'backdrop-filter': [{
        'backdrop-filter': ['', 'none']
      }],
      /**
       * Backdrop Blur
       * @see https://tailwindcss.com/docs/backdrop-blur
       */
      'backdrop-blur': [{
        'backdrop-blur': [blur]
      }],
      /**
       * Backdrop Brightness
       * @see https://tailwindcss.com/docs/backdrop-brightness
       */
      'backdrop-brightness': [{
        'backdrop-brightness': [brightness]
      }],
      /**
       * Backdrop Contrast
       * @see https://tailwindcss.com/docs/backdrop-contrast
       */
      'backdrop-contrast': [{
        'backdrop-contrast': [contrast]
      }],
      /**
       * Backdrop Grayscale
       * @see https://tailwindcss.com/docs/backdrop-grayscale
       */
      'backdrop-grayscale': [{
        'backdrop-grayscale': [grayscale]
      }],
      /**
       * Backdrop Hue Rotate
       * @see https://tailwindcss.com/docs/backdrop-hue-rotate
       */
      'backdrop-hue-rotate': [{
        'backdrop-hue-rotate': [hueRotate]
      }],
      /**
       * Backdrop Invert
       * @see https://tailwindcss.com/docs/backdrop-invert
       */
      'backdrop-invert': [{
        'backdrop-invert': [invert]
      }],
      /**
       * Backdrop Opacity
       * @see https://tailwindcss.com/docs/backdrop-opacity
       */
      'backdrop-opacity': [{
        'backdrop-opacity': [opacity]
      }],
      /**
       * Backdrop Saturate
       * @see https://tailwindcss.com/docs/backdrop-saturate
       */
      'backdrop-saturate': [{
        'backdrop-saturate': [saturate]
      }],
      /**
       * Backdrop Sepia
       * @see https://tailwindcss.com/docs/backdrop-sepia
       */
      'backdrop-sepia': [{
        'backdrop-sepia': [sepia]
      }],
      // Tables
      /**
       * Border Collapse
       * @see https://tailwindcss.com/docs/border-collapse
       */
      'border-collapse': [{
        border: ['collapse', 'separate']
      }],
      /**
       * Border Spacing
       * @see https://tailwindcss.com/docs/border-spacing
       */
      'border-spacing': [{
        'border-spacing': [borderSpacing]
      }],
      /**
       * Border Spacing X
       * @see https://tailwindcss.com/docs/border-spacing
       */
      'border-spacing-x': [{
        'border-spacing-x': [borderSpacing]
      }],
      /**
       * Border Spacing Y
       * @see https://tailwindcss.com/docs/border-spacing
       */
      'border-spacing-y': [{
        'border-spacing-y': [borderSpacing]
      }],
      /**
       * Table Layout
       * @see https://tailwindcss.com/docs/table-layout
       */
      'table-layout': [{
        table: ['auto', 'fixed']
      }],
      /**
       * Caption Side
       * @see https://tailwindcss.com/docs/caption-side
       */
      caption: [{
        caption: ['top', 'bottom']
      }],
      // Transitions and Animation
      /**
       * Tranisition Property
       * @see https://tailwindcss.com/docs/transition-property
       */
      transition: [{
        transition: ['none', 'all', '', 'colors', 'opacity', 'shadow', 'transform', isArbitraryValue]
      }],
      /**
       * Transition Duration
       * @see https://tailwindcss.com/docs/transition-duration
       */
      duration: [{
        duration: getNumberAndArbitrary()
      }],
      /**
       * Transition Timing Function
       * @see https://tailwindcss.com/docs/transition-timing-function
       */
      ease: [{
        ease: ['linear', 'in', 'out', 'in-out', isArbitraryValue]
      }],
      /**
       * Transition Delay
       * @see https://tailwindcss.com/docs/transition-delay
       */
      delay: [{
        delay: getNumberAndArbitrary()
      }],
      /**
       * Animation
       * @see https://tailwindcss.com/docs/animation
       */
      animate: [{
        animate: ['none', 'spin', 'ping', 'pulse', 'bounce', isArbitraryValue]
      }],
      // Transforms
      /**
       * Transform
       * @see https://tailwindcss.com/docs/transform
       */
      transform: [{
        transform: ['', 'gpu', 'none']
      }],
      /**
       * Scale
       * @see https://tailwindcss.com/docs/scale
       */
      scale: [{
        scale: [scale]
      }],
      /**
       * Scale X
       * @see https://tailwindcss.com/docs/scale
       */
      'scale-x': [{
        'scale-x': [scale]
      }],
      /**
       * Scale Y
       * @see https://tailwindcss.com/docs/scale
       */
      'scale-y': [{
        'scale-y': [scale]
      }],
      /**
       * Rotate
       * @see https://tailwindcss.com/docs/rotate
       */
      rotate: [{
        rotate: [isInteger, isArbitraryValue]
      }],
      /**
       * Translate X
       * @see https://tailwindcss.com/docs/translate
       */
      'translate-x': [{
        'translate-x': [translate]
      }],
      /**
       * Translate Y
       * @see https://tailwindcss.com/docs/translate
       */
      'translate-y': [{
        'translate-y': [translate]
      }],
      /**
       * Skew X
       * @see https://tailwindcss.com/docs/skew
       */
      'skew-x': [{
        'skew-x': [skew]
      }],
      /**
       * Skew Y
       * @see https://tailwindcss.com/docs/skew
       */
      'skew-y': [{
        'skew-y': [skew]
      }],
      /**
       * Transform Origin
       * @see https://tailwindcss.com/docs/transform-origin
       */
      'transform-origin': [{
        origin: ['center', 'top', 'top-right', 'right', 'bottom-right', 'bottom', 'bottom-left', 'left', 'top-left', isArbitraryValue]
      }],
      // Interactivity
      /**
       * Accent Color
       * @see https://tailwindcss.com/docs/accent-color
       */
      accent: [{
        accent: ['auto', colors]
      }],
      /**
       * Appearance
       * @see https://tailwindcss.com/docs/appearance
       */
      appearance: [{
        appearance: ['none', 'auto']
      }],
      /**
       * Cursor
       * @see https://tailwindcss.com/docs/cursor
       */
      cursor: [{
        cursor: ['auto', 'default', 'pointer', 'wait', 'text', 'move', 'help', 'not-allowed', 'none', 'context-menu', 'progress', 'cell', 'crosshair', 'vertical-text', 'alias', 'copy', 'no-drop', 'grab', 'grabbing', 'all-scroll', 'col-resize', 'row-resize', 'n-resize', 'e-resize', 's-resize', 'w-resize', 'ne-resize', 'nw-resize', 'se-resize', 'sw-resize', 'ew-resize', 'ns-resize', 'nesw-resize', 'nwse-resize', 'zoom-in', 'zoom-out', isArbitraryValue]
      }],
      /**
       * Caret Color
       * @see https://tailwindcss.com/docs/just-in-time-mode#caret-color-utilities
       */
      'caret-color': [{
        caret: [colors]
      }],
      /**
       * Pointer Events
       * @see https://tailwindcss.com/docs/pointer-events
       */
      'pointer-events': [{
        'pointer-events': ['none', 'auto']
      }],
      /**
       * Resize
       * @see https://tailwindcss.com/docs/resize
       */
      resize: [{
        resize: ['none', 'y', 'x', '']
      }],
      /**
       * Scroll Behavior
       * @see https://tailwindcss.com/docs/scroll-behavior
       */
      'scroll-behavior': [{
        scroll: ['auto', 'smooth']
      }],
      /**
       * Scroll Margin
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      'scroll-m': [{
        'scroll-m': getSpacingWithArbitrary()
      }],
      /**
       * Scroll Margin X
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      'scroll-mx': [{
        'scroll-mx': getSpacingWithArbitrary()
      }],
      /**
       * Scroll Margin Y
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      'scroll-my': [{
        'scroll-my': getSpacingWithArbitrary()
      }],
      /**
       * Scroll Margin Start
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      'scroll-ms': [{
        'scroll-ms': getSpacingWithArbitrary()
      }],
      /**
       * Scroll Margin End
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      'scroll-me': [{
        'scroll-me': getSpacingWithArbitrary()
      }],
      /**
       * Scroll Margin Top
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      'scroll-mt': [{
        'scroll-mt': getSpacingWithArbitrary()
      }],
      /**
       * Scroll Margin Right
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      'scroll-mr': [{
        'scroll-mr': getSpacingWithArbitrary()
      }],
      /**
       * Scroll Margin Bottom
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      'scroll-mb': [{
        'scroll-mb': getSpacingWithArbitrary()
      }],
      /**
       * Scroll Margin Left
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      'scroll-ml': [{
        'scroll-ml': getSpacingWithArbitrary()
      }],
      /**
       * Scroll Padding
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      'scroll-p': [{
        'scroll-p': getSpacingWithArbitrary()
      }],
      /**
       * Scroll Padding X
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      'scroll-px': [{
        'scroll-px': getSpacingWithArbitrary()
      }],
      /**
       * Scroll Padding Y
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      'scroll-py': [{
        'scroll-py': getSpacingWithArbitrary()
      }],
      /**
       * Scroll Padding Start
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      'scroll-ps': [{
        'scroll-ps': getSpacingWithArbitrary()
      }],
      /**
       * Scroll Padding End
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      'scroll-pe': [{
        'scroll-pe': getSpacingWithArbitrary()
      }],
      /**
       * Scroll Padding Top
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      'scroll-pt': [{
        'scroll-pt': getSpacingWithArbitrary()
      }],
      /**
       * Scroll Padding Right
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      'scroll-pr': [{
        'scroll-pr': getSpacingWithArbitrary()
      }],
      /**
       * Scroll Padding Bottom
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      'scroll-pb': [{
        'scroll-pb': getSpacingWithArbitrary()
      }],
      /**
       * Scroll Padding Left
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      'scroll-pl': [{
        'scroll-pl': getSpacingWithArbitrary()
      }],
      /**
       * Scroll Snap Align
       * @see https://tailwindcss.com/docs/scroll-snap-align
       */
      'snap-align': [{
        snap: ['start', 'end', 'center', 'align-none']
      }],
      /**
       * Scroll Snap Stop
       * @see https://tailwindcss.com/docs/scroll-snap-stop
       */
      'snap-stop': [{
        snap: ['normal', 'always']
      }],
      /**
       * Scroll Snap Type
       * @see https://tailwindcss.com/docs/scroll-snap-type
       */
      'snap-type': [{
        snap: ['none', 'x', 'y', 'both']
      }],
      /**
       * Scroll Snap Type Strictness
       * @see https://tailwindcss.com/docs/scroll-snap-type
       */
      'snap-strictness': [{
        snap: ['mandatory', 'proximity']
      }],
      /**
       * Touch Action
       * @see https://tailwindcss.com/docs/touch-action
       */
      touch: [{
        touch: ['auto', 'none', 'manipulation']
      }],
      /**
       * Touch Action X
       * @see https://tailwindcss.com/docs/touch-action
       */
      'touch-x': [{
        'touch-pan': ['x', 'left', 'right']
      }],
      /**
       * Touch Action Y
       * @see https://tailwindcss.com/docs/touch-action
       */
      'touch-y': [{
        'touch-pan': ['y', 'up', 'down']
      }],
      /**
       * Touch Action Pinch Zoom
       * @see https://tailwindcss.com/docs/touch-action
       */
      'touch-pz': ['touch-pinch-zoom'],
      /**
       * User Select
       * @see https://tailwindcss.com/docs/user-select
       */
      select: [{
        select: ['none', 'text', 'all', 'auto']
      }],
      /**
       * Will Change
       * @see https://tailwindcss.com/docs/will-change
       */
      'will-change': [{
        'will-change': ['auto', 'scroll', 'contents', 'transform', isArbitraryValue]
      }],
      // SVG
      /**
       * Fill
       * @see https://tailwindcss.com/docs/fill
       */
      fill: [{
        fill: [colors, 'none']
      }],
      /**
       * Stroke Width
       * @see https://tailwindcss.com/docs/stroke-width
       */
      'stroke-w': [{
        stroke: [isLength, isArbitraryLength, isArbitraryNumber]
      }],
      /**
       * Stroke
       * @see https://tailwindcss.com/docs/stroke
       */
      stroke: [{
        stroke: [colors, 'none']
      }],
      // Accessibility
      /**
       * Screen Readers
       * @see https://tailwindcss.com/docs/screen-readers
       */
      sr: ['sr-only', 'not-sr-only'],
      /**
       * Forced Color Adjust
       * @see https://tailwindcss.com/docs/forced-color-adjust
       */
      'forced-color-adjust': [{
        'forced-color-adjust': ['auto', 'none']
      }]
    },
    conflictingClassGroups: {
      overflow: ['overflow-x', 'overflow-y'],
      overscroll: ['overscroll-x', 'overscroll-y'],
      inset: ['inset-x', 'inset-y', 'start', 'end', 'top', 'right', 'bottom', 'left'],
      'inset-x': ['right', 'left'],
      'inset-y': ['top', 'bottom'],
      flex: ['basis', 'grow', 'shrink'],
      gap: ['gap-x', 'gap-y'],
      p: ['px', 'py', 'ps', 'pe', 'pt', 'pr', 'pb', 'pl'],
      px: ['pr', 'pl'],
      py: ['pt', 'pb'],
      m: ['mx', 'my', 'ms', 'me', 'mt', 'mr', 'mb', 'ml'],
      mx: ['mr', 'ml'],
      my: ['mt', 'mb'],
      size: ['w', 'h'],
      'font-size': ['leading'],
      'fvn-normal': ['fvn-ordinal', 'fvn-slashed-zero', 'fvn-figure', 'fvn-spacing', 'fvn-fraction'],
      'fvn-ordinal': ['fvn-normal'],
      'fvn-slashed-zero': ['fvn-normal'],
      'fvn-figure': ['fvn-normal'],
      'fvn-spacing': ['fvn-normal'],
      'fvn-fraction': ['fvn-normal'],
      'line-clamp': ['display', 'overflow'],
      rounded: ['rounded-s', 'rounded-e', 'rounded-t', 'rounded-r', 'rounded-b', 'rounded-l', 'rounded-ss', 'rounded-se', 'rounded-ee', 'rounded-es', 'rounded-tl', 'rounded-tr', 'rounded-br', 'rounded-bl'],
      'rounded-s': ['rounded-ss', 'rounded-es'],
      'rounded-e': ['rounded-se', 'rounded-ee'],
      'rounded-t': ['rounded-tl', 'rounded-tr'],
      'rounded-r': ['rounded-tr', 'rounded-br'],
      'rounded-b': ['rounded-br', 'rounded-bl'],
      'rounded-l': ['rounded-tl', 'rounded-bl'],
      'border-spacing': ['border-spacing-x', 'border-spacing-y'],
      'border-w': ['border-w-s', 'border-w-e', 'border-w-t', 'border-w-r', 'border-w-b', 'border-w-l'],
      'border-w-x': ['border-w-r', 'border-w-l'],
      'border-w-y': ['border-w-t', 'border-w-b'],
      'border-color': ['border-color-s', 'border-color-e', 'border-color-t', 'border-color-r', 'border-color-b', 'border-color-l'],
      'border-color-x': ['border-color-r', 'border-color-l'],
      'border-color-y': ['border-color-t', 'border-color-b'],
      'scroll-m': ['scroll-mx', 'scroll-my', 'scroll-ms', 'scroll-me', 'scroll-mt', 'scroll-mr', 'scroll-mb', 'scroll-ml'],
      'scroll-mx': ['scroll-mr', 'scroll-ml'],
      'scroll-my': ['scroll-mt', 'scroll-mb'],
      'scroll-p': ['scroll-px', 'scroll-py', 'scroll-ps', 'scroll-pe', 'scroll-pt', 'scroll-pr', 'scroll-pb', 'scroll-pl'],
      'scroll-px': ['scroll-pr', 'scroll-pl'],
      'scroll-py': ['scroll-pt', 'scroll-pb'],
      touch: ['touch-x', 'touch-y', 'touch-pz'],
      'touch-x': ['touch'],
      'touch-y': ['touch'],
      'touch-pz': ['touch']
    },
    conflictingClassGroupModifiers: {
      'font-size': ['leading']
    }
  };
};
const twMerge = /*#__PURE__*/createTailwindMerge(getDefaultConfig);

function cn() {
  var inputs = [];
  for (var _i = 0; _i < arguments.length; _i++) {
    inputs[_i] = arguments[_i];
  }
  return twMerge(clsx$1(inputs));
}

/**
 * Get CSS classes for event colors
 */
function getEventColorClasses(color) {
  var eventColor = color || "sky";
  switch (eventColor) {
    case "sky":
      return "bg-sky-200/50 hover:bg-sky-200/40 text-sky-950/80 dark:bg-sky-400/25 dark:hover:bg-sky-400/20 dark:text-sky-200 shadow-sky-700/8";
    case "amber":
      return "bg-amber-200/50 hover:bg-amber-200/40 text-amber-950/80 dark:bg-amber-400/25 dark:hover:bg-amber-400/20 dark:text-amber-200 shadow-amber-700/8";
    case "violet":
      return "bg-violet-200/50 hover:bg-violet-200/40 text-violet-950/80 dark:bg-violet-400/25 dark:hover:bg-violet-400/20 dark:text-violet-200 shadow-violet-700/8";
    case "rose":
      return "bg-rose-200/50 hover:bg-rose-200/40 text-rose-950/80 dark:bg-rose-400/25 dark:hover:bg-rose-400/20 dark:text-rose-200 shadow-rose-700/8";
    case "emerald":
      return "bg-emerald-200/50 hover:bg-emerald-200/40 text-emerald-950/80 dark:bg-emerald-400/25 dark:hover:bg-emerald-400/20 dark:text-emerald-200 shadow-emerald-700/8";
    case "orange":
      return "bg-orange-200/50 hover:bg-orange-200/40 text-orange-950/80 dark:bg-orange-400/25 dark:hover:bg-orange-400/20 dark:text-orange-200 shadow-orange-700/8";
    default:
      return "bg-sky-200/50 hover:bg-sky-200/40 text-sky-950/80 dark:bg-sky-400/25 dark:hover:bg-sky-400/20 dark:text-sky-200 shadow-sky-700/8";
  }
}
/**
 * Get CSS classes for border radius based on event position in multi-day events
 */
function getBorderRadiusClasses(isFirstDay, isLastDay) {
  if (isFirstDay && isLastDay) {
    return "rounded"; // Both ends rounded
  } else if (isFirstDay) {
    return "rounded-l rounded-r-none"; // Only left end rounded
  } else if (isLastDay) {
    return "rounded-r rounded-l-none"; // Only right end rounded
  } else {
    return "rounded-none"; // No rounded corners
  }
}
/**
 * Check if an event is a multi-day event
 */
function isMultiDayEvent(event) {
  var eventStart = new Date(event.start);
  var eventEnd = new Date(event.end);
  return event.allDay || eventStart.getDate() !== eventEnd.getDate();
}
/**
 * Filter events for a specific day
 */
function getEventsForDay(events, day) {
  return events.filter(function (event) {
    var eventStart = new Date(event.start);
    return isSameDay(day, eventStart);
  }).sort(function (a, b) {
    return new Date(a.start).getTime() - new Date(b.start).getTime();
  });
}
/**
 * Sort events with multi-day events first, then by start time
 */
function sortEvents(events) {
  return __spreadArray([], events, true).sort(function (a, b) {
    var aIsMultiDay = isMultiDayEvent(a);
    var bIsMultiDay = isMultiDayEvent(b);
    if (aIsMultiDay && !bIsMultiDay) return -1;
    if (!aIsMultiDay && bIsMultiDay) return 1;
    return new Date(a.start).getTime() - new Date(b.start).getTime();
  });
}
/**
 * Get multi-day events that span across a specific day (but don't start on that day)
 */
function getSpanningEventsForDay(events, day) {
  return events.filter(function (event) {
    if (!isMultiDayEvent(event)) return false;
    var eventStart = new Date(event.start);
    var eventEnd = new Date(event.end);
    // Only include if it's not the start day but is either the end day or a middle day
    return !isSameDay(day, eventStart) && (isSameDay(day, eventEnd) || day > eventStart && day < eventEnd);
  });
}
/**
 * Get all events visible on a specific day (starting, ending, or spanning)
 */
function getAllEventsForDay(events, day) {
  return events.filter(function (event) {
    var eventStart = new Date(event.start);
    var eventEnd = new Date(event.end);
    return isSameDay(day, eventStart) || isSameDay(day, eventEnd) || day > eventStart && day < eventEnd;
  });
}
/**
 * Get all events for a day (for agenda view)
 */
function getAgendaEventsForDay(events, day) {
  return events.filter(function (event) {
    var eventStart = new Date(event.start);
    var eventEnd = new Date(event.end);
    return isSameDay(day, eventStart) || isSameDay(day, eventEnd) || day > eventStart && day < eventEnd;
  }).sort(function (a, b) {
    return new Date(a.start).getTime() - new Date(b.start).getTime();
  });
}

// Using date-fns format with custom formatting:
// 'h' - hours (1-12)
// 'a' - am/pm
// ':mm' - minutes with leading zero (only if the token 'mm' is present)
var formatTimeWithOptionalMinutes = function (date) {
  return format(date, getMinutes(date) === 0 ? "ha" : "h:mma").toLowerCase();
};
// Shared wrapper component for event styling
function EventWrapper(_a) {
  var event = _a.event,
    _b = _a.isFirstDay,
    isFirstDay = _b === void 0 ? true : _b,
    _c = _a.isLastDay,
    isLastDay = _c === void 0 ? true : _c,
    isDragging = _a.isDragging,
    onClick = _a.onClick,
    className = _a.className,
    children = _a.children,
    currentTime = _a.currentTime,
    dndListeners = _a.dndListeners,
    dndAttributes = _a.dndAttributes,
    onMouseDown = _a.onMouseDown,
    onTouchStart = _a.onTouchStart;
  // Always use the currentTime (if provided) to determine if the event is in the past
  var displayEnd = currentTime ? new Date(new Date(currentTime).getTime() + (new Date(event.end).getTime() - new Date(event.start).getTime())) : new Date(event.end);
  var isEventInPast = isPast(displayEnd);
  return jsx("button", __assign({
    className: cn("focus-visible:border-ring focus-visible:ring-ring/50 flex h-full w-full overflow-hidden px-1 text-left font-medium backdrop-blur-md transition outline-none select-none focus-visible:ring-[3px] data-dragging:cursor-grabbing data-dragging:shadow-lg data-past-event:line-through sm:px-2", getEventColorClasses(event.color), getBorderRadiusClasses(isFirstDay, isLastDay), className),
    "data-dragging": isDragging || undefined,
    "data-past-event": isEventInPast || undefined,
    onClick: onClick,
    onMouseDown: onMouseDown,
    onTouchStart: onTouchStart
  }, dndListeners, dndAttributes, {
    children: children
  }));
}
function EventItem(_a) {
  var event = _a.event,
    view = _a.view,
    isDragging = _a.isDragging,
    onClick = _a.onClick,
    showTime = _a.showTime,
    currentTime = _a.currentTime,
    _b = _a.isFirstDay,
    isFirstDay = _b === void 0 ? true : _b,
    _c = _a.isLastDay,
    isLastDay = _c === void 0 ? true : _c,
    children = _a.children,
    className = _a.className,
    dndListeners = _a.dndListeners,
    dndAttributes = _a.dndAttributes,
    onMouseDown = _a.onMouseDown,
    onTouchStart = _a.onTouchStart;
  var eventColor = event.color;
  // Use the provided currentTime (for dragging) or the event's actual time
  var displayStart = useMemo(function () {
    return currentTime || new Date(event.start);
  }, [currentTime, event.start]);
  var displayEnd = useMemo(function () {
    return currentTime ? new Date(new Date(currentTime).getTime() + (new Date(event.end).getTime() - new Date(event.start).getTime())) : new Date(event.end);
  }, [currentTime, event.start, event.end]);
  // Calculate event duration in minutes
  var durationMinutes = useMemo(function () {
    return differenceInMinutes(displayEnd, displayStart);
  }, [displayStart, displayEnd]);
  var getEventTime = function () {
    if (event.allDay) return "All day";
    // For short events (less than 45 minutes), only show start time
    if (durationMinutes < 45) {
      return formatTimeWithOptionalMinutes(displayStart);
    }
    // For longer events, show both start and end time
    return "".concat(formatTimeWithOptionalMinutes(displayStart), " - ").concat(formatTimeWithOptionalMinutes(displayEnd));
  };
  if (view === "month") {
    return jsx(EventWrapper, {
      event: event,
      isFirstDay: isFirstDay,
      isLastDay: isLastDay,
      isDragging: isDragging,
      onClick: onClick,
      className: cn("mt-[var(--event-gap)] h-[var(--event-height)] items-center text-[10px] sm:text-xs", className),
      currentTime: currentTime,
      dndListeners: dndListeners,
      dndAttributes: dndAttributes,
      onMouseDown: onMouseDown,
      onTouchStart: onTouchStart,
      children: children || jsxs("span", {
        className: "truncate",
        children: [!event.allDay && jsxs("span", {
          className: "truncate font-normal opacity-70 sm:text-[11px]",
          children: [formatTimeWithOptionalMinutes(displayStart), " "]
        }), event.title]
      })
    });
  }
  if (view === "week" || view === "day") {
    return jsx(EventWrapper, {
      event: event,
      isFirstDay: isFirstDay,
      isLastDay: isLastDay,
      isDragging: isDragging,
      onClick: onClick,
      className: cn("py-1", durationMinutes < 45 ? "items-center" : "flex-col", view === "week" ? "text-[10px] sm:text-xs" : "text-xs", className),
      currentTime: currentTime,
      dndListeners: dndListeners,
      dndAttributes: dndAttributes,
      onMouseDown: onMouseDown,
      onTouchStart: onTouchStart,
      children: durationMinutes < 45 ? jsxs("div", {
        className: "truncate",
        children: [event.title, " ", showTime && jsx("span", {
          className: "opacity-70",
          children: formatTimeWithOptionalMinutes(displayStart)
        })]
      }) : jsxs(Fragment, {
        children: [jsx("div", {
          className: "truncate font-medium",
          children: event.title
        }), showTime && jsx("div", {
          className: "truncate font-normal opacity-70 sm:text-[11px]",
          children: getEventTime()
        })]
      })
    });
  }
  // Agenda view - kept separate since it's significantly different
  return jsxs("button", __assign({
    className: cn("focus-visible:border-ring focus-visible:ring-ring/50 flex w-full flex-col gap-1 rounded p-2 text-left transition outline-none focus-visible:ring-[3px] data-past-event:line-through data-past-event:opacity-90", getEventColorClasses(eventColor), className),
    "data-past-event": isPast(new Date(event.end)) || undefined,
    onClick: onClick,
    onMouseDown: onMouseDown,
    onTouchStart: onTouchStart
  }, dndListeners, dndAttributes, {
    children: [jsx("div", {
      className: "text-sm font-medium",
      children: event.title
    }), jsxs("div", {
      className: "text-xs opacity-70",
      children: [event.allDay ? jsx("span", {
        children: "All day"
      }) : jsxs("span", {
        className: "uppercase",
        children: [formatTimeWithOptionalMinutes(displayStart), " -", " ", formatTimeWithOptionalMinutes(displayEnd)]
      }), event.location && jsxs(Fragment, {
        children: [jsx("span", {
          className: "px-1 opacity-35",
          children: " \u00B7 "
        }), jsx("span", {
          children: event.location
        })]
      })]
    }), event.description && jsx("div", {
      className: "my-1 text-xs opacity-90",
      children: event.description
    })]
  }));
}

function AgendaView(_a) {
  var currentDate = _a.currentDate,
    events = _a.events,
    onEventSelect = _a.onEventSelect;
  // Show events for the next days based on constant
  var days = useMemo(function () {
    console.log("Agenda view updating with date:", currentDate.toISOString());
    return Array.from({
      length: AgendaDaysToShow
    }, function (_, i) {
      return addDays(new Date(currentDate), i);
    });
  }, [currentDate]);
  var handleEventClick = function (event, e) {
    e.stopPropagation();
    console.log("Agenda view event clicked:", event);
    onEventSelect === null || onEventSelect === void 0 ? void 0 : onEventSelect(event);
  };
  // Check if there are any days with events
  var hasEvents = days.some(function (day) {
    return getAgendaEventsForDay(events, day).length > 0;
  });
  return jsx("div", {
    className: "border-border/70 border-t px-4",
    children: !hasEvents ? jsxs("div", {
      className: "flex min-h-[70svh] flex-col items-center justify-center py-16 text-center",
      children: [jsx(RiCalendarEventLine, {
        size: 32,
        className: "text-muted-foreground/50 mb-2"
      }), jsx("h3", {
        className: "text-lg font-medium",
        children: "No events found"
      }), jsx("p", {
        className: "text-muted-foreground",
        children: "There are no events scheduled for this time period."
      })]
    }) : days.map(function (day) {
      var dayEvents = getAgendaEventsForDay(events, day);
      if (dayEvents.length === 0) return null;
      return jsxs("div", {
        className: "border-border/70 relative my-12 border-t",
        children: [jsx("span", {
          className: "bg-background absolute -top-3 left-0 flex h-6 items-center pe-4 text-[10px] uppercase data-today:font-medium sm:pe-4 sm:text-xs",
          "data-today": isToday(day) || undefined,
          children: format(day, "d MMM, EEEE")
        }), jsx("div", {
          className: "mt-6 space-y-2",
          children: dayEvents.map(function (event) {
            return jsx(EventItem, {
              event: event,
              view: "agenda",
              onClick: function (e) {
                return handleEventClick(event, e);
              }
            }, event.id);
          })
        })]
      }, day.toString());
    })
  });
}

// Create the context
var CalendarDndContext = /*#__PURE__*/createContext({
  activeEvent: null,
  activeId: null,
  activeView: null,
  currentTime: null,
  eventHeight: null,
  isMultiDay: false,
  multiDayWidth: null,
  dragHandlePosition: null
});
// Hook to use the context
var useCalendarDnd = function () {
  return useContext(CalendarDndContext);
};
function CalendarDndProvider(_a) {
  var _b, _c;
  var children = _a.children,
    onEventUpdate = _a.onEventUpdate;
  var _d = useState(null),
    activeEvent = _d[0],
    setActiveEvent = _d[1];
  var _e = useState(null),
    activeId = _e[0],
    setActiveId = _e[1];
  var _f = useState(null),
    activeView = _f[0],
    setActiveView = _f[1];
  var _g = useState(null),
    currentTime = _g[0],
    setCurrentTime = _g[1];
  var _h = useState(null),
    eventHeight = _h[0],
    setEventHeight = _h[1];
  var _j = useState(false),
    isMultiDay = _j[0],
    setIsMultiDay = _j[1];
  var _k = useState(null),
    multiDayWidth = _k[0],
    setMultiDayWidth = _k[1];
  var _l = useState(null),
    dragHandlePosition = _l[0],
    setDragHandlePosition = _l[1];
  // Store original event dimensions
  var eventDimensions = useRef({
    height: 0
  });
  // Configure sensors for better drag detection
  var sensors = useSensors(useSensor(MouseSensor, {
    // Require the mouse to move by 5px before activating
    activationConstraint: {
      distance: 5
    }
  }), useSensor(TouchSensor, {
    // Press delay of 250ms, with tolerance of 5px of movement
    activationConstraint: {
      delay: 250,
      tolerance: 5
    }
  }), useSensor(PointerSensor, {
    // Require the pointer to move by 5px before activating
    activationConstraint: {
      distance: 5
    }
  }));
  // Generate a stable ID for the DndContext
  var dndContextId = useId();
  var handleDragStart = function (event) {
    var active = event.active;
    // Add safety check for data.current
    if (!active.data.current) {
      console.error("Missing data in drag start event", event);
      return;
    }
    var _a = active.data.current,
      calendarEvent = _a.event,
      view = _a.view,
      height = _a.height,
      eventIsMultiDay = _a.isMultiDay,
      eventMultiDayWidth = _a.multiDayWidth,
      eventDragHandlePosition = _a.dragHandlePosition;
    setActiveEvent(calendarEvent);
    setActiveId(active.id);
    setActiveView(view);
    setCurrentTime(new Date(calendarEvent.start));
    setIsMultiDay(eventIsMultiDay || false);
    setMultiDayWidth(eventMultiDayWidth || null);
    setDragHandlePosition(eventDragHandlePosition || null);
    // Store event height if provided
    if (height) {
      eventDimensions.current.height = height;
      setEventHeight(height);
    }
  };
  var handleDragOver = function (event) {
    var over = event.over;
    if (over && activeEvent && over.data.current) {
      var _a = over.data.current,
        date = _a.date,
        time = _a.time;
      // Update time for week/day views
      if (time !== undefined && activeView !== "month") {
        var newTime = new Date(date);
        // Calculate hours and minutes with 15-minute precision
        var hours = Math.floor(time);
        var fractionalHour = time - hours;
        // Map to nearest 15 minute interval (0, 0.25, 0.5, 0.75)
        var minutes = 0;
        if (fractionalHour < 0.125) minutes = 0;else if (fractionalHour < 0.375) minutes = 15;else if (fractionalHour < 0.625) minutes = 30;else minutes = 45;
        newTime.setHours(hours, minutes, 0, 0);
        // Only update if time has changed
        if (!currentTime || newTime.getHours() !== currentTime.getHours() || newTime.getMinutes() !== currentTime.getMinutes() || newTime.getDate() !== currentTime.getDate() || newTime.getMonth() !== currentTime.getMonth() || newTime.getFullYear() !== currentTime.getFullYear()) {
          setCurrentTime(newTime);
        }
      } else if (activeView === "month") {
        // For month view, just update the date but preserve time
        var newTime = new Date(date);
        if (currentTime) {
          newTime.setHours(currentTime.getHours(), currentTime.getMinutes(), currentTime.getSeconds(), currentTime.getMilliseconds());
        }
        // Only update if date has changed
        if (!currentTime || newTime.getDate() !== currentTime.getDate() || newTime.getMonth() !== currentTime.getMonth() || newTime.getFullYear() !== currentTime.getFullYear()) {
          setCurrentTime(newTime);
        }
      }
    }
  };
  var handleDragEnd = function (event) {
    var active = event.active,
      over = event.over;
    // Add robust error checking
    if (!over || !activeEvent || !currentTime) {
      // Reset state and exit early
      setActiveEvent(null);
      setActiveId(null);
      setActiveView(null);
      setCurrentTime(null);
      setEventHeight(null);
      setIsMultiDay(false);
      setMultiDayWidth(null);
      setDragHandlePosition(null);
      return;
    }
    try {
      // Safely access data with checks
      if (!active.data.current || !over.data.current) {
        throw new Error("Missing data in drag event");
      }
      var activeData = active.data.current;
      var overData = over.data.current;
      // Verify we have all required data
      if (!activeData.event || !overData.date) {
        throw new Error("Missing required event data");
      }
      var calendarEvent = activeData.event;
      var date = overData.date;
      var time = overData.time;
      // Calculate new start time
      var newStart = new Date(date);
      // If time is provided (for week/day views), set the hours and minutes
      if (time !== undefined) {
        var hours = Math.floor(time);
        var fractionalHour = time - hours;
        // Map to nearest 15 minute interval (0, 0.25, 0.5, 0.75)
        var minutes = 0;
        if (fractionalHour < 0.125) minutes = 0;else if (fractionalHour < 0.375) minutes = 15;else if (fractionalHour < 0.625) minutes = 30;else minutes = 45;
        newStart.setHours(hours, minutes, 0, 0);
      } else {
        // For month view, preserve the original time from currentTime
        newStart.setHours(currentTime.getHours(), currentTime.getMinutes(), currentTime.getSeconds(), currentTime.getMilliseconds());
      }
      // Calculate new end time based on the original duration
      var originalStart = new Date(calendarEvent.start);
      var originalEnd = new Date(calendarEvent.end);
      var durationMinutes = differenceInMinutes(originalEnd, originalStart);
      var newEnd = addMinutes(newStart, durationMinutes);
      // Only update if the start time has actually changed
      var hasStartTimeChanged = originalStart.getFullYear() !== newStart.getFullYear() || originalStart.getMonth() !== newStart.getMonth() || originalStart.getDate() !== newStart.getDate() || originalStart.getHours() !== newStart.getHours() || originalStart.getMinutes() !== newStart.getMinutes();
      if (hasStartTimeChanged) {
        // Update the event only if the time has changed
        onEventUpdate(__assign(__assign({}, calendarEvent), {
          start: newStart,
          end: newEnd
        }));
      }
    } catch (error) {
      console.error("Error in drag end handler:", error);
    } finally {
      // Always reset state
      setActiveEvent(null);
      setActiveId(null);
      setActiveView(null);
      setCurrentTime(null);
      setEventHeight(null);
      setIsMultiDay(false);
      setMultiDayWidth(null);
      setDragHandlePosition(null);
    }
  };
  return jsx(DndContext, {
    id: dndContextId,
    sensors: sensors,
    onDragStart: handleDragStart,
    onDragOver: handleDragOver,
    onDragEnd: handleDragEnd,
    children: jsxs(CalendarDndContext.Provider, {
      value: {
        activeEvent: activeEvent,
        activeId: activeId,
        activeView: activeView,
        currentTime: currentTime,
        eventHeight: eventHeight,
        isMultiDay: isMultiDay,
        multiDayWidth: multiDayWidth,
        dragHandlePosition: dragHandlePosition
      },
      children: [children, jsx(DragOverlay, {
        adjustScale: false,
        dropAnimation: null,
        children: activeEvent && activeView && jsx("div", {
          style: {
            height: eventHeight ? "".concat(eventHeight, "px") : "auto",
            width: isMultiDay && multiDayWidth ? "".concat(multiDayWidth, "%") : "100%"
            // Remove the transform that was causing the shift
          },
          children: jsx(EventItem, {
            event: activeEvent,
            view: activeView,
            isDragging: true,
            showTime: activeView !== "month",
            currentTime: currentTime || undefined,
            isFirstDay: ((_b = dragHandlePosition === null || dragHandlePosition === void 0 ? void 0 : dragHandlePosition.data) === null || _b === void 0 ? void 0 : _b.isFirstDay) !== false,
            isLastDay: ((_c = dragHandlePosition === null || dragHandlePosition === void 0 ? void 0 : dragHandlePosition.data) === null || _c === void 0 ? void 0 : _c.isLastDay) !== false
          })
        })
      })]
    })
  });
}

function DraggableEvent(_a) {
  var _b;
  var event = _a.event,
    view = _a.view,
    showTime = _a.showTime,
    onClick = _a.onClick,
    height = _a.height,
    isMultiDay = _a.isMultiDay,
    multiDayWidth = _a.multiDayWidth,
    _c = _a.isFirstDay,
    isFirstDay = _c === void 0 ? true : _c,
    _d = _a.isLastDay,
    isLastDay = _d === void 0 ? true : _d,
    ariaHidden = _a["aria-hidden"];
  var activeId = useCalendarDnd().activeId;
  var elementRef = useRef(null);
  var _e = useState(null),
    dragHandlePosition = _e[0],
    setDragHandlePosition = _e[1];
  // Check if this is a multi-day event
  var eventStart = new Date(event.start);
  var eventEnd = new Date(event.end);
  var isMultiDayEvent = isMultiDay || event.allDay || differenceInDays(eventEnd, eventStart) >= 1;
  var _f = useDraggable({
      id: "".concat(event.id, "-").concat(view),
      data: {
        event: event,
        view: view,
        height: height || ((_b = elementRef.current) === null || _b === void 0 ? void 0 : _b.offsetHeight) || null,
        isMultiDay: isMultiDayEvent,
        multiDayWidth: multiDayWidth,
        dragHandlePosition: dragHandlePosition,
        isFirstDay: isFirstDay,
        isLastDay: isLastDay
      }
    }),
    attributes = _f.attributes,
    listeners = _f.listeners,
    setNodeRef = _f.setNodeRef,
    transform = _f.transform,
    isDragging = _f.isDragging;
  // Handle mouse down to track where on the event the user clicked
  var handleMouseDown = function (e) {
    if (elementRef.current) {
      var rect = elementRef.current.getBoundingClientRect();
      setDragHandlePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
    }
  };
  // Don't render if this event is being dragged
  if (isDragging || activeId === "".concat(event.id, "-").concat(view)) {
    return jsx("div", {
      ref: setNodeRef,
      className: "opacity-0",
      style: {
        height: height || "auto"
      }
    });
  }
  var style = transform ? {
    transform: CSS.Translate.toString(transform),
    height: height || "auto",
    width: isMultiDayEvent && multiDayWidth ? "".concat(multiDayWidth, "%") : undefined
  } : {
    height: height || "auto",
    width: isMultiDayEvent && multiDayWidth ? "".concat(multiDayWidth, "%") : undefined
  };
  // Handle touch start to track where on the event the user touched
  var handleTouchStart = function (e) {
    if (elementRef.current) {
      var rect = elementRef.current.getBoundingClientRect();
      var touch = e.touches[0];
      if (touch) {
        setDragHandlePosition({
          x: touch.clientX - rect.left,
          y: touch.clientY - rect.top
        });
      }
    }
  };
  return jsx("div", {
    ref: function (node) {
      setNodeRef(node);
      //@ts-ignore
      if (elementRef) elementRef.current = node;
    },
    style: style,
    className: "touch-none",
    children: jsx(EventItem, {
      event: event,
      view: view,
      showTime: showTime,
      isFirstDay: isFirstDay,
      isLastDay: isLastDay,
      isDragging: isDragging,
      onClick: onClick,
      onMouseDown: handleMouseDown,
      onTouchStart: handleTouchStart,
      dndListeners: listeners,
      dndAttributes: attributes,
      "aria-hidden": ariaHidden
    })
  });
}

function DroppableCell(_a) {
  var id = _a.id,
    date = _a.date,
    time = _a.time,
    children = _a.children,
    className = _a.className,
    onClick = _a.onClick;
  var activeEvent = useCalendarDnd().activeEvent;
  var _b = useDroppable({
      id: id,
      data: {
        date: date,
        time: time
      }
    }),
    setNodeRef = _b.setNodeRef,
    isOver = _b.isOver;
  // Format time for display in tooltip (only for debugging)
  var formattedTime = time !== undefined ? "".concat(Math.floor(time), ":").concat(Math.round((time - Math.floor(time)) * 60).toString().padStart(2, "0")) : null;
  return jsx("div", {
    ref: setNodeRef,
    onClick: onClick,
    className: cn("data-dragging:bg-accent flex h-full flex-col overflow-hidden px-0.5 py-1 sm:px-1", className),
    title: formattedTime ? "".concat(formattedTime) : undefined,
    "data-dragging": isOver && activeEvent ? true : undefined,
    children: children
  });
}

function useCurrentTimeIndicator(currentDate, view) {
  var _a = useState(0),
    currentTimePosition = _a[0],
    setCurrentTimePosition = _a[1];
  var _b = useState(false),
    currentTimeVisible = _b[0],
    setCurrentTimeVisible = _b[1];
  useEffect(function () {
    var calculateTimePosition = function () {
      var now = new Date();
      var hours = now.getHours();
      var minutes = now.getMinutes();
      var totalMinutes = (hours - StartHour) * 60 + minutes;
      var dayStartMinutes = 0; // 12am
      var dayEndMinutes = (EndHour - StartHour) * 60; // 12am next day
      // Calculate position as percentage of day
      var position = (totalMinutes - dayStartMinutes) / (dayEndMinutes - dayStartMinutes) * 100;
      // Check if current day is in view based on the calendar view
      var isCurrentTimeVisible = false;
      if (view === "day") {
        isCurrentTimeVisible = isSameDay(now, currentDate);
      } else if (view === "week") {
        var startOfWeekDate = startOfWeek(currentDate, {
          weekStartsOn: 0
        });
        var endOfWeekDate = endOfWeek(currentDate, {
          weekStartsOn: 0
        });
        isCurrentTimeVisible = isWithinInterval(now, {
          start: startOfWeekDate,
          end: endOfWeekDate
        });
      }
      setCurrentTimePosition(position);
      setCurrentTimeVisible(isCurrentTimeVisible);
    };
    // Calculate immediately
    calculateTimePosition();
    // Update every minute
    var interval = setInterval(calculateTimePosition, 60000);
    return function () {
      return clearInterval(interval);
    };
  }, [currentDate, view]);
  return {
    currentTimePosition: currentTimePosition,
    currentTimeVisible: currentTimeVisible
  };
}

function DayView(_a) {
  var currentDate = _a.currentDate,
    events = _a.events,
    onEventSelect = _a.onEventSelect,
    onEventCreate = _a.onEventCreate;
  var hours = useMemo(function () {
    var dayStart = startOfDay(currentDate);
    return eachHourOfInterval({
      start: addHours(dayStart, StartHour),
      end: addHours(dayStart, EndHour - 1)
    });
  }, [currentDate]);
  var dayEvents = useMemo(function () {
    return events.filter(function (event) {
      var eventStart = new Date(event.start);
      var eventEnd = new Date(event.end);
      return isSameDay(currentDate, eventStart) || isSameDay(currentDate, eventEnd) || currentDate > eventStart && currentDate < eventEnd;
    }).sort(function (a, b) {
      return new Date(a.start).getTime() - new Date(b.start).getTime();
    });
  }, [currentDate, events]);
  // Filter all-day events
  var allDayEvents = useMemo(function () {
    return dayEvents.filter(function (event) {
      // Include explicitly marked all-day events or multi-day events
      return event.allDay || isMultiDayEvent(event);
    });
  }, [dayEvents]);
  // Get only single-day time-based events
  var timeEvents = useMemo(function () {
    return dayEvents.filter(function (event) {
      // Exclude all-day events and multi-day events
      return !event.allDay && !isMultiDayEvent(event);
    });
  }, [dayEvents]);
  // Process events to calculate positions
  var positionedEvents = useMemo(function () {
    var result = [];
    var dayStart = startOfDay(currentDate);
    // Sort events by start time and duration
    var sortedEvents = __spreadArray([], timeEvents, true).sort(function (a, b) {
      var aStart = new Date(a.start);
      var bStart = new Date(b.start);
      var aEnd = new Date(a.end);
      var bEnd = new Date(b.end);
      // First sort by start time
      if (aStart < bStart) return -1;
      if (aStart > bStart) return 1;
      // If start times are equal, sort by duration (longer events first)
      var aDuration = differenceInMinutes(aEnd, aStart);
      var bDuration = differenceInMinutes(bEnd, bStart);
      return bDuration - aDuration;
    });
    // Track columns for overlapping events
    var columns = [];
    sortedEvents.forEach(function (event) {
      var eventStart = new Date(event.start);
      var eventEnd = new Date(event.end);
      // Adjust start and end times if they're outside this day
      var adjustedStart = isSameDay(currentDate, eventStart) ? eventStart : dayStart;
      var adjustedEnd = isSameDay(currentDate, eventEnd) ? eventEnd : addHours(dayStart, 24);
      // Calculate top position and height
      var startHour = getHours(adjustedStart) + getMinutes(adjustedStart) / 60;
      var endHour = getHours(adjustedEnd) + getMinutes(adjustedEnd) / 60;
      var top = (startHour - StartHour) * WeekCellsHeight;
      var height = (endHour - startHour) * WeekCellsHeight;
      // Find a column for this event
      var columnIndex = 0;
      var placed = false;
      while (!placed) {
        var col = columns[columnIndex] || [];
        if (col.length === 0) {
          columns[columnIndex] = col;
          placed = true;
        } else {
          var overlaps = col.some(function (c) {
            return areIntervalsOverlapping({
              start: adjustedStart,
              end: adjustedEnd
            }, {
              start: new Date(c.event.start),
              end: new Date(c.event.end)
            });
          });
          if (!overlaps) {
            placed = true;
          } else {
            columnIndex++;
          }
        }
      }
      // Ensure column is initialized before pushing
      var currentColumn = columns[columnIndex] || [];
      columns[columnIndex] = currentColumn;
      currentColumn.push({
        event: event,
        end: adjustedEnd
      });
      // First column takes full width, others are indented by 10% and take 90% width
      var width = columnIndex === 0 ? 1 : 1 - columnIndex * 0.1;
      var left = columnIndex === 0 ? 0 : columnIndex * 0.1;
      result.push({
        event: event,
        top: top,
        height: height,
        left: left,
        width: width,
        zIndex: 10 + columnIndex // Higher columns get higher z-index
      });
    });
    return result;
  }, [currentDate, timeEvents]);
  var handleEventClick = function (event, e) {
    e.stopPropagation();
    onEventSelect === null || onEventSelect === void 0 ? void 0 : onEventSelect(event);
  };
  var showAllDaySection = allDayEvents.length > 0;
  var _b = useCurrentTimeIndicator(currentDate, "day"),
    currentTimePosition = _b.currentTimePosition,
    currentTimeVisible = _b.currentTimeVisible;
  return jsxs("div", {
    "data-slot": "day-view",
    className: "contents",
    children: [showAllDaySection && jsx("div", {
      className: "border-border/70 bg-muted/50 border-t",
      children: jsxs("div", {
        className: "grid grid-cols-[3rem_1fr] sm:grid-cols-[4rem_1fr]",
        children: [jsx("div", {
          className: "relative",
          children: jsx("span", {
            className: "text-muted-foreground/70 absolute bottom-0 left-0 h-6 w-16 max-w-full pe-2 text-right text-[10px] sm:pe-4 sm:text-xs",
            children: "All day"
          })
        }), jsx("div", {
          className: "border-border/70 relative border-r p-1 last:border-r-0",
          children: allDayEvents.map(function (event) {
            var eventStart = new Date(event.start);
            var eventEnd = new Date(event.end);
            var isFirstDay = isSameDay(currentDate, eventStart);
            var isLastDay = isSameDay(currentDate, eventEnd);
            return jsx(EventItem, {
              onClick: function (e) {
                return handleEventClick(event, e);
              },
              event: event,
              view: "month",
              isFirstDay: isFirstDay,
              isLastDay: isLastDay,
              children: jsx("div", {
                children: event.title
              })
            }, "spanning-".concat(event.id));
          })
        })]
      })
    }), jsxs("div", {
      className: "border-border/70 grid flex-1 grid-cols-[3rem_1fr] overflow-hidden border-t sm:grid-cols-[4rem_1fr]",
      children: [jsx("div", {
        children: hours.map(function (hour, index) {
          return jsx("div", {
            className: "border-border/70 relative h-[var(--week-cells-height)] border-b last:border-b-0",
            children: index > 0 && jsx("span", {
              className: "bg-background text-muted-foreground/70 absolute -top-3 left-0 flex h-6 w-16 max-w-full items-center justify-end pe-2 text-[10px] sm:pe-4 sm:text-xs",
              children: format(hour, "h a")
            })
          }, hour.toString());
        })
      }), jsxs("div", {
        className: "relative",
        children: [positionedEvents.map(function (positionedEvent) {
          return jsx("div", {
            className: "absolute z-10 px-0.5",
            style: {
              top: "".concat(positionedEvent.top, "px"),
              height: "".concat(positionedEvent.height, "px"),
              left: "".concat(positionedEvent.left * 100, "%"),
              width: "".concat(positionedEvent.width * 100, "%"),
              zIndex: positionedEvent.zIndex
            },
            children: jsx("div", {
              className: "h-full w-full",
              children: jsx(DraggableEvent, {
                event: positionedEvent.event,
                view: "day",
                onClick: function (e) {
                  return handleEventClick(positionedEvent.event, e);
                },
                showTime: true,
                height: positionedEvent.height
              })
            })
          }, positionedEvent.event.id);
        }), currentTimeVisible && jsx("div", {
          className: "pointer-events-none absolute right-0 left-0 z-20",
          style: {
            top: "".concat(currentTimePosition, "%")
          },
          children: jsxs("div", {
            className: "relative flex items-center",
            children: [jsx("div", {
              className: "bg-primary absolute -left-1 h-2 w-2 rounded-full"
            }), jsx("div", {
              className: "bg-primary h-[2px] w-full"
            })]
          })
        }), hours.map(function (hour) {
          var hourValue = getHours(hour);
          return jsx("div", {
            className: "border-border/70 relative h-[var(--week-cells-height)] border-b last:border-b-0",
            children: [0, 1, 2, 3].map(function (quarter) {
              var quarterHourTime = hourValue + quarter * 0.25;
              return jsx(DroppableCell, {
                id: "day-cell-".concat(currentDate.toISOString(), "-").concat(quarterHourTime),
                date: currentDate,
                time: quarterHourTime,
                className: cn("absolute h-[calc(var(--week-cells-height)/4)] w-full", quarter === 0 && "top-0", quarter === 1 && "top-[calc(var(--week-cells-height)/4)]", quarter === 2 && "top-[calc(var(--week-cells-height)/4*2)]", quarter === 3 && "top-[calc(var(--week-cells-height)/4*3)]"),
                onClick: function () {
                  var startTime = new Date(currentDate);
                  startTime.setHours(hourValue);
                  startTime.setMinutes(quarter * 15);
                  onEventCreate === null || onEventCreate === void 0 ? void 0 : onEventCreate(startTime);
                }
              }, "".concat(hour.toString(), "-").concat(quarter));
            })
          }, hour.toString());
        })]
      })]
    })]
  });
}

function r(e){var t,f,n="";if("string"==typeof e||"number"==typeof e)n+=e;else if("object"==typeof e)if(Array.isArray(e)){var o=e.length;for(t=0;t<o;t++)e[t]&&(f=r(e[t]))&&(n&&(n+=" "),n+=f);}else for(f in e)e[f]&&(n&&(n+=" "),n+=f);return n}function clsx(){for(var e,t,f=0,n="",o=arguments.length;f<o;f++)(e=arguments[f])&&(t=r(e))&&(n&&(n+=" "),n+=t);return n}

const falsyToString = (value)=>typeof value === "boolean" ? `${value}` : value === 0 ? "0" : value;
const cx = clsx;
const cva = (base, config)=>(props)=>{
        var _config_compoundVariants;
        if ((config === null || config === void 0 ? void 0 : config.variants) == null) return cx(base, props === null || props === void 0 ? void 0 : props.class, props === null || props === void 0 ? void 0 : props.className);
        const { variants, defaultVariants } = config;
        const getVariantClassNames = Object.keys(variants).map((variant)=>{
            const variantProp = props === null || props === void 0 ? void 0 : props[variant];
            const defaultVariantProp = defaultVariants === null || defaultVariants === void 0 ? void 0 : defaultVariants[variant];
            if (variantProp === null) return null;
            const variantKey = falsyToString(variantProp) || falsyToString(defaultVariantProp);
            return variants[variant][variantKey];
        });
        const propsWithoutUndefined = props && Object.entries(props).reduce((acc, param)=>{
            let [key, value] = param;
            if (value === undefined) {
                return acc;
            }
            acc[key] = value;
            return acc;
        }, {});
        const getCompoundVariantClassNames = config === null || config === void 0 ? void 0 : (_config_compoundVariants = config.compoundVariants) === null || _config_compoundVariants === void 0 ? void 0 : _config_compoundVariants.reduce((acc, param)=>{
            let { class: cvClass, className: cvClassName, ...compoundVariantOptions } = param;
            return Object.entries(compoundVariantOptions).every((param)=>{
                let [key, value] = param;
                return Array.isArray(value) ? value.includes({
                    ...defaultVariants,
                    ...propsWithoutUndefined
                }[key]) : ({
                    ...defaultVariants,
                    ...propsWithoutUndefined
                })[key] === value;
            }) ? [
                ...acc,
                cvClass,
                cvClassName
            ] : acc;
        }, []);
        return cx(base, getVariantClassNames, getCompoundVariantClassNames, props === null || props === void 0 ? void 0 : props.class, props === null || props === void 0 ? void 0 : props.className);
    };

var buttonVariants = cva("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-[color,box-shadow] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]", {
  variants: {
    variant: {
      default: "bg-primary text-primary-foreground shadow-sm hover:bg-primary/90",
      destructive: "bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40",
      outline: "border border-input bg-background shadow-xs hover:bg-accent hover:text-accent-foreground",
      secondary: "bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80",
      ghost: "hover:bg-accent hover:text-accent-foreground",
      link: "text-primary underline-offset-4 hover:underline"
    },
    size: {
      default: "h-9 px-3 py-2",
      sm: "h-8 rounded-md px-3 text-xs",
      lg: "h-10 rounded-md px-8",
      icon: "size-9"
    }
  },
  defaultVariants: {
    variant: "default",
    size: "default"
  }
});
function Button$1(_a) {
  var className = _a.className,
    variant = _a.variant,
    size = _a.size,
    _b = _a.asChild,
    asChild = _b === void 0 ? false : _b,
    props = __rest(_a, ["className", "variant", "size", "asChild"]);
  var Comp = asChild ? Slot : "button";
  return jsx(Comp, __assign({
    "data-slot": "button",
    className: cn(buttonVariants({
      variant: variant,
      size: size,
      className: className
    }))
  }, props));
}

/**
 * The UI elements composing DayPicker. These elements are mapped to
 * {@link CustomComponents}, the {@link ClassNames} and the {@link Styles} used by
 * DayPicker.
 *
 * Some of these elements are extended by flags and modifiers.
 */
var UI;
(function (UI) {
  /** The root component displaying the months and the navigation bar. */
  UI["Root"] = "root";
  /** The Chevron SVG element used by navigation buttons and dropdowns. */
  UI["Chevron"] = "chevron";
  /**
   * The grid cell with the day's date. Extended by {@link DayFlag} and
   * {@link SelectionState}.
   */
  UI["Day"] = "day";
  /** The button containing the formatted day's date, inside the grid cell. */
  UI["DayButton"] = "day_button";
  /** The caption label of the month (when not showing the dropdown navigation). */
  UI["CaptionLabel"] = "caption_label";
  /** The container of the dropdown navigation (when enabled). */
  UI["Dropdowns"] = "dropdowns";
  /** The dropdown element to select for years and months. */
  UI["Dropdown"] = "dropdown";
  /** The container element of the dropdown. */
  UI["DropdownRoot"] = "dropdown_root";
  /** The root element of the footer. */
  UI["Footer"] = "footer";
  /** The month grid. */
  UI["MonthGrid"] = "month_grid";
  /** Contains the dropdown navigation or the caption label. */
  UI["MonthCaption"] = "month_caption";
  /** The dropdown with the months. */
  UI["MonthsDropdown"] = "months_dropdown";
  /** Wrapper of the month grid. */
  UI["Month"] = "month";
  /** The container of the displayed months. */
  UI["Months"] = "months";
  /** The navigation bar with the previous and next buttons. */
  UI["Nav"] = "nav";
  /**
   * The next month button in the navigation. *
   *
   * @since 9.1.0
   */
  UI["NextMonthButton"] = "button_next";
  /**
   * The previous month button in the navigation.
   *
   * @since 9.1.0
   */
  UI["PreviousMonthButton"] = "button_previous";
  /** The row containing the week. */
  UI["Week"] = "week";
  /** The group of row weeks in a month (`tbody`). */
  UI["Weeks"] = "weeks";
  /** The column header with the weekday. */
  UI["Weekday"] = "weekday";
  /** The row grouping the weekdays in the column headers. */
  UI["Weekdays"] = "weekdays";
  /** The cell containing the week number. */
  UI["WeekNumber"] = "week_number";
  /** The cell header of the week numbers column. */
  UI["WeekNumberHeader"] = "week_number_header";
  /** The dropdown with the years. */
  UI["YearsDropdown"] = "years_dropdown";
})(UI || (UI = {}));
/** The flags for the {@link UI.Day}. */
var DayFlag;
(function (DayFlag) {
  /** The day is disabled. */
  DayFlag["disabled"] = "disabled";
  /** The day is hidden. */
  DayFlag["hidden"] = "hidden";
  /** The day is outside the current month. */
  DayFlag["outside"] = "outside";
  /** The day is focused. */
  DayFlag["focused"] = "focused";
  /** The day is today. */
  DayFlag["today"] = "today";
})(DayFlag || (DayFlag = {}));
/**
 * The state that can be applied to the {@link UI.Day} element when in selection
 * mode.
 */
var SelectionState;
(function (SelectionState) {
  /** The day is at the end of a selected range. */
  SelectionState["range_end"] = "range_end";
  /** The day is at the middle of a selected range. */
  SelectionState["range_middle"] = "range_middle";
  /** The day is at the start of a selected range. */
  SelectionState["range_start"] = "range_start";
  /** The day is selected. */
  SelectionState["selected"] = "selected";
})(SelectionState || (SelectionState = {}));
/** CSS classes used for animating months and captions. */
/**
 * Enum representing different animation states for transitioning between
 * months.
 */
var Animation;
(function (Animation) {
  /** The entering weeks when they appear before the exiting month. */
  Animation["weeks_before_enter"] = "weeks_before_enter";
  /** The exiting weeks when they disappear before the entering month. */
  Animation["weeks_before_exit"] = "weeks_before_exit";
  /** The entering weeks when they appear after the exiting month. */
  Animation["weeks_after_enter"] = "weeks_after_enter";
  /** The exiting weeks when they disappear after the entering month. */
  Animation["weeks_after_exit"] = "weeks_after_exit";
  /** The entering caption when it appears after the exiting month. */
  Animation["caption_after_enter"] = "caption_after_enter";
  /** The exiting caption when it disappears after the entering month. */
  Animation["caption_after_exit"] = "caption_after_exit";
  /** The entering caption when it appears before the exiting month. */
  Animation["caption_before_enter"] = "caption_before_enter";
  /** The exiting caption when it disappears before the entering month. */
  Animation["caption_before_exit"] = "caption_before_exit";
})(Animation || (Animation = {}));

const offsetFormatCache = {};
const offsetCache = {};

/**
 * The function extracts UTC offset in minutes from the given date in specified
 * time zone.
 *
 * Unlike `Date.prototype.getTimezoneOffset`, this function returns the value
 * mirrored to the sign of the offset in the time zone. For Asia/Singapore
 * (UTC+8), `tzOffset` returns 480, while `getTimezoneOffset` returns -480.
 *
 * @param timeZone - Time zone name (IANA or UTC offset)
 * @param date - Date to check the offset for
 *
 * @returns UTC offset in minutes
 */
function tzOffset(timeZone, date) {
  try {
    const format = offsetFormatCache[timeZone] ||= new Intl.DateTimeFormat("en-GB", {
      timeZone,
      hour: "numeric",
      timeZoneName: "longOffset"
    }).format;
    const offsetStr = format(date).split('GMT')[1] || '';
    if (offsetStr in offsetCache) return offsetCache[offsetStr];
    return calcOffset(offsetStr, offsetStr.split(":"));
  } catch {
    // Fallback to manual parsing if the runtime doesn't support ±HH:MM/±HHMM/±HH
    // See: https://github.com/nodejs/node/issues/53419
    if (timeZone in offsetCache) return offsetCache[timeZone];
    const captures = timeZone?.match(offsetRe);
    if (captures) return calcOffset(timeZone, captures.slice(1));
    return NaN;
  }
}
const offsetRe = /([+-]\d\d):?(\d\d)?/;
function calcOffset(cacheStr, values) {
  const hours = +values[0];
  const minutes = +(values[1] || 0);
  return offsetCache[cacheStr] = hours > 0 ? hours * 60 + minutes : hours * 60 - minutes;
}

class TZDateMini extends Date {
  //#region static

  constructor(...args) {
    super();
    if (args.length > 1 && typeof args[args.length - 1] === "string") {
      this.timeZone = args.pop();
    }
    this.internal = new Date();
    if (isNaN(tzOffset(this.timeZone, this))) {
      this.setTime(NaN);
    } else {
      if (!args.length) {
        this.setTime(Date.now());
      } else if (typeof args[0] === "number" && (args.length === 1 || args.length === 2 && typeof args[1] !== "number")) {
        this.setTime(args[0]);
      } else if (typeof args[0] === "string") {
        this.setTime(+new Date(args[0]));
      } else if (args[0] instanceof Date) {
        this.setTime(+args[0]);
      } else {
        this.setTime(+new Date(...args));
        adjustToSystemTZ(this);
        syncToInternal(this);
      }
    }
  }
  static tz(tz, ...args) {
    return args.length ? new TZDateMini(...args, tz) : new TZDateMini(Date.now(), tz);
  }

  //#endregion

  //#region time zone

  withTimeZone(timeZone) {
    return new TZDateMini(+this, timeZone);
  }
  getTimezoneOffset() {
    return -tzOffset(this.timeZone, this);
  }

  //#endregion

  //#region time

  setTime(time) {
    Date.prototype.setTime.apply(this, arguments);
    syncToInternal(this);
    return +this;
  }

  //#endregion

  //#region date-fns integration

  [Symbol.for("constructDateFrom")](date) {
    return new TZDateMini(+new Date(date), this.timeZone);
  }

  //#endregion
}

// Assign getters and setters
const re = /^(get|set)(?!UTC)/;
Object.getOwnPropertyNames(Date.prototype).forEach(method => {
  if (!re.test(method)) return;
  const utcMethod = method.replace(re, "$1UTC");
  // Filter out methods without UTC counterparts
  if (!TZDateMini.prototype[utcMethod]) return;
  if (method.startsWith("get")) {
    // Delegate to internal date's UTC method
    TZDateMini.prototype[method] = function () {
      return this.internal[utcMethod]();
    };
  } else {
    // Assign regular setter
    TZDateMini.prototype[method] = function () {
      Date.prototype[utcMethod].apply(this.internal, arguments);
      syncFromInternal(this);
      return +this;
    };

    // Assign UTC setter
    TZDateMini.prototype[utcMethod] = function () {
      Date.prototype[utcMethod].apply(this, arguments);
      syncToInternal(this);
      return +this;
    };
  }
});

/**
 * Function syncs time to internal date, applying the time zone offset.
 *
 * @param {Date} date - Date to sync
 */
function syncToInternal(date) {
  date.internal.setTime(+date);
  date.internal.setUTCMinutes(date.internal.getUTCMinutes() - date.getTimezoneOffset());
}

/**
 * Function syncs the internal date UTC values to the date. It allows to get
 * accurate timestamp value.
 *
 * @param {Date} date - The date to sync
 */
function syncFromInternal(date) {
  // First we transpose the internal values
  Date.prototype.setFullYear.call(date, date.internal.getUTCFullYear(), date.internal.getUTCMonth(), date.internal.getUTCDate());
  Date.prototype.setHours.call(date, date.internal.getUTCHours(), date.internal.getUTCMinutes(), date.internal.getUTCSeconds(), date.internal.getUTCMilliseconds());

  // Now we have to adjust the date to the system time zone
  adjustToSystemTZ(date);
}

/**
 * Function adjusts the date to the system time zone. It uses the time zone
 * differences to calculate the offset and adjust the date.
 *
 * @param {Date} date - Date to adjust
 */
function adjustToSystemTZ(date) {
  // Save the time zone offset before all the adjustments
  const offset = tzOffset(date.timeZone, date);

  //#region System DST adjustment

  // The biggest problem with using the system time zone is that when we create
  // a date from internal values stored in UTC, the system time zone might end
  // up on the DST hour:
  //
  //   $ TZ=America/New_York node
  //   > new Date(2020, 2, 8, 1).toString()
  //   'Sun Mar 08 2020 01:00:00 GMT-0500 (Eastern Standard Time)'
  //   > new Date(2020, 2, 8, 2).toString()
  //   'Sun Mar 08 2020 03:00:00 GMT-0400 (Eastern Daylight Time)'
  //   > new Date(2020, 2, 8, 3).toString()
  //   'Sun Mar 08 2020 03:00:00 GMT-0400 (Eastern Daylight Time)'
  //   > new Date(2020, 2, 8, 4).toString()
  //   'Sun Mar 08 2020 04:00:00 GMT-0400 (Eastern Daylight Time)'
  //
  // Here we get the same hour for both 2 and 3, because the system time zone
  // has DST beginning at 8 March 2020, 2 a.m. and jumps to 3 a.m. So we have
  // to adjust the internal date to reflect that.
  //
  // However we want to adjust only if that's the DST hour the change happenes,
  // not the hour where DST moves to.

  // We calculate the previous hour to see if the time zone offset has changed
  // and we have landed on the DST hour.
  const prevHour = new Date(+date);
  // We use UTC methods here as we don't want to land on the same hour again
  // in case of DST.
  prevHour.setUTCHours(prevHour.getUTCHours() - 1);

  // Calculate if we are on the system DST hour.
  const systemOffset = -new Date(+date).getTimezoneOffset();
  const prevHourSystemOffset = -new Date(+prevHour).getTimezoneOffset();
  const systemDSTChange = systemOffset - prevHourSystemOffset;
  // Detect the DST shift. System DST change will occur both on
  const dstShift = Date.prototype.getHours.apply(date) !== date.internal.getUTCHours();

  // Move the internal date when we are on the system DST hour.
  if (systemDSTChange && dstShift) date.internal.setUTCMinutes(date.internal.getUTCMinutes() + systemDSTChange);

  //#endregion

  //#region System diff adjustment

  // Now we need to adjust the date, since we just applied internal values.
  // We need to calculate the difference between the system and date time zones
  // and apply it to the date.

  const offsetDiff = systemOffset - offset;
  if (offsetDiff) Date.prototype.setUTCMinutes.call(date, Date.prototype.getUTCMinutes.call(date) + offsetDiff);

  //#endregion

  //#region Post-adjustment DST fix

  const postOffset = tzOffset(date.timeZone, date);
  const postSystemOffset = -new Date(+date).getTimezoneOffset();
  const postOffsetDiff = postSystemOffset - postOffset;
  const offsetChanged = postOffset !== offset;
  const postDiff = postOffsetDiff - offsetDiff;
  if (offsetChanged && postDiff) {
    Date.prototype.setUTCMinutes.call(date, Date.prototype.getUTCMinutes.call(date) + postDiff);

    // Now we need to check if got offset change during the post-adjustment.
    // If so, we also need both dates to reflect that.

    const newOffset = tzOffset(date.timeZone, date);
    const offsetChange = postOffset - newOffset;
    if (offsetChange) {
      date.internal.setUTCMinutes(date.internal.getUTCMinutes() + offsetChange);
      Date.prototype.setUTCMinutes.call(date, Date.prototype.getUTCMinutes.call(date) + offsetChange);
    }
  }

  //#endregion
}

/**
 * UTC date class. It maps getters and setters to corresponding UTC methods,
 * forcing all calculations in the UTC time zone.
 *
 * Combined with date-fns, it allows using the class the same way as
 * the original date class.
 *
 * This complete version provides not only getters, setters,
 * and `getTimezoneOffset`, but also the formatter functions, mirroring
 * all original `Date` functionality. Use this version when you need to format
 * a string or in an environment you don't fully control (a library).
 * For a minimal version, see `UTCDateMini`.
 */
class TZDate extends TZDateMini {
  //#region static

  static tz(tz, ...args) {
    return args.length ? new TZDate(...args, tz) : new TZDate(Date.now(), tz);
  }

  //#endregion

  //#region representation

  toISOString() {
    const [sign, hours, minutes] = this.tzComponents();
    const tz = `${sign}${hours}:${minutes}`;
    return this.internal.toISOString().slice(0, -1) + tz;
  }
  toString() {
    // "Tue Aug 13 2024 07:50:19 GMT+0800 (Singapore Standard Time)";
    return `${this.toDateString()} ${this.toTimeString()}`;
  }
  toDateString() {
    // toUTCString returns RFC 7231 ("Mon, 12 Aug 2024 23:36:08 GMT")
    const [day, date, month, year] = this.internal.toUTCString().split(" ");
    // "Tue Aug 13 2024"
    return `${day?.slice(0, -1) /* Remove "," */} ${month} ${date} ${year}`;
  }
  toTimeString() {
    // toUTCString returns RFC 7231 ("Mon, 12 Aug 2024 23:36:08 GMT")
    const time = this.internal.toUTCString().split(" ")[4];
    const [sign, hours, minutes] = this.tzComponents();
    // "07:42:23 GMT+0800 (Singapore Standard Time)"
    return `${time} GMT${sign}${hours}${minutes} (${tzName(this.timeZone, this)})`;
  }
  toLocaleString(locales, options) {
    return Date.prototype.toLocaleString.call(this, locales, {
      ...options,
      timeZone: options?.timeZone || this.timeZone
    });
  }
  toLocaleDateString(locales, options) {
    return Date.prototype.toLocaleDateString.call(this, locales, {
      ...options,
      timeZone: options?.timeZone || this.timeZone
    });
  }
  toLocaleTimeString(locales, options) {
    return Date.prototype.toLocaleTimeString.call(this, locales, {
      ...options,
      timeZone: options?.timeZone || this.timeZone
    });
  }

  //#endregion

  //#region private

  tzComponents() {
    const offset = this.getTimezoneOffset();
    const sign = offset > 0 ? "-" : "+";
    const hours = String(Math.floor(Math.abs(offset) / 60)).padStart(2, "0");
    const minutes = String(Math.abs(offset) % 60).padStart(2, "0");
    return [sign, hours, minutes];
  }

  //#endregion

  withTimeZone(timeZone) {
    return new TZDate(+this, timeZone);
  }

  //#region date-fns integration

  [Symbol.for("constructDateFrom")](date) {
    return new TZDate(+new Date(date), this.timeZone);
  }

  //#endregion
}
function tzName(tz, date) {
  return new Intl.DateTimeFormat("en-GB", {
    timeZone: tz,
    timeZoneName: "long"
  }).format(date).slice(12);
}

const FIVE_WEEKS = 5;
const FOUR_WEEKS = 4;
/**
 * Return the number of weeks to display in the broadcast calendar.
 *
 * @since 9.4.0
 */
function getBroadcastWeeksInMonth(month, dateLib) {
  // Get the first day of the month
  const firstDayOfMonth = dateLib.startOfMonth(month);
  // Get the day of the week for the first day of the month (1-7, where 1 is Monday)
  const firstDayOfWeek = firstDayOfMonth.getDay() > 0 ? firstDayOfMonth.getDay() : 7;
  const broadcastStartDate = dateLib.addDays(month, -firstDayOfWeek + 1);
  const lastDateOfLastWeek = dateLib.addDays(broadcastStartDate, FIVE_WEEKS * 7 - 1);
  const numberOfWeeks = dateLib.getMonth(month) === dateLib.getMonth(lastDateOfLastWeek) ? FIVE_WEEKS : FOUR_WEEKS;
  return numberOfWeeks;
}

/**
 * Return the start date of the week in the broadcast calendar.
 *
 * @since 9.4.0
 */
function startOfBroadcastWeek(date, dateLib) {
  const firstOfMonth = dateLib.startOfMonth(date);
  const dayOfWeek = firstOfMonth.getDay();
  if (dayOfWeek === 1) {
    return firstOfMonth;
  } else if (dayOfWeek === 0) {
    return dateLib.addDays(firstOfMonth, -1 * 6);
  } else {
    return dateLib.addDays(firstOfMonth, -1 * (dayOfWeek - 1));
  }
}

/**
 * Return the end date of the week in the broadcast calendar.
 *
 * @since 9.4.0
 */
function endOfBroadcastWeek(date, dateLib) {
  const startDate = startOfBroadcastWeek(date, dateLib);
  const numberOfWeeks = getBroadcastWeeksInMonth(date, dateLib);
  const endDate = dateLib.addDays(startDate, numberOfWeeks * 7 - 1);
  return endDate;
}

/**
 * A wrapper class around [date-fns](http://date-fns.org) sharing the same
 * options.
 *
 * @since 9.2.0
 * @example
 *   const dateLib = new DateLib({ locale: es });
 *   const newDate = dateLib.addDays(new Date(), 5);
 */
class DateLib {
  /**
   * Creates an instance of DateLib.
   *
   * @param options The options for the date library.
   * @param overrides Overrides for the date library functions.
   */
  constructor(options, overrides) {
    /**
     * Reference to the built-in Date constructor.
     *
     * @deprecated Use `newDate()` or `today()`.
     */
    this.Date = Date;
    /**
     * Creates a new date object to the today's date.
     *
     * @since 9.5.0
     * @returns The new date object.
     */
    this.today = () => {
      if (this.overrides?.today) {
        return this.overrides.today();
      }
      if (this.options.timeZone) {
        return TZDate.tz(this.options.timeZone);
      }
      return new this.Date();
    };
    /**
     * Creates a new date object with the specified year, month and date.
     *
     * @since 9.5.0
     * @param year The year.
     * @param monthIndex The month (0-11).
     * @param date The day of the month.
     * @returns The new date object.
     */
    this.newDate = (year, monthIndex, date) => {
      if (this.overrides?.newDate) {
        return this.overrides.newDate(year, monthIndex, date);
      }
      if (this.options.timeZone) {
        return new TZDate(year, monthIndex, date, this.options.timeZone);
      }
      return new Date(year, monthIndex, date);
    };
    /**
     * Adds the specified number of days to the given date.
     *
     * @param date The date to add days to.
     * @param amount The number of days to add.
     * @returns The new date with the days added.
     */
    this.addDays = (date, amount) => {
      return this.overrides?.addDays?.(date, amount) ?? addDays(date, amount);
    };
    /**
     * Adds the specified number of months to the given date.
     *
     * @param date The date to add months to.
     * @param amount The number of months to add.
     * @returns The new date with the months added.
     */
    this.addMonths = (date, amount) => {
      return this.overrides?.addMonths?.(date, amount) ?? addMonths(date, amount);
    };
    /**
     * Adds the specified number of weeks to the given date.
     *
     * @param date The date to add weeks to.
     * @param amount The number of weeks to add.
     * @returns The new date with the weeks added.
     */
    this.addWeeks = (date, amount) => {
      return this.overrides?.addWeeks?.(date, amount) ?? addWeeks(date, amount);
    };
    /**
     * Adds the specified number of years to the given date.
     *
     * @param date The date to add years to.
     * @param amount The number of years to add.
     * @returns The new date with the years added.
     */
    this.addYears = (date, amount) => {
      return this.overrides?.addYears?.(date, amount) ?? addYears(date, amount);
    };
    /**
     * Returns the number of calendar days between the given dates.
     *
     * @param dateLeft The later date.
     * @param dateRight The earlier date.
     * @returns The number of calendar days between the dates.
     */
    this.differenceInCalendarDays = (dateLeft, dateRight) => {
      return this.overrides?.differenceInCalendarDays?.(dateLeft, dateRight) ?? differenceInCalendarDays(dateLeft, dateRight);
    };
    /**
     * Returns the number of calendar months between the given dates.
     *
     * @param dateLeft The later date.
     * @param dateRight The earlier date.
     * @returns The number of calendar months between the dates.
     */
    this.differenceInCalendarMonths = (dateLeft, dateRight) => {
      return this.overrides?.differenceInCalendarMonths?.(dateLeft, dateRight) ?? differenceInCalendarMonths(dateLeft, dateRight);
    };
    /**
     * Returns the months between the given dates.
     *
     * @param interval The interval to get the months for.
     */
    this.eachMonthOfInterval = interval => {
      return this.overrides?.eachMonthOfInterval?.(interval) ?? eachMonthOfInterval(interval);
    };
    /**
     * Returns the end of the broadcast week for the given date.
     *
     * @param date The original date.
     * @returns The end of the broadcast week.
     */
    this.endOfBroadcastWeek = (date, dateLib) => {
      return this.overrides?.endOfBroadcastWeek?.(date, dateLib) ?? endOfBroadcastWeek(date, this);
    };
    /**
     * Returns the end of the ISO week for the given date.
     *
     * @param date The original date.
     * @returns The end of the ISO week.
     */
    this.endOfISOWeek = date => {
      return this.overrides?.endOfISOWeek?.(date) ?? endOfISOWeek(date);
    };
    /**
     * Returns the end of the month for the given date.
     *
     * @param date The original date.
     * @returns The end of the month.
     */
    this.endOfMonth = date => {
      return this.overrides?.endOfMonth?.(date) ?? endOfMonth(date);
    };
    /**
     * Returns the end of the week for the given date.
     *
     * @param date The original date.
     * @returns The end of the week.
     */
    this.endOfWeek = (date, options) => {
      return this.overrides?.endOfWeek?.(date, options ?? this.options) ?? endOfWeek(date, options ?? this.options);
    };
    /**
     * Returns the end of the year for the given date.
     *
     * @param date The original date.
     * @returns The end of the year.
     */
    this.endOfYear = date => {
      return this.overrides?.endOfYear?.(date) ?? endOfYear(date);
    };
    /**
     * Formats the given date using the specified format string.
     *
     * @param date The date to format.
     * @param formatStr The format string.
     * @returns The formatted date string.
     */
    this.format = (date, formatStr, options) => {
      const formatted = this.overrides?.format?.(date, formatStr, options ?? this.options) ?? format(date, formatStr, options ?? this.options);
      if (this.options.numerals && this.options.numerals !== "latn") {
        return this.replaceDigits(formatted);
      }
      return formatted;
    };
    /**
     * Returns the ISO week number for the given date.
     *
     * @param date The date to get the ISO week number for.
     * @returns The ISO week number.
     */
    this.getISOWeek = date => {
      return this.overrides?.getISOWeek?.(date) ?? getISOWeek(date);
    };
    /**
     * Returns the month of the given date.
     *
     * @param date The date to get the month for.
     * @returns The month.
     */
    this.getMonth = date => {
      return this.overrides?.getMonth?.(date) ?? getMonth(date);
    };
    /**
     * Returns the year of the given date.
     *
     * @param date The date to get the year for.
     * @returns The year.
     */
    this.getYear = date => {
      return this.overrides?.getYear?.(date) ?? getYear(date);
    };
    /**
     * Returns the local week number for the given date.
     *
     * @param date The date to get the week number for.
     * @returns The week number.
     */
    this.getWeek = (date, options) => {
      return this.overrides?.getWeek?.(date, options ?? this.options) ?? getWeek(date, options ?? this.options);
    };
    /**
     * Checks if the first date is after the second date.
     *
     * @param date The date to compare.
     * @param dateToCompare The date to compare with.
     * @returns True if the first date is after the second date.
     */
    this.isAfter = (date, dateToCompare) => {
      return this.overrides?.isAfter?.(date, dateToCompare) ?? isAfter(date, dateToCompare);
    };
    /**
     * Checks if the first date is before the second date.
     *
     * @param date The date to compare.
     * @param dateToCompare The date to compare with.
     * @returns True if the first date is before the second date.
     */
    this.isBefore = (date, dateToCompare) => {
      return this.overrides?.isBefore?.(date, dateToCompare) ?? isBefore(date, dateToCompare);
    };
    /**
     * Checks if the given value is a Date object.
     *
     * @param value The value to check.
     * @returns True if the value is a Date object.
     */
    this.isDate = value => {
      return this.overrides?.isDate?.(value) ?? isDate(value);
    };
    /**
     * Checks if the given dates are on the same day.
     *
     * @param dateLeft The first date to compare.
     * @param dateRight The second date to compare.
     * @returns True if the dates are on the same day.
     */
    this.isSameDay = (dateLeft, dateRight) => {
      return this.overrides?.isSameDay?.(dateLeft, dateRight) ?? isSameDay(dateLeft, dateRight);
    };
    /**
     * Checks if the given dates are in the same month.
     *
     * @param dateLeft The first date to compare.
     * @param dateRight The second date to compare.
     * @returns True if the dates are in the same month.
     */
    this.isSameMonth = (dateLeft, dateRight) => {
      return this.overrides?.isSameMonth?.(dateLeft, dateRight) ?? isSameMonth(dateLeft, dateRight);
    };
    /**
     * Checks if the given dates are in the same year.
     *
     * @param dateLeft The first date to compare.
     * @param dateRight The second date to compare.
     * @returns True if the dates are in the same year.
     */
    this.isSameYear = (dateLeft, dateRight) => {
      return this.overrides?.isSameYear?.(dateLeft, dateRight) ?? isSameYear(dateLeft, dateRight);
    };
    /**
     * Returns the latest date in the given array of dates.
     *
     * @param dates The array of dates to compare.
     * @returns The latest date.
     */
    this.max = dates => {
      return this.overrides?.max?.(dates) ?? max(dates);
    };
    /**
     * Returns the earliest date in the given array of dates.
     *
     * @param dates The array of dates to compare.
     * @returns The earliest date.
     */
    this.min = dates => {
      return this.overrides?.min?.(dates) ?? min(dates);
    };
    /**
     * Sets the month of the given date.
     *
     * @param date The date to set the month on.
     * @param month The month to set (0-11).
     * @returns The new date with the month set.
     */
    this.setMonth = (date, month) => {
      return this.overrides?.setMonth?.(date, month) ?? setMonth(date, month);
    };
    /**
     * Sets the year of the given date.
     *
     * @param date The date to set the year on.
     * @param year The year to set.
     * @returns The new date with the year set.
     */
    this.setYear = (date, year) => {
      return this.overrides?.setYear?.(date, year) ?? setYear(date, year);
    };
    /**
     * Returns the start of the broadcast week for the given date.
     *
     * @param date The original date.
     * @returns The start of the broadcast week.
     */
    this.startOfBroadcastWeek = (date, dateLib) => {
      return this.overrides?.startOfBroadcastWeek?.(date, dateLib ?? this) ?? startOfBroadcastWeek(date, dateLib ?? this);
    };
    /**
     * Returns the start of the day for the given date.
     *
     * @param date The original date.
     * @returns The start of the day.
     */
    this.startOfDay = date => {
      return this.overrides?.startOfDay?.(date) ?? startOfDay(date);
    };
    /**
     * Returns the start of the ISO week for the given date.
     *
     * @param date The original date.
     * @returns The start of the ISO week.
     */
    this.startOfISOWeek = date => {
      return this.overrides?.startOfISOWeek?.(date) ?? startOfISOWeek(date);
    };
    /**
     * Returns the start of the month for the given date.
     *
     * @param date The original date.
     * @returns The start of the month.
     */
    this.startOfMonth = date => {
      return this.overrides?.startOfMonth?.(date) ?? startOfMonth(date);
    };
    /**
     * Returns the start of the week for the given date.
     *
     * @param date The original date.
     * @returns The start of the week.
     */
    this.startOfWeek = date => {
      return this.overrides?.startOfWeek?.(date) ?? startOfWeek(date, this.options);
    };
    /**
     * Returns the start of the year for the given date.
     *
     * @param date The original date.
     * @returns The start of the year.
     */
    this.startOfYear = date => {
      return this.overrides?.startOfYear?.(date) ?? startOfYear(date);
    };
    this.options = {
      locale: enUS,
      ...options
    };
    this.overrides = overrides;
  }
  /**
   * Generate digit map dynamically using Intl.NumberFormat.
   *
   * @since 9.5.0
   */
  getDigitMap() {
    const {
      numerals = "latn"
    } = this.options;
    // Use Intl.NumberFormat to create a formatter with the specified numbering system
    const formatter = new Intl.NumberFormat("en-US", {
      numberingSystem: numerals
    });
    // Map Arabic digits (0-9) to the target numerals
    const digitMap = {};
    for (let i = 0; i < 10; i++) {
      digitMap[i.toString()] = formatter.format(i);
    }
    return digitMap;
  }
  /**
   * Replace Arabic digits with the target numbering system digits.
   *
   * @since 9.5.0
   */
  replaceDigits(input) {
    const digitMap = this.getDigitMap();
    return input.replace(/\d/g, digit => digitMap[digit] || digit);
  }
  /**
   * Format number using the custom numbering system.
   *
   * @since 9.5.0
   * @param value The number to format.
   * @returns The formatted number.
   */
  formatNumber(value) {
    return this.replaceDigits(value.toString());
  }
}
/**
 * The default date library with English locale.
 *
 * @since 9.2.0
 */
const defaultDateLib = new DateLib();

function getClassNamesForModifiers(modifiers, classNames, modifiersClassNames = {}) {
  const modifierClassNames = Object.entries(modifiers).filter(([, active]) => active === true).reduce((previousValue, [key]) => {
    if (modifiersClassNames[key]) {
      previousValue.push(modifiersClassNames[key]);
    } else if (classNames[DayFlag[key]]) {
      previousValue.push(classNames[DayFlag[key]]);
    } else if (classNames[SelectionState[key]]) {
      previousValue.push(classNames[SelectionState[key]]);
    }
    return previousValue;
  }, [classNames[UI.Day]]);
  return modifierClassNames;
}

/**
 * Render the button elements in the calendar.
 *
 * @private
 * @deprecated Use `PreviousMonthButton` or `@link NextMonthButton` instead.
 */
function Button(props) {
  return /*#__PURE__*/React__default.createElement("button", {
    ...props
  });
}

/**
 * Render the label in the month caption.
 *
 * @group Components
 * @see https://daypicker.dev/guides/custom-components
 */
function CaptionLabel(props) {
  return /*#__PURE__*/React__default.createElement("span", {
    ...props
  });
}

/**
 * Render the chevron icon used in the navigation buttons and dropdowns.
 *
 * @group Components
 * @see https://daypicker.dev/guides/custom-components
 */
function Chevron(props) {
  const {
    size = 24,
    orientation = "left",
    className
  } = props;
  return /*#__PURE__*/React__default.createElement("svg", {
    className: className,
    width: size,
    height: size,
    viewBox: "0 0 24 24"
  }, orientation === "up" && (/*#__PURE__*/React__default.createElement("polygon", {
    points: "6.77 17 12.5 11.43 18.24 17 20 15.28 12.5 8 5 15.28"
  })), orientation === "down" && (/*#__PURE__*/React__default.createElement("polygon", {
    points: "6.77 8 12.5 13.57 18.24 8 20 9.72 12.5 17 5 9.72"
  })), orientation === "left" && (/*#__PURE__*/React__default.createElement("polygon", {
    points: "16 18.112 9.81111111 12 16 5.87733333 14.0888889 4 6 12 14.0888889 20"
  })), orientation === "right" && (/*#__PURE__*/React__default.createElement("polygon", {
    points: "8 18.612 14.1888889 12.5 8 6.37733333 9.91111111 4.5 18 12.5 9.91111111 20.5"
  })));
}

/**
 * Render the gridcell of a day in the calendar and handle the interaction and
 * the focus with they day.
 *
 * If you need to just change the content of the day cell, consider swapping the
 * `DayButton` component instead.
 *
 * @group Components
 * @see https://daypicker.dev/guides/custom-components
 */
function Day(props) {
  const {
    day,
    modifiers,
    ...tdProps
  } = props;
  return /*#__PURE__*/React__default.createElement("td", {
    ...tdProps
  });
}

/**
 * Render the button for a day in the calendar.
 *
 * @group Components
 * @see https://daypicker.dev/guides/custom-components
 */
function DayButton(props) {
  const {
    day,
    modifiers,
    ...buttonProps
  } = props;
  const ref = React__default.useRef(null);
  React__default.useEffect(() => {
    if (modifiers.focused) ref.current?.focus();
  }, [modifiers.focused]);
  return /*#__PURE__*/React__default.createElement("button", {
    ref: ref,
    ...buttonProps
  });
}

/**
 * Render a dropdown component to use in the navigation bar.
 *
 * @group Components
 * @see https://daypicker.dev/guides/custom-components
 */
function Dropdown(props) {
  const {
    options,
    className,
    components,
    classNames,
    ...selectProps
  } = props;
  const cssClassSelect = [classNames[UI.Dropdown], className].join(" ");
  const selectedOption = options?.find(({
    value
  }) => value === selectProps.value);
  return /*#__PURE__*/React__default.createElement("span", {
    "data-disabled": selectProps.disabled,
    className: classNames[UI.DropdownRoot]
  }, /*#__PURE__*/React__default.createElement(components.Select, {
    className: cssClassSelect,
    ...selectProps
  }, options?.map(({
    value,
    label,
    disabled
  }) => (/*#__PURE__*/React__default.createElement(components.Option, {
    key: value,
    value: value,
    disabled: disabled
  }, label)))), /*#__PURE__*/React__default.createElement("span", {
    className: classNames[UI.CaptionLabel],
    "aria-hidden": true
  }, selectedOption?.label, /*#__PURE__*/React__default.createElement(components.Chevron, {
    orientation: "down",
    size: 18,
    className: classNames[UI.Chevron]
  })));
}

/**
 * Render the the navigation dropdowns.
 *
 * @group Components
 * @see https://daypicker.dev/guides/custom-components
 */
function DropdownNav(props) {
  return /*#__PURE__*/React__default.createElement("div", {
    ...props
  });
}

/**
 * Component wrapping the footer.
 *
 * @group Components
 * @see https://daypicker.dev/guides/custom-components
 */
function Footer(props) {
  return /*#__PURE__*/React__default.createElement("div", {
    ...props
  });
}

/**
 * Render the grid with the weekday header row and the weeks for the given
 * month.
 *
 * @group Components
 * @see https://daypicker.dev/guides/custom-components
 */
function Month(props) {
  const {
    calendarMonth,
    displayIndex,
    ...divProps
  } = props;
  return /*#__PURE__*/React__default.createElement("div", {
    ...divProps
  }, props.children);
}

/**
 * Render the caption of a month in the calendar.
 *
 * @group Components
 * @see https://daypicker.dev/guides/custom-components
 */
function MonthCaption(props) {
  const {
    calendarMonth,
    displayIndex,
    ...divProps
  } = props;
  return /*#__PURE__*/React__default.createElement("div", {
    ...divProps
  });
}

/**
 * Render the grid of days in a month.
 *
 * @group Components
 * @see https://daypicker.dev/guides/custom-components
 */
function MonthGrid(props) {
  return /*#__PURE__*/React__default.createElement("table", {
    ...props
  });
}

/**
 * Component wrapping the month grids.
 *
 * @group Components
 * @see https://daypicker.dev/guides/custom-components
 */
function Months(props) {
  return /*#__PURE__*/React__default.createElement("div", {
    ...props
  });
}

/** @ignore */
const dayPickerContext = /*#__PURE__*/createContext(undefined);
/**
 * Returns the context to work with `<DayPicker />` inside custom components.
 *
 * This hook provides access to the DayPicker context, which includes various
 * properties and methods to interact with the DayPicker component. It must be
 * used within a custom component.
 *
 * @template T - Use this type to refine the returned context type with a
 *   specific selection mode.
 * @returns {DayPickerContext<T>} The context to work with DayPicker.
 * @throws {Error} If the hook is used outside of a DayPicker provider.
 * @group Hooks
 * @see https://daypicker.dev/guides/custom-components
 */
function useDayPicker() {
  const context = useContext(dayPickerContext);
  if (context === undefined) {
    throw new Error("useDayPicker() must be used within a custom component.");
  }
  return context;
}

/**
 * Render the dropdown to navigate between months.
 *
 * @group Components
 * @see https://daypicker.dev/guides/custom-components
 */
function MonthsDropdown(props) {
  const {
    components
  } = useDayPicker();
  return /*#__PURE__*/React__default.createElement(components.Dropdown, {
    ...props
  });
}

/**
 * Render the toolbar with the navigation button.
 *
 * @group Components
 * @see https://daypicker.dev/guides/custom-components
 */
function Nav(props) {
  const {
    onPreviousClick,
    onNextClick,
    previousMonth,
    nextMonth,
    ...navProps
  } = props;
  const {
    components,
    classNames,
    labels: {
      labelPrevious,
      labelNext
    }
  } = useDayPicker();
  const handleNextClick = useCallback(e => {
    if (nextMonth) {
      onNextClick?.(e);
    }
  }, [nextMonth, onNextClick]);
  const handlePreviousClick = useCallback(e => {
    if (previousMonth) {
      onPreviousClick?.(e);
    }
  }, [previousMonth, onPreviousClick]);
  return /*#__PURE__*/React__default.createElement("nav", {
    ...navProps
  }, /*#__PURE__*/React__default.createElement(components.PreviousMonthButton, {
    type: "button",
    className: classNames[UI.PreviousMonthButton],
    tabIndex: previousMonth ? undefined : -1,
    "aria-disabled": previousMonth ? undefined : true,
    "aria-label": labelPrevious(previousMonth),
    onClick: handlePreviousClick
  }, /*#__PURE__*/React__default.createElement(components.Chevron, {
    disabled: previousMonth ? undefined : true,
    className: classNames[UI.Chevron],
    orientation: "left"
  })), /*#__PURE__*/React__default.createElement(components.NextMonthButton, {
    type: "button",
    className: classNames[UI.NextMonthButton],
    tabIndex: nextMonth ? undefined : -1,
    "aria-disabled": nextMonth ? undefined : true,
    "aria-label": labelNext(nextMonth),
    onClick: handleNextClick
  }, /*#__PURE__*/React__default.createElement(components.Chevron, {
    disabled: nextMonth ? undefined : true,
    orientation: "right",
    className: classNames[UI.Chevron]
  })));
}

/**
 * Render the next month button element in the calendar.
 *
 * @group Components
 * @see https://daypicker.dev/guides/custom-components
 */
function NextMonthButton(props) {
  const {
    components
  } = useDayPicker();
  return /*#__PURE__*/React__default.createElement(components.Button, {
    ...props
  });
}

/**
 * Render the `option` element.
 *
 * @group Components
 * @see https://daypicker.dev/guides/custom-components
 */
function Option(props) {
  return /*#__PURE__*/React__default.createElement("option", {
    ...props
  });
}

/**
 * Render the previous month button element in the calendar.
 *
 * @group Components
 * @see https://daypicker.dev/guides/custom-components
 */
function PreviousMonthButton(props) {
  const {
    components
  } = useDayPicker();
  return /*#__PURE__*/React__default.createElement(components.Button, {
    ...props
  });
}

/**
 * Render the root element.
 *
 * @group Components
 * @see https://daypicker.dev/guides/custom-components
 */
function Root(props) {
  const {
    rootRef,
    ...rest
  } = props;
  return /*#__PURE__*/React__default.createElement("div", {
    ...rest,
    ref: rootRef
  });
}

/**
 * Render the `select` element.
 *
 * @group Components
 * @see https://daypicker.dev/guides/custom-components
 */
function Select$1(props) {
  return /*#__PURE__*/React__default.createElement("select", {
    ...props
  });
}

/**
 * Render a row in the calendar, with the days and the week number.
 *
 * @group Components
 * @see https://daypicker.dev/guides/custom-components
 */
function Week(props) {
  const {
    week,
    ...trProps
  } = props;
  return /*#__PURE__*/React__default.createElement("tr", {
    ...trProps
  });
}

/**
 * Render the column header with the weekday name (e.g. "Mo", "Tu", etc.).
 *
 * @group Components
 * @see https://daypicker.dev/guides/custom-components
 */
function Weekday(props) {
  return /*#__PURE__*/React__default.createElement("th", {
    ...props
  });
}

/**
 * Render the row with the weekday names.
 *
 * @group Components
 * @see https://daypicker.dev/guides/custom-components
 */
function Weekdays(props) {
  return /*#__PURE__*/React__default.createElement("thead", {
    "aria-hidden": true
  }, /*#__PURE__*/React__default.createElement("tr", {
    ...props
  }));
}

/**
 * Render the cell with the number of the week.
 *
 * @group Components
 * @see https://daypicker.dev/guides/custom-components
 */
function WeekNumber(props) {
  const {
    week,
    ...thProps
  } = props;
  return /*#__PURE__*/React__default.createElement("th", {
    ...thProps
  });
}

/**
 * Render the column header for the week numbers.
 *
 * @group Components
 * @see https://daypicker.dev/guides/custom-components
 */
function WeekNumberHeader(props) {
  return /*#__PURE__*/React__default.createElement("th", {
    ...props
  });
}

/**
 * Render the weeks in the month grid.
 *
 * @group Components
 * @see https://daypicker.dev/guides/custom-components
 */
function Weeks(props) {
  return /*#__PURE__*/React__default.createElement("tbody", {
    ...props
  });
}

/**
 * Render the dropdown to navigate between years.
 *
 * @group Components
 * @see https://daypicker.dev/guides/custom-components
 */
function YearsDropdown(props) {
  const {
    components
  } = useDayPicker();
  return /*#__PURE__*/React__default.createElement(components.Dropdown, {
    ...props
  });
}

var components = /*#__PURE__*/Object.freeze({
    __proto__: null,
    Button: Button,
    CaptionLabel: CaptionLabel,
    Chevron: Chevron,
    Day: Day,
    DayButton: DayButton,
    Dropdown: Dropdown,
    DropdownNav: DropdownNav,
    Footer: Footer,
    Month: Month,
    MonthCaption: MonthCaption,
    MonthGrid: MonthGrid,
    Months: Months,
    MonthsDropdown: MonthsDropdown,
    Nav: Nav,
    NextMonthButton: NextMonthButton,
    Option: Option,
    PreviousMonthButton: PreviousMonthButton,
    Root: Root,
    Select: Select$1,
    Week: Week,
    WeekNumber: WeekNumber,
    WeekNumberHeader: WeekNumberHeader,
    Weekday: Weekday,
    Weekdays: Weekdays,
    Weeks: Weeks,
    YearsDropdown: YearsDropdown
});

function getComponents(customComponents) {
  return {
    ...components,
    ...customComponents
  };
}

/** Return the `data-` attributes from the props. */
function getDataAttributes(props) {
  const dataAttributes = {
    "data-mode": props.mode ?? undefined,
    "data-required": "required" in props ? props.required : undefined,
    "data-multiple-months": props.numberOfMonths && props.numberOfMonths > 1 || undefined,
    "data-week-numbers": props.showWeekNumber || undefined,
    "data-broadcast-calendar": props.broadcastCalendar || undefined
  };
  Object.entries(props).forEach(([key, val]) => {
    if (key.startsWith("data-")) {
      dataAttributes[key] = val;
    }
  });
  return dataAttributes;
}

/**
 * Get the default class names for the UI elements.
 *
 * @group Utilities
 */
function getDefaultClassNames() {
  const classNames = {};
  for (const key in UI) {
    classNames[UI[key]] = `rdp-${UI[key]}`;
  }
  for (const key in DayFlag) {
    classNames[DayFlag[key]] = `rdp-${DayFlag[key]}`;
  }
  for (const key in SelectionState) {
    classNames[SelectionState[key]] = `rdp-${SelectionState[key]}`;
  }
  for (const key in Animation) {
    classNames[Animation[key]] = `rdp-${Animation[key]}`;
  }
  return classNames;
}

/**
 * Format the caption of the month.
 *
 * @defaultValue `LLLL y` (e.g. "November 2022")
 * @group Formatters
 * @see https://daypicker.dev/docs/translation#custom-formatters
 */
function formatCaption(month, options, dateLib) {
  return (dateLib ?? new DateLib(options)).format(month, "LLLL y");
}
/**
 * @private
 * @deprecated Use {@link formatCaption} instead.
 * @group Formatters
 */
const formatMonthCaption = formatCaption;

/**
 * Format the day date shown in the day cell.
 *
 * @defaultValue `d` (e.g. "1")
 * @group Formatters
 * @see https://daypicker.dev/docs/translation#custom-formatters
 */
function formatDay(date, options, dateLib) {
  return (dateLib ?? new DateLib(options)).format(date, "d");
}

/**
 * Format the month number for the dropdown option label.
 *
 * @defaultValue The localized month name
 * @group Formatters
 * @see https://daypicker.dev/docs/translation#custom-formatters
 */
function formatMonthDropdown(month, dateLib = defaultDateLib) {
  return dateLib.format(month, "LLLL");
}

/**
 * Format the week number.
 *
 * @defaultValue `weekNumber.toLocaleString()` with a leading zero for single-digit numbers
 * @group Formatters
 * @see https://daypicker.dev/docs/translation#custom-formatters
 */
function formatWeekNumber(weekNumber) {
  if (weekNumber < 10) {
    return `0${weekNumber.toLocaleString()}`;
  }
  return `${weekNumber.toLocaleString()}`;
}

/**
 * Format the week number header.
 *
 * @defaultValue `""`
 * @group Formatters
 * @see https://daypicker.dev/docs/translation#custom-formatters
 */
function formatWeekNumberHeader() {
  return ``;
}

/**
 * Format the weekday name to be displayed in the weekdays header.
 *
 * @defaultValue `cccccc` (e.g. "Mo" for Monday)
 * @group Formatters
 * @see https://daypicker.dev/docs/translation#custom-formatters
 */
function formatWeekdayName(weekday, options, dateLib) {
  return (dateLib ?? new DateLib(options)).format(weekday, "cccccc");
}

/**
 * Format the years for the dropdown option label.
 *
 * @group Formatters
 * @see https://daypicker.dev/docs/translation#custom-formatters
 */
function formatYearDropdown(year, dateLib = defaultDateLib) {
  return dateLib.format(year, "yyyy");
}
/**
 * @private
 * @deprecated Use `formatYearDropdown` instead.
 * @group Formatters
 */
const formatYearCaption = formatYearDropdown;

var defaultFormatters = /*#__PURE__*/Object.freeze({
    __proto__: null,
    formatCaption: formatCaption,
    formatDay: formatDay,
    formatMonthCaption: formatMonthCaption,
    formatMonthDropdown: formatMonthDropdown,
    formatWeekNumber: formatWeekNumber,
    formatWeekNumberHeader: formatWeekNumberHeader,
    formatWeekdayName: formatWeekdayName,
    formatYearCaption: formatYearCaption,
    formatYearDropdown: formatYearDropdown
});

/** Return the formatters from the props merged with the default formatters. */
function getFormatters(customFormatters) {
  if (customFormatters?.formatMonthCaption && !customFormatters.formatCaption) {
    customFormatters.formatCaption = customFormatters.formatMonthCaption;
  }
  if (customFormatters?.formatYearCaption && !customFormatters.formatYearDropdown) {
    customFormatters.formatYearDropdown = customFormatters.formatYearCaption;
  }
  return {
    ...defaultFormatters,
    ...customFormatters
  };
}

/** Return the months to show in the dropdown. */
function getMonthOptions(displayMonth, navStart, navEnd, formatters, dateLib) {
  const {
    startOfMonth,
    startOfYear,
    endOfYear,
    eachMonthOfInterval,
    getMonth
  } = dateLib;
  const months = eachMonthOfInterval({
    start: startOfYear(displayMonth),
    end: endOfYear(displayMonth)
  });
  const options = months.map(month => {
    const label = formatters.formatMonthDropdown(month, dateLib);
    const value = getMonth(month);
    const disabled = navStart && month < startOfMonth(navStart) || navEnd && month > startOfMonth(navEnd) || false;
    return {
      value,
      label,
      disabled
    };
  });
  return options;
}

function getStyleForModifiers(dayModifiers, styles = {}, modifiersStyles = {}) {
  let style = {
    ...styles?.[UI.Day]
  };
  Object.entries(dayModifiers).filter(([, active]) => active === true).forEach(([modifier]) => {
    style = {
      ...style,
      ...modifiersStyles?.[modifier]
    };
  });
  return style;
}

/**
 * Generate a series of 7 days, starting from the week, to use for formatting
 * the weekday names (Monday, Tuesday, etc.).
 */
function getWeekdays(/** The date library. */
dateLib, /** Use ISOWeek instead of locale/ */
ISOWeek, /** @since 9.4.0 */
broadcastCalendar) {
  const today = dateLib.today();
  const start = ISOWeek ? dateLib.startOfISOWeek(today) : dateLib.startOfWeek(today);
  const days = [];
  for (let i = 0; i < 7; i++) {
    const day = dateLib.addDays(start, i);
    days.push(day);
  }
  return days;
}

/** Return the years to show in the dropdown. */
function getYearOptions(navStart, navEnd, formatters, dateLib) {
  if (!navStart) return undefined;
  if (!navEnd) return undefined;
  const {
    startOfYear,
    endOfYear,
    addYears,
    getYear,
    isBefore,
    isSameYear
  } = dateLib;
  const firstNavYear = startOfYear(navStart);
  const lastNavYear = endOfYear(navEnd);
  const years = [];
  let year = firstNavYear;
  while (isBefore(year, lastNavYear) || isSameYear(year, lastNavYear)) {
    years.push(year);
    year = addYears(year, 1);
  }
  return years.map(year => {
    const label = formatters.formatYearDropdown(year, dateLib);
    return {
      value: getYear(year),
      label,
      disabled: false
    };
  });
}

/**
 * The ARIA label for the month grid, that will be announced when entering the
 * grid.
 *
 * @defaultValue `LLLL y` (e.g. "November 2022")
 * @group Labels
 * @see https://daypicker.dev/docs/translation#aria-labels
 */
function labelGrid(date, options, dateLib) {
  return (dateLib ?? new DateLib(options)).format(date, "LLLL y");
}
/**
 * @ignore
 * @deprecated Use {@link labelGrid} instead.
 */
const labelCaption = labelGrid;

/**
 * The label for the day gridcell when the calendar is not interactive.
 *
 * @group Labels
 * @see https://daypicker.dev/docs/translation#aria-labels
 */
function labelGridcell(date, /** The modifiers for the day. */
modifiers, options, dateLib) {
  let label = (dateLib ?? new DateLib(options)).format(date, "PPPP");
  if (modifiers?.today) {
    label = `Today, ${label}`;
  }
  return label;
}

/**
 * The ARIA label for the day button.
 *
 * Use the `modifiers` argument to add additional context to the label, e.g.
 * when a day is selected or is today.
 *
 * @defaultValue The formatted date.
 * @group Labels
 * @see https://daypicker.dev/docs/translation#aria-labels
 */
function labelDayButton(date, /** The modifiers for the day. */
modifiers, options, dateLib) {
  let label = (dateLib ?? new DateLib(options)).format(date, "PPPP");
  if (modifiers.today) label = `Today, ${label}`;
  if (modifiers.selected) label = `${label}, selected`;
  return label;
}
/**
 * @ignore
 * @deprecated Use `labelDayButton` instead.
 */
const labelDay = labelDayButton;

/**
 * The ARIA label for the navigation toolbar.
 *
 * @defaultValue `""`
 * @group Labels
 * @see https://daypicker.dev/docs/translation#aria-labels
 */
function labelNav() {
  return "";
}

/**
 * The ARIA label for the months dropdown.
 *
 * @defaultValue `"Choose the Month"`
 * @group Labels
 * @see https://daypicker.dev/docs/translation#aria-labels
 */
function labelMonthDropdown(options) {
  return "Choose the Month";
}

/**
 * The ARIA label for next month button.
 *
 * @defaultValue `"Go to the Next Month"`
 * @group Labels
 * @see https://daypicker.dev/docs/translation#aria-labels
 */
function labelNext(/** `undefined` where there's no next month to navigate to. */
month) {
  return "Go to the Next Month";
}

/**
 * The ARIA label for previous month button.
 *
 * @defaultValue `"Go to the Previous Month"`
 * @group Labels
 * @see https://daypicker.dev/docs/translation#aria-labels
 */
function labelPrevious(/** Undefined where there's no previous month to navigate to. */
month) {
  return "Go to the Previous Month";
}

/**
 * The ARIA label for the Weekday column header.
 *
 * @defaultValue `"Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"`
 * @group Labels
 * @see https://daypicker.dev/docs/translation#aria-labels
 */
function labelWeekday(date, options, dateLib) {
  return (dateLib ?? new DateLib(options)).format(date, "cccc");
}

/**
 * The ARIA label for the week number cell (the first cell in the row).
 *
 * @defaultValue `Week ${weekNumber}`
 * @group Labels
 * @see https://daypicker.dev/docs/translation#aria-labels
 */
function labelWeekNumber(weekNumber, options) {
  return `Week ${weekNumber}`;
}

/**
 * The ARIA label for the week number header element.
 *
 * @defaultValue `"Week Number"`
 * @group Labels
 * @see https://daypicker.dev/docs/translation#aria-labels
 */
function labelWeekNumberHeader(options) {
  return "Week Number";
}

/**
 * The ARIA label for the years dropdown.
 *
 * @defaultValue `"Choose the Year"`
 * @group Labels
 * @see https://daypicker.dev/docs/translation#aria-labels
 */
function labelYearDropdown(options) {
  return "Choose the Year";
}

var defaultLabels = /*#__PURE__*/Object.freeze({
    __proto__: null,
    labelCaption: labelCaption,
    labelDay: labelDay,
    labelDayButton: labelDayButton,
    labelGrid: labelGrid,
    labelGridcell: labelGridcell,
    labelMonthDropdown: labelMonthDropdown,
    labelNav: labelNav,
    labelNext: labelNext,
    labelPrevious: labelPrevious,
    labelWeekNumber: labelWeekNumber,
    labelWeekNumberHeader: labelWeekNumberHeader,
    labelWeekday: labelWeekday,
    labelYearDropdown: labelYearDropdown
});

const asHtmlElement = element => {
  if (element instanceof HTMLElement) return element;
  return null;
};
const queryMonthEls = element => [...(element.querySelectorAll("[data-animated-month]") ?? [])];
const queryMonthEl = element => asHtmlElement(element.querySelector("[data-animated-month]"));
const queryCaptionEl = element => asHtmlElement(element.querySelector("[data-animated-caption]"));
const queryWeeksEl = element => asHtmlElement(element.querySelector("[data-animated-weeks]"));
const queryNavEl = element => asHtmlElement(element.querySelector("[data-animated-nav]"));
const queryWeekdaysEl = element => asHtmlElement(element.querySelector("[data-animated-weekdays]"));
/** @private */
function useAnimation(rootElRef, enabled, {
  classNames,
  months,
  focused,
  dateLib
}) {
  const previousRootElSnapshotRef = useRef(null);
  const previousMonthsRef = useRef(months);
  const animatingRef = useRef(false);
  useLayoutEffect(() => {
    // get previous months before updating the previous months ref
    const previousMonths = previousMonthsRef.current;
    // update previous months ref for next effect trigger
    previousMonthsRef.current = months;
    if (!enabled || !rootElRef.current ||
    // safety check because the ref can be set to anything by consumers
    !(rootElRef.current instanceof HTMLElement) ||
    // validation required for the animation to work as expected
    months.length === 0 || previousMonths.length === 0 || months.length !== previousMonths.length) {
      return;
    }
    const isSameMonth = dateLib.isSameMonth(months[0].date, previousMonths[0].date);
    const isAfterPreviousMonth = dateLib.isAfter(months[0].date, previousMonths[0].date);
    const captionAnimationClass = isAfterPreviousMonth ? classNames[Animation.caption_after_enter] : classNames[Animation.caption_before_enter];
    const weeksAnimationClass = isAfterPreviousMonth ? classNames[Animation.weeks_after_enter] : classNames[Animation.weeks_before_enter];
    // get previous root element snapshot before updating the snapshot ref
    const previousRootElSnapshot = previousRootElSnapshotRef.current;
    // update snapshot for next effect trigger
    const rootElSnapshot = rootElRef.current.cloneNode(true);
    if (rootElSnapshot instanceof HTMLElement) {
      // if this effect is triggered while animating, we need to clean up the new root snapshot
      // to put it in the same state as when not animating, to correctly animate the next month change
      const currentMonthElsSnapshot = queryMonthEls(rootElSnapshot);
      currentMonthElsSnapshot.forEach(currentMonthElSnapshot => {
        if (!(currentMonthElSnapshot instanceof HTMLElement)) return;
        // remove the old month snapshots from the new root snapshot
        const previousMonthElSnapshot = queryMonthEl(currentMonthElSnapshot);
        if (previousMonthElSnapshot && currentMonthElSnapshot.contains(previousMonthElSnapshot)) {
          currentMonthElSnapshot.removeChild(previousMonthElSnapshot);
        }
        // remove animation classes from the new month snapshots
        const captionEl = queryCaptionEl(currentMonthElSnapshot);
        if (captionEl) {
          captionEl.classList.remove(captionAnimationClass);
        }
        const weeksEl = queryWeeksEl(currentMonthElSnapshot);
        if (weeksEl) {
          weeksEl.classList.remove(weeksAnimationClass);
        }
      });
      previousRootElSnapshotRef.current = rootElSnapshot;
    } else {
      previousRootElSnapshotRef.current = null;
    }
    if (animatingRef.current || isSameMonth ||
    // skip animation if a day is focused because it can cause issues to the animation and is better for a11y
    focused) {
      return;
    }
    const previousMonthEls = previousRootElSnapshot instanceof HTMLElement ? queryMonthEls(previousRootElSnapshot) : [];
    const currentMonthEls = queryMonthEls(rootElRef.current);
    if (currentMonthEls && currentMonthEls.every(el => el instanceof HTMLElement) && previousMonthEls && previousMonthEls.every(el => el instanceof HTMLElement)) {
      animatingRef.current = true;
      // set isolation to isolate to isolate the stacking context during animation
      rootElRef.current.style.isolation = "isolate";
      // set z-index to 1 to ensure the nav is clickable over the other elements being animated
      const navEl = queryNavEl(rootElRef.current);
      if (navEl) {
        navEl.style.zIndex = "1";
      }
      currentMonthEls.forEach((currentMonthEl, index) => {
        const previousMonthEl = previousMonthEls[index];
        if (!previousMonthEl) {
          return;
        }
        // animate new displayed month
        currentMonthEl.style.position = "relative";
        currentMonthEl.style.overflow = "hidden";
        const captionEl = queryCaptionEl(currentMonthEl);
        if (captionEl) {
          captionEl.classList.add(captionAnimationClass);
        }
        const weeksEl = queryWeeksEl(currentMonthEl);
        if (weeksEl) {
          weeksEl.classList.add(weeksAnimationClass);
        }
        // animate new displayed month end
        const cleanUp = () => {
          animatingRef.current = false;
          if (rootElRef.current) {
            rootElRef.current.style.isolation = "";
          }
          if (navEl) {
            navEl.style.zIndex = "";
          }
          if (captionEl) {
            captionEl.classList.remove(captionAnimationClass);
          }
          if (weeksEl) {
            weeksEl.classList.remove(weeksAnimationClass);
          }
          currentMonthEl.style.position = "";
          currentMonthEl.style.overflow = "";
          if (currentMonthEl.contains(previousMonthEl)) {
            currentMonthEl.removeChild(previousMonthEl);
          }
        };
        // animate old displayed month
        previousMonthEl.style.pointerEvents = "none";
        previousMonthEl.style.position = "absolute";
        previousMonthEl.style.overflow = "hidden";
        previousMonthEl.setAttribute("aria-hidden", "true");
        // hide the weekdays container of the old month and only the new one
        const previousWeekdaysEl = queryWeekdaysEl(previousMonthEl);
        if (previousWeekdaysEl) {
          previousWeekdaysEl.style.opacity = "0";
        }
        const previousCaptionEl = queryCaptionEl(previousMonthEl);
        if (previousCaptionEl) {
          previousCaptionEl.classList.add(isAfterPreviousMonth ? classNames[Animation.caption_before_exit] : classNames[Animation.caption_after_exit]);
          previousCaptionEl.addEventListener("animationend", cleanUp);
        }
        const previousWeeksEl = queryWeeksEl(previousMonthEl);
        if (previousWeeksEl) {
          previousWeeksEl.classList.add(isAfterPreviousMonth ? classNames[Animation.weeks_before_exit] : classNames[Animation.weeks_after_exit]);
        }
        currentMonthEl.insertBefore(previousMonthEl, currentMonthEl.firstChild);
      });
    }
  });
}

/** Return all the dates to display in the calendar. */
function getDates(displayMonths, maxDate, props, dateLib) {
  const firstMonth = displayMonths[0];
  const lastMonth = displayMonths[displayMonths.length - 1];
  const {
    ISOWeek,
    fixedWeeks,
    broadcastCalendar
  } = props ?? {};
  const {
    addDays,
    differenceInCalendarDays,
    differenceInCalendarMonths,
    endOfBroadcastWeek,
    endOfISOWeek,
    endOfMonth,
    endOfWeek,
    isAfter,
    startOfBroadcastWeek,
    startOfISOWeek,
    startOfWeek
  } = dateLib;
  const startWeekFirstDate = broadcastCalendar ? startOfBroadcastWeek(firstMonth, dateLib) : ISOWeek ? startOfISOWeek(firstMonth) : startOfWeek(firstMonth);
  const endWeekLastDate = broadcastCalendar ? endOfBroadcastWeek(lastMonth, dateLib) : ISOWeek ? endOfISOWeek(endOfMonth(lastMonth)) : endOfWeek(endOfMonth(lastMonth));
  const nOfDays = differenceInCalendarDays(endWeekLastDate, startWeekFirstDate);
  const nOfMonths = differenceInCalendarMonths(lastMonth, firstMonth) + 1;
  const dates = [];
  for (let i = 0; i <= nOfDays; i++) {
    const date = addDays(startWeekFirstDate, i);
    if (maxDate && isAfter(date, maxDate)) {
      break;
    }
    dates.push(date);
  }
  // If fixed weeks is enabled, add the extra dates to the array
  const nrOfDaysWithFixedWeeks = broadcastCalendar ? 35 : 42;
  const extraDates = nrOfDaysWithFixedWeeks * nOfMonths;
  if (fixedWeeks && dates.length < extraDates) {
    const daysToAdd = extraDates - dates.length;
    for (let i = 0; i < daysToAdd; i++) {
      const date = addDays(dates[dates.length - 1], 1);
      dates.push(date);
    }
  }
  return dates;
}

/**
 * Returns all the days belonging to the calendar by merging the days in the
 * weeks for each month.
 */
function getDays(calendarMonths) {
  const initialDays = [];
  return calendarMonths.reduce((days, month) => {
    const initialDays = [];
    const weekDays = month.weeks.reduce((weekDays, week) => {
      return [...weekDays, ...week.days];
    }, initialDays);
    return [...days, ...weekDays];
  }, initialDays);
}

function getDisplayMonths(firstDisplayedMonth, calendarEndMonth, props, dateLib) {
  const {
    numberOfMonths = 1
  } = props;
  const months = [];
  for (let i = 0; i < numberOfMonths; i++) {
    const month = dateLib.addMonths(firstDisplayedMonth, i);
    if (calendarEndMonth && month > calendarEndMonth) {
      break;
    }
    months.push(month);
  }
  return months;
}

/** Return the start month based on the props passed to DayPicker. */
function getInitialMonth(props, dateLib) {
  const {
    month,
    defaultMonth,
    today = dateLib.today(),
    numberOfMonths = 1,
    endMonth,
    startMonth
  } = props;
  let initialMonth = month || defaultMonth || today;
  const {
    differenceInCalendarMonths,
    addMonths,
    startOfMonth
  } = dateLib;
  // Fix the initialMonth if is after the endMonth
  if (endMonth && differenceInCalendarMonths(endMonth, initialMonth) < 0) {
    const offset = -1 * (numberOfMonths - 1);
    initialMonth = addMonths(endMonth, offset);
  }
  // Fix the initialMonth if is before the startMonth
  if (startMonth && differenceInCalendarMonths(initialMonth, startMonth) < 0) {
    initialMonth = startMonth;
  }
  return startOfMonth(initialMonth);
}

/**
 * Represent the day displayed in the calendar.
 *
 * In DayPicker, a `Day` is a `Date` that can be displayed in the calendar. It
 * is used as extension of the native `Date` object to provide additional
 * information about the day.
 */
class CalendarDay {
  constructor(date, displayMonth, dateLib = defaultDateLib) {
    this.date = date;
    this.displayMonth = displayMonth;
    this.outside = Boolean(displayMonth && !dateLib.isSameMonth(date, displayMonth));
    this.dateLib = dateLib;
  }
  /**
   * Check if the day is the same as the given day: considering if it is in the
   * same display month.
   */
  isEqualTo(day) {
    return this.dateLib.isSameDay(day.date, this.date) && this.dateLib.isSameMonth(day.displayMonth, this.displayMonth);
  }
}

/** Represent a month in a calendar year. Contains the weeks within the month. */
class CalendarMonth {
  constructor(month, weeks) {
    this.date = month;
    this.weeks = weeks;
  }
}

/** Represent a week in a calendar month. */
class CalendarWeek {
  constructor(weekNumber, days) {
    this.days = days;
    this.weekNumber = weekNumber;
  }
}

/** Return the months to display in the calendar. */
function getMonths(/** The months (as dates) to display in the calendar. */
displayMonths, /** The dates to display in the calendar. */
dates, /** Options from the props context. */
props, dateLib) {
  const {
    addDays,
    endOfBroadcastWeek,
    endOfISOWeek,
    endOfMonth,
    endOfWeek,
    getISOWeek,
    getWeek,
    startOfBroadcastWeek,
    startOfISOWeek,
    startOfWeek
  } = dateLib;
  const dayPickerMonths = displayMonths.reduce((months, month) => {
    const firstDateOfFirstWeek = props.broadcastCalendar ? startOfBroadcastWeek(month, dateLib) : props.ISOWeek ? startOfISOWeek(month) : startOfWeek(month);
    const lastDateOfLastWeek = props.broadcastCalendar ? endOfBroadcastWeek(month, dateLib) : props.ISOWeek ? endOfISOWeek(endOfMonth(month)) : endOfWeek(endOfMonth(month));
    /** The dates to display in the month. */
    const monthDates = dates.filter(date => {
      return date >= firstDateOfFirstWeek && date <= lastDateOfLastWeek;
    });
    const nrOfDaysWithFixedWeeks = props.broadcastCalendar ? 35 : 42;
    if (props.fixedWeeks && monthDates.length < nrOfDaysWithFixedWeeks) {
      const extraDates = dates.filter(date => {
        const daysToAdd = nrOfDaysWithFixedWeeks - monthDates.length;
        return date > lastDateOfLastWeek && date <= addDays(lastDateOfLastWeek, daysToAdd);
      });
      monthDates.push(...extraDates);
    }
    const weeks = monthDates.reduce((weeks, date) => {
      const weekNumber = props.ISOWeek ? getISOWeek(date) : getWeek(date);
      const week = weeks.find(week => week.weekNumber === weekNumber);
      const day = new CalendarDay(date, month, dateLib);
      if (!week) {
        weeks.push(new CalendarWeek(weekNumber, [day]));
      } else {
        week.days.push(day);
      }
      return weeks;
    }, []);
    const dayPickerMonth = new CalendarMonth(month, weeks);
    months.push(dayPickerMonth);
    return months;
  }, []);
  if (!props.reverseMonths) {
    return dayPickerMonths;
  } else {
    return dayPickerMonths.reverse();
  }
}

/** Return the start and end months for the calendar navigation. */
function getNavMonths(props, dateLib) {
  let {
    startMonth,
    endMonth
  } = props;
  const {
    startOfYear,
    startOfDay,
    startOfMonth,
    endOfMonth,
    addYears,
    endOfYear,
    newDate,
    today
  } = dateLib;
  // Handle deprecated code
  const {
    fromYear,
    toYear,
    fromMonth,
    toMonth
  } = props;
  if (!startMonth && fromMonth) {
    startMonth = fromMonth;
  }
  if (!startMonth && fromYear) {
    startMonth = dateLib.newDate(fromYear, 0, 1);
  }
  if (!endMonth && toMonth) {
    endMonth = toMonth;
  }
  if (!endMonth && toYear) {
    endMonth = newDate(toYear, 11, 31);
  }
  const hasYearDropdown = props.captionLayout === "dropdown" || props.captionLayout === "dropdown-years";
  if (startMonth) {
    startMonth = startOfMonth(startMonth);
  } else if (fromYear) {
    startMonth = newDate(fromYear, 0, 1);
  } else if (!startMonth && hasYearDropdown) {
    startMonth = startOfYear(addYears(props.today ?? today(), -100));
  }
  if (endMonth) {
    endMonth = endOfMonth(endMonth);
  } else if (toYear) {
    endMonth = newDate(toYear, 11, 31);
  } else if (!endMonth && hasYearDropdown) {
    endMonth = endOfYear(props.today ?? today());
  }
  return [startMonth ? startOfDay(startMonth) : startMonth, endMonth ? startOfDay(endMonth) : endMonth];
}

/**
 * Return the next month the user can navigate to according to the given
 * options.
 *
 * Please note that the next month is not always the next calendar month:
 *
 * - If after the `calendarEndMonth` range, is `undefined`;
 * - If the navigation is paged , is the number of months displayed ahead.
 */
function getNextMonth(firstDisplayedMonth, calendarEndMonth, options, dateLib) {
  if (options.disableNavigation) {
    return undefined;
  }
  const {
    pagedNavigation,
    numberOfMonths = 1
  } = options;
  const {
    startOfMonth,
    addMonths,
    differenceInCalendarMonths
  } = dateLib;
  const offset = pagedNavigation ? numberOfMonths : 1;
  const month = startOfMonth(firstDisplayedMonth);
  if (!calendarEndMonth) {
    return addMonths(month, offset);
  }
  const monthsDiff = differenceInCalendarMonths(calendarEndMonth, firstDisplayedMonth);
  if (monthsDiff < numberOfMonths) {
    return undefined;
  }
  // Jump forward as the number of months when paged navigation
  return addMonths(month, offset);
}

/**
 * Return the next previous the user can navigate to, according to the given
 * options.
 *
 * Please note that the previous month is not always the previous calendar
 * month:
 *
 * - If before the `calendarStartMonth` date, is `undefined`;
 * - If the navigation is paged, is the number of months displayed before.
 */
function getPreviousMonth(firstDisplayedMonth, calendarStartMonth, options, dateLib) {
  if (options.disableNavigation) {
    return undefined;
  }
  const {
    pagedNavigation,
    numberOfMonths
  } = options;
  const {
    startOfMonth,
    addMonths,
    differenceInCalendarMonths
  } = dateLib;
  const offset = pagedNavigation ? numberOfMonths ?? 1 : 1;
  const month = startOfMonth(firstDisplayedMonth);
  if (!calendarStartMonth) {
    return addMonths(month, -offset);
  }
  const monthsDiff = differenceInCalendarMonths(month, calendarStartMonth);
  if (monthsDiff <= 0) {
    return undefined;
  }
  return addMonths(month, -offset);
}

/** Returns an array of calendar weeks from an array of calendar months. */
function getWeeks(months) {
  const initialWeeks = [];
  return months.reduce((weeks, month) => {
    return [...weeks, ...month.weeks];
  }, initialWeeks);
}

/**
 * A custom hook for managing both controlled and uncontrolled component states.
 *
 * @example
 *   // Uncontrolled usage
 *   const [value, setValue] = useControlledValue(0, undefined);
 *
 *   // Controlled usage
 *   const [value, setValue] = useControlledValue(0, props.value);
 *
 * @template T - The type of the value.
 * @param {T} defaultValue - The initial value for the uncontrolled state.
 * @param {T | undefined} controlledValue - The value for the controlled state.
 *   If undefined, the component will use the uncontrolled state.
 * @returns {[T, DispatchStateAction<T>]} - Returns a tuple where the first
 *   element is the current value (either controlled or uncontrolled) and the
 *   second element is a setter function to update the value.
 */
function useControlledValue(defaultValue, controlledValue) {
  const [uncontrolledValue, setValue] = useState(defaultValue);
  const value = controlledValue === undefined ? uncontrolledValue : controlledValue;
  return [value, setValue];
}

/** @private */
function useCalendar(props, dateLib) {
  const [navStart, navEnd] = getNavMonths(props, dateLib);
  const {
    startOfMonth,
    endOfMonth
  } = dateLib;
  const initialMonth = getInitialMonth(props, dateLib);
  const [firstMonth, setFirstMonth] = useControlledValue(initialMonth,
  // initialMonth is always computed from props.month if provided
  props.month ? initialMonth : undefined);
  useEffect(() => {
    const newInitialMonth = getInitialMonth(props, dateLib);
    setFirstMonth(newInitialMonth);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.timeZone]);
  /** The months displayed in the calendar. */
  const displayMonths = getDisplayMonths(firstMonth, navEnd, props, dateLib);
  /** The dates displayed in the calendar. */
  const dates = getDates(displayMonths, props.endMonth ? endOfMonth(props.endMonth) : undefined, props, dateLib);
  /** The Months displayed in the calendar. */
  const months = getMonths(displayMonths, dates, props, dateLib);
  /** The Weeks displayed in the calendar. */
  const weeks = getWeeks(months);
  /** The Days displayed in the calendar. */
  const days = getDays(months);
  const previousMonth = getPreviousMonth(firstMonth, navStart, props, dateLib);
  const nextMonth = getNextMonth(firstMonth, navEnd, props, dateLib);
  const {
    disableNavigation,
    onMonthChange
  } = props;
  const isDayInCalendar = day => weeks.some(week => week.days.some(d => d.isEqualTo(day)));
  const goToMonth = date => {
    if (disableNavigation) {
      return;
    }
    let newMonth = startOfMonth(date);
    // if month is before start, use the first month instead
    if (navStart && newMonth < startOfMonth(navStart)) {
      newMonth = startOfMonth(navStart);
    }
    // if month is after endMonth, use the last month instead
    if (navEnd && newMonth > startOfMonth(navEnd)) {
      newMonth = startOfMonth(navEnd);
    }
    setFirstMonth(newMonth);
    onMonthChange?.(newMonth);
  };
  const goToDay = day => {
    // is this check necessary?
    if (isDayInCalendar(day)) {
      return;
    }
    goToMonth(day.date);
  };
  const calendar = {
    months,
    weeks,
    days,
    navStart,
    navEnd,
    previousMonth,
    nextMonth,
    goToMonth,
    goToDay
  };
  return calendar;
}

function calculateFocusTarget(days, getModifiers, isSelected, lastFocused) {
  let focusTarget;
  let index = 0;
  let found = false;
  while (index < days.length && !found) {
    const day = days[index];
    const modifiers = getModifiers(day);
    if (!modifiers[DayFlag.disabled] && !modifiers[DayFlag.hidden] && !modifiers[DayFlag.outside]) {
      if (modifiers[DayFlag.focused]) {
        focusTarget = day;
        found = true;
      } else if (lastFocused?.isEqualTo(day)) {
        focusTarget = day;
        found = true;
      } else if (isSelected(day.date)) {
        focusTarget = day;
        found = true;
      } else if (modifiers[DayFlag.today]) {
        focusTarget = day;
        found = true;
      }
    }
    index++;
  }
  if (!focusTarget) {
    // return the first day that is focusable
    focusTarget = days.find(day => {
      const m = getModifiers(day);
      return !m[DayFlag.disabled] && !m[DayFlag.hidden] && !m[DayFlag.outside];
    });
  }
  return focusTarget;
}

/**
 * Determines whether a given date is inside a specified date range.
 *
 * @since 9.0.0
 * @group Utilities
 */
function rangeIncludesDate(range, date, /** If `true`, the ends of the range are excluded. */
excludeEnds = false, dateLib = defaultDateLib) {
  let {
    from,
    to
  } = range;
  const {
    differenceInCalendarDays,
    isSameDay
  } = dateLib;
  if (from && to) {
    const isRangeInverted = differenceInCalendarDays(to, from) < 0;
    if (isRangeInverted) {
      [from, to] = [to, from];
    }
    const isInRange = differenceInCalendarDays(date, from) >= (excludeEnds ? 1 : 0) && differenceInCalendarDays(to, date) >= (excludeEnds ? 1 : 0);
    return isInRange;
  }
  if (!excludeEnds && to) {
    return isSameDay(to, date);
  }
  if (!excludeEnds && from) {
    return isSameDay(from, date);
  }
  return false;
}

/**
 * Returns true if `matcher` is of type {@link DateInterval}.
 *
 * @group Utilities
 */
function isDateInterval(matcher) {
  return Boolean(matcher && typeof matcher === "object" && "before" in matcher && "after" in matcher);
}
/**
 * Returns true if `value` is a {@link DateRange} type.
 *
 * @group Utilities
 */
function isDateRange(value) {
  return Boolean(value && typeof value === "object" && "from" in value);
}
/**
 * Returns true if `value` is of type {@link DateAfter}.
 *
 * @group Utilities
 */
function isDateAfterType(value) {
  return Boolean(value && typeof value === "object" && "after" in value);
}
/**
 * Returns true if `value` is of type {@link DateBefore}.
 *
 * @group Utilities
 */
function isDateBeforeType(value) {
  return Boolean(value && typeof value === "object" && "before" in value);
}
/**
 * Returns true if `value` is a {@link DayOfWeek} type.
 *
 * @group Utilities
 */
function isDayOfWeekType(value) {
  return Boolean(value && typeof value === "object" && "dayOfWeek" in value);
}
/**
 * Returns true if `value` is an array of valid dates.
 *
 * @private
 */
function isDatesArray(value, dateLib) {
  return Array.isArray(value) && value.every(dateLib.isDate);
}

/**
 * Returns whether a day matches against at least one of the given
 * {@link Matcher}.
 *
 * ```tsx
 * const date = new Date(2022, 5, 19);
 * const matcher1: DateRange = {
 *   from: new Date(2021, 12, 21),
 *   to: new Date(2021, 12, 30)
 * };
 * const matcher2: DateRange = {
 *   from: new Date(2022, 5, 1),
 *   to: new Date(2022, 5, 23)
 * };
 * dateMatchModifiers(date, [matcher1, matcher2]); // true, since day is in the matcher1 range.
 * ```
 *
 * @group Utilities
 */
function dateMatchModifiers(date, matchers, dateLib = defaultDateLib) {
  const matchersArr = !Array.isArray(matchers) ? [matchers] : matchers;
  const {
    isSameDay,
    differenceInCalendarDays,
    isAfter
  } = dateLib;
  return matchersArr.some(matcher => {
    if (typeof matcher === "boolean") {
      return matcher;
    }
    if (dateLib.isDate(matcher)) {
      return isSameDay(date, matcher);
    }
    if (isDatesArray(matcher, dateLib)) {
      return matcher.includes(date);
    }
    if (isDateRange(matcher)) {
      return rangeIncludesDate(matcher, date, false, dateLib);
    }
    if (isDayOfWeekType(matcher)) {
      if (!Array.isArray(matcher.dayOfWeek)) {
        return matcher.dayOfWeek === date.getDay();
      }
      return matcher.dayOfWeek.includes(date.getDay());
    }
    if (isDateInterval(matcher)) {
      const diffBefore = differenceInCalendarDays(matcher.before, date);
      const diffAfter = differenceInCalendarDays(matcher.after, date);
      const isDayBefore = diffBefore > 0;
      const isDayAfter = diffAfter < 0;
      const isClosedInterval = isAfter(matcher.before, matcher.after);
      if (isClosedInterval) {
        return isDayAfter && isDayBefore;
      } else {
        return isDayBefore || isDayAfter;
      }
    }
    if (isDateAfterType(matcher)) {
      return differenceInCalendarDays(date, matcher.after) > 0;
    }
    if (isDateBeforeType(matcher)) {
      return differenceInCalendarDays(matcher.before, date) > 0;
    }
    if (typeof matcher === "function") {
      return matcher(date);
    }
    return false;
  });
}

/** Return the next date that should be focused. */
function getFocusableDate(moveBy, moveDir, refDate, navStart, navEnd, props, dateLib) {
  const {
    ISOWeek,
    broadcastCalendar
  } = props;
  const {
    addDays,
    addMonths,
    addWeeks,
    addYears,
    endOfBroadcastWeek,
    endOfISOWeek,
    endOfWeek,
    max,
    min,
    startOfBroadcastWeek,
    startOfISOWeek,
    startOfWeek
  } = dateLib;
  const moveFns = {
    day: addDays,
    week: addWeeks,
    month: addMonths,
    year: addYears,
    startOfWeek: date => broadcastCalendar ? startOfBroadcastWeek(date, dateLib) : ISOWeek ? startOfISOWeek(date) : startOfWeek(date),
    endOfWeek: date => broadcastCalendar ? endOfBroadcastWeek(date, dateLib) : ISOWeek ? endOfISOWeek(date) : endOfWeek(date)
  };
  let focusableDate = moveFns[moveBy](refDate, moveDir === "after" ? 1 : -1);
  if (moveDir === "before" && navStart) {
    focusableDate = max([navStart, focusableDate]);
  } else if (moveDir === "after" && navEnd) {
    focusableDate = min([navEnd, focusableDate]);
  }
  return focusableDate;
}

function getNextFocus(moveBy, moveDir, /** The date that is currently focused. */
refDay, calendarStartMonth, calendarEndMonth, props, dateLib, attempt = 0) {
  if (attempt > 365) {
    // Limit the recursion to 365 attempts
    return undefined;
  }
  const focusableDate = getFocusableDate(moveBy, moveDir, refDay.date,
  // should be refDay? or refDay.date?
  calendarStartMonth, calendarEndMonth, props, dateLib);
  const isDisabled = Boolean(props.disabled && dateMatchModifiers(focusableDate, props.disabled, dateLib));
  const isHidden = Boolean(props.hidden && dateMatchModifiers(focusableDate, props.hidden, dateLib));
  const targetMonth = focusableDate;
  const focusDay = new CalendarDay(focusableDate, targetMonth, dateLib);
  if (!isDisabled && !isHidden) {
    return focusDay;
  }
  // Recursively attempt to find the next focusable date
  return getNextFocus(moveBy, moveDir, focusDay, calendarStartMonth, calendarEndMonth, props, dateLib, attempt + 1);
}

/** @private */
function useFocus(props, calendar, getModifiers, isSelected, dateLib) {
  const {
    autoFocus
  } = props;
  const [lastFocused, setLastFocused] = useState();
  const focusTarget = calculateFocusTarget(calendar.days, getModifiers, isSelected || (() => false), lastFocused);
  const [focusedDay, setFocused] = useState(autoFocus ? focusTarget : undefined);
  const blur = () => {
    setLastFocused(focusedDay);
    setFocused(undefined);
  };
  const moveFocus = (moveBy, moveDir) => {
    if (!focusedDay) return;
    const nextFocus = getNextFocus(moveBy, moveDir, focusedDay, calendar.navStart, calendar.navEnd, props, dateLib);
    if (!nextFocus) return;
    calendar.goToDay(nextFocus);
    setFocused(nextFocus);
  };
  const isFocusTarget = day => {
    return Boolean(focusTarget?.isEqualTo(day));
  };
  const useFocus = {
    isFocusTarget,
    setFocused,
    focused: focusedDay,
    blur,
    moveFocus
  };
  return useFocus;
}

/**
 * Return a function to get the modifiers for a given day.
 *
 * NOTE: this is not an hook, but a factory for `getModifiers`.
 *
 * @private
 */
function useGetModifiers(days, props, dateLib) {
  const {
    disabled,
    hidden,
    modifiers,
    showOutsideDays,
    broadcastCalendar,
    today
  } = props;
  const {
    isSameDay,
    isSameMonth,
    startOfMonth,
    isBefore,
    endOfMonth,
    isAfter
  } = dateLib;
  const startMonth = props.startMonth && startOfMonth(props.startMonth);
  const endMonth = props.endMonth && endOfMonth(props.endMonth);
  const internalModifiersMap = {
    [DayFlag.focused]: [],
    [DayFlag.outside]: [],
    [DayFlag.disabled]: [],
    [DayFlag.hidden]: [],
    [DayFlag.today]: []
  };
  const customModifiersMap = {};
  for (const day of days) {
    const {
      date,
      displayMonth
    } = day;
    const isOutside = Boolean(displayMonth && !isSameMonth(date, displayMonth));
    const isBeforeStartMonth = Boolean(startMonth && isBefore(date, startMonth));
    const isAfterEndMonth = Boolean(endMonth && isAfter(date, endMonth));
    const isDisabled = Boolean(disabled && dateMatchModifiers(date, disabled, dateLib));
    const isHidden = Boolean(hidden && dateMatchModifiers(date, hidden, dateLib)) || isBeforeStartMonth || isAfterEndMonth ||
    // Broadcast calendar will show outside days as default
    !broadcastCalendar && !showOutsideDays && isOutside || broadcastCalendar && showOutsideDays === false && isOutside;
    const isToday = isSameDay(date, today ?? dateLib.today());
    if (isOutside) internalModifiersMap.outside.push(day);
    if (isDisabled) internalModifiersMap.disabled.push(day);
    if (isHidden) internalModifiersMap.hidden.push(day);
    if (isToday) internalModifiersMap.today.push(day);
    // Add custom modifiers
    if (modifiers) {
      Object.keys(modifiers).forEach(name => {
        const modifierValue = modifiers?.[name];
        const isMatch = modifierValue ? dateMatchModifiers(date, modifierValue, dateLib) : false;
        if (!isMatch) return;
        if (customModifiersMap[name]) {
          customModifiersMap[name].push(day);
        } else {
          customModifiersMap[name] = [day];
        }
      });
    }
  }
  return day => {
    // Initialize all the modifiers to false
    const dayFlags = {
      [DayFlag.focused]: false,
      [DayFlag.disabled]: false,
      [DayFlag.hidden]: false,
      [DayFlag.outside]: false,
      [DayFlag.today]: false
    };
    const customModifiers = {};
    // Find the modifiers for the given day
    for (const name in internalModifiersMap) {
      const days = internalModifiersMap[name];
      dayFlags[name] = days.some(d => d === day);
    }
    for (const name in customModifiersMap) {
      customModifiers[name] = customModifiersMap[name].some(d => d === day);
    }
    return {
      ...dayFlags,
      // custom modifiers should override all the previous ones
      ...customModifiers
    };
  };
}

function useMulti(props, dateLib) {
  const {
    selected: initiallySelected,
    required,
    onSelect
  } = props;
  const [internallySelected, setSelected] = useControlledValue(initiallySelected, onSelect ? initiallySelected : undefined);
  const selected = !onSelect ? internallySelected : initiallySelected;
  const {
    isSameDay
  } = dateLib;
  const isSelected = date => {
    return selected?.some(d => isSameDay(d, date)) ?? false;
  };
  const {
    min,
    max
  } = props;
  const select = (triggerDate, modifiers, e) => {
    let newDates = [...(selected ?? [])];
    if (isSelected(triggerDate)) {
      if (selected?.length === min) {
        // Min value reached, do nothing
        return;
      }
      if (required && selected?.length === 1) {
        // Required value already selected do nothing
        return;
      }
      newDates = selected?.filter(d => !isSameDay(d, triggerDate));
    } else {
      if (selected?.length === max) {
        // Max value reached, reset the selection to date
        newDates = [triggerDate];
      } else {
        // Add the date to the selection
        newDates = [...newDates, triggerDate];
      }
    }
    if (!onSelect) {
      setSelected(newDates);
    }
    onSelect?.(newDates, triggerDate, modifiers, e);
    return newDates;
  };
  return {
    selected,
    select,
    isSelected
  };
}

/**
 * Add a day to an existing range.
 *
 * The returned range takes in account the `undefined` values and if the added
 * day is already present in the range.
 *
 * @group Utilities
 */
function addToRange(/** The date to add to the range. */
date, /** The range where to add `date`. */
initialRange, min = 0, max = 0, required = false, /** @ignore */
dateLib = defaultDateLib) {
  const {
    from,
    to
  } = initialRange || {};
  const {
    isSameDay,
    isAfter,
    isBefore
  } = dateLib;
  let range;
  if (!from && !to) {
    // the range is empty, add the date
    range = {
      from: date,
      to: min > 0 ? undefined : date
    };
  } else if (from && !to) {
    // adding date to an incomplete range
    if (isSameDay(from, date)) {
      // adding a date equal to the start of the range
      if (required) {
        range = {
          from,
          to: undefined
        };
      } else {
        range = undefined;
      }
    } else if (isBefore(date, from)) {
      // adding a date before the start of the range
      range = {
        from: date,
        to: from
      };
    } else {
      // adding a date after the start of the range
      range = {
        from,
        to: date
      };
    }
  } else if (from && to) {
    // adding date to a complete range
    if (isSameDay(from, date) && isSameDay(to, date)) {
      // adding a date that is equal to both start and end of the range
      if (required) {
        range = {
          from,
          to
        };
      } else {
        range = undefined;
      }
    } else if (isSameDay(from, date)) {
      // adding a date equal to the the start of the range
      range = {
        from,
        to: min > 0 ? undefined : date
      };
    } else if (isSameDay(to, date)) {
      // adding a dare equal to the end of the range
      range = {
        from: date,
        to: min > 0 ? undefined : date
      };
    } else if (isBefore(date, from)) {
      // adding a date before the start of the range
      range = {
        from: date,
        to: to
      };
    } else if (isAfter(date, from)) {
      // adding a date after the start of the range
      range = {
        from,
        to: date
      };
    } else if (isAfter(date, to)) {
      // adding a date after the end of the range
      range = {
        from,
        to: date
      };
    } else {
      throw new Error("Invalid range");
    }
  }
  // check for min / max
  if (range?.from && range?.to) {
    const diff = dateLib.differenceInCalendarDays(range.to, range.from);
    if (max > 0 && diff > max) {
      range = {
        from: date,
        to: undefined
      };
    } else if (min > 1 && diff < min) {
      range = {
        from: date,
        to: undefined
      };
    }
  }
  return range;
}

/**
 * Returns whether a date range contains one or more days of the week.
 *
 * ```tsx
 * const range: DateRange = {
 *   from: new Date(2024, 8, 1), //  Sunday
 *   to: new Date(2024, 8, 6) //  Thursday
 * };
 * rangeContainsDayOfWeek(date, 1); // true: contains range contains Monday
 * ```
 *
 * @since 9.2.2
 * @group Utilities
 */
function rangeContainsDayOfWeek(range, dayOfWeek, dateLib = defaultDateLib) {
  const dayOfWeekArr = !Array.isArray(dayOfWeek) ? [dayOfWeek] : dayOfWeek;
  let date = range.from;
  const totalDays = dateLib.differenceInCalendarDays(range.to, range.from);
  // iterate at maximum one week or the total days if the range is shorter than one week
  const totalDaysLimit = Math.min(totalDays, 6);
  for (let i = 0; i <= totalDaysLimit; i++) {
    if (dayOfWeekArr.includes(date.getDay())) {
      return true;
    }
    date = dateLib.addDays(date, 1);
  }
  return false;
}

/**
 * Determines whether a given range overlaps with another range.
 *
 * @since 9.2.2
 * @group Utilities
 */
function rangeOverlaps(rangeLeft, rangeRight, dateLib = defaultDateLib) {
  return rangeIncludesDate(rangeLeft, rangeRight.from, false, dateLib) || rangeIncludesDate(rangeLeft, rangeRight.to, false, dateLib) || rangeIncludesDate(rangeRight, rangeLeft.from, false, dateLib) || rangeIncludesDate(rangeRight, rangeLeft.to, false, dateLib);
}

/**
 * Returns whether a range contains dates that match the given modifiers.
 *
 * ```tsx
 * const range: DateRange = {
 *   from: new Date(2021, 12, 21),
 *   to: new Date(2021, 12, 30)
 * };
 * const matcher1: Date = new Date(2021, 12, 21);
 * const matcher2: DateRange = {
 *   from: new Date(2022, 5, 1),
 *   to: new Date(2022, 5, 23)
 * };
 * rangeContainsModifiers(range, [matcher1, matcher2]); // true, since matcher1 is in the date.
 * ```
 *
 * @since 9.2.2
 * @group Utilities
 */
function rangeContainsModifiers(range, modifiers, dateLib = defaultDateLib) {
  const matchers = Array.isArray(modifiers) ? modifiers : [modifiers];
  // Defer function matchers evaluation as they are the least performant.
  const nonFunctionMatchers = matchers.filter(matcher => typeof matcher !== "function");
  const nonFunctionMatchersResult = nonFunctionMatchers.some(matcher => {
    if (typeof matcher === "boolean") return matcher;
    if (dateLib.isDate(matcher)) {
      return rangeIncludesDate(range, matcher, false, dateLib);
    }
    if (isDatesArray(matcher, dateLib)) {
      return matcher.some(date => rangeIncludesDate(range, date, false, dateLib));
    }
    if (isDateRange(matcher)) {
      if (matcher.from && matcher.to) {
        return rangeOverlaps(range, {
          from: matcher.from,
          to: matcher.to
        }, dateLib);
      }
      return false;
    }
    if (isDayOfWeekType(matcher)) {
      return rangeContainsDayOfWeek(range, matcher.dayOfWeek, dateLib);
    }
    if (isDateInterval(matcher)) {
      const isClosedInterval = dateLib.isAfter(matcher.before, matcher.after);
      if (isClosedInterval) {
        return rangeOverlaps(range, {
          from: dateLib.addDays(matcher.after, 1),
          to: dateLib.addDays(matcher.before, -1)
        }, dateLib);
      }
      return dateMatchModifiers(range.from, matcher, dateLib) || dateMatchModifiers(range.to, matcher, dateLib);
    }
    if (isDateAfterType(matcher) || isDateBeforeType(matcher)) {
      return dateMatchModifiers(range.from, matcher, dateLib) || dateMatchModifiers(range.to, matcher, dateLib);
    }
    return false;
  });
  if (nonFunctionMatchersResult) {
    return true;
  }
  const functionMatchers = matchers.filter(matcher => typeof matcher === "function");
  if (functionMatchers.length) {
    let date = range.from;
    const totalDays = dateLib.differenceInCalendarDays(range.to, range.from);
    for (let i = 0; i <= totalDays; i++) {
      if (functionMatchers.some(matcher => matcher(date))) {
        return true;
      }
      date = dateLib.addDays(date, 1);
    }
  }
  return false;
}

function useRange(props, dateLib) {
  const {
    disabled,
    excludeDisabled,
    selected: initiallySelected,
    required,
    onSelect
  } = props;
  const [internallySelected, setSelected] = useControlledValue(initiallySelected, onSelect ? initiallySelected : undefined);
  const selected = !onSelect ? internallySelected : initiallySelected;
  const isSelected = date => selected && rangeIncludesDate(selected, date, false, dateLib);
  const select = (triggerDate, modifiers, e) => {
    const {
      min,
      max
    } = props;
    const newRange = triggerDate ? addToRange(triggerDate, selected, min, max, required, dateLib) : undefined;
    if (excludeDisabled && disabled && newRange?.from && newRange.to) {
      if (rangeContainsModifiers({
        from: newRange.from,
        to: newRange.to
      }, disabled, dateLib)) {
        // if a disabled days is found, the range is reset
        newRange.from = triggerDate;
        newRange.to = undefined;
      }
    }
    if (!onSelect) {
      setSelected(newRange);
    }
    onSelect?.(newRange, triggerDate, modifiers, e);
    return newRange;
  };
  return {
    selected,
    select,
    isSelected
  };
}

function useSingle(props, dateLib) {
  const {
    selected: initiallySelected,
    required,
    onSelect
  } = props;
  const [internallySelected, setSelected] = useControlledValue(initiallySelected, onSelect ? initiallySelected : undefined);
  const selected = !onSelect ? internallySelected : initiallySelected;
  const {
    isSameDay
  } = dateLib;
  const isSelected = compareDate => {
    return selected ? isSameDay(selected, compareDate) : false;
  };
  const select = (triggerDate, modifiers, e) => {
    let newDate = triggerDate;
    if (!required && selected && selected && isSameDay(triggerDate, selected)) {
      // If the date is the same, clear the selection.
      newDate = undefined;
    }
    if (!onSelect) {
      setSelected(newDate);
    }
    if (required) {
      onSelect?.(newDate, triggerDate, modifiers, e);
    } else {
      onSelect?.(newDate, triggerDate, modifiers, e);
    }
    return newDate;
  };
  return {
    selected,
    select,
    isSelected
  };
}

function useSelection(props, dateLib) {
  const single = useSingle(props, dateLib);
  const multi = useMulti(props, dateLib);
  const range = useRange(props, dateLib);
  switch (props.mode) {
    case "single":
      return single;
    case "multiple":
      return multi;
    case "range":
      return range;
    default:
      return undefined;
  }
}

/**
 * Render the date picker calendar.
 *
 * @group DayPicker
 * @see https://daypicker.dev
 */
function DayPicker(props) {
  const {
    components,
    formatters,
    labels,
    dateLib,
    locale,
    classNames
  } = useMemo(() => {
    const locale = {
      ...enUS,
      ...props.locale
    };
    const dateLib = new DateLib({
      locale,
      weekStartsOn: props.broadcastCalendar ? 1 : props.weekStartsOn,
      firstWeekContainsDate: props.firstWeekContainsDate,
      useAdditionalWeekYearTokens: props.useAdditionalWeekYearTokens,
      useAdditionalDayOfYearTokens: props.useAdditionalDayOfYearTokens,
      timeZone: props.timeZone,
      numerals: props.numerals
    }, props.dateLib);
    return {
      dateLib,
      components: getComponents(props.components),
      formatters: getFormatters(props.formatters),
      labels: {
        ...defaultLabels,
        ...props.labels
      },
      locale,
      classNames: {
        ...getDefaultClassNames(),
        ...props.classNames
      }
    };
  }, [props.locale, props.broadcastCalendar, props.weekStartsOn, props.firstWeekContainsDate, props.useAdditionalWeekYearTokens, props.useAdditionalDayOfYearTokens, props.timeZone, props.numerals, props.dateLib, props.components, props.formatters, props.labels, props.classNames]);
  const {
    captionLayout,
    mode,
    onDayBlur,
    onDayClick,
    onDayFocus,
    onDayKeyDown,
    onDayMouseEnter,
    onDayMouseLeave,
    onNextClick,
    onPrevClick,
    showWeekNumber,
    styles
  } = props;
  const {
    formatCaption,
    formatDay,
    formatMonthDropdown,
    formatWeekNumber,
    formatWeekNumberHeader,
    formatWeekdayName,
    formatYearDropdown
  } = formatters;
  const calendar = useCalendar(props, dateLib);
  const {
    days,
    months,
    navStart,
    navEnd,
    previousMonth,
    nextMonth,
    goToMonth
  } = calendar;
  const getModifiers = useGetModifiers(days, props, dateLib);
  const {
    isSelected,
    select,
    selected: selectedValue
  } = useSelection(props, dateLib) ?? {};
  const {
    blur,
    focused,
    isFocusTarget,
    moveFocus,
    setFocused
  } = useFocus(props, calendar, getModifiers, isSelected ?? (() => false), dateLib);
  const {
    labelDayButton,
    labelGridcell,
    labelGrid,
    labelMonthDropdown,
    labelNav,
    labelWeekday,
    labelWeekNumber,
    labelWeekNumberHeader,
    labelYearDropdown
  } = labels;
  const weekdays = useMemo(() => getWeekdays(dateLib, props.ISOWeek), [dateLib, props.ISOWeek]);
  const isInteractive = mode !== undefined || onDayClick !== undefined;
  const handlePreviousClick = useCallback(() => {
    if (!previousMonth) return;
    goToMonth(previousMonth);
    onPrevClick?.(previousMonth);
  }, [previousMonth, goToMonth, onPrevClick]);
  const handleNextClick = useCallback(() => {
    if (!nextMonth) return;
    goToMonth(nextMonth);
    onNextClick?.(nextMonth);
  }, [goToMonth, nextMonth, onNextClick]);
  const handleDayClick = useCallback((day, m) => e => {
    e.preventDefault();
    e.stopPropagation();
    setFocused(day);
    select?.(day.date, m, e);
    onDayClick?.(day.date, m, e);
  }, [select, onDayClick, setFocused]);
  const handleDayFocus = useCallback((day, m) => e => {
    setFocused(day);
    onDayFocus?.(day.date, m, e);
  }, [onDayFocus, setFocused]);
  const handleDayBlur = useCallback((day, m) => e => {
    blur();
    onDayBlur?.(day.date, m, e);
  }, [blur, onDayBlur]);
  const handleDayKeyDown = useCallback((day, modifiers) => e => {
    const keyMap = {
      ArrowLeft: ["day", props.dir === "rtl" ? "after" : "before"],
      ArrowRight: ["day", props.dir === "rtl" ? "before" : "after"],
      ArrowDown: ["week", "after"],
      ArrowUp: ["week", "before"],
      PageUp: [e.shiftKey ? "year" : "month", "before"],
      PageDown: [e.shiftKey ? "year" : "month", "after"],
      Home: ["startOfWeek", "before"],
      End: ["endOfWeek", "after"]
    };
    if (keyMap[e.key]) {
      e.preventDefault();
      e.stopPropagation();
      const [moveBy, moveDir] = keyMap[e.key];
      moveFocus(moveBy, moveDir);
    }
    onDayKeyDown?.(day.date, modifiers, e);
  }, [moveFocus, onDayKeyDown, props.dir]);
  const handleDayMouseEnter = useCallback((day, modifiers) => e => {
    onDayMouseEnter?.(day.date, modifiers, e);
  }, [onDayMouseEnter]);
  const handleDayMouseLeave = useCallback((day, modifiers) => e => {
    onDayMouseLeave?.(day.date, modifiers, e);
  }, [onDayMouseLeave]);
  const handleMonthChange = useCallback(date => e => {
    const selectedMonth = Number(e.target.value);
    const month = dateLib.setMonth(dateLib.startOfMonth(date), selectedMonth);
    goToMonth(month);
  }, [dateLib, goToMonth]);
  const handleYearChange = useCallback(date => e => {
    const selectedYear = Number(e.target.value);
    const month = dateLib.setYear(dateLib.startOfMonth(date), selectedYear);
    goToMonth(month);
  }, [dateLib, goToMonth]);
  const {
    className,
    style
  } = useMemo(() => ({
    className: [classNames[UI.Root], props.className].filter(Boolean).join(" "),
    style: {
      ...styles?.[UI.Root],
      ...props.style
    }
  }), [classNames, props.className, props.style, styles]);
  const dataAttributes = getDataAttributes(props);
  const rootElRef = useRef(null);
  useAnimation(rootElRef, Boolean(props.animate), {
    classNames,
    months,
    focused,
    dateLib
  });
  const contextValue = {
    dayPickerProps: props,
    selected: selectedValue,
    select: select,
    isSelected,
    months,
    nextMonth,
    previousMonth,
    goToMonth,
    getModifiers,
    components,
    classNames,
    styles,
    labels,
    formatters
  };
  return /*#__PURE__*/React__default.createElement(dayPickerContext.Provider, {
    value: contextValue
  }, /*#__PURE__*/React__default.createElement(components.Root, {
    rootRef: props.animate ? rootElRef : undefined,
    className: className,
    style: style,
    dir: props.dir,
    id: props.id,
    lang: props.lang,
    nonce: props.nonce,
    title: props.title,
    role: props.role,
    "aria-label": props["aria-label"],
    ...dataAttributes
  }, /*#__PURE__*/React__default.createElement(components.Months, {
    className: classNames[UI.Months],
    style: styles?.[UI.Months]
  }, !props.hideNavigation && (/*#__PURE__*/React__default.createElement(components.Nav, {
    "data-animated-nav": props.animate ? "true" : undefined,
    className: classNames[UI.Nav],
    style: styles?.[UI.Nav],
    "aria-label": labelNav(),
    onPreviousClick: handlePreviousClick,
    onNextClick: handleNextClick,
    previousMonth: previousMonth,
    nextMonth: nextMonth
  })), months.map((calendarMonth, displayIndex) => {
    const dropdownMonths = getMonthOptions(calendarMonth.date, navStart, navEnd, formatters, dateLib);
    const dropdownYears = getYearOptions(navStart, navEnd, formatters, dateLib);
    return /*#__PURE__*/React__default.createElement(components.Month, {
      "data-animated-month": props.animate ? "true" : undefined,
      className: classNames[UI.Month],
      style: styles?.[UI.Month],
      key: displayIndex,
      displayIndex: displayIndex,
      calendarMonth: calendarMonth
    }, /*#__PURE__*/React__default.createElement(components.MonthCaption, {
      "data-animated-caption": props.animate ? "true" : undefined,
      className: classNames[UI.MonthCaption],
      style: styles?.[UI.MonthCaption],
      calendarMonth: calendarMonth,
      displayIndex: displayIndex
    }, captionLayout?.startsWith("dropdown") ? (/*#__PURE__*/React__default.createElement(components.DropdownNav, {
      className: classNames[UI.Dropdowns],
      style: styles?.[UI.Dropdowns]
    }, captionLayout === "dropdown" || captionLayout === "dropdown-months" ? (/*#__PURE__*/React__default.createElement(components.MonthsDropdown, {
      className: classNames[UI.MonthsDropdown],
      "aria-label": labelMonthDropdown(),
      classNames: classNames,
      components: components,
      disabled: Boolean(props.disableNavigation),
      onChange: handleMonthChange(calendarMonth.date),
      options: dropdownMonths,
      style: styles?.[UI.Dropdown],
      value: dateLib.getMonth(calendarMonth.date)
    })) : (/*#__PURE__*/React__default.createElement("span", null, formatMonthDropdown(calendarMonth.date, dateLib))), captionLayout === "dropdown" || captionLayout === "dropdown-years" ? (/*#__PURE__*/React__default.createElement(components.YearsDropdown, {
      className: classNames[UI.YearsDropdown],
      "aria-label": labelYearDropdown(dateLib.options),
      classNames: classNames,
      components: components,
      disabled: Boolean(props.disableNavigation),
      onChange: handleYearChange(calendarMonth.date),
      options: dropdownYears,
      style: styles?.[UI.Dropdown],
      value: dateLib.getYear(calendarMonth.date)
    })) : (/*#__PURE__*/React__default.createElement("span", null, formatYearDropdown(calendarMonth.date, dateLib))), /*#__PURE__*/React__default.createElement("span", {
      role: "status",
      "aria-live": "polite",
      style: {
        border: 0,
        clip: "rect(0 0 0 0)",
        height: "1px",
        margin: "-1px",
        overflow: "hidden",
        padding: 0,
        position: "absolute",
        width: "1px",
        whiteSpace: "nowrap",
        wordWrap: "normal"
      }
    }, formatCaption(calendarMonth.date, dateLib.options, dateLib)))) : (/*#__PURE__*/React__default.createElement(components.CaptionLabel, {
      className: classNames[UI.CaptionLabel],
      role: "status",
      "aria-live": "polite"
    }, formatCaption(calendarMonth.date, dateLib.options, dateLib)))), /*#__PURE__*/React__default.createElement(components.MonthGrid, {
      role: "grid",
      "aria-multiselectable": mode === "multiple" || mode === "range",
      "aria-label": labelGrid(calendarMonth.date, dateLib.options, dateLib) || undefined,
      className: classNames[UI.MonthGrid],
      style: styles?.[UI.MonthGrid]
    }, !props.hideWeekdays && (/*#__PURE__*/React__default.createElement(components.Weekdays, {
      "data-animated-weekdays": props.animate ? "true" : undefined,
      className: classNames[UI.Weekdays],
      style: styles?.[UI.Weekdays]
    }, showWeekNumber && (/*#__PURE__*/React__default.createElement(components.WeekNumberHeader, {
      "aria-label": labelWeekNumberHeader(dateLib.options),
      className: classNames[UI.WeekNumberHeader],
      style: styles?.[UI.WeekNumberHeader],
      scope: "col"
    }, formatWeekNumberHeader())), weekdays.map((weekday, i) => (/*#__PURE__*/React__default.createElement(components.Weekday, {
      "aria-label": labelWeekday(weekday, dateLib.options, dateLib),
      className: classNames[UI.Weekday],
      key: i,
      style: styles?.[UI.Weekday],
      scope: "col"
    }, formatWeekdayName(weekday, dateLib.options, dateLib)))))), /*#__PURE__*/React__default.createElement(components.Weeks, {
      "data-animated-weeks": props.animate ? "true" : undefined,
      className: classNames[UI.Weeks],
      style: styles?.[UI.Weeks]
    }, calendarMonth.weeks.map((week, weekIndex) => {
      return /*#__PURE__*/React__default.createElement(components.Week, {
        className: classNames[UI.Week],
        key: week.weekNumber,
        style: styles?.[UI.Week],
        week: week
      }, showWeekNumber && (/*#__PURE__*/React__default.createElement(components.WeekNumber, {
        week: week,
        style: styles?.[UI.WeekNumber],
        "aria-label": labelWeekNumber(week.weekNumber, {
          locale
        }),
        className: classNames[UI.WeekNumber],
        scope: "row",
        role: "rowheader"
      }, formatWeekNumber(week.weekNumber))), week.days.map(day => {
        const {
          date
        } = day;
        const modifiers = getModifiers(day);
        modifiers[DayFlag.focused] = !modifiers.hidden && Boolean(focused?.isEqualTo(day));
        modifiers[SelectionState.selected] = isSelected?.(date) || modifiers.selected;
        if (isDateRange(selectedValue)) {
          // add range modifiers
          const {
            from,
            to
          } = selectedValue;
          modifiers[SelectionState.range_start] = Boolean(from && to && dateLib.isSameDay(date, from));
          modifiers[SelectionState.range_end] = Boolean(from && to && dateLib.isSameDay(date, to));
          modifiers[SelectionState.range_middle] = rangeIncludesDate(selectedValue, date, true, dateLib);
        }
        const style = getStyleForModifiers(modifiers, styles, props.modifiersStyles);
        const className = getClassNamesForModifiers(modifiers, classNames, props.modifiersClassNames);
        const ariaLabel = !isInteractive && !modifiers.hidden ? labelGridcell(date, modifiers, dateLib.options, dateLib) : undefined;
        return /*#__PURE__*/React__default.createElement(components.Day, {
          key: `${dateLib.format(date, "yyyy-MM-dd")}_${dateLib.format(day.displayMonth, "yyyy-MM")}`,
          day: day,
          modifiers: modifiers,
          className: className.join(" "),
          style: style,
          role: "gridcell",
          "aria-selected": modifiers.selected || undefined,
          "aria-label": ariaLabel,
          "data-day": dateLib.format(date, "yyyy-MM-dd"),
          "data-month": day.outside ? dateLib.format(date, "yyyy-MM") : undefined,
          "data-selected": modifiers.selected || undefined,
          "data-disabled": modifiers.disabled || undefined,
          "data-hidden": modifiers.hidden || undefined,
          "data-outside": day.outside || undefined,
          "data-focused": modifiers.focused || undefined,
          "data-today": modifiers.today || undefined
        }, !modifiers.hidden && isInteractive ? (/*#__PURE__*/React__default.createElement(components.DayButton, {
          className: classNames[UI.DayButton],
          style: styles?.[UI.DayButton],
          type: "button",
          day: day,
          modifiers: modifiers,
          disabled: modifiers.disabled || undefined,
          tabIndex: isFocusTarget(day) ? 0 : -1,
          "aria-label": labelDayButton(date, modifiers, dateLib.options, dateLib),
          onClick: handleDayClick(day, modifiers),
          onBlur: handleDayBlur(day, modifiers),
          onFocus: handleDayFocus(day, modifiers),
          onKeyDown: handleDayKeyDown(day, modifiers),
          onMouseEnter: handleDayMouseEnter(day, modifiers),
          onMouseLeave: handleDayMouseLeave(day, modifiers)
        }, formatDay(date, dateLib.options, dateLib))) : !modifiers.hidden && formatDay(day.date, dateLib.options, dateLib));
      }));
    }))));
  })), props.footer && (/*#__PURE__*/React__default.createElement(components.Footer, {
    className: classNames[UI.Footer],
    style: styles?.[UI.Footer],
    role: "status",
    "aria-live": "polite"
  }, props.footer))));
}

function Calendar(_a) {
  var className = _a.className,
    classNames = _a.classNames,
    _b = _a.showOutsideDays,
    showOutsideDays = _b === void 0 ? true : _b,
    userComponents = _a.components,
    props = __rest(_a, ["className", "classNames", "showOutsideDays", "components"]);
  var defaultClassNames = {
    months: "relative flex flex-col sm:flex-row gap-4",
    month: "w-full",
    month_caption: "relative mx-10 mb-1 flex h-9 items-center justify-center z-20",
    caption_label: "text-sm font-medium",
    nav: "absolute top-0 flex w-full justify-between z-10",
    button_previous: cn(buttonVariants({
      variant: "ghost"
    }), "size-9 text-muted-foreground/80 hover:text-foreground p-0"),
    button_next: cn(buttonVariants({
      variant: "ghost"
    }), "size-9 text-muted-foreground/80 hover:text-foreground p-0"),
    weekday: "size-9 p-0 text-xs font-medium text-muted-foreground/80",
    day_button: "relative flex size-9 items-center justify-center whitespace-nowrap rounded-md p-0 text-foreground group-[[data-selected]:not(.range-middle)]:[transition-property:color,background-color,border-radius,box-shadow] group-[[data-selected]:not(.range-middle)]:duration-150 group-data-disabled:pointer-events-none focus-visible:z-10 hover:not-in-data-selected:bg-accent group-data-selected:bg-primary hover:not-in-data-selected:text-foreground group-data-selected:text-primary-foreground group-data-disabled:text-foreground/30 group-data-disabled:line-through group-data-outside:text-foreground/30 group-data-selected:group-data-outside:text-primary-foreground outline-none focus-visible:ring-ring/50 focus-visible:ring-[3px] group-[.range-start:not(.range-end)]:rounded-e-none group-[.range-end:not(.range-start)]:rounded-s-none group-[.range-middle]:rounded-none group-[.range-middle]:group-data-selected:bg-accent group-[.range-middle]:group-data-selected:text-foreground",
    day: "group size-9 px-0 py-px text-sm",
    range_start: "range-start",
    range_end: "range-end",
    range_middle: "range-middle",
    today: "*:after:pointer-events-none *:after:absolute *:after:bottom-1 *:after:start-1/2 *:after:z-10 *:after:size-[3px] *:after:-translate-x-1/2 *:after:rounded-full *:after:bg-primary [&[data-selected]:not(.range-middle)>*]:after:bg-background [&[data-disabled]>*]:after:bg-foreground/30 *:after:transition-colors",
    outside: "text-muted-foreground data-selected:bg-accent/50 data-selected:text-muted-foreground",
    hidden: "invisible",
    week_number: "size-9 p-0 text-xs font-medium text-muted-foreground/80"
  };
  var mergedClassNames = Object.keys(defaultClassNames).reduce(function (acc, key) {
    var _a;
    return __assign(__assign({}, acc), (_a = {}, _a[key] = (classNames === null || classNames === void 0 ? void 0 : classNames[key]) ? cn(defaultClassNames[key], classNames[key]) : defaultClassNames[key], _a));
  }, {});
  var defaultComponents = {
    Chevron: function (props) {
      if (props.orientation === "left") {
        return jsx(ChevronLeftIcon, __assign({
          size: 16
        }, props, {
          "aria-hidden": "true"
        }));
      }
      return jsx(ChevronRightIcon, __assign({
        size: 16
      }, props, {
        "aria-hidden": "true"
      }));
    }
  };
  var mergedComponents = __assign(__assign({}, defaultComponents), userComponents);
  return jsx(DayPicker, __assign({
    showOutsideDays: showOutsideDays,
    className: cn("w-fit", className),
    classNames: mergedClassNames,
    components: mergedComponents
  }, props));
}

function Checkbox(_a) {
  var className = _a.className,
    props = __rest(_a, ["className"]);
  return jsx(CheckboxPrimitive.Root, __assign({
    "data-slot": "checkbox",
    className: cn("peer border-input data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground data-[state=checked]:border-primary focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive size-4 shrink-0 rounded-[4px] border shadow-xs transition-shadow outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-500", className)
  }, props, {
    children: jsx(CheckboxPrimitive.Indicator, {
      "data-slot": "checkbox-indicator",
      className: "grid place-content-center text-current",
      children: props.checked === "indeterminate" ? jsx("svg", {
        width: "9",
        height: "9",
        viewBox: "0 0 9 9",
        fill: "currentcolor",
        xmlns: "http://www.w3.org/2000/svg",
        children: jsx("path", {
          fillRule: "evenodd",
          clipRule: "evenodd",
          d: "M0.75 4.5C0.75 4.08579 1.08579 3.75 1.5 3.75H7.5C7.91421 3.75 8.25 4.08579 8.25 4.5C8.25 4.91421 7.91421 5.25 7.5 5.25H1.5C1.08579 5.25 0.75 4.91421 0.75 4.5Z"
        })
      }) : jsx("svg", {
        width: "9",
        height: "9",
        viewBox: "0 0 9 9",
        fill: "currentcolor",
        xmlns: "http://www.w3.org/2000/svg",
        children: jsx("path", {
          fillRule: "evenodd",
          clipRule: "evenodd",
          d: "M8.53547 0.62293C8.88226 0.849446 8.97976 1.3142 8.75325 1.66099L4.5083 8.1599C4.38833 8.34356 4.19397 8.4655 3.9764 8.49358C3.75883 8.52167 3.53987 8.45309 3.3772 8.30591L0.616113 5.80777C0.308959 5.52987 0.285246 5.05559 0.563148 4.74844C0.84105 4.44128 1.31533 4.41757 1.62249 4.69547L3.73256 6.60459L7.49741 0.840706C7.72393 0.493916 8.18868 0.396414 8.53547 0.62293Z"
        })
      })
    })
  }));
}

function Dialog(_a) {
  var props = __rest(_a, []);
  return jsx(DialogPrimitive.Root, __assign({
    "data-slot": "dialog"
  }, props));
}
function DialogPortal(_a) {
  var props = __rest(_a, []);
  return jsx(DialogPrimitive.Portal, __assign({
    "data-slot": "dialog-portal"
  }, props));
}
function DialogOverlay(_a) {
  var className = _a.className,
    props = __rest(_a, ["className"]);
  return jsx(DialogPrimitive.Overlay, __assign({
    "data-slot": "dialog-overlay",
    className: cn("data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/80", className)
  }, props));
}
function DialogContent(_a) {
  var className = _a.className,
    children = _a.children,
    props = __rest(_a, ["className", "children"]);
  return jsxs(DialogPortal, {
    children: [jsx(DialogOverlay, {}), jsxs(DialogPrimitive.Content, __assign({
      "data-slot": "dialog-content",
      className: cn("bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-1/2 left-1/2 z-50 grid max-h-[calc(100%-2rem)] w-full max-w-[calc(100%-2rem)] -translate-x-1/2 -translate-y-1/2 gap-4 overflow-y-auto rounded-xl border p-6 shadow-lg duration-200 sm:max-w-100", className)
    }, props, {
      children: [children, jsxs(DialogPrimitive.Close, {
        className: "group focus-visible:border-ring focus-visible:ring-ring/50 absolute top-3 right-3 flex size-7 items-center justify-center rounded transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:pointer-events-none",
        children: [jsx(XIcon, {
          size: 16,
          className: "opacity-60 transition-opacity group-hover:opacity-100"
        }), jsx("span", {
          className: "sr-only",
          children: "Close"
        })]
      })]
    }))]
  });
}
function DialogHeader(_a) {
  var className = _a.className,
    props = __rest(_a, ["className"]);
  return jsx("div", __assign({
    "data-slot": "alert-dialog-header",
    className: cn("flex flex-col gap-1 text-center sm:text-left", className)
  }, props));
}
function DialogFooter(_a) {
  var className = _a.className,
    props = __rest(_a, ["className"]);
  return jsx("div", __assign({
    "data-slot": "alert-dialog-footer",
    className: cn("flex flex-col-reverse gap-3 sm:flex-row sm:justify-end", className)
  }, props));
}
function DialogTitle(_a) {
  var className = _a.className,
    props = __rest(_a, ["className"]);
  return jsx(DialogPrimitive.Title, __assign({
    "data-slot": "alert-dialog-title",
    className: cn("text-lg leading-none font-semibold", className)
  }, props));
}
function DialogDescription(_a) {
  var className = _a.className,
    props = __rest(_a, ["className"]);
  return jsx(DialogPrimitive.Description, __assign({
    "data-slot": "alert-dialog-description",
    className: cn("text-muted-foreground text-sm", className)
  }, props));
}

function Input(_a) {
  var className = _a.className,
    type = _a.type,
    props = __rest(_a, ["className", "type"]);
  return jsx("input", __assign({
    type: type,
    "data-slot": "input",
    className: cn("border-input file:text-foreground placeholder:text-muted-foreground/70 flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-sm shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50", "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]", "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive", type === "search" && "[&::-webkit-search-cancel-button]:appearance-none [&::-webkit-search-decoration]:appearance-none [&::-webkit-search-results-button]:appearance-none [&::-webkit-search-results-decoration]:appearance-none", type === "file" && "text-muted-foreground/70 file:border-input file:text-foreground p-0 pr-3 italic file:me-3 file:h-full file:border-0 file:border-r file:border-solid file:bg-transparent file:px-3 file:text-sm file:font-medium file:not-italic", className)
  }, props));
}

function Label(_a) {
  var className = _a.className,
    props = __rest(_a, ["className"]);
  return jsx(LabelPrimitive.Root, __assign({
    "data-slot": "label",
    className: cn("text-foreground text-sm leading-4 font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50", className)
  }, props));
}

function Popover(_a) {
  var props = __rest(_a, []);
  return jsx(PopoverPrimitive.Root, __assign({
    "data-slot": "popover"
  }, props));
}
function PopoverTrigger(_a) {
  var props = __rest(_a, []);
  return jsx(PopoverPrimitive.Trigger, __assign({
    "data-slot": "popover-trigger"
  }, props));
}
function PopoverContent(_a) {
  var className = _a.className,
    _b = _a.align,
    align = _b === void 0 ? "center" : _b,
    _c = _a.sideOffset,
    sideOffset = _c === void 0 ? 4 : _c,
    _d = _a.showArrow,
    showArrow = _d === void 0 ? false : _d,
    props = __rest(_a, ["className", "align", "sideOffset", "showArrow"]);
  return jsx(PopoverPrimitive.Portal, {
    children: jsxs(PopoverPrimitive.Content, __assign({
      "data-slot": "popover-content",
      align: align,
      sideOffset: sideOffset,
      className: cn("bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-72 rounded-md border p-4 shadow-md outline-hidden", className)
    }, props, {
      children: [props.children, showArrow && jsx(PopoverPrimitive.Arrow, {
        className: "fill-popover -my-px drop-shadow-[0_1px_0_hsl(var(--border))]"
      })]
    }))
  });
}

function RadioGroup(_a) {
  var className = _a.className,
    props = __rest(_a, ["className"]);
  return jsx(RadioGroupPrimitive.Root, __assign({
    "data-slot": "radio-group",
    className: cn("grid gap-3", className)
  }, props));
}
function RadioGroupItem(_a) {
  var className = _a.className,
    props = __rest(_a, ["className"]);
  return jsx(RadioGroupPrimitive.Item, __assign({
    "data-slot": "radio-group-item",
    className: cn("border-input data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground data-[state=checked]:border-primary focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive aspect-square size-4 shrink-0 rounded-full border shadow-xs transition-shadow outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50", className)
  }, props, {
    children: jsx(RadioGroupPrimitive.Indicator, {
      className: "flex items-center justify-center text-current",
      children: jsx("svg", {
        width: "6",
        height: "6",
        viewBox: "0 0 6 6",
        fill: "currentcolor",
        xmlns: "http://www.w3.org/2000/svg",
        children: jsx("circle", {
          cx: "3",
          cy: "3",
          r: "3"
        })
      })
    })
  }));
}

function Select(_a) {
  var props = __rest(_a, []);
  return jsx(SelectPrimitive.Root, __assign({
    "data-slot": "select"
  }, props));
}
function SelectValue(_a) {
  var props = __rest(_a, []);
  return jsx(SelectPrimitive.Value, __assign({
    "data-slot": "select-value"
  }, props));
}
function SelectTrigger(_a) {
  var className = _a.className,
    children = _a.children,
    props = __rest(_a, ["className", "children"]);
  return jsxs(SelectPrimitive.Trigger, __assign({
    "data-slot": "select-trigger",
    className: cn("border-input text-foreground data-[placeholder]:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive flex h-9 w-full items-center justify-between gap-2 rounded-md border bg-transparent px-3 py-2 text-sm shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-2 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&>span]:line-clamp-1", className)
  }, props, {
    children: [children, jsx(SelectPrimitive.Icon, {
      asChild: true,
      children: jsx(ChevronDownIcon, {
        size: 16,
        className: "text-muted-foreground/80 in-aria-invalid:text-destructive/80 shrink-0"
      })
    })]
  }));
}
function SelectContent(_a) {
  var className = _a.className,
    children = _a.children,
    _b = _a.position,
    position = _b === void 0 ? "popper" : _b,
    props = __rest(_a, ["className", "children", "position"]);
  return jsx(SelectPrimitive.Portal, {
    children: jsxs(SelectPrimitive.Content, __assign({
      "data-slot": "select-content",
      className: cn("border-input bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 relative z-50 max-h-[min(24rem,var(--radix-select-content-available-height))] min-w-32 overflow-hidden rounded-md border shadow-lg [&_[role=group]]:py-1", position === "popper" && "w-full min-w-[var(--radix-select-trigger-width)] data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1", className),
      position: position
    }, props, {
      children: [jsx(SelectScrollUpButton, {}), jsx(SelectPrimitive.Viewport, {
        className: cn("p-1", position === "popper" && "h-[var(--radix-select-trigger-height)]"),
        children: children
      }), jsx(SelectScrollDownButton, {})]
    }))
  });
}
function SelectItem(_a) {
  var className = _a.className,
    children = _a.children,
    props = __rest(_a, ["className", "children"]);
  return jsxs(SelectPrimitive.Item, __assign({
    "data-slot": "select-item",
    className: cn("focus:bg-accent focus:text-accent-foreground relative flex w-full cursor-default items-center rounded py-1.5 ps-8 pe-2 text-sm outline-hidden select-none data-disabled:pointer-events-none data-disabled:opacity-50", className)
  }, props, {
    children: [jsx("span", {
      className: "absolute start-2 flex size-3.5 items-center justify-center",
      children: jsx(SelectPrimitive.ItemIndicator, {
        children: jsx(CheckIcon, {
          size: 16
        })
      })
    }), jsx(SelectPrimitive.ItemText, {
      children: children
    })]
  }));
}
function SelectScrollUpButton(_a) {
  var className = _a.className,
    props = __rest(_a, ["className"]);
  return jsx(SelectPrimitive.ScrollUpButton, __assign({
    "data-slot": "select-scroll-up-button",
    className: cn("text-muted-foreground/80 flex cursor-default items-center justify-center py-1", className)
  }, props, {
    children: jsx(ChevronUpIcon, {
      size: 16
    })
  }));
}
function SelectScrollDownButton(_a) {
  var className = _a.className,
    props = __rest(_a, ["className"]);
  return jsx(SelectPrimitive.ScrollDownButton, __assign({
    "data-slot": "select-scroll-down-button",
    className: cn("text-muted-foreground/80 flex cursor-default items-center justify-center py-1", className)
  }, props, {
    children: jsx(ChevronDownIcon, {
      size: 16
    })
  }));
}

function Textarea(_a) {
  var className = _a.className,
    props = __rest(_a, ["className"]);
  return jsx("textarea", __assign({
    "data-slot": "textarea",
    className: cn("border-input placeholder:text-muted-foreground/70 focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive flex min-h-19.5 w-full rounded-md border bg-transparent px-3 py-2 text-sm shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50", className)
  }, props));
}
Textarea.displayName = "Textarea";

function EventDialog(_a) {
  var _b;
  var event = _a.event,
    isOpen = _a.isOpen,
    onClose = _a.onClose,
    onSave = _a.onSave,
    onDelete = _a.onDelete;
  var _c = useState(""),
    title = _c[0],
    setTitle = _c[1];
  var _d = useState(""),
    description = _d[0],
    setDescription = _d[1];
  var _e = useState(new Date()),
    startDate = _e[0],
    setStartDate = _e[1];
  var _f = useState(new Date()),
    endDate = _f[0],
    setEndDate = _f[1];
  var _g = useState("".concat(DefaultStartHour, ":00")),
    startTime = _g[0],
    setStartTime = _g[1];
  var _h = useState("".concat(DefaultEndHour, ":00")),
    endTime = _h[0],
    setEndTime = _h[1];
  var _j = useState(false),
    allDay = _j[0],
    setAllDay = _j[1];
  var _k = useState(""),
    location = _k[0],
    setLocation = _k[1];
  var _l = useState("sky"),
    color = _l[0],
    setColor = _l[1];
  var _m = useState(null),
    error = _m[0],
    setError = _m[1];
  var _o = useState(false),
    startDateOpen = _o[0],
    setStartDateOpen = _o[1];
  var _p = useState(false),
    endDateOpen = _p[0],
    setEndDateOpen = _p[1];
  // Debug log to check what event is being passed
  useEffect(function () {
    console.log("EventDialog received event:", event);
  }, [event]);
  useEffect(function () {
    if (event) {
      setTitle(event.title || "");
      setDescription(event.description || "");
      var start = new Date(event.start);
      var end = new Date(event.end);
      setStartDate(start);
      setEndDate(end);
      setStartTime(formatTimeForInput(start));
      setEndTime(formatTimeForInput(end));
      setAllDay(event.allDay || false);
      setLocation(event.location || "");
      setColor(event.color || "sky");
      setError(null); // Reset error when opening dialog
    } else {
      resetForm();
    }
  }, [event]);
  var resetForm = function () {
    setTitle("");
    setDescription("");
    setStartDate(new Date());
    setEndDate(new Date());
    setStartTime("".concat(DefaultStartHour, ":00"));
    setEndTime("".concat(DefaultEndHour, ":00"));
    setAllDay(false);
    setLocation("");
    setColor("sky");
    setError(null);
  };
  var formatTimeForInput = function (date) {
    var hours = date.getHours().toString().padStart(2, "0");
    var minutes = Math.floor(date.getMinutes() / 15) * 15;
    return "".concat(hours, ":").concat(minutes.toString().padStart(2, "0"));
  };
  // Memoize time options so they're only calculated once
  var timeOptions = useMemo(function () {
    var options = [];
    for (var hour = StartHour; hour <= EndHour; hour++) {
      for (var minute = 0; minute < 60; minute += 15) {
        var formattedHour = hour.toString().padStart(2, "0");
        var formattedMinute = minute.toString().padStart(2, "0");
        var value = "".concat(formattedHour, ":").concat(formattedMinute);
        // Use a fixed date to avoid unnecessary date object creations
        var date = new Date(2000, 0, 1, hour, minute);
        var label = format(date, "h:mm a");
        options.push({
          value: value,
          label: label
        });
      }
    }
    return options;
  }, []); // Empty dependency array ensures this only runs once
  var handleSave = function () {
    var start = new Date(startDate);
    var end = new Date(endDate);
    if (!allDay) {
      var _a = startTime.split(":").map(Number),
        _b = _a[0],
        startHours = _b === void 0 ? 0 : _b,
        _c = _a[1],
        startMinutes = _c === void 0 ? 0 : _c;
      var _d = endTime.split(":").map(Number),
        _e = _d[0],
        endHours = _e === void 0 ? 0 : _e,
        _f = _d[1],
        endMinutes = _f === void 0 ? 0 : _f;
      if (startHours < StartHour || startHours > EndHour || endHours < StartHour || endHours > EndHour) {
        setError("Selected time must be between ".concat(StartHour, ":00 and ").concat(EndHour, ":00"));
        return;
      }
      start.setHours(startHours, startMinutes, 0);
      end.setHours(endHours, endMinutes, 0);
    } else {
      start.setHours(0, 0, 0, 0);
      end.setHours(23, 59, 59, 999);
    }
    // Validate that end date is not before start date
    if (isBefore(end, start)) {
      setError("End date cannot be before start date");
      return;
    }
    // Use generic title if empty
    var eventTitle = title.trim() ? title : "(no title)";
    onSave({
      id: (event === null || event === void 0 ? void 0 : event.id) || "",
      title: eventTitle,
      description: description,
      start: start,
      end: end,
      allDay: allDay,
      location: location,
      color: color
    });
  };
  var handleDelete = function () {
    if (event === null || event === void 0 ? void 0 : event.id) {
      onDelete(event.id);
    }
  };
  // Updated color options to match types.ts
  var colorOptions = [{
    value: "sky",
    label: "Sky",
    bgClass: "bg-sky-400 data-[state=checked]:bg-sky-400",
    borderClass: "border-sky-400 data-[state=checked]:border-sky-400"
  }, {
    value: "amber",
    label: "Amber",
    bgClass: "bg-amber-400 data-[state=checked]:bg-amber-400",
    borderClass: "border-amber-400 data-[state=checked]:border-amber-400"
  }, {
    value: "violet",
    label: "Violet",
    bgClass: "bg-violet-400 data-[state=checked]:bg-violet-400",
    borderClass: "border-violet-400 data-[state=checked]:border-violet-400"
  }, {
    value: "rose",
    label: "Rose",
    bgClass: "bg-rose-400 data-[state=checked]:bg-rose-400",
    borderClass: "border-rose-400 data-[state=checked]:border-rose-400"
  }, {
    value: "emerald",
    label: "Emerald",
    bgClass: "bg-emerald-400 data-[state=checked]:bg-emerald-400",
    borderClass: "border-emerald-400 data-[state=checked]:border-emerald-400"
  }, {
    value: "orange",
    label: "Orange",
    bgClass: "bg-orange-400 data-[state=checked]:bg-orange-400",
    borderClass: "border-orange-400 data-[state=checked]:border-orange-400"
  }];
  return jsx(Dialog, {
    open: isOpen,
    onOpenChange: function (open) {
      return !open && onClose();
    },
    children: jsxs(DialogContent, {
      className: "sm:max-w-[425px]",
      children: [jsxs(DialogHeader, {
        children: [jsx(DialogTitle, {
          children: (event === null || event === void 0 ? void 0 : event.id) ? "Edit Event" : "Create Event"
        }), jsx(DialogDescription, {
          className: "sr-only",
          children: (event === null || event === void 0 ? void 0 : event.id) ? "Edit the details of this event" : "Add a new event to your calendar"
        })]
      }), error && jsx("div", {
        className: "bg-destructive/15 text-destructive rounded-md px-3 py-2 text-sm",
        children: error
      }), jsxs("div", {
        className: "grid gap-4 py-4",
        children: [jsxs("div", {
          className: "*:not-first:mt-1.5",
          children: [jsx(Label, {
            htmlFor: "title",
            children: "Title"
          }), jsx(Input, {
            id: "title",
            value: title,
            onChange: function (e) {
              return setTitle(e.target.value);
            }
          })]
        }), jsxs("div", {
          className: "*:not-first:mt-1.5",
          children: [jsx(Label, {
            htmlFor: "description",
            children: "Description"
          }), jsx(Textarea, {
            id: "description",
            value: description,
            onChange: function (e) {
              return setDescription(e.target.value);
            },
            rows: 3
          })]
        }), jsxs("div", {
          className: "flex gap-4",
          children: [jsxs("div", {
            className: "flex-1 *:not-first:mt-1.5",
            children: [jsx(Label, {
              htmlFor: "start-date",
              children: "Start Date"
            }), jsxs(Popover, {
              open: startDateOpen,
              onOpenChange: setStartDateOpen,
              children: [jsx(PopoverTrigger, {
                asChild: true,
                children: jsxs(Button$1, {
                  id: "start-date",
                  variant: "outline",
                  className: cn("group bg-background hover:bg-background border-input w-full justify-between px-3 font-normal outline-offset-0 outline-none focus-visible:outline-[3px]", !startDate && "text-muted-foreground"),
                  children: [jsx("span", {
                    className: cn("truncate", !startDate && "text-muted-foreground"),
                    children: startDate ? format(startDate, "PPP") : "Pick a date"
                  }), jsx(RiCalendarLine, {
                    size: 16,
                    className: "text-muted-foreground/80 shrink-0",
                    "aria-hidden": "true"
                  })]
                })
              }), jsx(PopoverContent, {
                className: "w-auto p-2",
                align: "start",
                children: jsx(Calendar, {
                  mode: "single",
                  selected: startDate,
                  defaultMonth: startDate,
                  onSelect: function (date) {
                    if (date) {
                      setStartDate(date);
                      // If end date is before the new start date, update it to match the start date
                      if (isBefore(endDate, date)) {
                        setEndDate(date);
                      }
                      setError(null);
                      setStartDateOpen(false);
                    }
                  }
                })
              })]
            })]
          }), !allDay && jsxs("div", {
            className: "min-w-28 *:not-first:mt-1.5",
            children: [jsx(Label, {
              htmlFor: "start-time",
              children: "Start Time"
            }), jsxs(Select, {
              value: startTime,
              onValueChange: setStartTime,
              children: [jsx(SelectTrigger, {
                id: "start-time",
                children: jsx(SelectValue, {
                  placeholder: "Select time"
                })
              }), jsx(SelectContent, {
                children: timeOptions.map(function (option) {
                  return jsx(SelectItem, {
                    value: option.value,
                    children: option.label
                  }, option.value);
                })
              })]
            })]
          })]
        }), jsxs("div", {
          className: "flex gap-4",
          children: [jsxs("div", {
            className: "flex-1 *:not-first:mt-1.5",
            children: [jsx(Label, {
              htmlFor: "end-date",
              children: "End Date"
            }), jsxs(Popover, {
              open: endDateOpen,
              onOpenChange: setEndDateOpen,
              children: [jsx(PopoverTrigger, {
                asChild: true,
                children: jsxs(Button$1, {
                  id: "end-date",
                  variant: "outline",
                  className: cn("group bg-background hover:bg-background border-input w-full justify-between px-3 font-normal outline-offset-0 outline-none focus-visible:outline-[3px]", !endDate && "text-muted-foreground"),
                  children: [jsx("span", {
                    className: cn("truncate", !endDate && "text-muted-foreground"),
                    children: endDate ? format(endDate, "PPP") : "Pick a date"
                  }), jsx(RiCalendarLine, {
                    size: 16,
                    className: "text-muted-foreground/80 shrink-0",
                    "aria-hidden": "true"
                  })]
                })
              }), jsx(PopoverContent, {
                className: "w-auto p-2",
                align: "start",
                children: jsx(Calendar, {
                  mode: "single",
                  selected: endDate,
                  defaultMonth: endDate,
                  disabled: {
                    before: startDate
                  },
                  onSelect: function (date) {
                    if (date) {
                      setEndDate(date);
                      setError(null);
                      setEndDateOpen(false);
                    }
                  }
                })
              })]
            })]
          }), !allDay && jsxs("div", {
            className: "min-w-28 *:not-first:mt-1.5",
            children: [jsx(Label, {
              htmlFor: "end-time",
              children: "End Time"
            }), jsxs(Select, {
              value: endTime,
              onValueChange: setEndTime,
              children: [jsx(SelectTrigger, {
                id: "end-time",
                children: jsx(SelectValue, {
                  placeholder: "Select time"
                })
              }), jsx(SelectContent, {
                children: timeOptions.map(function (option) {
                  return jsx(SelectItem, {
                    value: option.value,
                    children: option.label
                  }, option.value);
                })
              })]
            })]
          })]
        }), jsxs("div", {
          className: "flex items-center gap-2",
          children: [jsx(Checkbox, {
            id: "all-day",
            checked: allDay,
            onCheckedChange: function (checked) {
              return setAllDay(checked === true);
            }
          }), jsx(Label, {
            htmlFor: "all-day",
            children: "All day"
          })]
        }), jsxs("div", {
          className: "*:not-first:mt-1.5",
          children: [jsx(Label, {
            htmlFor: "location",
            children: "Location"
          }), jsx(Input, {
            id: "location",
            value: location,
            onChange: function (e) {
              return setLocation(e.target.value);
            }
          })]
        }), jsxs("fieldset", {
          className: "space-y-4",
          children: [jsx("legend", {
            className: "text-foreground text-sm leading-none font-medium",
            children: "Etiquette"
          }), jsx(RadioGroup, {
            className: "flex gap-1.5",
            defaultValue: (_b = colorOptions[0]) === null || _b === void 0 ? void 0 : _b.value,
            value: color,
            onValueChange: function (value) {
              return setColor(value);
            },
            children: colorOptions.map(function (colorOption) {
              return jsx(RadioGroupItem, {
                id: "color-".concat(colorOption.value),
                value: colorOption.value,
                "aria-label": colorOption.label,
                className: cn("size-6 shadow-none", colorOption.bgClass, colorOption.borderClass)
              }, colorOption.value);
            })
          })]
        })]
      }), jsxs(DialogFooter, {
        className: "flex-row sm:justify-between",
        children: [(event === null || event === void 0 ? void 0 : event.id) && jsx(Button$1, {
          variant: "outline",
          size: "icon",
          onClick: handleDelete,
          "aria-label": "Delete event",
          children: jsx(RiDeleteBinLine, {
            size: 16,
            "aria-hidden": "true"
          })
        }), jsxs("div", {
          className: "flex flex-1 justify-end gap-2",
          children: [jsx(Button$1, {
            variant: "outline",
            onClick: onClose,
            children: "Cancel"
          }), jsx(Button$1, {
            onClick: handleSave,
            children: "Save"
          })]
        })]
      })]
    })
  });
}

function EventsPopup(_a) {
  var date = _a.date,
    events = _a.events,
    position = _a.position,
    onClose = _a.onClose,
    onEventSelect = _a.onEventSelect;
  var popupRef = useRef(null);
  // Handle click outside to close popup
  useEffect(function () {
    var handleClickOutside = function (event) {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return function () {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);
  // Handle escape key to close popup
  useEffect(function () {
    var handleEscKey = function (event) {
      if (event.key === "Escape") {
        onClose();
      }
    };
    document.addEventListener("keydown", handleEscKey);
    return function () {
      document.removeEventListener("keydown", handleEscKey);
    };
  }, [onClose]);
  var handleEventClick = function (event) {
    onEventSelect(event);
    onClose();
  };
  // Adjust position to ensure popup stays within viewport
  var adjustedPosition = useMemo(function () {
    var positionCopy = __assign({}, position);
    // Check if we need to adjust the position to fit in the viewport
    if (popupRef.current) {
      var rect = popupRef.current.getBoundingClientRect();
      var viewportWidth = window.innerWidth;
      var viewportHeight = window.innerHeight;
      // Adjust horizontally if needed
      if (positionCopy.left + rect.width > viewportWidth) {
        positionCopy.left = Math.max(0, viewportWidth - rect.width);
      }
      // Adjust vertically if needed
      if (positionCopy.top + rect.height > viewportHeight) {
        positionCopy.top = Math.max(0, viewportHeight - rect.height);
      }
    }
    return positionCopy;
  }, [position]);
  return jsxs("div", {
    ref: popupRef,
    className: "bg-background absolute z-50 max-h-96 w-80 overflow-auto rounded-md border shadow-lg",
    style: {
      top: "".concat(adjustedPosition.top, "px"),
      left: "".concat(adjustedPosition.left, "px")
    },
    children: [jsxs("div", {
      className: "bg-background sticky top-0 flex items-center justify-between border-b p-3",
      children: [jsx("h3", {
        className: "font-medium",
        children: format(date, "d MMMM yyyy")
      }), jsx("button", {
        onClick: onClose,
        className: "hover:bg-muted rounded-full p-1",
        "aria-label": "Close",
        children: jsx(XIcon, {
          className: "h-4 w-4"
        })
      })]
    }), jsx("div", {
      className: "space-y-2 p-3",
      children: events.length === 0 ? jsx("div", {
        className: "text-muted-foreground py-2 text-sm",
        children: "No events"
      }) : events.map(function (event) {
        var eventStart = new Date(event.start);
        var eventEnd = new Date(event.end);
        var isFirstDay = isSameDay(date, eventStart);
        var isLastDay = isSameDay(date, eventEnd);
        return jsx("div", {
          className: "cursor-pointer",
          onClick: function () {
            return handleEventClick(event);
          },
          children: jsx(EventItem, {
            event: event,
            view: "agenda",
            isFirstDay: isFirstDay,
            isLastDay: isLastDay
          })
        }, event.id);
      })
    })]
  });
}

/**
 * Hook for calculating event visibility based on container height
 * Uses ResizeObserver for efficient updates
 */
function useEventVisibility(_a) {
  var eventHeight = _a.eventHeight,
    eventGap = _a.eventGap;
  // Use the standard pattern for React refs
  var contentRef = useRef(null);
  var observerRef = useRef(null);
  var _b = useState(null),
    contentHeight = _b[0],
    setContentHeight = _b[1];
  // Use layout effect for synchronous measurement before paint
  useLayoutEffect(function () {
    if (!contentRef.current) return;
    // Function to update the content height
    var updateHeight = function () {
      if (contentRef.current) {
        setContentHeight(contentRef.current.clientHeight);
      }
    };
    // Initial measurement (synchronous)
    updateHeight();
    // Create observer only once and reuse it
    if (!observerRef.current) {
      observerRef.current = new ResizeObserver(function () {
        // Just call updateHeight when resize is detected
        updateHeight();
      });
    }
    // Start observing the content container
    observerRef.current.observe(contentRef.current);
    // Clean up function
    return function () {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);
  // Function to calculate visible events for a cell
  var getVisibleEventCount = useMemo(function () {
    return function (totalEvents) {
      if (!contentHeight) return totalEvents;
      // Calculate how many events can fit in the container
      var maxEvents = Math.floor(contentHeight / (eventHeight + eventGap));
      // If all events fit, show them all
      if (totalEvents <= maxEvents) {
        return totalEvents;
      } else {
        // Otherwise, reserve space for "more" button by showing one less
        return maxEvents > 0 ? maxEvents - 1 : 0;
      }
    };
  }, [contentHeight, eventHeight, eventGap]);
  // Use type assertion to satisfy TypeScript
  return {
    contentRef: contentRef,
    contentHeight: contentHeight,
    getVisibleEventCount: getVisibleEventCount
  };
}

function MonthView(_a) {
  var currentDate = _a.currentDate,
    events = _a.events,
    onEventSelect = _a.onEventSelect,
    onEventCreate = _a.onEventCreate;
  var days = useMemo(function () {
    var monthStart = startOfMonth(currentDate);
    var monthEnd = endOfMonth(monthStart);
    var calendarStart = startOfWeek(monthStart, {
      weekStartsOn: 0
    });
    var calendarEnd = endOfWeek(monthEnd, {
      weekStartsOn: 0
    });
    return eachDayOfInterval({
      start: calendarStart,
      end: calendarEnd
    });
  }, [currentDate]);
  var weekdays = useMemo(function () {
    return Array.from({
      length: 7
    }).map(function (_, i) {
      var date = addDays(startOfWeek(new Date()), i);
      return format(date, "EEE");
    });
  }, []);
  var weeks = useMemo(function () {
    var result = [];
    var week = [];
    for (var i = 0; i < days.length; i++) {
      week.push(days[i]);
      if (week.length === 7 || i === days.length - 1) {
        result.push(week);
        week = [];
      }
    }
    return result;
  }, [days]);
  var handleEventClick = function (event, e) {
    e.stopPropagation();
    onEventSelect === null || onEventSelect === void 0 ? void 0 : onEventSelect(event);
  };
  var _b = useState(false),
    isMounted = _b[0],
    setIsMounted = _b[1];
  var _c = useEventVisibility({
      eventHeight: EventHeight,
      eventGap: EventGap
    }),
    contentRef = _c.contentRef,
    getVisibleEventCount = _c.getVisibleEventCount;
  useEffect(function () {
    setIsMounted(true);
  }, []);
  return jsxs("div", {
    "data-slot": "month-view",
    className: "contents",
    children: [jsx("div", {
      className: "border-border/70 grid grid-cols-7 border-b",
      children: weekdays.map(function (day) {
        return jsx("div", {
          className: "text-muted-foreground/70 py-2 text-center text-sm",
          children: day
        }, day);
      })
    }), jsx("div", {
      className: "grid flex-1 auto-rows-fr",
      children: weeks.map(function (week, weekIndex) {
        return jsx("div", {
          className: "grid grid-cols-7 [&:last-child>*]:border-b-0",
          children: week.map(function (day, dayIndex) {
            if (!day) return null; // Skip if day is undefined
            var dayEvents = getEventsForDay(events, day);
            var spanningEvents = getSpanningEventsForDay(events, day);
            var isCurrentMonth = isSameMonth(day, currentDate);
            var cellId = "month-cell-".concat(day.toISOString());
            var allDayEvents = __spreadArray(__spreadArray([], spanningEvents, true), dayEvents, true);
            var allEvents = getAllEventsForDay(events, day);
            var isReferenceCell = weekIndex === 0 && dayIndex === 0;
            var visibleCount = isMounted ? getVisibleEventCount(allDayEvents.length) : undefined;
            var hasMore = visibleCount !== undefined && allDayEvents.length > visibleCount;
            var remainingCount = hasMore ? allDayEvents.length - visibleCount : 0;
            return jsx("div", {
              className: "group border-border/70 data-outside-cell:bg-muted/25 data-outside-cell:text-muted-foreground/70 border-r border-b last:border-r-0",
              "data-today": isToday(day) || undefined,
              "data-outside-cell": !isCurrentMonth || undefined,
              children: jsxs(DroppableCell, {
                id: cellId,
                date: day,
                onClick: function () {
                  var startTime = new Date(day);
                  startTime.setHours(DefaultStartHour, 0, 0);
                  onEventCreate === null || onEventCreate === void 0 ? void 0 : onEventCreate(startTime);
                },
                children: [jsx("div", {
                  className: "group-data-today:bg-primary group-data-today:text-primary-foreground mt-1 inline-flex size-6 items-center justify-center rounded-full text-sm",
                  children: format(day, "d")
                }), jsxs("div", {
                  ref: isReferenceCell ? contentRef : null,
                  className: "min-h-[calc((var(--event-height)+var(--event-gap))*2)] sm:min-h-[calc((var(--event-height)+var(--event-gap))*3)] lg:min-h-[calc((var(--event-height)+var(--event-gap))*4)]",
                  children: [sortEvents(allDayEvents).map(function (event, index) {
                    var eventStart = new Date(event.start);
                    var eventEnd = new Date(event.end);
                    var isFirstDay = isSameDay(day, eventStart);
                    var isLastDay = isSameDay(day, eventEnd);
                    var isHidden = isMounted && visibleCount && index >= visibleCount;
                    if (!visibleCount) return null;
                    if (!isFirstDay) {
                      return jsx("div", {
                        className: "aria-hidden:hidden",
                        "aria-hidden": isHidden ? "true" : undefined,
                        children: jsx(EventItem, {
                          onClick: function (e) {
                            return handleEventClick(event, e);
                          },
                          event: event,
                          view: "month",
                          isFirstDay: isFirstDay,
                          isLastDay: isLastDay,
                          children: jsxs("div", {
                            className: "invisible",
                            "aria-hidden": true,
                            children: [!event.allDay && jsxs("span", {
                              children: [format(new Date(event.start), "h:mm"), " "]
                            }), event.title]
                          })
                        })
                      }, "spanning-".concat(event.id, "-").concat(day.toISOString().slice(0, 10)));
                    }
                    return jsx("div", {
                      className: "aria-hidden:hidden",
                      "aria-hidden": isHidden ? "true" : undefined,
                      children: jsx(DraggableEvent, {
                        event: event,
                        view: "month",
                        onClick: function (e) {
                          return handleEventClick(event, e);
                        },
                        isFirstDay: isFirstDay,
                        isLastDay: isLastDay
                      })
                    }, event.id);
                  }), hasMore && jsxs(Popover, {
                    modal: true,
                    children: [jsx(PopoverTrigger, {
                      asChild: true,
                      children: jsx("button", {
                        className: "focus-visible:border-ring focus-visible:ring-ring/50 text-muted-foreground hover:text-foreground hover:bg-muted/50 mt-[var(--event-gap)] flex h-[var(--event-height)] w-full items-center overflow-hidden px-1 text-left text-[10px] backdrop-blur-md transition outline-none select-none focus-visible:ring-[3px] sm:px-2 sm:text-xs",
                        onClick: function (e) {
                          return e.stopPropagation();
                        },
                        children: jsxs("span", {
                          children: ["+ ", remainingCount, " ", jsx("span", {
                            className: "max-sm:sr-only",
                            children: "more"
                          })]
                        })
                      })
                    }), jsx(PopoverContent, {
                      align: "center",
                      className: "max-w-52 p-3",
                      style: {
                        "--event-height": "".concat(EventHeight, "px")
                      },
                      children: jsxs("div", {
                        className: "space-y-2",
                        children: [jsx("div", {
                          className: "text-sm font-medium",
                          children: format(day, "EEE d")
                        }), jsx("div", {
                          className: "space-y-1",
                          children: sortEvents(allEvents).map(function (event) {
                            var eventStart = new Date(event.start);
                            var eventEnd = new Date(event.end);
                            var isFirstDay = isSameDay(day, eventStart);
                            var isLastDay = isSameDay(day, eventEnd);
                            return jsx(EventItem, {
                              onClick: function (e) {
                                return handleEventClick(event, e);
                              },
                              event: event,
                              view: "month",
                              isFirstDay: isFirstDay,
                              isLastDay: isLastDay
                            }, event.id);
                          })
                        })]
                      })
                    })]
                  })]
                })]
              })
            }, day.toString());
          })
        }, "week-".concat(weekIndex));
      })
    })]
  });
}

function DropdownMenu(_a) {
  var props = __rest(_a, []);
  return jsx(DropdownMenuPrimitive.Root, __assign({
    "data-slot": "dropdown-menu"
  }, props));
}
function DropdownMenuTrigger(_a) {
  var props = __rest(_a, []);
  return jsx(DropdownMenuPrimitive.Trigger, __assign({
    "data-slot": "dropdown-menu-trigger"
  }, props));
}
function DropdownMenuContent(_a) {
  var className = _a.className,
    _b = _a.sideOffset,
    sideOffset = _b === void 0 ? 4 : _b,
    onPointerDown = _a.onPointerDown,
    onPointerDownOutside = _a.onPointerDownOutside,
    onCloseAutoFocus = _a.onCloseAutoFocus,
    props = __rest(_a, ["className", "sideOffset", "onPointerDown", "onPointerDownOutside", "onCloseAutoFocus"]);
  var isCloseFromMouse = React.useRef(false);
  var handlePointerDown = React.useCallback(function (e) {
    isCloseFromMouse.current = true;
    onPointerDown === null || onPointerDown === void 0 ? void 0 : onPointerDown(e);
  }, [onPointerDown]);
  var handlePointerDownOutside = React.useCallback(function (e) {
    isCloseFromMouse.current = true;
    onPointerDownOutside === null || onPointerDownOutside === void 0 ? void 0 : onPointerDownOutside(e);
  }, [onPointerDownOutside]);
  var handleCloseAutoFocus = React.useCallback(function (e) {
    if (onCloseAutoFocus) {
      return onCloseAutoFocus(e);
    }
    if (!isCloseFromMouse.current) {
      return;
    }
    e.preventDefault();
    isCloseFromMouse.current = false;
  }, [onCloseAutoFocus]);
  return jsx(DropdownMenuPrimitive.Portal, {
    children: jsx(DropdownMenuPrimitive.Content, __assign({
      "data-slot": "dropdown-menu-content",
      sideOffset: sideOffset,
      className: cn("bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 min-w-40 overflow-hidden rounded-md border p-1 shadow-lg", className),
      onPointerDown: handlePointerDown,
      onPointerDownOutside: handlePointerDownOutside,
      onCloseAutoFocus: handleCloseAutoFocus
    }, props))
  });
}
function DropdownMenuItem(_a) {
  var className = _a.className,
    inset = _a.inset,
    _b = _a.variant,
    variant = _b === void 0 ? "default" : _b,
    props = __rest(_a, ["className", "inset", "variant"]);
  return jsx(DropdownMenuPrimitive.Item, __assign({
    "data-slot": "dropdown-menu-item",
    "data-inset": inset,
    "data-variant": variant,
    className: cn("focus:bg-accent focus:text-accent-foreground data-[variant=destructive]:text-destructive-foreground data-[variant=destructive]:focus:bg-destructive/10 dark:data-[variant=destructive]:focus:bg-destructive/40 data-[variant=destructive]:focus:text-destructive-foreground data-[variant=destructive]:*:[svg]:!text-destructive-foreground relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[inset]:pl-8 [&_svg]:pointer-events-none [&_svg]:shrink-0", className)
  }, props));
}
function DropdownMenuShortcut(_a) {
  var className = _a.className,
    props = __rest(_a, ["className"]);
  return jsx("kbd", __assign({
    "data-slot": "dropdown-menu-shortcut",
    className: cn("bg-background text-muted-foreground/70 ms-auto -me-1 inline-flex h-5 max-h-full items-center rounded border px-1 font-[inherit] text-[0.625rem] font-medium", className)
  }, props));
}

function WeekView(_a) {
  var currentDate = _a.currentDate,
    events = _a.events,
    onEventSelect = _a.onEventSelect,
    onEventCreate = _a.onEventCreate;
  var days = useMemo(function () {
    var weekStart = startOfWeek(currentDate, {
      weekStartsOn: 0
    });
    var weekEnd = endOfWeek(currentDate, {
      weekStartsOn: 0
    });
    return eachDayOfInterval({
      start: weekStart,
      end: weekEnd
    });
  }, [currentDate]);
  var weekStart = useMemo(function () {
    return startOfWeek(currentDate, {
      weekStartsOn: 0
    });
  }, [currentDate]);
  var hours = useMemo(function () {
    var dayStart = startOfDay(currentDate);
    return eachHourOfInterval({
      start: addHours(dayStart, StartHour),
      end: addHours(dayStart, EndHour - 1)
    });
  }, [currentDate]);
  // Get all-day events and multi-day events for the week
  var allDayEvents = useMemo(function () {
    return events.filter(function (event) {
      // Include explicitly marked all-day events or multi-day events
      return event.allDay || isMultiDayEvent(event);
    }).filter(function (event) {
      var eventStart = new Date(event.start);
      var eventEnd = new Date(event.end);
      return days.some(function (day) {
        return isSameDay(day, eventStart) || isSameDay(day, eventEnd) || day > eventStart && day < eventEnd;
      });
    });
  }, [events, days]);
  // Process events for each day to calculate positions
  var processedDayEvents = useMemo(function () {
    var result = days.map(function (day) {
      // Get events for this day that are not all-day events or multi-day events
      var dayEvents = events.filter(function (event) {
        // Skip all-day events and multi-day events
        if (event.allDay || isMultiDayEvent(event)) return false;
        var eventStart = new Date(event.start);
        var eventEnd = new Date(event.end);
        // Check if event is on this day
        return isSameDay(day, eventStart) || isSameDay(day, eventEnd) || eventStart < day && eventEnd > day;
      });
      // Sort events by start time and duration
      var sortedEvents = __spreadArray([], dayEvents, true).sort(function (a, b) {
        var aStart = new Date(a.start);
        var bStart = new Date(b.start);
        var aEnd = new Date(a.end);
        var bEnd = new Date(b.end);
        // First sort by start time
        if (aStart < bStart) return -1;
        if (aStart > bStart) return 1;
        // If start times are equal, sort by duration (longer events first)
        var aDuration = differenceInMinutes(aEnd, aStart);
        var bDuration = differenceInMinutes(bEnd, bStart);
        return bDuration - aDuration;
      });
      // Calculate positions for each event
      var positionedEvents = [];
      var dayStart = startOfDay(day);
      // Track columns for overlapping events
      var columns = [];
      sortedEvents.forEach(function (event) {
        var eventStart = new Date(event.start);
        var eventEnd = new Date(event.end);
        // Adjust start and end times if they're outside this day
        var adjustedStart = isSameDay(day, eventStart) ? eventStart : dayStart;
        var adjustedEnd = isSameDay(day, eventEnd) ? eventEnd : addHours(dayStart, 24);
        // Calculate top position and height
        var startHour = getHours(adjustedStart) + getMinutes(adjustedStart) / 60;
        var endHour = getHours(adjustedEnd) + getMinutes(adjustedEnd) / 60;
        // Adjust the top calculation to account for the new start time
        var top = (startHour - StartHour) * WeekCellsHeight;
        var height = (endHour - startHour) * WeekCellsHeight;
        // Find a column for this event
        var columnIndex = 0;
        var placed = false;
        while (!placed) {
          var col = columns[columnIndex] || [];
          if (col.length === 0) {
            columns[columnIndex] = col;
            placed = true;
          } else {
            var overlaps = col.some(function (c) {
              return areIntervalsOverlapping({
                start: adjustedStart,
                end: adjustedEnd
              }, {
                start: new Date(c.event.start),
                end: new Date(c.event.end)
              });
            });
            if (!overlaps) {
              placed = true;
            } else {
              columnIndex++;
            }
          }
        }
        // Ensure column is initialized before pushing
        var currentColumn = columns[columnIndex] || [];
        columns[columnIndex] = currentColumn;
        currentColumn.push({
          event: event,
          end: adjustedEnd
        });
        // Calculate width and left position based on number of columns
        var width = columnIndex === 0 ? 1 : 1 - columnIndex * 0.1;
        var left = columnIndex === 0 ? 0 : columnIndex * 0.1;
        positionedEvents.push({
          event: event,
          top: top,
          height: height,
          left: left,
          width: width,
          zIndex: 10 + columnIndex // Higher columns get higher z-index
        });
      });
      return positionedEvents;
    });
    return result;
  }, [days, events]);
  var handleEventClick = function (event, e) {
    e.stopPropagation();
    onEventSelect === null || onEventSelect === void 0 ? void 0 : onEventSelect(event);
  };
  var showAllDaySection = allDayEvents.length > 0;
  var _b = useCurrentTimeIndicator(currentDate, "week"),
    currentTimePosition = _b.currentTimePosition,
    currentTimeVisible = _b.currentTimeVisible;
  return jsxs("div", {
    "data-slot": "week-view",
    className: "flex h-full flex-col",
    children: [jsxs("div", {
      className: "bg-background/80 border-border/70 sticky top-0 z-30 grid grid-cols-8 border-b backdrop-blur-md",
      children: [jsx("div", {
        className: "text-muted-foreground/70 py-2 text-center text-sm",
        children: jsx("span", {
          className: "max-[479px]:sr-only",
          children: format(new Date(), "O")
        })
      }), days.map(function (day) {
        return jsxs("div", {
          className: "data-today:text-foreground text-muted-foreground/70 py-2 text-center text-sm data-today:font-medium",
          "data-today": isToday(day) || undefined,
          children: [jsxs("span", {
            className: "sm:hidden",
            "aria-hidden": "true",
            children: [format(day, "E")[0], " ", format(day, "d")]
          }), jsx("span", {
            className: "max-sm:hidden",
            children: format(day, "EEE dd")
          })]
        }, day.toString());
      })]
    }), showAllDaySection && jsx("div", {
      className: "border-border/70 bg-muted/50 border-b",
      children: jsxs("div", {
        className: "grid grid-cols-8",
        children: [jsx("div", {
          className: "border-border/70 relative border-r",
          children: jsx("span", {
            className: "text-muted-foreground/70 absolute bottom-0 left-0 h-6 w-16 max-w-full pe-2 text-right text-[10px] sm:pe-4 sm:text-xs",
            children: "All day"
          })
        }), days.map(function (day, dayIndex) {
          var dayAllDayEvents = allDayEvents.filter(function (event) {
            var eventStart = new Date(event.start);
            var eventEnd = new Date(event.end);
            return isSameDay(day, eventStart) || day > eventStart && day < eventEnd || isSameDay(day, eventEnd);
          });
          return jsx("div", {
            className: "border-border/70 relative border-r p-1 last:border-r-0",
            "data-today": isToday(day) || undefined,
            children: dayAllDayEvents.map(function (event) {
              var eventStart = new Date(event.start);
              var eventEnd = new Date(event.end);
              var isFirstDay = isSameDay(day, eventStart);
              var isLastDay = isSameDay(day, eventEnd);
              // Check if this is the first day in the current week view
              var isFirstVisibleDay = dayIndex === 0 && isBefore(eventStart, weekStart);
              var shouldShowTitle = isFirstDay || isFirstVisibleDay;
              return jsx(EventItem, {
                onClick: function (e) {
                  return handleEventClick(event, e);
                },
                event: event,
                view: "month",
                isFirstDay: isFirstDay,
                isLastDay: isLastDay,
                children: jsx("div", {
                  className: cn("truncate", !shouldShowTitle && "invisible"),
                  "aria-hidden": !shouldShowTitle,
                  children: event.title
                })
              }, "spanning-".concat(event.id));
            })
          }, day.toString());
        })]
      })
    }), jsxs("div", {
      className: "grid flex-1 grid-cols-8 overflow-hidden",
      children: [jsx("div", {
        className: "border-border/70 grid auto-cols-fr border-r",
        children: hours.map(function (hour, index) {
          return jsx("div", {
            className: "border-border/70 relative min-h-[var(--week-cells-height)] border-b last:border-b-0",
            children: index > 0 && jsx("span", {
              className: "bg-background text-muted-foreground/70 absolute -top-3 left-0 flex h-6 w-16 max-w-full items-center justify-end pe-2 text-[10px] sm:pe-4 sm:text-xs",
              children: format(hour, "h a")
            })
          }, hour.toString());
        })
      }), days.map(function (day, dayIndex) {
        var _a;
        return jsxs("div", {
          className: "border-border/70 relative grid auto-cols-fr border-r last:border-r-0",
          "data-today": isToday(day) || undefined,
          children: [((_a = processedDayEvents[dayIndex]) !== null && _a !== void 0 ? _a : []).map(function (positionedEvent) {
            return jsx("div", {
              className: "absolute z-10 px-0.5",
              style: {
                top: "".concat(positionedEvent.top, "px"),
                height: "".concat(positionedEvent.height, "px"),
                left: "".concat(positionedEvent.left * 100, "%"),
                width: "".concat(positionedEvent.width * 100, "%"),
                zIndex: positionedEvent.zIndex
              },
              onClick: function (e) {
                return e.stopPropagation();
              },
              children: jsx("div", {
                className: "h-full w-full",
                children: jsx(DraggableEvent, {
                  event: positionedEvent.event,
                  view: "week",
                  onClick: function (e) {
                    return handleEventClick(positionedEvent.event, e);
                  },
                  showTime: true,
                  height: positionedEvent.height
                })
              })
            }, positionedEvent.event.id);
          }), currentTimeVisible && isToday(day) && jsx("div", {
            className: "pointer-events-none absolute right-0 left-0 z-20",
            style: {
              top: "".concat(currentTimePosition, "%")
            },
            children: jsxs("div", {
              className: "relative flex items-center",
              children: [jsx("div", {
                className: "bg-primary absolute -left-1 h-2 w-2 rounded-full"
              }), jsx("div", {
                className: "bg-primary h-[2px] w-full"
              })]
            })
          }), hours.map(function (hour) {
            var hourValue = getHours(hour);
            return jsx("div", {
              className: "border-border/70 relative min-h-[var(--week-cells-height)] border-b last:border-b-0",
              children: [0, 1, 2, 3].map(function (quarter) {
                var quarterHourTime = hourValue + quarter * 0.25;
                return jsx(DroppableCell, {
                  id: "week-cell-".concat(day.toISOString(), "-").concat(quarterHourTime),
                  date: day,
                  time: quarterHourTime,
                  className: cn("absolute h-[calc(var(--week-cells-height)/4)] w-full", quarter === 0 && "top-0", quarter === 1 && "top-[calc(var(--week-cells-height)/4)]", quarter === 2 && "top-[calc(var(--week-cells-height)/4*2)]", quarter === 3 && "top-[calc(var(--week-cells-height)/4*3)]"),
                  onClick: function () {
                    var startTime = new Date(day);
                    startTime.setHours(hourValue);
                    startTime.setMinutes(quarter * 15);
                    onEventCreate === null || onEventCreate === void 0 ? void 0 : onEventCreate(startTime);
                  }
                }, "".concat(hour.toString(), "-").concat(quarter));
              })
            }, hour.toString());
          })]
        }, day.toString());
      })]
    })]
  });
}

function EventCalendar(_a) {
  var _b = _a.events,
    events = _b === void 0 ? [] : _b;
    _a.onEventAdd;
    var onEventUpdate = _a.onEventUpdate;
    _a.onEventDelete;
    var className = _a.className,
    _c = _a.initialView,
    initialView = _c === void 0 ? "month" : _c,
    onEventCreate = _a.onEventCreate,
    onEventSelect = _a.onEventSelect;
  var _d = useState(new Date()),
    currentDate = _d[0],
    setCurrentDate = _d[1];
  var _e = useState(initialView),
    view = _e[0],
    setView = _e[1];
  // const [isEventDialogOpen, setIsEventDialogOpen] = useState(false)
  // const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null)
  // Add keyboard shortcuts for view switching
  useEffect(function () {
    var handleKeyDown = function (e) {
      // Skip if user is typing in an input, textarea or contentEditable element
      // or if the event dialog is open
      if (
      // isEventDialogOpen ||
      e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement || e.target instanceof HTMLElement && e.target.isContentEditable) {
        return;
      }
      switch (e.key.toLowerCase()) {
        case "m":
          setView("month");
          break;
        case "w":
          setView("week");
          break;
        case "d":
          setView("day");
          break;
        case "a":
          setView("agenda");
          break;
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return function () {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [
    /* isEventDialogOpen */
  ]);
  var handlePrevious = function () {
    if (view === "month") {
      setCurrentDate(subMonths(currentDate, 1));
    } else if (view === "week") {
      setCurrentDate(subWeeks(currentDate, 1));
    } else if (view === "day") {
      setCurrentDate(addDays(currentDate, -1));
    } else if (view === "agenda") {
      // For agenda view, go back 30 days (a full month)
      setCurrentDate(addDays(currentDate, -30));
    }
  };
  var handleNext = function () {
    if (view === "month") {
      setCurrentDate(addMonths(currentDate, 1));
    } else if (view === "week") {
      setCurrentDate(addWeeks(currentDate, 1));
    } else if (view === "day") {
      setCurrentDate(addDays(currentDate, 1));
    } else if (view === "agenda") {
      // For agenda view, go forward 30 days (a full month)
      setCurrentDate(addDays(currentDate, AgendaDaysToShow));
    }
  };
  var handleToday = function () {
    setCurrentDate(new Date());
  };
  var handleEventUpdate = function (updatedEvent) {
    onEventUpdate === null || onEventUpdate === void 0 ? void 0 : onEventUpdate(updatedEvent);
    // // Show toast notification when an event is updated via drag and drop
    // toast(`Event "${updatedEvent.title}" moved`, {
    //   description: format(new Date(updatedEvent.start), "MMM d, yyyy"),
    //   position: "bottom-left",
    // })
  };
  var viewTitle = useMemo(function () {
    if (view === "month") {
      return format(currentDate, "MMMM yyyy");
    } else if (view === "week") {
      var start = startOfWeek(currentDate, {
        weekStartsOn: 0
      });
      var end = endOfWeek(currentDate, {
        weekStartsOn: 0
      });
      if (isSameMonth(start, end)) {
        return format(start, "MMMM yyyy");
      } else {
        return "".concat(format(start, "MMM"), " - ").concat(format(end, "MMM yyyy"));
      }
    } else if (view === "day") {
      return jsxs(Fragment, {
        children: [jsx("span", {
          className: "min-[480px]:hidden",
          "aria-hidden": "true",
          children: format(currentDate, "MMM d, yyyy")
        }), jsx("span", {
          className: "max-[479px]:hidden min-md:hidden",
          "aria-hidden": "true",
          children: format(currentDate, "MMMM d, yyyy")
        }), jsx("span", {
          className: "max-md:hidden",
          children: format(currentDate, "EEE MMMM d, yyyy")
        })]
      });
    } else if (view === "agenda") {
      // Show the month range for agenda view
      var start = currentDate;
      var end = addDays(currentDate, AgendaDaysToShow - 1);
      if (isSameMonth(start, end)) {
        return format(start, "MMMM yyyy");
      } else {
        return "".concat(format(start, "MMM"), " - ").concat(format(end, "MMM yyyy"));
      }
    } else {
      return format(currentDate, "MMMM yyyy");
    }
  }, [currentDate, view]);
  return jsx("div", {
    className: "flex flex-col rounded-lg border has-data-[slot=month-view]:flex-1",
    style: {
      "--event-height": "".concat(EventHeight, "px"),
      "--event-gap": "".concat(EventGap, "px"),
      "--week-cells-height": "".concat(WeekCellsHeight, "px")
    },
    children: jsxs(CalendarDndProvider, {
      onEventUpdate: handleEventUpdate,
      children: [jsxs("div", {
        className: cn("flex items-center justify-between p-2 sm:p-4", className),
        children: [jsxs("div", {
          className: "flex items-center gap-1 sm:gap-4",
          children: [jsxs(Button$1, {
            variant: "outline",
            className: "aspect-square max-[479px]:p-0!",
            onClick: handleToday,
            children: [jsx(RiCalendarCheckLine, {
              className: "min-[480px]:hidden",
              size: 16,
              "aria-hidden": "true"
            }), jsx("span", {
              className: "max-[479px]:sr-only",
              children: "Today"
            })]
          }), jsxs("div", {
            className: "flex items-center sm:gap-2",
            children: [jsx(Button$1, {
              variant: "ghost",
              size: "icon",
              onClick: handlePrevious,
              "aria-label": "Previous",
              children: jsx(ChevronLeftIcon, {
                size: 16,
                "aria-hidden": "true"
              })
            }), jsx(Button$1, {
              variant: "ghost",
              size: "icon",
              onClick: handleNext,
              "aria-label": "Next",
              children: jsx(ChevronRightIcon, {
                size: 16,
                "aria-hidden": "true"
              })
            })]
          }), jsx("h2", {
            className: "text-sm font-semibold sm:text-lg md:text-xl",
            children: viewTitle
          })]
        }), jsxs("div", {
          className: "flex items-center gap-2",
          children: [jsxs(DropdownMenu, {
            children: [jsx(DropdownMenuTrigger, {
              asChild: true,
              children: jsxs(Button$1, {
                variant: "outline",
                className: "gap-1.5 max-[479px]:h-8",
                children: [jsxs("span", {
                  children: [jsx("span", {
                    className: "min-[480px]:hidden",
                    "aria-hidden": "true",
                    children: view.charAt(0).toUpperCase()
                  }), jsx("span", {
                    className: "max-[479px]:sr-only",
                    children: view.charAt(0).toUpperCase() + view.slice(1)
                  })]
                }), jsx(ChevronDownIcon, {
                  className: "-me-1 opacity-60",
                  size: 16,
                  "aria-hidden": "true"
                })]
              })
            }), jsxs(DropdownMenuContent, {
              align: "end",
              className: "min-w-32",
              children: [jsxs(DropdownMenuItem, {
                onClick: function () {
                  return setView("month");
                },
                children: ["Month ", jsx(DropdownMenuShortcut, {
                  children: "M"
                })]
              }), jsxs(DropdownMenuItem, {
                onClick: function () {
                  return setView("week");
                },
                children: ["Week ", jsx(DropdownMenuShortcut, {
                  children: "W"
                })]
              }), jsxs(DropdownMenuItem, {
                onClick: function () {
                  return setView("day");
                },
                children: ["Day ", jsx(DropdownMenuShortcut, {
                  children: "D"
                })]
              }), jsxs(DropdownMenuItem, {
                onClick: function () {
                  return setView("agenda");
                },
                children: ["Agenda ", jsx(DropdownMenuShortcut, {
                  children: "A"
                })]
              })]
            })]
          }), jsxs(Button$1, {
            className: "aspect-square max-[479px]:p-0!",
            onClick: function () {
              var startTime = new Date(currentDate);
              startTime.setHours(0, 0, 0, 0);
              onEventCreate === null || onEventCreate === void 0 ? void 0 : onEventCreate(startTime);
            },
            children: [jsx(PlusIcon, {
              className: "opacity-60 sm:-ms-1",
              size: 16,
              "aria-hidden": "true"
            }), jsx("span", {
              className: "max-sm:sr-only",
              children: "New event"
            })]
          })]
        })]
      }), jsxs("div", {
        className: "flex flex-1 flex-col",
        children: [view === "month" && jsx(MonthView, {
          currentDate: currentDate,
          events: events,
          onEventSelect: onEventSelect,
          onEventCreate: onEventCreate
        }), view === "week" && jsx(WeekView, {
          currentDate: currentDate,
          events: events,
          onEventSelect: onEventSelect,
          onEventCreate: onEventCreate
        }), view === "day" && jsx(DayView, {
          currentDate: currentDate,
          events: events,
          onEventSelect: onEventSelect,
          onEventCreate: onEventCreate
        }), view === "agenda" && jsx(AgendaView, {
          currentDate: currentDate,
          events: events,
          onEventSelect: onEventSelect
        })]
      })]
    })
  });
}

export { AgendaDaysToShow, AgendaView, CalendarDndProvider, DayView, DefaultEndHour, DefaultStartHour, DraggableEvent, DroppableCell, EndHour, EventCalendar, EventDialog, EventGap, EventHeight, EventItem, EventsPopup, MonthView, StartHour, WeekCellsHeight, WeekView, getAgendaEventsForDay, getAllEventsForDay, getBorderRadiusClasses, getEventColorClasses, getEventsForDay, getSpanningEventsForDay, isMultiDayEvent, sortEvents, useCalendarDnd, useCurrentTimeIndicator, useEventVisibility };
//# sourceMappingURL=index.esm.js.map
