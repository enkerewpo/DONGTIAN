import {
  Comment,
  Fragment,
  Suspense,
  Teleport,
  Text,
  Transition,
  TransitionGroup,
  capitalize,
  computed,
  createBaseVNode,
  createBlock,
  createCommentVNode,
  createElementBlock,
  createSlots,
  createTextVNode,
  createVNode,
  customRef,
  defineComponent,
  defineCustomElement,
  getCurrentInstance,
  getCurrentScope,
  guardReactiveProps,
  h,
  inject,
  isRef,
  isVNode,
  mergeDefaults,
  mergeProps,
  nextTick,
  normalizeClass,
  normalizeProps,
  normalizeStyle,
  onBeforeMount,
  onBeforeUnmount,
  onBeforeUpdate,
  onMounted,
  onScopeDispose,
  onUpdated,
  openBlock,
  provide,
  reactive,
  ref,
  render,
  renderList,
  renderSlot,
  resolveComponent,
  resolveDynamicComponent,
  shallowReactive,
  shallowReadonly,
  shallowRef,
  toDisplayString,
  toHandlers,
  toRef,
  toRefs,
  unref,
  useAttrs,
  useSlots,
  vModelDynamic,
  vModelText,
  vShow,
  watch,
  watchEffect,
  withCtx,
  withDirectives,
  withKeys,
  withModifiers
} from "./chunk-7H3D676B.js";

// node_modules/vuestic-ui/dist/es/src/services/color/presets.js
var presets = {
  light: {
    // Accent
    primary: "#154EC1",
    secondary: "#767C88",
    success: "#3D9209",
    info: "#158DE3",
    danger: "#E42222",
    warning: "#FFD43A",
    // Background Colors
    backgroundPrimary: "#f6f6f6",
    backgroundSecondary: "#FFFFFF",
    backgroundElement: "#ECF0F1",
    backgroundBorder: "#DEE5F2",
    // Text Colors
    textPrimary: "#262824",
    textInverted: "#FFFFFF",
    // Misc
    shadow: "rgba(0, 0, 0, 0.12)",
    focus: "#49A8FF",
    transparent: "rgba(0, 0, 0, 0)"
  },
  dark: {
    // Accent
    primary: "#3472F0",
    secondary: "#767C88",
    success: "#66BE33",
    info: "#3EAAF8",
    danger: "#F34030",
    warning: "#FFD952",
    // Background Colors
    backgroundPrimary: "#050A10",
    backgroundSecondary: "#1F262F",
    backgroundElement: "#131A22",
    backgroundBorder: "#3D4C58",
    // Text Colors
    textPrimary: "#F1F1F1",
    textInverted: "#0B121A",
    // Misc
    shadow: "rgba(255, 255, 255, 0.12)",
    focus: "#49A8FF",
    transparent: "rgba(0, 0, 0, 0)"
  }
};

// node_modules/vuestic-ui/dist/es/src/services/breakpoint/index.js
var vaBreakpointSymbol = Symbol("vaBreakpoint");
var defaultThresholds = {
  xs: 0,
  sm: 640,
  md: 1024,
  lg: 1440,
  xl: 1920
};
var getBreakpointDefaultConfig = () => ({
  enabled: true,
  bodyClass: true,
  thresholds: defaultThresholds
});

// node_modules/vuestic-ui/dist/es/src/services/global-config/types.js
var defineVuesticConfig = (config) => config;

// node_modules/vuestic-ui/dist/es/src/services/config-transport/createRenderFn.js
var renderSlotNode = (node, ctx = null) => {
  return withCtx(() => [node], ctx);
};
var makeVNode = (node) => {
  if (typeof node === "string") {
    return h(Text, node);
  }
  return isVNode(node) ? node : createBlock(node);
};
var renderSlots = (slots, ctx = null) => {
  return Object.keys(slots).reduce((acc, slotName) => {
    const slot = slots[slotName];
    acc[slotName] = typeof slot === "function" ? slot : renderSlotNode(slot, ctx);
    return acc;
  }, {});
};
var createRenderFn = (component) => {
  const originalRenderFn = component.render || component.ssrRender;
  if (!originalRenderFn) {
    return void 0;
  }
  const compiledRenderedFn = originalRenderFn.name === "_sfc_render" || originalRenderFn.name === "_sfc_ssrRender";
  return function(...args) {
    const ctx = args[0];
    const slots = ctx.$.slots;
    const customCtx = new Proxy(ctx, {
      get(target, key) {
        if (key === "$slots") {
          return renderSlots(slots);
        }
        return target[key];
      }
    });
    const thisArg = compiledRenderedFn ? void 0 : customCtx;
    return originalRenderFn.call(thisArg, customCtx, ...args.slice(1));
  };
};

// node_modules/vuestic-ui/dist/es/src/utils/omit.js
var omit = (o, keys) => {
  return Object.keys(o).filter((key) => !keys.includes(key)).reduce((acc, key) => {
    acc[key] = o[key];
    return acc;
  }, {});
};

// node_modules/vuestic-ui/dist/es/src/composables/useChildComponents.js
var CHILD_COMPONENT_PROP_PREFIX = "child:";
var CHILD_COMPONENTS_INJECT_KEY = "$va:childComponents";
var defineChildProps = (obj) => {
  return Object.keys(obj).reduce((acc, key) => {
    const childName = `${CHILD_COMPONENT_PROP_PREFIX}${key}`;
    acc[childName] = {
      type: Object,
      required: false,
      default: void 0
    };
    return acc;
  }, {});
};
var useChildComponents = (props) => {
  const childProps = computed(() => {
    const propNames = Object.keys(props);
    return propNames.reduce((acc, propName) => {
      if (propName.startsWith(CHILD_COMPONENT_PROP_PREFIX)) {
        const childName = propName.slice(CHILD_COMPONENT_PROP_PREFIX.length);
        acc[childName] = props[propName];
      }
      return acc;
    }, {});
  });
  provide(CHILD_COMPONENTS_INJECT_KEY, childProps);
};
var injectChildPropsFromParent = () => {
  var _a2;
  const childName = (_a2 = getCurrentInstance()) == null ? void 0 : _a2.attrs["va-child"];
  if (!childName) {
    return null;
  }
  const childProps = inject(CHILD_COMPONENTS_INJECT_KEY);
  if (!(childProps == null ? void 0 : childProps.value)) {
    return null;
  }
  return computed(() => childProps.value[childName]);
};

// node_modules/vuestic-ui/dist/es/src/services/config-transport/createProps.js
var KEBAB_CASE_REGEX = /([a-z0-9])([A-Z])/g;
var toKebabCase = (str) => str.replace(KEBAB_CASE_REGEX, "$1-$2").toLowerCase();
var findCamelCased = (obj, key) => {
  if (key in obj) {
    return obj[key];
  }
  return obj[toKebabCase(key)];
};
var createProps = (instance, propsFromConfig) => {
  const instanceProps = instance.props;
  const childPropsFromParent = injectChildPropsFromParent();
  return new Proxy(instanceProps, {
    get: (target, key) => {
      var _a2, _b;
      if (typeof key !== "string") {
        return target[key];
      }
      const childProp = (_a2 = childPropsFromParent == null ? void 0 : childPropsFromParent.value) == null ? void 0 : _a2[key];
      if (childProp !== void 0) {
        return childProp;
      }
      const incomingProps = instance.vnode.props || {};
      const originalProp = target[key];
      const incomingProp = findCamelCased(incomingProps, key);
      if (incomingProp !== void 0) {
        return originalProp;
      }
      const propFromConfig = (_b = propsFromConfig.value) == null ? void 0 : _b[key];
      if (propFromConfig !== void 0) {
        return propFromConfig;
      }
      return originalProp;
    }
  });
};

// node_modules/vuestic-ui/dist/es/src/services/config-transport/createAttrs.js
var createAttrs = (instance, propsFromConfig) => {
  const instanceAttrs = instance.attrs;
  return new Proxy(instanceAttrs, {
    get: (target, key) => {
      var _a2;
      if (typeof key !== "string") {
        return target[key];
      }
      if (key === "class") {
        return normalizeClass([propsFromConfig.value.class, instanceAttrs.class]);
      }
      if (key === "style") {
        return normalizeStyle([propsFromConfig.value.style, instanceAttrs.style]);
      }
      const attrFromConfig = (_a2 = propsFromConfig.value) == null ? void 0 : _a2[key];
      if (attrFromConfig !== void 0) {
        return attrFromConfig;
      }
      return target[key];
    },
    ownKeys(target) {
      return [.../* @__PURE__ */ new Set([...Object.keys(instanceAttrs), ...Object.keys(propsFromConfig.value)])];
    },
    getOwnPropertyDescriptor(target, key) {
      return Reflect.getOwnPropertyDescriptor(propsFromConfig.value, key) ?? Reflect.getOwnPropertyDescriptor(instanceAttrs, key);
    }
  });
};

// node_modules/vuestic-ui/dist/es/src/services/config-transport/createSlots.js
var SLOT_PREFIX = "slot:";
var createSlots2 = (instance, propsFromConfig) => {
  const instanceSlots = instance.slots;
  const childPropsFromParent = injectChildPropsFromParent();
  const slotsFromConfig = computed(() => {
    return Object.keys(propsFromConfig.value).reduce((acc, key) => {
      if (key.startsWith(SLOT_PREFIX)) {
        acc[key.slice(SLOT_PREFIX.length)] = propsFromConfig.value[key];
      }
      return acc;
    }, {});
  });
  return new Proxy(instanceSlots, {
    get: (target, key) => {
      var _a2, _b;
      if (typeof key !== "string") {
        return target[key];
      }
      const prefixedKey = `${SLOT_PREFIX}${key}`;
      const childSlot = (_a2 = childPropsFromParent == null ? void 0 : childPropsFromParent.value) == null ? void 0 : _a2[prefixedKey];
      if (childSlot !== void 0) {
        return renderSlotNode(makeVNode(childSlot));
      }
      const originalSlot = target[key];
      if (originalSlot !== void 0) {
        return originalSlot;
      }
      const propFromConfig = (_b = slotsFromConfig.value) == null ? void 0 : _b[key];
      if (propFromConfig !== void 0) {
        return renderSlotNode(makeVNode(propFromConfig));
      }
      return originalSlot;
    },
    ownKeys(target) {
      return [.../* @__PURE__ */ new Set([...Object.keys(instanceSlots), ...Object.keys(slotsFromConfig.value)])];
    },
    getOwnPropertyDescriptor(target, key) {
      return Reflect.getOwnPropertyDescriptor(slotsFromConfig.value, key) ?? Reflect.getOwnPropertyDescriptor(instanceSlots, key);
    }
  });
};

// node_modules/vuestic-ui/dist/es/src/composables/useLocalConfig.js
var LocalConfigKey = "VaLocalConfig";
var CONFIGS_DEFAULT = computed(() => []);
function useLocalConfig() {
  return inject(LocalConfigKey, CONFIGS_DEFAULT);
}
function provideLocalConfig(config) {
  provide(LocalConfigKey, config);
}
function useLocalConfigProvider(config) {
  const prevChain = useLocalConfig();
  const nextChain = computed(() => [...prevChain.value, config.value]);
  provideLocalConfig(nextChain);
}

// node_modules/vuestic-ui/dist/es/src/utils/isNilValue.js
var nilValues = [null, void 0, ""];
var nullOrUndefined = [null, void 0];
var isNilValue = (value) => {
  return nilValues.includes(value);
};
var notNil = (value) => !isNilValue(value);
var isNil = (value) => {
  return nullOrUndefined.includes(value);
};

// node_modules/vuestic-ui/dist/es/src/utils/env.js
var processShim = typeof process !== "undefined" ? process : {};
var envShim = processShim.env || {};
var nodeEnv = envShim.NODE_ENV || "";
var isDev = typeof __DEV__ !== "undefined" ? __DEV__ : !["prod", "production"].includes(nodeEnv);

// node_modules/vuestic-ui/dist/es/src/utils/console.js
var warn = (...attrs) => {
  if (isDev) {
    console.warn(...attrs);
  }
  return false;
};
var throwError = (message) => {
  throw new Error(`[Vuestic] ${message}`);
};

// node_modules/vuestic-ui/dist/es/src/services/current-app.js
var currentApp = null;
var prevRegisteredApp = null;
var setCurrentApp = (newApp) => {
  if ((prevRegisteredApp == null ? void 0 : prevRegisteredApp._instance) === null) {
    prevRegisteredApp = null;
  }
  if (newApp === null && prevRegisteredApp === null) {
    return;
  }
  prevRegisteredApp = currentApp;
  currentApp = newApp;
};
var getCurrentApp = () => currentApp;
var inject2 = (key, value = void 0) => {
  var _a2;
  const injectedFromApp = (_a2 = getCurrentApp()) == null ? void 0 : _a2._context.provides[key];
  const vm = getCurrentInstance();
  if (vm) {
    return inject(key, value);
  }
  return injectedFromApp ?? throwError("You're using Vuestic composable outside Vue app. Since you registered Vuestic in multiple apps, composables can not be used outside setup function anymore.");
};

// node_modules/vuestic-ui/dist/es/src/utils/is-object.js
var isObject = (obj) => {
  return obj !== null && typeof obj === "object";
};

// node_modules/vuestic-ui/dist/es/src/utils/clone-deep.js
var cloneDeep = (source) => {
  if (source === null || typeof source !== "object") {
    return source;
  }
  if (Array.isArray(source)) {
    return source.map(cloneDeep);
  }
  if (source instanceof Date) {
    return new Date(source.getTime());
  }
  if (source instanceof RegExp) {
    return new RegExp(source.source, source.flags);
  }
  if (source instanceof Map) {
    return new Map(Array.from(source.entries()).map(([key, value]) => [key, cloneDeep(value)]));
  }
  if (source instanceof Set) {
    return new Set(Array.from(source.values()).map(cloneDeep));
  }
  if (isObject(source)) {
    return Object.keys(source).reduce((acc, key) => {
      acc[key] = cloneDeep(source[key]);
      return acc;
    }, {});
  }
  if (typeof source === "function") {
    return source;
  }
  return source;
};

// node_modules/vuestic-ui/dist/es/src/utils/merge-deep.js
var isObject2 = (obj) => obj && typeof obj === "object" && !Array.isArray(obj);
var mergeDeep = (target, source) => {
  if (!isObject2(target)) {
    target = {};
  }
  Object.keys(source).forEach((key) => {
    const targetValue = target[key];
    const sourceValue = source[key];
    if (sourceValue instanceof RegExp || sourceValue instanceof Date) {
      target[key] = sourceValue;
    } else if (isObject2(targetValue) && isObject2(sourceValue)) {
      target[key] = mergeDeep(Object.create(
        Object.getPrototypeOf(targetValue),
        Object.getOwnPropertyDescriptors(targetValue)
      ), sourceValue);
    } else {
      target[key] = sourceValue;
    }
  });
  return target;
};
var mergeDeepMultiple = (...objects) => {
  return objects.reduce((acc, obj) => mergeDeep(acc, obj), {});
};

// node_modules/vuestic-ui/dist/es/src/services/colors-classes/config/default.js
var ColorsClassesPresets = [
  {
    prefix: "bg",
    property: "background-color"
  },
  {
    prefix: "text",
    property: ["color", "fill"]
  }
];
var getColorsClassesDefaultConfig = () => ColorsClassesPresets;

// node_modules/vuestic-ui/dist/es/src/services/color/config/make-config.js
var makeColorsConfig = (values) => ({
  ...values,
  get variables() {
    return this.presets[this.currentPresetName];
  },
  set variables(value) {
    this.presets[this.currentPresetName] = value;
  }
});

// node_modules/vuestic-ui/dist/es/src/services/color/config/default.js
var getColorDefaultConfig = () => makeColorsConfig({
  threshold: 150,
  presets: {
    light: presets.light,
    dark: presets.dark
  },
  currentPresetName: "light"
});

// node_modules/vuestic-ui/dist/es/src/services/icon/types/define-aliases.js
var defineIconAliases = (aliases) => aliases;

// node_modules/vuestic-ui/dist/es/src/services/icon/presets/vuestic-aliases.js
var VuesticIconAliases = defineIconAliases([
  {
    name: "va-unsorted",
    to: "swap_vert"
  },
  {
    name: "va-sort-asc",
    to: "va-arrow-up"
  },
  {
    name: "va-sort-desc",
    to: "va-arrow-down"
  },
  {
    name: "va-arrow-first",
    to: "mi-first_page"
  },
  {
    name: "va-arrow-last",
    to: "mi-last_page"
  },
  {
    name: "va-arrow-right",
    to: "mi-chevron_right"
  },
  {
    name: "va-arrow-left",
    to: "mi-chevron_left"
  },
  {
    name: "va-arrow-down",
    to: "mi-expand_more"
  },
  {
    name: "va-arrow-up",
    to: "mi-expand_less"
  },
  {
    name: "va-calendar",
    to: "mi-calendar_today"
  },
  {
    name: "va-delete",
    to: "mi-delete_outline"
  },
  {
    name: "va-check",
    to: "mi-check"
  },
  {
    name: "va-check-circle",
    to: "mi-check_circle"
  },
  {
    name: "va-warning",
    to: "mi-warning"
  },
  {
    name: "va-clear",
    to: "mi-highlight_off"
  },
  {
    name: "va-close",
    to: "mi-close"
  },
  {
    name: "va-loading",
    to: "mi-loop"
  },
  {
    name: "va-plus",
    to: "mi-add"
  },
  {
    name: "va-minus",
    to: "mi-remove"
  }
]);

// node_modules/vuestic-ui/dist/es/src/services/icon/presets/fonts.js
var VuesticIconFonts = [
  {
    name: "mi-{icon}",
    class: "material-icons",
    resolve: ({ icon }) => ({ content: icon })
  },
  // Fallback
  {
    name: "{icon}",
    class: "material-icons",
    resolve: ({ icon }) => ({ content: icon })
  }
];

// node_modules/vuestic-ui/dist/es/src/services/icon/create-icons-config.js
var createIconsConfig = (config) => {
  config.aliases = config.aliases || [];
  config.fonts = config.fonts || [];
  return [
    ...config.aliases,
    ...VuesticIconAliases,
    ...config.fonts,
    ...VuesticIconFonts
  ];
};

// node_modules/vuestic-ui/dist/es/src/services/icon/config/default.js
var getIconDefaultConfig = () => createIconsConfig({});

// node_modules/vuestic-ui/dist/es/src/services/component-config/config/default.js
var getComponentsDefaultConfig = () => (
  // TODO: Should be handled in size service
  {
    VaIcon: {
      sizesConfig: {
        defaultSize: 18,
        sizes: {
          small: 14,
          medium: 18,
          large: 24
        }
      }
    },
    VaRating: {
      sizesConfig: {
        defaultSize: 18,
        sizes: {
          small: 14,
          medium: 18,
          large: 24
        }
      }
    },
    all: {},
    presets: {
      VaButton: {
        default: {
          backgroundOpacity: 1,
          hoverBehavior: "mask",
          hoverOpacity: 0.15,
          pressedBehavior: "mask",
          pressedOpacity: 0.13
        },
        primary: {
          backgroundOpacity: 0.1,
          hoverBehavior: "opacity",
          hoverOpacity: 0.07,
          pressedBehavior: "opacity",
          pressedOpacity: 0.13
        },
        secondary: {
          backgroundOpacity: 0,
          hoverBehavior: "opacity",
          hoverOpacity: 0.07,
          pressedBehavior: "opacity",
          pressedOpacity: 0.13
        },
        plain: {
          plain: true,
          hoverBehavior: "mask",
          hoverOpacity: 0.15,
          pressedBehavior: "mask",
          pressedOpacity: 0.13
        },
        plainOpacity: {
          plain: true,
          textOpacity: 0.6,
          hoverBehavior: "opacity",
          hoverOpacity: 1,
          pressedBehavior: "opacity",
          pressedOpacity: 0.9
        }
      },
      VaInputWrapper: {
        solid: {
          background: "backgroundElement"
        },
        bordered: {
          class: "va-input-wrapper--bordered",
          background: "backgroundElement"
        }
      },
      VaCheckbox: {
        solid: {
          style: "--va-checkbox-background: var(--va-background-element)"
        }
      },
      VaRadio: {
        solid: {
          style: "--va-radio-background: var(--va-background-element)"
        }
      },
      VaMenu: {
        context: {
          cursor: true,
          placement: "right-start",
          trigger: "right-click"
        }
      }
    }
  }
);

// node_modules/vuestic-ui/dist/es/src/services/i18n/config/default.js
var getI18nConfigDefaults = () => ({
  // PROPS
  /** Select search field default text */
  search: "Search",
  /** Select no options text */
  noOptions: "Items not found",
  /** Modal Ok button default text */
  ok: "OK",
  /** Modal Cancel button default text */
  cancel: "Cancel",
  /** FileUpload default button text */
  uploadFile: "Upload file",
  /** FileUpload default undo button text */
  undo: "Undo",
  /** FileUpload default dropzone text */
  dropzone: "Drop files here to upload",
  /** FileUpload default file deleted alert text */
  fileDeleted: "File deleted",
  // Aria attributes
  /** Alert close button aria-label */
  closeAlert: "close alert",
  backToTop: "back to top",
  toggleDropdown: "toggle dropdown",
  carousel: "carousel",
  goPreviousSlide: "go previous slide",
  goNextSlide: "go next slide",
  goSlide: "go slide {index}",
  slideOf: "slide {index} of {length}",
  close: "close",
  openColorPicker: "open color picker",
  colorSelection: "color selection",
  colorName: "color {color}",
  decreaseCounter: "decrease counter",
  increaseCounter: "increase counter",
  selectAllRows: "select all rows",
  sortColumnBy: "sort column by {name}",
  selectRowByIndex: "select row {index}",
  resetDate: "reset date",
  nextPeriod: "next period",
  switchView: "switch view",
  previousPeriod: "previous period",
  removeFile: "remove file",
  reset: "reset",
  pagination: "pagination",
  goToTheFirstPage: "go to the first page",
  goToPreviousPage: "go to the previous page",
  goToSpecificPage: "go to the {page} page",
  goToSpecificPageInput: "enter the page number to go",
  goNextPage: "go next page",
  goLastPage: "go last page",
  /** Rating aria-label */
  currentRating: "current rating {value} of {max}",
  /** Rating item aria-label */
  voteRating: "vote rating {value} of {max}",
  /** Select search input aria-label */
  optionsFilter: "options filter",
  splitPanels: "split panels",
  movePaginationLeft: "move pagination left",
  movePaginationRight: "move pagination right",
  resetTime: "reset time",
  closeToast: "close toast",
  /**
   * Select aria-label selected option prefix
   *
   * @example
   *
   * `Selected option: {option}` or `Selected option: Animal`
   */
  selectedOption: "Selected option",
  /** Select aria-label if no option is selected */
  noSelectedOption: "Option is not selected",
  breadcrumbs: "breadcrumbs",
  counterValue: "counter value",
  selectedDate: "selected date",
  selectedTime: "selected time",
  progressState: "progress state",
  color: "color",
  /** Stepper next button text */
  next: "Next",
  /** Stepper previous button text */
  back: "Previous",
  /** Stepper finish button text */
  finish: "Finish",
  step: "step",
  progress: "progress",
  /** Skeleton aria label */
  loading: "Loading",
  /** Slider aria label */
  sliderValue: "Current slider value is {value}",
  /** Switch aria label */
  switch: "Switch",
  /** Input aria label */
  inputField: "Input field",
  /** File Input message when file type is incorrect */
  fileTypeIncorrect: "File type is incorrect",
  /** Select aria label */
  select: "Select an option"
});

// node_modules/vuestic-ui/dist/es/src/services/global-config/global-config.js
var GLOBAL_CONFIG = Symbol("GLOBAL_CONFIG");
var getDefaultConfig = () => ({
  colors: getColorDefaultConfig(),
  icons: getIconDefaultConfig(),
  components: getComponentsDefaultConfig(),
  breakpoint: getBreakpointDefaultConfig(),
  i18n: getI18nConfigDefaults(),
  colorsClasses: getColorsClassesDefaultConfig(),
  /**
   * global config variable to pass nuxt-link component to vuestic-ui via @vuestic/nuxt
   * TODO: give a try to integrate inertia js router components via this option
   * TODO: if this try won't be success, may be remake to provide/inject
   */
  routerComponent: void 0
});
var createGlobalConfig = (defaultConfig = {}) => {
  const globalConfig = ref(mergeDeep(getDefaultConfig(), defaultConfig));
  const getGlobalConfig = () => globalConfig.value;
  const setGlobalConfig = (updater) => {
    const config = typeof updater === "function" ? updater(globalConfig.value) : updater;
    globalConfig.value = cloneDeep(config);
  };
  const mergeGlobalConfig = (updater) => {
    const config = typeof updater === "function" ? updater(globalConfig.value) : updater;
    globalConfig.value = mergeDeep(cloneDeep(globalConfig.value), config);
  };
  return {
    getGlobalConfig,
    setGlobalConfig,
    mergeGlobalConfig,
    globalConfig
  };
};
var provideForCurrentApp = (provide2) => {
  var _a2, _b;
  const provides = ((_a2 = getCurrentInstance()) == null ? void 0 : _a2.appContext.provides) || ((_b = getCurrentApp()) == null ? void 0 : _b._context.provides);
  if (!provides) {
    throw new Error("Vue app not found for provide");
  }
  provides[GLOBAL_CONFIG] = provide2;
  return provide2;
};

// node_modules/vuestic-ui/dist/es/src/composables/useGlobalConfig.js
function useGlobalConfig() {
  let injected = inject2(GLOBAL_CONFIG);
  if (!injected) {
    injected = createGlobalConfig();
    provideForCurrentApp(injected);
  }
  return injected;
}

// node_modules/vuestic-ui/dist/es/src/services/component-config/utils/use-component-config-props.js
var withPresetProp = (props) => "preset" in props;
var getPresetProp = (props) => withPresetProp(props) ? props.preset : void 0;
var useComponentConfigProps = (component, originalProps) => {
  const localConfig = useLocalConfig();
  const { globalConfig } = useGlobalConfig();
  const componentName2 = component.name;
  const getPresetProps = (presetPropValue) => {
    return (presetPropValue instanceof Array ? presetPropValue : [presetPropValue]).reduce((acc, presetName) => {
      var _a2, _b, _c;
      const presetProps = (_c = (_b = (_a2 = globalConfig.value.components) == null ? void 0 : _a2.presets) == null ? void 0 : _b[componentName2]) == null ? void 0 : _c[presetName];
      if (!presetProps) {
        return acc;
      }
      const extendedPresets = getPresetProp(presetProps);
      return {
        ...acc,
        ...extendedPresets ? getPresetProps(extendedPresets) : void 0,
        ...presetProps
      };
    }, {});
  };
  const parentInjectedProps = injectChildPropsFromParent();
  return computed(() => {
    var _a2, _b;
    const globalConfigProps = {
      ...(_a2 = globalConfig.value.components) == null ? void 0 : _a2.all,
      ...(_b = globalConfig.value.components) == null ? void 0 : _b[componentName2]
    };
    const localConfigProps = localConfig.value.reduce((finalConfig, config) => {
      const componentConfigProps = config[componentName2];
      return componentConfigProps ? { ...finalConfig, ...componentConfigProps } : finalConfig;
    }, {});
    const presetProp = [
      originalProps,
      parentInjectedProps == null ? void 0 : parentInjectedProps.value,
      localConfigProps,
      globalConfigProps
    ].filter(notNil).map(getPresetProp).filter(notNil).at(0);
    const presetProps = presetProp ? getPresetProps(presetProp) : void 0;
    return { ...globalConfigProps, ...localConfigProps, ...presetProps };
  });
};

// node_modules/vuestic-ui/dist/es/src/services/config-transport/createSetupFn.js
var createSetupFn = (component) => {
  return (originalProps, ctx) => {
    var _a2;
    const instance = getCurrentInstance();
    const propsFromConfig = useComponentConfigProps(component, originalProps);
    const attrsFromConfig = computed(() => {
      return omit(propsFromConfig.value, Object.keys(originalProps));
    });
    const props = createProps(instance, propsFromConfig);
    const attrs = createAttrs(instance, attrsFromConfig);
    const slots = createSlots2(instance, propsFromConfig);
    instance.props = props;
    instance.attrs = attrs;
    instance.slots = slots;
    const setupState = (_a2 = component.setup) == null ? void 0 : _a2.call(component, shallowReadonly(props), {
      ...ctx,
      attrs,
      slots
    });
    if (typeof setupState === "object" && !instance.exposed) {
      ctx.expose(setupState);
    }
    return setupState;
  };
};

// node_modules/vuestic-ui/dist/es/src/services/config-transport/createProxyComponent.js
var createProxyComponent = (component) => {
  const setupFn = createSetupFn(component);
  const renderFn = createRenderFn(component);
  return new Proxy(component, {
    get(target, key) {
      if (!(key in component)) {
        return Reflect.get(target, key);
      }
      if (key === "setup") {
        return setupFn;
      }
      if (key === "render" || key === "ssrRender") {
        return renderFn;
      }
      return Reflect.get(target, key);
    }
  });
};

// node_modules/vuestic-ui/dist/es/src/services/config-transport/withConfigTransport.js
var CLASS_COMPONENT_KEY = "__c";
var patchClassComponent = (component) => {
  component[CLASS_COMPONENT_KEY] = createProxyComponent(component[CLASS_COMPONENT_KEY]);
  return component;
};
var withConfigTransport = (component) => {
  if ("setup" in component) {
    return createProxyComponent(component);
  } else if (CLASS_COMPONENT_KEY in component) {
    return patchClassComponent(component);
  } else {
    component.setup = () => ({
      /* Fake setup function */
    });
    return createProxyComponent(component);
  }
};
var withConfigTransport$1 = withConfigTransport;

// node_modules/vuestic-ui/dist/es/src/composables/useSize.js
var sizesConfig = {
  defaultSize: 48,
  sizes: {
    small: 32,
    medium: 48,
    large: 64
  }
};
var fontSizesConfig = {
  defaultSize: 1,
  sizes: {
    small: 0.75,
    medium: 1,
    large: 1.25
  }
};
var useSizeProps = {
  size: {
    type: [String, Number],
    default: "",
    validator: (size3) => {
      return typeof size3 === "string" || typeof size3 === "number";
    }
  },
  sizesConfig: {
    type: Object,
    default: () => sizesConfig
  },
  fontSizesConfig: {
    type: Object,
    default: () => fontSizesConfig
  }
};
var fontRegex = /(?<fontSize>\d+)(?<extension>px|rem)/i;
var convertToRem = (px) => px / 16 - 0.5;
var sizeToAbsolute = (size3) => {
  if (typeof size3 === "number") {
    return `${size3}px`;
  }
  return String(size3);
};
var doHaveSizesConfig = (props) => "sizesConfig" in props;
var useSizeRef = (props) => {
  const sizePropName = "size";
  return computed(() => {
    let sizePropValue = props[sizePropName];
    if (doHaveSizesConfig(props)) {
      const { defaultSize, sizes } = props.sizesConfig;
      if (isNilValue(sizePropValue)) {
        sizePropValue = defaultSize;
      }
      if (sizes) {
        const sizeFromConfig = sizes[sizePropValue];
        if (sizeFromConfig) {
          return sizeToAbsolute(sizeFromConfig);
        }
      }
    }
    return sizeToAbsolute(sizePropValue);
  });
};
var useSize = (props, componentName2 = ((_a2) => (_a2 = getCurrentInstance()) == null ? void 0 : _a2.type.name)()) => {
  const { getGlobalConfig } = useGlobalConfig();
  const sizesConfigGlobal = computed(() => {
    var _a2, _b;
    return componentName2 ? (_b = (_a2 = getGlobalConfig().components) == null ? void 0 : _a2[componentName2]) == null ? void 0 : _b.sizesConfig : void 0;
  });
  const sizeComputed = computed(() => {
    var _a2, _b, _c;
    const { defaultSize, sizes } = props.sizesConfig;
    const defaultSizeGlobal = (_a2 = sizesConfigGlobal.value) == null ? void 0 : _a2.defaultSize;
    if (!props.size) {
      return `${defaultSize || defaultSizeGlobal}px`;
    }
    if (typeof props.size === "string") {
      const sizeFromGlobalConfig = (_c = (_b = sizesConfigGlobal.value) == null ? void 0 : _b.sizes) == null ? void 0 : _c[props.size];
      const sizeFromProps = sizes[props.size];
      if (sizeFromProps) {
        return `${sizeFromProps}px`;
      }
      if (sizeFromGlobalConfig) {
        return `${sizeFromGlobalConfig}px`;
      }
      return props.size;
    }
    return `${props.size}px`;
  });
  const fontSizeInRem = computed(() => {
    const { defaultSize, sizes } = props.fontSizesConfig;
    if (!props.size) {
      return defaultSize;
    }
    if (typeof props.size === "string") {
      if (props.size in sizes) {
        return sizes[props.size];
      }
      const fontSizeParsed = props.size.match(fontRegex);
      if (!fontSizeParsed || !fontSizeParsed.groups) {
        throw new Error("Size prop should be either valid string or number");
      }
      const { extension, fontSize } = fontSizeParsed.groups;
      return extension === "rem" ? +fontSize : convertToRem(+fontSize);
    }
    return convertToRem(props.size);
  });
  const fontSizeComputed = computed(() => `${fontSizeInRem.value}rem`);
  return {
    sizeComputed,
    fontSizeComputed,
    fontSizeInRem
  };
};

// node_modules/vuestic-ui/dist/es/src/composables/useComponentPreset.js
var useComponentPresetProp = {
  preset: {
    type: [String, Array],
    default: void 0
  }
};

// node_modules/vuestic-ui/dist/es/src/services/icon/utils/regex.js
var isMatchRegex = (str, regex) => {
  return regex.test(str);
};
var regexGroupsValues = (str, regex) => {
  if (typeof regex !== "string" && regex.global) {
    return [...str.matchAll(regex)].map((g) => g.slice(1));
  }
  const match = str.match(regex) || [];
  if (!match) {
    return [];
  }
  if (match.length > 1) {
    return match.slice(1);
  }
  return match;
};

// node_modules/vuestic-ui/dist/es/src/services/icon/utils/dynamic-segment.js
var dynamicSegmentRegex = /{[^}]*}/g;
var dynamicSegmentStringToRegex = (template) => {
  return template.replace(dynamicSegmentRegex, "(.*)");
};
var dynamicSegmentsNames = (template) => {
  return (template.match(dynamicSegmentRegex) || []).map((g) => g.replace(/{|}/g, ""));
};
var dynamicSegmentsValues = (str, template) => {
  return regexGroupsValues(str, dynamicSegmentStringToRegex(template));
};
var dynamicSegments = (str, template) => {
  const params = dynamicSegmentsNames(template);
  const values = dynamicSegmentsValues(str, template);
  return params.reduce((acc, paramValue, i) => ({ ...acc, [paramValue]: values[i] }), {});
};
var strictMatch = (str, regex) => {
  return (str.match(regex) || [])[0] === str;
};
var isMatchDynamicSegments = (str, template) => {
  const templateRegex = dynamicSegmentStringToRegex(template);
  return strictMatch(str, new RegExp(templateRegex));
};

// node_modules/vuestic-ui/dist/es/src/services/icon/types.js
var isIconConfigurationString = (config) => {
  return typeof config.name === "string";
};
var isIconConfigurationRegex = (config) => {
  return config.name instanceof RegExp;
};

// node_modules/vuestic-ui/dist/es/src/services/icon/utils/get-icon-configuration.js
var isMatchConfiguration = (iconName, iconConfiguration) => {
  if (isIconConfigurationString(iconConfiguration)) {
    return isMatchDynamicSegments(iconName, iconConfiguration.name);
  }
  if (isIconConfigurationRegex(iconConfiguration)) {
    return isMatchRegex(iconName, iconConfiguration.name);
  }
  return false;
};
var resolveIconConfigurationString = (iconName, iconConfiguration) => {
  const args = dynamicSegments(iconName, iconConfiguration.name);
  return iconConfiguration.resolve && iconConfiguration.resolve(args);
};
var resolveIconConfigurationRegex = (iconName, iconConfig) => {
  if (iconConfig.name.global) {
    throw new Error(`Bad icon config with name ${iconConfig.name}. Please, don't use global regex as name.`);
  }
  const args = regexGroupsValues(iconName, iconConfig.name);
  return iconConfig.resolveFromRegex && iconConfig.resolveFromRegex(...args);
};
var resolveIconConfiguration = (iconName, iconConfiguration) => {
  if (isIconConfigurationString(iconConfiguration)) {
    return resolveIconConfigurationString(iconName, iconConfiguration);
  }
  if (isIconConfigurationRegex(iconConfiguration)) {
    return resolveIconConfigurationRegex(iconName, iconConfiguration);
  }
  throw Error("Unknown icon config");
};
var findMatchedIconConfiguration = (iconName, globalIconConfig, namesToIgnore = []) => {
  const matchedConfig = globalIconConfig.find((config) => {
    if (namesToIgnore.includes(config.name.toString())) {
      return false;
    }
    return isMatchConfiguration(iconName, config);
  });
  if (!matchedConfig) {
    throw new Error(`Can not find icon config from ${iconName}. Please provide default config.`);
  }
  return matchedConfig;
};
var findIconConfiguration = (iconName, globalIconConfig, namesToIgnore = []) => {
  if (!iconName) {
    return;
  }
  const matchedIconConfiguration = findMatchedIconConfiguration(iconName, globalIconConfig, namesToIgnore);
  const resolvedIconConfiguration = mergeDeep(resolveIconConfiguration(iconName, matchedIconConfiguration), matchedIconConfiguration);
  namesToIgnore = [...namesToIgnore, matchedIconConfiguration.name.toString()];
  return mergeDeep(
    findIconConfiguration(resolvedIconConfiguration.to, globalIconConfig, namesToIgnore),
    resolvedIconConfiguration
  );
};
var iconPropsFromIconConfiguration = (iconConfiguration) => {
  const junkKeys = ["name", "to", "resolve", "resolveFromRegex"];
  const configuration = iconConfiguration;
  junkKeys.forEach((key) => {
    delete configuration[key];
  });
  return configuration;
};
var getIconConfiguration = (name, iconConfig) => {
  const configuration = findIconConfiguration(name, iconConfig);
  if (configuration === void 0) {
    return {};
  }
  return iconPropsFromIconConfiguration(configuration);
};

// node_modules/vuestic-ui/dist/es/src/composables/useIcon.js
var useIcon = () => {
  const { globalConfig } = useGlobalConfig();
  return {
    getIcon: (name) => getIconConfiguration(name, globalConfig.value.icons)
  };
};

// node_modules/vuestic-ui/dist/es/src/services/vue-plugin/utils/define-vuestic-plugin.js
var defineVuesticPlugin = (fabric) => fabric;

// node_modules/vuestic-ui/dist/es/src/services/cache/plugin/index.js
var VaAppCachePluginKey = Symbol("VaAppCachePlugin");
var CachePlugin = defineVuesticPlugin(() => ({
  install(app) {
    const cache = {
      colorContrast: {}
    };
    app.provide(VaAppCachePluginKey, cache);
  }
}));

// node_modules/vuestic-ui/dist/es/src/composables/useCache.js
var useCache = () => {
  const cache = inject2(VaAppCachePluginKey);
  if (!cache) {
    return {
      colorContrast: {}
    };
  }
  return cache;
};

// node_modules/vuestic-ui/dist/es/src/composables/useReactiveComputed.js
var useReactiveComputed = (obj) => {
  const objectRef = typeof obj === "function" ? computed(obj) : computed(obj);
  const proxy = new Proxy(objectRef, {
    get(target, p, receiver) {
      if (typeof objectRef.value !== "object") {
        return void 0;
      }
      return unref(Reflect.get(objectRef.value, p, receiver));
    },
    set(target, p, value) {
      if (isRef(objectRef.value[p]) && !isRef(value)) {
        objectRef.value[p].value = value;
      } else {
        objectRef.value[p] = value;
      }
      return true;
    },
    deleteProperty(target, p) {
      return Reflect.deleteProperty(objectRef.value, p);
    },
    has(target, p) {
      if (typeof objectRef.value !== "object") {
        return false;
      }
      return Reflect.has(objectRef.value, p);
    },
    ownKeys() {
      if (typeof objectRef.value !== "object") {
        return [];
      }
      return Object.keys(objectRef.value);
    },
    getOwnPropertyDescriptor() {
      return {
        enumerable: true,
        configurable: true
      };
    }
  });
  return reactive(proxy);
};

// node_modules/vuestic-ui/dist/es/src/utils/text-case.js
var capitalize2 = (str) => str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
var wordsRegex = /[A-Z0-9]*(?:[^\-_|A-Z|\s.])*/gm;
var getWords = (str) => {
  var _a2;
  return ((_a2 = str.match(wordsRegex)) == null ? void 0 : _a2.map((word) => word.trim().split(/([0-9]+)|([a-zA-Z]+)/g)).flat().filter(Boolean)) || [];
};
var camelCaseToKebabCase = (str) => {
  return getWords(str).map((word) => word.toLowerCase()).join("-");
};
var kebabCaseToCamelCase = (str) => {
  return getWords(str).map((word, index) => index === 0 ? word.toLowerCase() : capitalize2(word)).join("");
};
var startCase = (str) => {
  return getWords(str).map(capitalize2).join(" ");
};

// node_modules/vuestic-ui/dist/es/src/utils/color.js
var HEX_TEST_REGEX = /^#([A-Fa-f0-9]{3,4}|[A-Fa-f0-9]{6,8})$/;
var RGB_TEST_REGEX = /^rgba?\(([\d.]+, ?){2}[\d.]+(, ?[\d.]+)?\)$/;
var HSL_TEST_REGEX = /hsla?\([\d.]+(deg|rad|turn|grad)?(,?\s?[\d.]+%?){2}(,?\s?(\/\s?)?[\d.]+%?)?\)/;
var isColor = (strColor) => {
  return HEX_TEST_REGEX.test(strColor) || RGB_TEST_REGEX.test(strColor) || HSL_TEST_REGEX.test(strColor);
};
var isHSLObject = (obj) => {
  if (typeof obj !== "object" || obj === null) {
    return false;
  }
  return "h" in obj && "s" in obj && "l" in obj;
};
var isRGBObject = (obj) => {
  if (typeof obj !== "object" || obj === null) {
    return false;
  }
  return "r" in obj && "g" in obj && "b" in obj;
};
var tryParseHex = (color) => {
  if (!HEX_TEST_REGEX.test(color)) {
    return null;
  }
  const hex = color.replace("#", "");
  const isShort = hex.length < 6;
  const [r, g, b, a] = isShort ? hex.split("").map((char) => parseInt(char + char, 16)) : hex.match(/.{2}/g).map((hex2) => parseInt(hex2, 16));
  return { r, g, b, a: a ?? 1 };
};
var tryParseRgb = (color) => {
  if (!RGB_TEST_REGEX.test(color)) {
    return null;
  }
  const [r, g, b, a = 1] = color.match(/[\d.]+/g).map(Number);
  return { r, g, b, a };
};
var tryParseHsla = (color) => {
  if (!HSL_TEST_REGEX.test(color)) {
    return null;
  }
  const [h2, s, l, a = "1"] = color.match(/[\d.]+%?/g);
  return {
    h: Number(h2),
    s: Number(s.replace("%", "")),
    l: Number(l.replace("%", "")),
    a: a.endsWith("%") ? Number(a.replace("%", "")) / 100 : Number(a)
  };
};
var rgbaToHsla = (rgba) => {
  const r = rgba.r / 255;
  const g = rgba.g / 255;
  const b = rgba.b / 255;
  const max2 = Math.max(r, g, b);
  const min2 = Math.min(r, g, b);
  let h2 = 0;
  let s = 0;
  const l = (max2 + min2) / 2;
  if (max2 !== min2) {
    const d = max2 - min2;
    s = l > 0.5 ? d / (2 - max2 - min2) : d / (max2 + min2);
    switch (max2) {
      case r:
        h2 = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h2 = (b - r) / d + 2;
        break;
      case b:
        h2 = (r - g) / d + 4;
        break;
    }
    h2 *= 60;
  }
  return { h: Math.round(h2), s: Math.round(s * 100), l: Math.round(l * 100), a: rgba.a };
};
var hueToRgb = (p, q, t) => {
  if (t < 0) {
    t += 1;
  }
  if (t > 1) {
    t -= 1;
  }
  if (t < 1 / 6) {
    return p + (q - p) * 6 * t;
  }
  if (t < 1 / 2) {
    return q;
  }
  if (t < 2 / 3) {
    return p + (q - p) * (2 / 3 - t) * 6;
  }
  return p;
};
var hslaToRgba = (hsla) => {
  const h2 = hsla.h / 360;
  const s = hsla.s / 100;
  const l = hsla.l / 100;
  const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
  const p = 2 * l - q;
  const r = hueToRgb(p, q, h2 + 1 / 3);
  const g = hueToRgb(p, q, h2);
  const b = hueToRgb(p, q, h2 - 1 / 3);
  return { r: Math.round(r * 255), g: Math.round(g * 255), b: Math.round(b * 255), a: hsla.a };
};
var parseColorToHSL = (color) => {
  if (isHSLObject(color)) {
    return { ...color };
  }
  if (isRGBObject(color)) {
    return rgbaToHsla(color);
  }
  const rgb = tryParseHex(color) ?? tryParseRgb(color);
  if (rgb) {
    return rgbaToHsla(rgb);
  }
  const hsl = tryParseHsla(color);
  if (hsl) {
    return hsl;
  }
  throw new Error(`Color ${color} is not valid. Please, provide valid color.`);
};
var hslToString = ({ h: h2, s, l, a }) => {
  return `hsla(${h2},${s}%,${l}%,${a ?? 1})`;
};
var parseColorToRGB = (color) => {
  if (isRGBObject(color)) {
    return { ...color };
  }
  if (isHSLObject(color)) {
    return hslaToRgba(color);
  }
  const hsl = tryParseHsla(color);
  if (hsl) {
    return hslaToRgba(hsl);
  }
  const rgb = tryParseHex(color) ?? tryParseRgb(color);
  if (rgb) {
    return rgb;
  }
  throw new Error(`Color ${color} is not valid. Please, provide valid color.`);
};
var rgbToString = ({ r, g, b, a }) => {
  if (a === 1) {
    return `rgb(${r},${g},${b})`;
  }
  return `rgba(${r},${g},${b},${a ?? 1})`;
};
var colorToString = (color) => {
  if (isHSLObject(color)) {
    return hslToString(color);
  }
  if (isRGBObject(color)) {
    return rgbToString(color);
  }
  if (typeof color === "string") {
    return color;
  }
  throw new Error(`Color ${color} is not valid. Please, provide valid color.`);
};
var setHSLA = (color, { h: h2, s, l, a }) => {
  const parsedColor = parseColorToHSL(color);
  parsedColor.a = parsedColor.a ?? 1;
  parsedColor.h = h2 ?? parsedColor.h;
  parsedColor.s = s ?? parsedColor.s;
  parsedColor.l = l ?? parsedColor.l;
  parsedColor.a = a ?? parsedColor.a;
  if (parsedColor.h < 0) {
    parsedColor.h = 360 + parsedColor.h;
  }
  if (parsedColor.h > 360) {
    parsedColor.h = parsedColor.h - 360;
  }
  parsedColor.s = Math.max(0, Math.min(100, parsedColor.s));
  parsedColor.l = Math.max(0, Math.min(100, parsedColor.l));
  parsedColor.a = Math.max(0, Math.min(1, parsedColor.a));
  return parsedColor;
};
var shiftHSLA = (color, { h: h2, s, l, a }) => {
  const parsedColor = parseColorToHSL(color);
  parsedColor.a = parsedColor.a ?? 1;
  parsedColor.h += h2 ?? 0;
  parsedColor.s += s ?? 0;
  parsedColor.l += l ?? 0;
  parsedColor.a += a ?? 0;
  if (parsedColor.h < 0) {
    parsedColor.h = 360 + parsedColor.h;
  }
  if (parsedColor.h > 360) {
    parsedColor.h = parsedColor.h - 360;
  }
  parsedColor.s = Math.max(0, Math.min(100, parsedColor.s));
  parsedColor.l = Math.max(0, Math.min(100, parsedColor.l));
  parsedColor.a = Math.max(0, Math.min(1, parsedColor.a));
  return parsedColor;
};

// node_modules/vuestic-ui/dist/es/src/services/color/utils.js
var isCSSVariable = (strColor) => /var\(--.+\)/.test(strColor);
var cssVariableName = (colorName) => `--va-${camelCaseToKebabCase(colorName)}`;
var normalizeColorName = (colorName) => kebabCaseToCamelCase(colorName);
var colorToRgba = (color, opacity) => {
  const { r, g, b } = parseColorToRGB(color);
  return rgbToString({ r, g, b, a: opacity });
};
var getColorLightness = (color) => {
  const { r, g, b } = parseColorToRGB(color);
  return Math.sqrt(r * r * 0.241 + g * g * 0.691 + b * b * 0.068);
};
var getBoxShadowColor = (color, opacity = 0.4) => {
  return colorToRgba(color, opacity);
};
var getBoxShadowColorFromBg = (background, opacity = 0.4) => {
  return colorToRgba(background, opacity);
};
var getHoverColor = (color, opacity = 0.2) => {
  return colorToRgba(color, opacity);
};
var getFocusColor = (color, opacity = 0.3) => {
  return colorToRgba(color, opacity);
};
var shiftHSLAColor = (color, shift3) => {
  return hslToString(shiftHSLA(parseColorToHSL(color), shift3));
};
var setHSLAColor = (color, shift3) => {
  return hslToString(setHSLA(parseColorToHSL(color), shift3));
};
var shiftGradientColor = (color) => {
  const newColor = parseColorToHSL(color);
  if (newColor.s < 10) {
    return shiftHSLAColor(newColor, { h: 2, s: 5, l: 10 });
  }
  if (newColor.s < 30) {
    return shiftHSLAColor(newColor, { s: -14, l: 11 });
  }
  if (newColor.h >= 0 && newColor.h < 44 || newColor.h >= 285) {
    return shiftHSLAColor(newColor, { h: 11, s: 27, l: 8 });
  }
  if (newColor.h >= 44 && newColor.h < 85) {
    return shiftHSLAColor(newColor, { h: 3, l: 9 });
  }
  if (newColor.h >= 85 && newColor.h < 165) {
    return shiftHSLAColor(newColor, { h: 16, l: 14 });
  }
  if (newColor.h >= 165 && newColor.h < 285) {
    return shiftHSLAColor(newColor, { h: -15, s: 3, l: 2 });
  }
  throw new Error("This method should handle all colors. But it didn't for some reason.");
};
var getGradientBackground = (color) => {
  const colorLeft = shiftGradientColor(color);
  return `linear-gradient(to right, ${colorLeft}, ${colorToString(color)})`;
};
var getStateMaskGradientBackground = (color, maskColor, maskOpacity) => {
  const mask = colorToRgba(maskColor, maskOpacity);
  return `linear-gradient(0deg, ${mask}, ${mask}), ${color}`;
};
var applyColors = (color1, color2) => {
  const c1 = parseColorToRGB(color1);
  const c2 = parseColorToRGB(color2);
  const weight = c2.a;
  if (weight === 1) {
    return rgbToString(c2);
  }
  if (weight === 0) {
    return rgbToString(c1);
  }
  return rgbToString({
    r: Math.round(c1.r * (1 - weight) + c2.r * weight),
    g: Math.round(c1.g * (1 - weight) + c2.g * weight),
    b: Math.round(c1.b * (1 - weight) + c2.b * weight),
    a: c1.a
  });
};
var isColorTransparent = (color) => {
  if (!color) {
    return false;
  }
  if (color === "transparent") {
    return true;
  }
  return parseColorToRGB(color).a <= 0.1;
};

// node_modules/vuestic-ui/dist/es/src/composables/useColors.js
var useColorProps = {
  color: {
    type: String,
    default: ""
  }
};
var useColors = () => {
  const gc = useGlobalConfig();
  if (!gc) {
    throw new Error("useColors must be used in setup function or Vuestic GlobalConfigPlugin is not registered!");
  }
  const { globalConfig } = gc;
  const colors = useReactiveComputed({
    get: () => globalConfig.value.colors.presets[globalConfig.value.colors.currentPresetName],
    set: (v) => {
      setColors(v);
    }
  });
  const setColors = (colors2) => {
    globalConfig.value.colors.presets[globalConfig.value.colors.currentPresetName] = {
      ...globalConfig.value.colors.variables,
      ...colors2
    };
  };
  const getColors = () => {
    return colors;
  };
  const getColor = (prop, defaultColor, preferVariables) => {
    if (!defaultColor) {
      defaultColor = colors.primary;
    }
    if (prop === "transparent") {
      return "#ffffff00";
    }
    if (prop === "currentColor") {
      return prop;
    }
    if (prop == null ? void 0 : prop.startsWith("on")) {
      const colorName = prop.slice(2);
      if (colors[normalizeColorName(colorName)]) {
        return getColor(getTextColor(getColor(colorName)), void 0, preferVariables);
      }
    }
    if (!prop) {
      prop = getColor(defaultColor);
    }
    const colorValue = colors[prop] || colors[normalizeColorName(prop)];
    if (colorValue) {
      return preferVariables ? `var(${cssVariableName(prop)})` : colorValue;
    }
    if (isColor(prop)) {
      return prop;
    }
    if (preferVariables && isCSSVariable(prop)) {
      return prop;
    }
    warn(`'${prop}' is not a proper color! Use HEX or default color themes
      names (https://vuestic.dev/en/styles/colors#default-color-themes)`);
    return getColor(defaultColor);
  };
  const getComputedColor = (color) => {
    return computed({
      get() {
        return getColor(color);
      },
      set(v) {
        setColors({ [color]: v });
      }
    });
  };
  const colorsToCSSVariable = (colors2, prefix2 = "va") => {
    return Object.keys(colors2).filter((key) => colors2[key] !== void 0).reduce((acc, colorName) => {
      acc[`--${prefix2}-${camelCaseToKebabCase(colorName)}`] = getColor(colors2[colorName], void 0, true);
      acc[`--${prefix2}-on-${camelCaseToKebabCase(colorName)}`] = getColor(getTextColor(getColor(colors2[colorName])), void 0, true);
      return acc;
    }, {});
  };
  const cache = useCache();
  const getColorLightnessFromCache = (color) => {
    if (typeof color !== "string") {
      return getColorLightness(color);
    }
    if (!cache.colorContrast[color]) {
      cache.colorContrast[color] = getColorLightness(color);
    }
    return cache.colorContrast[color];
  };
  const computedDarkColor = computed(() => {
    return getColorLightnessFromCache(getColor("textPrimary")) > 255 / 2 ? "textInverted" : "textPrimary";
  });
  const computedLightColor = computed(() => {
    return getColorLightnessFromCache(getColor("textPrimary")) > 255 / 2 ? "textPrimary" : "textInverted";
  });
  const getTextColor = (color, darkColor, lightColor) => {
    const onColorName = `on${capitalize(String(color))}`;
    if (colors[onColorName]) {
      return colors[onColorName];
    }
    darkColor = darkColor || computedDarkColor.value;
    lightColor = lightColor || computedLightColor.value;
    return getColorLightnessFromCache(color) > globalConfig.value.colors.threshold ? darkColor : lightColor;
  };
  const currentPresetName = computed({
    get: () => globalConfig.value.colors.currentPresetName,
    set: (v) => {
      applyPreset(v);
    }
  });
  const presets2 = computed(() => globalConfig.value.colors.presets);
  const applyPreset = (presetName) => {
    globalConfig.value.colors.currentPresetName = presetName;
    if (!globalConfig.value.colors.presets[presetName]) {
      return warn(`Preset ${presetName} does not exist`);
    }
  };
  return {
    colors,
    currentPresetName,
    presets: presets2,
    applyPreset,
    setColors,
    getColors,
    getColor,
    getComputedColor,
    getBoxShadowColor,
    getBoxShadowColorFromBg,
    getHoverColor,
    getFocusColor,
    getGradientBackground,
    getTextColor,
    shiftHSLAColor,
    setHSLAColor,
    colorsToCSSVariable,
    colorToRgba,
    getStateMaskGradientBackground
  };
};

// node_modules/vuestic-ui/dist/es/src/components/va-icon/VaIcon.vue_vue_type_script_setup_true_lang.js
import "D:/Github/DONGTIAN/ui/node_modules/vuestic-ui/dist/es/VaIcon.css";
var _sfc_main = defineComponent({
  ...{
    name: "VaIcon"
  },
  __name: "VaIcon",
  props: {
    ...useSizeProps,
    ...useComponentPresetProp,
    name: { type: String, default: "" },
    tag: { type: String },
    component: { type: Object },
    color: { type: String },
    rotation: { type: [String, Number] },
    spin: { type: [String, Boolean] },
    flip: {
      type: String,
      default: "off",
      validator: (value) => ["off", "horizontal", "vertical", "both"].includes(value)
    }
  },
  setup(__props) {
    const props = __props;
    const { getColor } = useColors();
    const { sizeComputed } = useSize(props);
    const { getIcon } = useIcon();
    const iconConfig = computed(() => getIcon(props.name));
    const computedTag = computed(() => props.component || props.tag || iconConfig.value.component || iconConfig.value.tag || "i");
    const attrs = useAttrs();
    const computedAttrs = computed(() => ({ ...iconConfig.value.attrs, ...omit(attrs, ["class"]) }));
    const getSpinClass = (spin) => {
      if (spin === void 0 || spin === false) {
        return;
      }
      return spin === "counter-clockwise" ? "va-icon--spin-reverse" : "va-icon--spin";
    };
    const computedClass = computed(() => [
      iconConfig.value.class,
      getSpinClass(props.spin ?? iconConfig.value.spin)
    ]);
    const transformStyle = computed(() => {
      const rotation = props.rotation ? `rotate(${props.rotation}deg)` : "";
      const flipY = props.flip === "vertical" || props.flip === "both" ? -1 : 1;
      const flipX = props.flip === "horizontal" || props.flip === "both" ? -1 : 1;
      const scale = props.flip === "off" ? "" : `scale(${flipY}, ${flipX})`;
      return `${scale} ${rotation}`.trim();
    });
    const computedStyle = computed(() => ({
      transform: transformStyle.value,
      cursor: attrs.onClick ? "pointer" : null,
      color: props.color ? getColor(props.color, void 0, true) : iconConfig.value.color,
      fontSize: sizeComputed.value,
      height: sizeComputed.value,
      lineHeight: sizeComputed.value
    }));
    const tabindexComputed = computed(() => attrs.tabindex ?? -1);
    const ariaHiddenComputed = computed(() => attrs.role !== "button" || tabindexComputed.value < 0);
    return (_ctx, _cache) => {
      return openBlock(), createBlock(resolveDynamicComponent(computedTag.value), mergeProps({
        class: ["va-icon", computedClass.value],
        style: computedStyle.value,
        "aria-hidden": ariaHiddenComputed.value,
        notranslate: ""
      }, computedAttrs.value), {
        default: withCtx(() => [
          renderSlot(_ctx.$slots, "default", {}, () => [
            iconConfig.value.content ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
              createTextVNode(toDisplayString(iconConfig.value.content), 1)
            ], 64)) : createCommentVNode("", true)
          ])
        ]),
        _: 3
      }, 16, ["class", "style", "aria-hidden"]);
    };
  }
});

// node_modules/vuestic-ui/dist/es/src/components/va-icon/index.js
var VaIcon = withConfigTransport$1(_sfc_main);

// node_modules/vuestic-ui/dist/es/src/composables/useAppGlobal.js
var getGlobalObject = () => {
  const vm = getCurrentInstance();
  const app = vm == null ? void 0 : vm.appContext.app;
  const { globalProperties } = app.config;
  if ("$vaGlobalVariable" in globalProperties) {
    return globalProperties.$vaGlobalVariable;
  }
  globalProperties.$vaGlobalVariable = reactive({});
  return globalProperties.$vaGlobalVariable;
};
var useAppGlobal = (key, defaultValue) => {
  const globalObject = getGlobalObject();
  if (!(key in globalObject)) {
    globalObject[key] = defaultValue;
  }
  return computed({
    get: () => globalObject[key],
    set: (value) => {
      globalObject[key] = value;
    }
  });
};

// node_modules/vuestic-ui/dist/es/src/composables/useComponentUuid.js
var useComponentUuid = () => {
  const vm = getCurrentInstance();
  const counter2 = useAppGlobal("uuidCounter", 0);
  vm.$vaUuid = vm.$vaUuid || `va-${counter2.value++}`;
  return `va-${counter2.value}`;
};

// node_modules/vuestic-ui/dist/es/src/components/va-message-list/hooks/useMessageListAria.js
var useMessageListAria = (props) => {
  const id = useComponentUuid();
  const messageListId = `message-list-${id}`;
  const messageListAttributes = computed(() => ({
    id: messageListId,
    role: "alert"
  }));
  const doHaveMessages = computed(() => {
    if (typeof props.modelValue === "string" && props.modelValue.length > 0) {
      return true;
    }
    if (Array.isArray(props.modelValue) && props.modelValue.length > 0) {
      return true;
    }
    return false;
  });
  const childAttributes = computed(() => ({
    "aria-describedby": doHaveMessages.value ? messageListId : void 0,
    "aria-invalid": props.hasError
  }));
  return {
    messageListAttributes,
    childAttributes
  };
};

// node_modules/vuestic-ui/dist/es/src/composables/useNumericProp.js
var useNumericProp = (key) => {
  const props = getCurrentInstance().props;
  const numericComputed = computed(() => {
    const numeric = props == null ? void 0 : props[key];
    if (numeric === void 0) {
      return numeric;
    }
    return Number(numeric);
  });
  return numericComputed;
};

// node_modules/vuestic-ui/dist/es/src/components/va-message-list/VaMessageList.vue_vue_type_script_setup_true_lang.js
import "D:/Github/DONGTIAN/ui/node_modules/vuestic-ui/dist/es/VaMessageList.css";
var _hoisted_1 = { class: "va-message-list__list" };
var _sfc_main2 = defineComponent({
  ...{
    name: "VaMessageList",
    inheritAttrs: false
  },
  __name: "VaMessageList",
  props: {
    modelValue: {
      type: [String, Array],
      default: ""
    },
    limit: { type: [Number, String], default: 1 },
    color: { type: String },
    hasError: { type: Boolean, default: false }
  },
  setup(__props, { expose: __expose }) {
    const props = __props;
    const { getColor } = useColors();
    const { childAttributes, messageListAttributes } = useMessageListAria(props);
    const limitComputed = useNumericProp("limit");
    const messages = computed(() => {
      if (!props.modelValue) {
        return [];
      }
      if (!Array.isArray(props.modelValue)) {
        return [props.modelValue];
      }
      return props.modelValue.slice(0, limitComputed.value);
    });
    const computedStyle = computed(() => props.color ? { color: getColor(props.color) } : {});
    __expose({
      messages
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock(Fragment, null, [
        renderSlot(_ctx.$slots, "default", normalizeProps(guardReactiveProps({ ariaAttributes: unref(childAttributes), messages: messages.value, attrs: _ctx.$attrs }))),
        renderSlot(_ctx.$slots, "messages", normalizeProps(guardReactiveProps({ ariaAttributes: unref(messageListAttributes), messages: messages.value })), () => [
          messages.value.length > 0 ? (openBlock(), createElementBlock("div", mergeProps({
            key: 0,
            class: "va-message-list",
            style: computedStyle.value
          }, unref(messageListAttributes)), [
            createBaseVNode("ul", _hoisted_1, [
              (openBlock(true), createElementBlock(Fragment, null, renderList(messages.value, (message, index) => {
                return openBlock(), createElementBlock("li", {
                  key: index,
                  class: "va-message-list__message"
                }, [
                  renderSlot(_ctx.$slots, "message", normalizeProps(guardReactiveProps({ messages: messages.value, message })), () => [
                    __props.hasError ? (openBlock(), createBlock(unref(VaIcon), {
                      key: 0,
                      class: "va-message-list__icon",
                      name: "va-warning",
                      size: 16
                    })) : createCommentVNode("", true),
                    createTextVNode(toDisplayString(message), 1)
                  ])
                ]);
              }), 128))
            ])
          ], 16)) : createCommentVNode("", true)
        ])
      ], 64);
    };
  }
});

// node_modules/vuestic-ui/dist/es/src/components/va-message-list/VaMessageList.js
import "D:/Github/DONGTIAN/ui/node_modules/vuestic-ui/dist/es/VaMessageList.css";
var VaMessageList = withConfigTransport$1(_sfc_main2);

// node_modules/vuestic-ui/dist/es/src/composables/useSyncProp.js
function useSyncProp(propName, props, emit, defaultValue) {
  const vm = getCurrentInstance();
  const isPropPassed = computed(() => {
    const t = props[propName];
    if (!(vm == null ? void 0 : vm.vnode.props)) {
      return t !== void 0;
    }
    return propName in vm.vnode.props && vm.vnode.props[propName] !== void 0;
  });
  if (defaultValue === void 0) {
    return [
      computed({
        set(value) {
          emit(`update:${propName}`, value);
        },
        get() {
          return props[propName];
        }
      })
    ];
  }
  const currentValue = props[propName];
  const statefulValue = ref(currentValue === void 0 ? defaultValue : currentValue);
  watch(() => props[propName], (newVal) => {
    if (newVal === void 0) {
      return;
    }
    statefulValue.value = newVal;
  });
  return [
    computed({
      set(value) {
        statefulValue.value = value;
        emit(`update:${propName}`, value);
      },
      get() {
        if (isPropPassed.value) {
          return props[propName];
        }
        return statefulValue.value;
      }
    })
  ];
}

// node_modules/vuestic-ui/dist/es/src/utils/watch-setter.js
var isComputedRef = (value) => {
  return typeof value === "object" && "_setter" in value;
};
var watchSetter = (ref2, cb) => {
  if (!isComputedRef(ref2)) {
    return;
  }
  const originalSetter = ref2._setter;
  ref2._setter = (newValue) => {
    cb(newValue);
    originalSetter(newValue);
  };
};

// node_modules/vuestic-ui/dist/es/src/utils/is-function.js
var isFunction = (value) => typeof value === "function";

// node_modules/vuestic-ui/dist/es/src/utils/is-string.js
var isString = (value) => typeof value === "string";

// node_modules/vuestic-ui/dist/es/src/composables/useForm/consts.js
var FormServiceKey = Symbol("FormService");

// node_modules/vuestic-ui/dist/es/src/composables/useForm/useFormChild.js
var useFormChild = (context) => {
  const formContext = inject(FormServiceKey, null);
  if (!formContext) {
    return {
      forceDirty: ref(false),
      forceHideErrorMessages: ref(false),
      forceHideErrors: ref(false),
      forceHideLoading: ref(false),
      fields: computed(() => []),
      registerField: () => {
      },
      unregisterField: () => {
      },
      immediate: computed(() => false)
    };
  }
  const uid = useComponentUuid();
  onMounted(() => {
    formContext.registerField(uid, context);
  });
  onBeforeUnmount(() => {
    formContext.unregisterField(uid);
  });
  return formContext;
};

// node_modules/vuestic-ui/dist/es/src/composables/useValidation.js
var normalizeValidationRules = (rules = [], callArguments = null) => {
  if (isString(rules)) {
    rules = [rules];
  }
  return rules.map((rule) => isFunction(rule) ? rule(callArguments) : rule);
};
var useValidationProps = {
  name: { type: String, default: void 0 },
  rules: { type: Array, default: () => [] },
  dirty: { type: Boolean, default: false },
  error: { type: Boolean, default: void 0 },
  errorMessages: { type: [Array, String], default: void 0 },
  errorCount: { type: [String, Number], default: 1 },
  success: { type: Boolean, default: false },
  messages: { type: [Array, String], default: () => [] },
  immediateValidation: { type: Boolean, default: false },
  modelValue: {}
};
var useValidationEmits = ["update:error", "update:errorMessages", "update:dirty"];
var isPromise = (value) => {
  return typeof value === "object" && typeof value.then === "function";
};
var useDirtyValue = (value, props, emit) => {
  const isDirty = ref(props.dirty || false);
  watchSetter(value, () => {
    isDirty.value = true;
    emit("update:dirty", true);
  });
  watch(value, (newValue, oldValue) => {
    if (newValue === oldValue) {
      isDirty.value = true;
    }
  }, { deep: true });
  watch(() => props.dirty, (newValue) => {
    if (isDirty.value === newValue) {
      return;
    }
    isDirty.value = newValue;
  });
  return { isDirty };
};
var useTouched = () => {
  const isTouched = ref(false);
  const onBlur = () => {
    isTouched.value = true;
  };
  return { isTouched, onBlur };
};
var useOncePerTick = (fn) => {
  let canBeCalled = true;
  return (...args) => {
    if (!canBeCalled) {
      return;
    }
    canBeCalled = false;
    const result = fn(...args);
    nextTick(() => {
      canBeCalled = true;
    });
    return result;
  };
};
var useValidation = (props, emit, options) => {
  const { reset, focus } = options;
  const [isError] = useSyncProp("error", props, emit, false);
  const [errorMessages] = useSyncProp("errorMessages", props, emit, []);
  const isLoading = ref(false);
  const { isTouched, onBlur } = useTouched();
  const validationAriaAttributes = computed(() => ({
    "aria-invalid": isError.value,
    "aria-errormessage": typeof errorMessages.value === "string" ? errorMessages.value : errorMessages.value.join(", ")
  }));
  const resetValidation = () => {
    errorMessages.value = [];
    isError.value = false;
    isDirty.value = false;
    isTouched.value = false;
    isLoading.value = false;
  };
  const processResults = (results) => {
    let error = false;
    let eMessages = [];
    results.forEach((result) => {
      if (isString(result)) {
        eMessages = [...eMessages, result];
        error = true;
      } else if (result === false) {
        error = true;
      }
    });
    errorMessages.value = eMessages;
    isError.value = error;
    return !error;
  };
  const validateAsync = async () => {
    if (!props.rules || !props.rules.length) {
      return true;
    }
    const results = normalizeValidationRules(props.rules.flat(), options.value.value);
    const asyncPromiseResults = results.filter((result) => isPromise(result));
    const syncRules = results.filter((result) => !isPromise(result));
    if (!asyncPromiseResults.length) {
      return processResults(syncRules);
    }
    isLoading.value = true;
    return Promise.all(asyncPromiseResults).then((asyncResults) => {
      return processResults([...syncRules, ...asyncResults]);
    }).finally(() => {
      isLoading.value = false;
    });
  };
  const validate = useOncePerTick(() => {
    if (!props.rules || !props.rules.length) {
      return true;
    }
    const rules = props.rules.flat();
    const results = normalizeValidationRules(rules, options.value.value);
    const asyncPromiseResults = results.filter((result) => isPromise(result));
    const syncRules = results.filter((result) => !isPromise(result));
    const isSyncedError = syncRules.some((result) => isString(result) ? result : result === false);
    if (asyncPromiseResults.length && !isSyncedError) {
      isLoading.value = true;
      Promise.all(asyncPromiseResults).then((asyncResults) => {
        processResults([...syncRules, ...asyncResults]);
        isLoading.value = false;
      });
      return isSyncedError;
    }
    return processResults(syncRules);
  });
  watchEffect(() => validate());
  const { isDirty } = useDirtyValue(options.value, props, emit);
  const {
    // Renamed to forceHideError because it's not clear what it does
    forceHideErrors,
    forceHideLoading,
    forceHideErrorMessages,
    forceDirty,
    immediate: isFormImmediate
  } = useFormChild({
    isTouched,
    isDirty,
    isValid: computed(() => !isError.value),
    isLoading,
    errorMessages,
    validate,
    validateAsync,
    resetValidation,
    focus,
    reset: () => {
      reset();
      resetValidation();
      validate();
    },
    value: computed(() => options.value || props.modelValue),
    name: toRef(props, "name")
  });
  const immediateValidation = computed(() => props.immediateValidation || isFormImmediate.value);
  let canValidate = true;
  const withoutValidation = (cb) => {
    canValidate = false;
    cb();
    nextTick(() => {
      canValidate = true;
    });
  };
  watch(options.value, () => {
    if (!canValidate) {
      return;
    }
    return validate();
  }, { immediate: immediateValidation.value });
  return {
    isDirty,
    isValid: computed(() => !isError.value),
    isError,
    isTouched,
    isLoading: computed({
      get: () => {
        if (forceHideErrors.value) {
          return false;
        }
        if (immediateValidation.value) {
          return isLoading.value;
        }
        if (isTouched.value || isDirty.value || forceDirty.value) {
          return isLoading.value;
        }
        return false;
      },
      set(value) {
        isLoading.value = value;
      }
    }),
    computedError: computed(() => {
      if (forceHideErrors.value) {
        return false;
      }
      if (immediateValidation.value) {
        return isError.value;
      }
      if (isTouched.value || isDirty.value || forceDirty.value) {
        return isError.value;
      }
      return false;
    }),
    computedErrorMessages: computed(() => forceHideErrorMessages.value ? [] : errorMessages.value),
    listeners: { onBlur },
    validate,
    resetValidation,
    withoutValidation,
    validationAriaAttributes
  };
};

// node_modules/vuestic-ui/dist/es/src/components/va-message-list/VaMessageListWrapper.vue_vue_type_script_setup_true_lang.js
import "D:/Github/DONGTIAN/ui/node_modules/vuestic-ui/dist/es/VaMessageListWrapper.css";
var _hoisted_12 = { class: "va-message-list-wrapper" };
var _sfc_main3 = defineComponent({
  ...{
    name: "VaMessageListWrapper"
  },
  __name: "VaMessageListWrapper",
  props: {
    ...useValidationProps
  },
  setup(__props) {
    const props = __props;
    const messagesColor = computed(() => {
      if (props.error) {
        return "danger";
      }
      if (props.success) {
        return "success";
      }
      return "";
    });
    const hasError = toRef(props, "error");
    const messagesComputed = computed(() => props.error ? props.errorMessages : props.messages);
    const errorLimit = computed(() => props.error ? Number(props.errorCount) : 99);
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_12, [
        createVNode(unref(VaMessageList), {
          color: messagesColor.value,
          limit: errorLimit.value,
          "has-error": hasError.value,
          "model-value": messagesComputed.value,
          "inherit-slots": ["message"]
        }, {
          default: withCtx((bind) => [
            renderSlot(_ctx.$slots, "default", normalizeProps(guardReactiveProps(bind)))
          ]),
          _: 3
        }, 8, ["color", "limit", "has-error", "model-value"])
      ]);
    };
  }
});

// node_modules/vuestic-ui/dist/es/src/components/va-config/hooks/useGlobalConfigProvider.js
var useGlobalConfigProvider = (next) => {
  const { globalConfig, mergeGlobalConfig, setGlobalConfig, getGlobalConfig } = useGlobalConfig();
  const nextChain = computed(() => {
    var _a2;
    const gcCopy = cloneDeep(globalConfig.value);
    const compiledCopy = {
      ...gcCopy,
      colors: makeColorsConfig(gcCopy.colors)
    };
    const config = mergeDeep(compiledCopy, next.value);
    if ((_a2 = next.value.colors) == null ? void 0 : _a2.variables) {
      Object.keys(next.value.colors.variables).forEach((key) => {
        config.colors.variables[key] = next.value.colors.variables[key];
      });
    }
    return config;
  });
  provide(GLOBAL_CONFIG, {
    mergeGlobalConfig,
    setGlobalConfig,
    getGlobalConfig,
    globalConfig: nextChain
  });
  return nextChain;
};

// node_modules/vuestic-ui/dist/es/src/utils/headless.js
var toNode = (v, attrs) => {
  if (!v) {
    return null;
  }
  if (!("type" in v) || v.type === Text || typeof v === "string") {
    return h("div", attrs, v);
  }
  if (v.type === Comment) {
    return v;
  }
  if ("$el" in v) {
    return toNode(v.$el, attrs);
  }
  if (v.type === Suspense) {
    return h(v.ssContent, attrs);
  }
  if (v.type === Teleport) {
    if (v.children === null) {
      return v;
    }
    const anchor = toNode(v.children[0], attrs);
    if (anchor) {
      v.children[0] = h(anchor, attrs);
    }
    return v;
  }
  if (v.type === Fragment) {
    if (v.children === null) {
      return v;
    }
    if (v.children.length === 1) {
      return h(Fragment, v.props, [toNode(v.children[0], attrs)]);
    }
    return h("div", attrs, v);
  }
  if (typeof v.type.render === "function") {
    const component = h(v, attrs);
    if (Array.isArray(component.children) && component.children.length > 1) {
      return h("div", attrs, component.children);
    }
  }
  return h(v, attrs);
};
var renderSlotNode2 = (slot, slotBind = {}, nodeAttributes = {}) => {
  const children = slot == null ? void 0 : slot(slotBind);
  if (!children) {
    return null;
  }
  const nonCommentChildren = children.filter((v) => v.type !== Comment);
  if (nonCommentChildren.length === 0) {
    return null;
  }
  if (nonCommentChildren.length === 1) {
    return toNode(nonCommentChildren[0], nodeAttributes);
  }
  return h("div", nodeAttributes, children);
};
var renderSlotNodes = (slot, slotBind = {}, nodeAttributes = {}) => {
  const children = slot == null ? void 0 : slot(slotBind);
  if (!children) {
    return null;
  }
  return children.map((v) => toNode(v, nodeAttributes));
};

// node_modules/vuestic-ui/dist/es/src/components/va-config/VaConfig.vue_vue_type_script_setup_true_lang.js
var CssVarsRenderer = defineComponent({
  name: "VaCssVarsRenderer",
  inheritAttrs: false,
  setup(props, { slots, attrs }) {
    const { colorsToCSSVariable, colors } = useColors();
    const style = computed(() => {
      return colorsToCSSVariable(colors);
    });
    return () => h(Fragment, attrs, renderSlotNodes(slots.default, {}, {
      style: style.value
    }) || void 0);
  }
});
var _sfc_main4 = defineComponent({
  ...{
    name: "VaConfig",
    inheritAttrs: false
  },
  __name: "VaConfig",
  props: {
    ...useComponentPresetProp,
    components: { type: Object, default: () => ({}) },
    colors: { type: Object },
    i18n: { type: Object }
  },
  setup(__props) {
    const props = __props;
    const prevChain = useLocalConfig();
    const nextChain = computed(() => [...prevChain.value, props.components]);
    provideLocalConfig(nextChain);
    useGlobalConfigProvider(computed(() => {
      const config = {};
      if (props.colors) {
        config.colors = props.colors;
      }
      if (props.i18n) {
        config.i18n = props.i18n;
      }
      return config;
    }));
    const doRenderCssVars = computed(() => {
      return Boolean(props.colors);
    });
    return (_ctx, _cache) => {
      return doRenderCssVars.value ? (openBlock(), createBlock(unref(CssVarsRenderer), normalizeProps(mergeProps({ key: 0 }, _ctx.$attrs)), {
        default: withCtx(() => [
          renderSlot(_ctx.$slots, "default")
        ]),
        _: 3
      }, 16)) : renderSlot(_ctx.$slots, "default", { key: 1 });
    };
  }
});

// node_modules/vuestic-ui/dist/es/src/components/va-separator/VaSeparator.vue_vue_type_script_setup_true_lang.js
import "D:/Github/DONGTIAN/ui/node_modules/vuestic-ui/dist/es/VaSeparator.css";
var _hoisted_13 = {
  class: "va-separator",
  "aria-hidden": "true"
};
var _sfc_main5 = defineComponent({
  ...{
    name: "VaSeparator"
  },
  __name: "VaSeparator",
  setup(__props) {
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_13);
    };
  }
});

// node_modules/vuestic-ui/dist/es/src/components/va-spacer/VaSpacer.vue_vue_type_script_setup_true_lang.js
import "D:/Github/DONGTIAN/ui/node_modules/vuestic-ui/dist/es/VaSpacer.css";
var _hoisted_14 = {
  class: "va-spacer",
  "aria-hidden": "true"
};
var _sfc_main6 = defineComponent({
  ...{
    name: "VaSpacer"
  },
  __name: "VaSpacer",
  setup(__props) {
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_14);
    };
  }
});

// node_modules/vuestic-ui/dist/es/src/utils/scrollbar-size.js
var getScrollbarSize = (element) => {
  if (!element) {
    return 0;
  }
  const scrollbarWidth = element.offsetWidth - element.clientWidth;
  const scrollbarHeight = element.offsetHeight - element.clientHeight;
  return Math.max(scrollbarWidth, scrollbarHeight);
};

// node_modules/vuestic-ui/dist/es/src/composables/useElementRect.js
var useElementRect = (element) => {
  const rect = ref({ top: 0, left: 0, width: 0, height: 0, bottom: 0, right: 0 });
  let resizeObserver;
  let mutationObserver;
  const updateRect = () => {
    if (element.value) {
      rect.value = element.value.getBoundingClientRect();
    }
  };
  onMounted(() => {
    resizeObserver = new ResizeObserver(updateRect);
    mutationObserver = new MutationObserver(updateRect);
    element.value && resizeObserver.observe(element.value);
    element.value && mutationObserver.observe(element.value, { attributes: true, childList: true, subtree: true });
    window.addEventListener("resize", updateRect);
    window.addEventListener("scroll", updateRect);
    updateRect();
  });
  onBeforeUnmount(() => {
    resizeObserver == null ? void 0 : resizeObserver.disconnect();
    mutationObserver == null ? void 0 : mutationObserver.disconnect();
    window.removeEventListener("resize", updateRect);
    window.removeEventListener("scroll", updateRect);
    resizeObserver = void 0;
    mutationObserver = void 0;
  });
  return rect;
};

// node_modules/vuestic-ui/dist/es/src/utils/ssr.js
var isServer = () => typeof window === "undefined";
var isClient = () => !isServer();
var getWindow = () => typeof window === "undefined" ? void 0 : window;
var fakeGlobal = {};
var getGlobal = () => {
  if (isServer()) {
    if (typeof globalThis === "undefined") {
      return fakeGlobal;
    }
    return globalThis;
  } else {
    return window;
  }
};

// node_modules/vuestic-ui/dist/es/src/composables/useClientOnly.js
var useClientOnly = (cb) => {
  const isMounted = computed(isClient);
  const result = ref(null);
  watch(isMounted, () => {
    if (isMounted.value) {
      result.value = cb();
    }
  }, { immediate: true });
  return result;
};

// node_modules/vuestic-ui/dist/es/src/composables/useWindow.js
var useWindow = () => useClientOnly(() => window);

// node_modules/vuestic-ui/dist/es/src/utils/unwrapEl.js
var unwrapEl = (el) => {
  if (!el) {
    return;
  }
  if (typeof el !== "object") {
    return;
  }
  el = unref(el);
  if (!el) {
    return;
  }
  if (typeof el.$el !== "undefined") {
    return el.$el;
  }
  return el;
};

// node_modules/vuestic-ui/dist/es/src/utils/add-event-listener.js
var addEventListener = (target, ...args) => {
  if (!target || typeof target !== "object") {
    return;
  }
  if ("addEventListener" in target && typeof target.addEventListener === "function") {
    target.addEventListener(...args);
    return;
  }
  if ("parentElement" in target) {
    addEventListener(target.parentElement, ...args);
  }
};
var removeEventListener = (target, ...args) => {
  if (!target || typeof target !== "object") {
    return;
  }
  if ("removeEventListener" in target && typeof target.removeEventListener === "function") {
    target.removeEventListener(...args);
    return;
  }
  if ("parentElement" in target) {
    removeEventListener(target.parentElement, ...args);
  }
};

// node_modules/vuestic-ui/dist/es/src/composables/useEvent.js
var useEvent = (event, listener, target) => {
  const source = target && typeof target !== "boolean" ? target : useWindow();
  const capture = typeof target === "boolean" ? target : false;
  watch(source, (newValue, oldValue) => {
    if (!Array.isArray(event)) {
      addEventListener(unwrapEl(unref(newValue)), event, listener, capture);
      removeEventListener(unwrapEl(unref(oldValue)), event, listener, capture);
    } else {
      event.forEach((e) => {
        addEventListener(unwrapEl(unref(newValue)), e, listener, capture);
        removeEventListener(unwrapEl(unref(oldValue)), e, listener, capture);
      });
    }
  }, { immediate: true });
};

// node_modules/vuestic-ui/dist/es/src/composables/useResizeObserver.js
var normalizeElements = (elements) => {
  return Array.isArray(elements) ? elements : Array.isArray(elements.value) ? elements.value : [unref(elements)];
};
var useResizeObserver = (elementsList, cb) => {
  let resizeObserver;
  const observeAll = (elementsList2) => {
    elementsList2.forEach((element) => {
      const unrefedElement = unref(element);
      unrefedElement && (resizeObserver == null ? void 0 : resizeObserver.observe(unrefedElement));
    });
  };
  watch(elementsList, (newValue) => {
    resizeObserver == null ? void 0 : resizeObserver.disconnect();
    observeAll(normalizeElements(newValue));
  });
  onMounted(() => {
    resizeObserver = new ResizeObserver(cb);
    observeAll(normalizeElements(elementsList));
  });
  onBeforeUnmount(() => resizeObserver == null ? void 0 : resizeObserver.disconnect());
  return resizeObserver;
};

// node_modules/vuestic-ui/dist/es/src/components/va-sticky-scrollbar/VaStickyScrollbar.vue_vue_type_script_setup_true_lang.js
var _sfc_main7 = defineComponent({
  __name: "VaStickyScrollbar",
  props: {
    el: {},
    direction: { default: "horizontal" },
    offset: { default: 0 }
  },
  setup(__props) {
    const props = __props;
    const currentEl = ref(null);
    const offsetProp = useNumericProp("offset");
    const parentElement = computed(() => {
      var _a2;
      if (props.el) {
        return props.el;
      }
      return ((_a2 = currentEl.value) == null ? void 0 : _a2.parentNode) ?? null;
    });
    const parentRect = useElementRect(parentElement);
    const stickyScrollWrapperStyle = computed(() => {
      const el = parentElement.value;
      if (!el) {
        return {};
      }
      const parentEl = el;
      const scrollSize = getScrollbarSize(parentEl);
      const { bottom, left, right, top } = parentRect.value;
      if (props.direction === "vertical") {
        if (left > window.innerWidth) {
          return { display: "none" };
        }
        if (right < window.innerWidth) {
          return { display: "none" };
        }
        return {
          position: "fixed",
          top: `${top}px`,
          right: 0,
          height: `${parentEl.clientHeight}px`,
          overflowY: "auto",
          overflowX: "hidden"
        };
      }
      if (top > window.innerHeight) {
        return { display: "none" };
      }
      if (bottom < window.innerHeight) {
        return { display: "none" };
      }
      return {
        position: "fixed",
        top: `${Math.min(bottom, window.innerHeight) - scrollSize - Number(offsetProp.value)}px`,
        width: `${parentEl.clientWidth}px`,
        overflowX: "auto",
        overflowY: "hidden"
      };
    });
    useEvent("scroll", (e) => {
      var _a2, _b;
      if (!currentEl.value) {
        return;
      }
      if (props.direction === "horizontal") {
        (_a2 = parentElement.value) == null ? void 0 : _a2.scrollTo({
          left: currentEl.value.scrollLeft
        });
      } else {
        (_b = parentElement.value) == null ? void 0 : _b.scrollTo({
          top: currentEl.value.scrollTop
        });
      }
    }, currentEl);
    useEvent("scroll", (e) => {
      var _a2, _b, _c, _d;
      if (!currentEl.value) {
        return;
      }
      if (props.direction === "horizontal") {
        if (((_a2 = parentElement.value) == null ? void 0 : _a2.scrollLeft) === currentEl.value.scrollLeft) {
          return;
        }
        currentEl.value.scrollTo({
          left: (_b = parentElement.value) == null ? void 0 : _b.scrollLeft
        });
      } else {
        if (((_c = parentElement.value) == null ? void 0 : _c.scrollTop) === currentEl.value.scrollTop) {
          return;
        }
        currentEl.value.scrollTo({
          top: (_d = parentElement.value) == null ? void 0 : _d.scrollTop
        });
      }
    }, parentElement);
    const scrollWidth = ref(0);
    const scrollHeight = ref(0);
    useResizeObserver(computed(() => {
      if (!parentElement.value) {
        return [];
      }
      return [...parentElement.value.children];
    }), () => {
      scrollWidth.value = parentElement.value.scrollWidth;
      scrollHeight.value = parentElement.value.scrollHeight;
    });
    const fakeContentStyle = computed(() => {
      if (props.direction === "vertical") {
        return {
          width: "1px",
          height: `${scrollHeight.value}px`
        };
      }
      return {
        height: "1px",
        width: `${scrollWidth.value}px`
      };
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        style: normalizeStyle(stickyScrollWrapperStyle.value),
        ref_key: "currentEl",
        ref: currentEl
      }, [
        createBaseVNode("div", {
          style: normalizeStyle(fakeContentStyle.value)
        }, null, 4)
      ], 4);
    };
  }
});

// node_modules/vuestic-ui/dist/es/src/composables/useIsMounted.js
var useIsMounted = () => {
  const isMounted = ref(false);
  onMounted(() => {
    isMounted.value = true;
  });
  onBeforeUnmount(() => {
    isMounted.value = false;
  });
  return isMounted;
};

// node_modules/vuestic-ui/dist/es/src/composables/useBreakpoint.js
var helpersKeys = ["xs", "sm", "md", "lg", "xl", "smUp", "mdUp", "lgUp", "smDown", "mdDown", "lgDown"];
var defaultHelpers = helpersKeys.reduce((acc, key) => {
  acc[key] = false;
  return acc;
}, {});
var useBreakpoint = () => {
  const injected = inject(vaBreakpointSymbol, {});
  const isMounted = useIsMounted();
  const { globalConfig } = useGlobalConfig();
  const breakpointConfig = computed(() => {
    const breakpoint = globalConfig.value.breakpoint;
    if (!breakpoint) {
      warn("useBreakpoint: breakpointConfig is not defined!");
    }
    return breakpoint ?? {};
  });
  const defaultBreakpoint = computed(() => breakpointConfig.value.enabled ? {
    width: void 0,
    height: void 0,
    current: void 0,
    thresholds: breakpointConfig.value.thresholds,
    ...defaultHelpers
  } : {});
  return useReactiveComputed(() => isMounted.value ? injected : defaultBreakpoint.value);
};

// node_modules/vuestic-ui/dist/es/src/composables/useI18n.js
var useI18nConfig = () => {
  const { globalConfig, mergeGlobalConfig } = useGlobalConfig();
  const config = computed(() => globalConfig.value.i18n);
  const mergeIntoConfig = (newConfig) => {
    mergeGlobalConfig({
      i18n: {
        ...config.value,
        ...newConfig
      }
    });
  };
  return {
    config,
    mergeIntoConfig
  };
};

// node_modules/vuestic-ui/dist/es/src/composables/useTemplateRef.js
var useTemplateRef = (key) => {
  const vm = getCurrentInstance();
  let _trigger = () => {
  };
  const el = customRef((track, trigger) => {
    _trigger = trigger;
    return {
      get() {
        var _a2;
        track();
        return (_a2 = vm.proxy) == null ? void 0 : _a2.$refs[key];
      },
      set(value) {
      }
    };
  });
  onMounted(_trigger);
  onUpdated(_trigger);
  return el;
};

// node_modules/vuestic-ui/dist/es/src/composables/useForm/useForm.js
var useForm = (elRef) => {
  const form = typeof elRef === "string" ? useTemplateRef(elRef) : typeof elRef === "undefined" ? ref() : elRef;
  return {
    formRef: form,
    isValid: computed(() => {
      var _a2;
      return ((_a2 = form.value) == null ? void 0 : _a2.isValid) || false;
    }),
    immediate: computed(() => {
      var _a2;
      return ((_a2 = form.value) == null ? void 0 : _a2.immediate) || false;
    }),
    isLoading: computed(() => {
      var _a2;
      return ((_a2 = form.value) == null ? void 0 : _a2.isLoading) || false;
    }),
    isDirty: computed(() => {
      var _a2;
      return ((_a2 = form.value) == null ? void 0 : _a2.isDirty) || false;
    }),
    isTouched: computed(() => {
      var _a2;
      return ((_a2 = form.value) == null ? void 0 : _a2.isTouched) || false;
    }),
    fields: computed(() => {
      var _a2;
      return ((_a2 = form.value) == null ? void 0 : _a2.fields) ?? [];
    }),
    fieldsNamed: computed(() => {
      var _a2;
      return ((_a2 = form.value) == null ? void 0 : _a2.fieldsNamed) ?? [];
    }),
    fieldNames: computed(() => {
      var _a2;
      return ((_a2 = form.value) == null ? void 0 : _a2.fieldNames) ?? [];
    }),
    formData: computed(() => {
      var _a2;
      return ((_a2 = form.value) == null ? void 0 : _a2.formData) ?? {};
    }),
    errorMessages: computed(() => {
      var _a2;
      return ((_a2 = form.value) == null ? void 0 : _a2.errorMessages) || [];
    }),
    errorMessagesNamed: computed(() => {
      var _a2;
      return ((_a2 = form.value) == null ? void 0 : _a2.errorMessagesNamed) || {};
    }),
    validate: () => {
      var _a2;
      return (_a2 = form.value) == null ? void 0 : _a2.validate();
    },
    validateAsync: () => {
      var _a2;
      return (_a2 = form.value) == null ? void 0 : _a2.validateAsync();
    },
    reset: () => {
      var _a2;
      return (_a2 = form.value) == null ? void 0 : _a2.reset();
    },
    resetValidation: () => {
      var _a2;
      return (_a2 = form.value) == null ? void 0 : _a2.resetValidation();
    },
    focus: () => {
      var _a2;
      return (_a2 = form.value) == null ? void 0 : _a2.focus();
    },
    focusInvalidField: () => {
      var _a2;
      return (_a2 = form.value) == null ? void 0 : _a2.focusInvalidField();
    }
  };
};

// node_modules/vuestic-ui/dist/es/src/composables/useInputMask/cursor.js
var CursorPosition = ((CursorPosition2) => {
  CursorPosition2[CursorPosition2["BeforeChar"] = -1] = "BeforeChar";
  CursorPosition2[CursorPosition2["Any"] = 0] = "Any";
  CursorPosition2[CursorPosition2["AfterChar"] = 1] = "AfterChar";
  return CursorPosition2;
})(CursorPosition || {});
var Cursor = class extends Number {
  constructor(position, tokens, reversed = false) {
    super(position);
    this.position = position;
    this.tokens = tokens;
    this.reversed = reversed;
  }
  move(direction, amount, cursorPosition = 0) {
    if (this.tokens.every((t) => t.static)) {
      if (direction === 1) {
        this.position = this.tokens.length;
        return this.position;
      } else {
        this.position = 0;
        return this.position;
      }
    }
    for (let i = this.position; i <= this.tokens.length && i >= -1; i += direction) {
      const current = this.tokens[i];
      const next = this.tokens[i + direction] || void 0;
      this.tokens[i - direction] || void 0;
      if (amount === 0) {
        this.position = i;
        return this.position;
      }
      if (next === void 0 && current === void 0) {
        this.position = i;
        return this.position;
      }
      if (cursorPosition === 1) {
        if (current && !current.static && direction > 0) {
          amount--;
          continue;
        }
        if (!(next == null ? void 0 : next.static) && direction < 0 && i !== this.position) {
          amount--;
          if (amount === 0) {
            this.position = i;
            return this.position;
          }
          continue;
        }
      }
      if (cursorPosition === -1) {
        if (!(next == null ? void 0 : next.static)) {
          amount--;
          continue;
        }
      }
      if (cursorPosition === 0) {
        if ((!(current == null ? void 0 : current.static) || !(next == null ? void 0 : next.static)) && direction > 0) {
          amount--;
          continue;
        }
        if (direction < 0) {
          if (next && !next.static) {
            amount--;
            if (i !== this.position) {
              this.position = i;
              return this.position;
            }
          }
        }
      }
    }
    return this.position;
  }
  moveBack(amount, cursorPosition = 0) {
    return this.move(-1, amount, cursorPosition);
  }
  moveForward(amount, cursorPosition = 0) {
    return this.move(1, amount, cursorPosition);
  }
  updateTokens(newTokens, fromEnd = false) {
    if (fromEnd) {
      this.position = this.tokens.length - this.position;
      this.tokens = newTokens;
      this.position = this.tokens.length - this.position;
    } else {
      this.tokens = newTokens;
    }
  }
  valueOf() {
    if (this.position < 0) {
      return 0;
    }
    if (this.position > this.tokens.length) {
      return this.tokens.length;
    }
    return this.position;
  }
};

// node_modules/vuestic-ui/dist/es/src/composables/useInputMask/useInputMask.js
var extractInput = (el) => {
  const htmlEl = unwrapEl(el);
  if (!htmlEl) {
    return null;
  }
  if (htmlEl.tagName === "INPUT") {
    return htmlEl;
  }
  return htmlEl.querySelector("input");
};
var useInputMask = (mask, el) => {
  const inputText = ref("");
  const formatted = ref({
    text: "",
    tokens: [],
    data: void 0
  });
  const input = computed(() => extractInput(el.value));
  const setInputValue = (value, options) => {
    input.value.value = value;
    input.value.dispatchEvent(new InputEvent("input", options));
  };
  const onBeforeInput = (e) => {
    const { inputType } = e;
    const eventTarget = e.target;
    const data = e.data === null ? "" : e.data;
    const currentValue = eventTarget.value;
    const selectionStart = eventTarget.selectionStart ?? 0;
    const selectionEnd = eventTarget.selectionEnd ?? 0;
    const cursorStart = new Cursor(selectionStart, formatted.value.tokens);
    const cursorEnd = new Cursor(selectionEnd, formatted.value.tokens);
    if (inputType === "deleteContentBackward") {
      e.preventDefault();
      if (+cursorStart === +cursorEnd) {
        cursorStart.moveBack(1, CursorPosition.AfterChar);
      }
    } else if (inputType === "deleteContentForward" || inputType === "deleteContent" || inputType === "deleteByCut") {
      e.preventDefault();
      if (+cursorStart === +cursorEnd) {
        cursorEnd.moveForward(1, CursorPosition.AfterChar);
      }
    } else if (inputType === "insertText" || inputType === "insertFromPaste") {
      e.preventDefault();
    }
    const tokens = formatted.value.tokens;
    inputText.value = currentValue.slice(0, +cursorStart) + data + currentValue.slice(+cursorEnd);
    formatted.value = unref(mask).format(inputText.value);
    if (inputType === "insertFromPaste") {
      cursorStart.position += formatted.value.text.length - currentValue.length;
    }
    unref(mask).handleCursor(cursorStart, cursorEnd, tokens, formatted.value.tokens, data, formatted.value.data);
    setInputValue(formatted.value.text, e);
    eventTarget.setSelectionRange(+cursorStart, +cursorEnd);
  };
  const onKeydown = (e) => {
    const el2 = e.target;
    if (e.key === "ArrowLeft") {
      if (el2.selectionStart === el2.selectionEnd) {
        const cursor = new Cursor(el2.selectionStart ?? 0, formatted.value.tokens);
        cursor.moveBack(1);
        el2.setSelectionRange(+cursor, +cursor);
      } else {
        el2.setSelectionRange(el2.selectionStart, el2.selectionStart);
      }
      e.preventDefault();
    }
    if (e.key === "ArrowRight") {
      if (el2.selectionStart === el2.selectionEnd) {
        const cursor = new Cursor(el2.selectionEnd ?? 0, formatted.value.tokens);
        cursor.moveForward(1);
        el2.setSelectionRange(+cursor, +cursor);
      } else {
        el2.setSelectionRange(el2.selectionEnd, el2.selectionEnd);
      }
      e.preventDefault();
    }
  };
  watch(input, (newValue, oldValue) => {
    if (newValue) {
      formatted.value = unref(mask).format(newValue.value);
      const cursor = new Cursor(newValue.selectionEnd ?? 0, formatted.value.tokens);
      cursor.moveForward(1);
      setInputValue(formatted.value.text);
      newValue.setSelectionRange(+cursor, +cursor);
      newValue.addEventListener("beforeinput", onBeforeInput);
      newValue.addEventListener("keydown", onKeydown);
    }
    if (oldValue) {
      oldValue.removeEventListener("beforeinput", onBeforeInput);
      oldValue.removeEventListener("keydown", onKeydown);
    }
  }, { immediate: true });
  const unmasked = computed(() => {
    return unref(mask).unformat(formatted.value.text, formatted.value.tokens);
  });
  return {
    inputText: formatted,
    masked: computed(() => {
      var _a2;
      return ((_a2 = formatted.value) == null ? void 0 : _a2.text) ?? "";
    }),
    unmasked
  };
};

// node_modules/vuestic-ui/dist/es/src/composables/useInputMask/masks/parser.js
var or = (...args) => new RegExp(args.map((r) => r.source).join("|"), "g");
var TOKEN_SPLIT_REGEX = or(
  /(\{[^}]*\})/,
  // Token required to have limits {1, 3}, {1,}, {1}
  /(\\[dws.])/,
  /(^\([^)]*\)$)/,
  // group like (test)
  /(\[[^\]]*\])/,
  // split by [^3]{1}, [a-z], [0-9]{1, 3}
  /(?:)/
  // split for each letter
);
var isMaskSingleGroup = (symbol) => {
  if (!symbol.startsWith("(") || !symbol.endsWith(")")) {
    return false;
  }
  let groupDepth = 0;
  for (let i = 0; i < symbol.length; i++) {
    const char = symbol[i];
    if (char === "(") {
      groupDepth += 1;
    } else if (char === ")") {
      groupDepth -= 1;
      if (groupDepth === 0 && i !== symbol.length - 1) {
        return false;
      }
    }
  }
  return groupDepth === 0;
};
var parseRawTokens = (symbol) => {
  let group = 0;
  const groups = [];
  let currentChunk = "";
  let i = 0;
  while (i < symbol.length) {
    if (symbol[i] === "(" && symbol[i - 1] !== "\\") {
      if (group === 0 && currentChunk.length > 0) {
        groups.push(...currentChunk.split(TOKEN_SPLIT_REGEX).filter((v) => v !== "" && v !== void 0));
        currentChunk = "";
      }
      group += 1;
    }
    currentChunk += symbol[i];
    if (symbol[i] === ")" && symbol[i - 1] !== "\\") {
      group -= 1;
      if (group === 0 && currentChunk.length > 0) {
        groups.push(currentChunk);
        currentChunk = "";
      }
    }
    i++;
  }
  if (currentChunk.length > 0) {
    groups.push(...currentChunk.split(TOKEN_SPLIT_REGEX).filter((v) => v !== "" && v !== void 0));
  }
  return groups.map((g) => g.replace(/^\?[:!>]/, "")).filter((v) => v !== "" && v !== void 0);
};
var RESERVED_SLASH_SYMBOLS = ["d", "D", "w", "W", "s", "S", "."];
var MAX_REPEATED = 10;
var parseTokens = (mask, directlyInGroup = false) => {
  let tokens = [];
  if (isMaskSingleGroup(mask)) {
    mask = mask.slice(1, -1);
    directlyInGroup = true;
  }
  const rawTokens = parseRawTokens(mask);
  for (let i = 0; i < rawTokens.length; i++) {
    const rawToken = rawTokens[i];
    if (rawToken === "\\") {
      continue;
    }
    if (!RESERVED_SLASH_SYMBOLS.includes(rawToken) && rawTokens[i - 1] === "\\") {
      tokens.push({ type: "char", expect: rawToken });
      continue;
    }
    if (rawToken === "|") {
      if (directlyInGroup) {
        tokens = [{
          type: "or regex",
          expect: mask,
          left: [...tokens],
          right: parseTokens(`(${rawTokens.slice(i + 1).join("")})`)
        }];
        break;
      }
      const prevToken = tokens.pop();
      const nextToken = parseTokens(rawTokens[i + 1]);
      tokens.push({
        type: "or regex",
        expect: `${prevToken}|${rawTokens[i + 1]}`,
        left: [prevToken],
        right: nextToken
      });
      continue;
    }
    if (rawToken.startsWith("{") && rawToken.endsWith("}") && rawToken.length > 2) {
      const [v, min2, delimiter, max2] = rawToken.split(/\{(\d+)(,\s?)?(\d+)?\}$/);
      const prevToken = tokens.pop();
      tokens.push({
        type: "repeated",
        expect: prevToken.expect + rawToken,
        tree: [prevToken],
        min: parseInt(min2),
        max: max2 ? parseInt(max2) : delimiter ? MAX_REPEATED : parseInt(min2),
        content: rawToken
      });
      continue;
    }
    if (rawToken.endsWith("*")) {
      const prevToken = tokens.pop();
      tokens.push({ type: "repeated", expect: prevToken.expect + rawToken, tree: [prevToken], min: 0, max: MAX_REPEATED, content: prevToken.expect });
      continue;
    }
    if (rawToken.endsWith("+")) {
      const prevToken = tokens.pop();
      tokens.push({ type: "repeated", expect: prevToken.expect + rawToken, tree: [prevToken], min: 1, max: MAX_REPEATED, content: prevToken.expect });
      continue;
    }
    if (rawToken.endsWith("?")) {
      const prevToken = tokens.pop();
      tokens.push({ type: "repeated", expect: prevToken.expect + rawToken, tree: [prevToken], min: 0, max: 1, content: prevToken.expect });
      continue;
    }
    if (["$", "^"].includes(rawToken)) {
      continue;
    }
    if (rawToken.startsWith("(") && rawToken.endsWith(")")) {
      const tree = parseTokens(rawToken.slice(1, -1), true);
      tokens.push({ type: "group", expect: rawToken, tree });
      continue;
    }
    if (rawToken.length === 1 && rawToken !== ".") {
      tokens.push({ type: "char", expect: rawToken });
      continue;
    }
    tokens.push({ type: "regex", expect: rawToken });
  }
  return tokens;
};

// node_modules/vuestic-ui/dist/es/src/composables/useInputMask/masks/regex.js
var normalizeTokens = (tokens, dynamic = false) => {
  let possibleResults = [[]];
  for (const token of tokens) {
    if (token.type === "group") {
      const newResults = [];
      possibleResults.forEach((result) => {
        normalizeTokens(token.tree, dynamic).forEach((result2) => {
          newResults.push([...result, ...result2]);
        });
      });
      possibleResults = newResults;
    }
    if (token.type === "char" || token.type === "regex") {
      const newResults = [];
      possibleResults.forEach((result) => {
        newResults.push([...result, {
          type: token.type,
          expect: token.expect,
          static: token.type === "char",
          // && (!dynamic || result.length > 0),
          dynamic
        }]);
      });
      possibleResults = newResults;
    }
    if (token.type === "repeated") {
      const possibleResults2 = [];
      for (let i = token.min; i <= token.max && i <= 100; i++) {
        const isDynamic = i !== token.min;
        normalizeTokens(token.tree, isDynamic || dynamic).forEach((result) => {
          const repeated = new Array(i).fill(result).flat();
          possibleResults2.push(repeated);
        });
      }
      const newResults = [];
      possibleResults.forEach((result) => {
        possibleResults2.forEach((result2) => {
          newResults.push([...result, ...result2]);
        });
      });
      possibleResults = newResults;
    }
    if (token.type === "or regex") {
      const newPossibleResults = [];
      possibleResults.forEach((existingResult) => {
        normalizeTokens(token.left, true).forEach((result) => {
          newPossibleResults.push([...existingResult, ...result]);
        });
        normalizeTokens(token.right, true).forEach((result) => {
          newPossibleResults.push([...existingResult, ...result]);
        });
      });
      possibleResults = newPossibleResults;
    }
  }
  return possibleResults.reduce((acc, result) => {
    if (acc.find((r) => r.length === result.length && r.every((t, i) => t.expect === result[i].expect))) {
      return acc;
    }
    return [...acc, result];
  }, []);
};
var compareWithMask = (mask, value) => {
  if (!value) {
    return true;
  }
  for (let i = 0; i < mask.length; i++) {
    if (value[i] === void 0) {
      return true;
    }
    if (mask[i].type === "char" && mask[i].expect !== (value == null ? void 0 : value[i])) {
      return false;
    }
    if (mask[i].type === "regex" && !new RegExp(mask[i].expect).test(value[i])) {
      return false;
    }
  }
  return value.length <= mask.length;
};
var compareWithToken = (token, value) => {
  if (token.type === "char" && token.expect !== value) {
    return false;
  }
  if (token.type === "regex" && !new RegExp(token.expect).test(value)) {
    return false;
  }
  return true;
};
var formatByRegexTokens = (possibleResults, value, reverse = false) => {
  var _a2, _b, _c, _d;
  if (reverse) {
    possibleResults = possibleResults.map((result) => result.slice().reverse());
    value = value.split("").reverse().join("");
  }
  let suggestedCharsCount = 0;
  let text = "";
  let valueOffset = 0;
  let tokensOffset = 0;
  const maxPossibleMask = possibleResults.reduce((acc, mask) => Math.max(acc, mask.length), 0);
  const foundTokens = [];
  while (valueOffset < value.length || tokensOffset < maxPossibleMask) {
    possibleResults = possibleResults.filter((tokens) => {
      return compareWithMask(tokens, text);
    });
    const possibleToken = possibleResults.map((mask) => mask[tokensOffset]).filter((token) => token !== void 0);
    if (possibleToken.length === 0) {
      break;
    }
    const possibleSuggestions = possibleToken.filter((token) => token.type === "char");
    const staticCharts = possibleToken.filter((token) => token.static);
    const isOnePossibleStaticChar = staticCharts.reduce((acc, char) => {
      if (acc === null) {
        return char;
      }
      if (acc.expect !== char.expect) {
        return null;
      }
      return acc;
    }, null);
    if (possibleSuggestions.length > 0) {
      const suggestedChar = ((_a2 = possibleSuggestions[0]) == null ? void 0 : _a2.expect) ?? "";
      let canBeSuggested = possibleSuggestions.every((token) => token.expect === suggestedChar) && ((_b = value[valueOffset]) == null ? void 0 : _b.length) > 0;
      const onlyStaticLeft = possibleResults.length === 1 && possibleResults[0].slice(tokensOffset).every((token) => token.static);
      if (possibleSuggestions[0].dynamic) {
        canBeSuggested = canBeSuggested && ((_c = value[valueOffset]) == null ? void 0 : _c.length) > 0;
      }
      if (isOnePossibleStaticChar && ((_d = value[valueOffset]) == null ? void 0 : _d.length) > 0) {
        canBeSuggested = value[valueOffset] !== isOnePossibleStaticChar.expect;
      }
      if (possibleToken.some((token) => compareWithToken(token, value[valueOffset]))) {
        canBeSuggested = false;
      }
      if (onlyStaticLeft) {
        canBeSuggested = true;
      }
      if (canBeSuggested) {
        if (suggestedChar !== value[valueOffset]) {
          text += suggestedChar;
          foundTokens.push(possibleSuggestions[0]);
          tokensOffset += 1;
          suggestedCharsCount += 1;
          continue;
        }
      }
    }
    if (valueOffset >= value.length) {
      break;
    }
    const charCorrectTokens = possibleToken.filter((token) => {
      if (token.type === "char") {
        return token.expect === value[valueOffset];
      }
      if (token.type === "regex") {
        return new RegExp(token.expect).test(value[valueOffset]);
      }
      return false;
    });
    if (value[valueOffset] !== void 0) {
      if (charCorrectTokens.length > 0) {
        text += value[valueOffset];
        foundTokens.push(charCorrectTokens[0]);
        tokensOffset++;
      }
    }
    valueOffset++;
  }
  if (reverse) {
    return {
      text: text.split("").reverse().join(""),
      tokens: foundTokens.reverse(),
      data: suggestedCharsCount
    };
  }
  return {
    text,
    tokens: foundTokens,
    data: suggestedCharsCount
  };
};
var unformat = (text, tokens) => {
  const value = text;
  if (!value) {
    return "";
  }
  return tokens.reduce((acc, token, i) => {
    if (token.static) {
      return acc;
    }
    if (compareWithToken(token, value[i]) && value[i] !== void 0) {
      return acc + value[i];
    }
    return acc;
  }, "");
};
var createRegexMask = (regex, options = { reverse: false }) => {
  const tokens = parseTokens(regex.source);
  const possibleResults = normalizeTokens(tokens);
  return {
    format: (text) => {
      return formatByRegexTokens(possibleResults, text, options.reverse);
    },
    handleCursor(cursorStart, cursorEnd, oldTokens, newTokens, data, suggestedCount = 0) {
      cursorStart.updateTokens(newTokens, options.reverse);
      cursorEnd.updateTokens(newTokens, options.reverse);
      if (!options.reverse) {
        cursorStart.moveForward(data.length, CursorPosition.AfterChar);
        cursorEnd.position = cursorStart.position;
      } else {
        cursorStart.position = cursorEnd.position;
      }
    },
    unformat
  };
};

// node_modules/vuestic-ui/dist/es/src/composables/useInputMask/masks/numeral.js
var DECIMAL = ".";
var createNumeralMask = () => {
  const intMask = createRegexMask(/(\d{3} )*(\d{3})/, { reverse: true });
  const decimalMask = createRegexMask(/(\d{3} )*(\d{3})/, { reverse: false });
  return {
    format: (text) => {
      const hasDecimal = text.includes(DECIMAL);
      if (!hasDecimal) {
        return intMask.format(text);
      }
      const [int = "", decimal = "", ...rest] = text.split(DECIMAL);
      const intResult = intMask.format(int);
      const decimalResult = decimalMask.format(decimal + rest.join(""));
      return {
        text: intResult.text + DECIMAL + decimalResult.text,
        tokens: [...intResult.tokens, { type: "char", static: false, expect: DECIMAL, isDecimal: true }, ...decimalResult.tokens]
      };
    },
    handleCursor(selectionStart, selectionEnd, oldTokens, newTokens, data) {
      const decimalIndex = newTokens.findIndex((token) => token.isDecimal);
      if (decimalIndex === -1) {
        return intMask.handleCursor(selectionStart, selectionEnd, oldTokens, newTokens, data);
      }
      if (selectionStart.position < decimalIndex) {
        intMask.handleCursor(selectionStart, selectionEnd, oldTokens, newTokens, data);
      } else {
        decimalMask.handleCursor(selectionStart, selectionEnd, oldTokens, newTokens, data);
      }
    },
    unformat: (text, tokens) => {
      return parseFloat(text.replace(/ /g, "")).toString();
    }
  };
};

// node_modules/vuestic-ui/dist/es/src/composables/useInputMask/masks/date.js
var parseTokens2 = (format) => {
  return format.split("").map((char) => {
    if (char === "m" || char === "d" || char === "y") {
      return { static: false, expect: char };
    }
    return { static: true, expect: char };
  });
};
var getFebMaxDays = (year) => {
  if (Number.isNaN(year)) {
    return 29;
  }
  return year % 4 === 0 ? 29 : 28;
};
var getMaxDays = (year, month) => {
  if (Number.isNaN(month)) {
    return 31;
  }
  if (month === 2) {
    return getFebMaxDays(year);
  }
  if ([4, 6, 9, 11].includes(month)) {
    return 30;
  }
  return 31;
};
var removeStaticCharsFromEnd = (tokens) => {
  let i = tokens.length - 1;
  while (tokens[i] && tokens[i].static) {
    i--;
  }
  return tokens.slice(0, i + 1);
};
var createDateMask = (format = "yyyy/mm/dd") => {
  const tokens = parseTokens2(format);
  const cache = /* @__PURE__ */ new Map();
  return {
    format(text) {
      const minorTokens = [];
      let valueOffset = 0;
      let tokenOffset = 0;
      for (let i = 0; i < tokens.length; i++) {
        const token = tokens[tokenOffset];
        if (token.static) {
          minorTokens.push({ value: token.expect, expect: token.expect, static: true });
          tokenOffset++;
          if (token.expect === text[valueOffset]) {
            valueOffset++;
          }
          continue;
        }
        if (text[valueOffset] === void 0) {
          break;
        }
        if (!/\d/.test(text[valueOffset])) {
          const nextTokensHasStatic = tokens.slice(tokenOffset, text.length).some((t) => t.static);
          if (nextTokensHasStatic) {
            tokenOffset++;
          } else {
            valueOffset++;
          }
          continue;
        }
        minorTokens.push({ value: text[valueOffset], expect: token.expect, static: false });
        valueOffset++;
        tokenOffset++;
      }
      const majorTokens = removeStaticCharsFromEnd(minorTokens).reduce((acc, p, index) => {
        var _a2;
        if (((_a2 = acc[acc.length - 1]) == null ? void 0 : _a2.expect) === p.expect) {
          acc[acc.length - 1].value += p.value;
          acc[acc.length - 1].tree.push(p);
          return acc;
        }
        acc.push({
          value: p.value,
          expect: p.expect,
          tree: [p]
        });
        return acc;
      }, []);
      majorTokens.forEach((t, index, array) => {
        if (t.expect === "m") {
          const num = parseInt(t.value);
          if (num > 12) {
            t.value = "12";
            t.tree[0].static = true;
            t.tree[1].static = false;
          }
          if (num < 1 && t.value.length === 2) {
            t.value = "01";
            t.tree[0].static = true;
            t.tree[1].static = false;
          }
          if (num > 1 && num < 10 && t.value.length === 1) {
            t.value = "0" + num;
            t.tree.unshift({ value: "0", expect: "m", static: true });
            t.tree[1].static = false;
          }
        }
        if (t.expect === "d") {
          const year = majorTokens.find((t2) => t2.expect === "y" && t2.used === void 0);
          const month = majorTokens.find((t2) => t2.expect === "m" && t2.used === void 0);
          if (year) {
            year.used = true;
          }
          if (month) {
            month.used = true;
          }
          const m = Number(month == null ? void 0 : month.value);
          const maxDays = getMaxDays(Number(year == null ? void 0 : year.value), m);
          if (m === 2) {
            if (Number(t.value) >= 29) {
              t.value = "29";
            }
            if (t.value === "28" && cache.get(index) === "29") {
              t.value = "29";
            }
            cache.set(index, t.value);
          }
          const num = parseInt(t.value);
          if (num > maxDays && t.value.length === 2) {
            t.value = maxDays.toString();
            t.tree[0].static = true;
            t.tree[1].static = false;
          }
          if (num < 1 && t.value.length === 2) {
            t.value = "01";
            t.tree[0].static = true;
            t.tree[1].static = false;
          }
          if (num > 3 && num < 10 && t.value.length === 1) {
            t.value = "0" + num;
            t.tree.unshift({ value: "0", expect: "d", static: true });
            t.tree[1].static = false;
          }
        }
      });
      const newText = majorTokens.reduce((acc, p) => acc + p.value, "");
      const newTokens = tokens.map((t) => ({
        ...t,
        static: false
      }));
      return {
        text: newText,
        tokens: newTokens,
        data: majorTokens.reduce((acc, p) => acc.concat(p.tree), [])
      };
    },
    handleCursor(cursorStart, cursorEnd, oldTokens, newTokens, data, minorTokens) {
      cursorStart.updateTokens(minorTokens);
      cursorEnd.updateTokens(minorTokens);
      cursorStart.moveForward(data.length, CursorPosition.AfterChar);
      cursorEnd.position = cursorStart.position;
    },
    unformat: (text, tokens2) => {
      return text.replace(/\//g, "");
    }
  };
};

// node_modules/vuestic-ui/dist/es/src/composables/useElementBackground.js
var parseRgba = (rgba) => {
  let values;
  if (rgba.startsWith("rgba")) {
    values = rgba.substring(5, rgba.length - 1).split(",");
  } else {
    values = rgba.substring(4, rgba.length - 1).split(",");
  }
  values[0] = Number(values[0]);
  values[1] = Number(values[1]);
  values[2] = Number(values[2]);
  if (values[3] === void 0) {
    values[3] = 1;
  } else {
    values[3] = Number(values[3]);
  }
  return values;
};
var toHex = (color) => {
  return "#" + (color[0] | 1 << 8).toString(16).slice(1) + (color[1] | 1 << 8).toString(16).slice(1) + (color[2] | 1 << 8).toString(16).slice(1) + (color[3] * 255 | 1 << 8).toString(16).slice(1);
};
var getParentsWithBackground = (el) => {
  const parents = [];
  let currentEl = el;
  while (currentEl) {
    if (!(currentEl instanceof HTMLElement) || !currentEl) {
      return parents;
    }
    const { backgroundColor, willChange } = window.getComputedStyle(currentEl);
    const bgWillChange = willChange.includes("background");
    const parsedColor = parseRgba(backgroundColor);
    if (parsedColor[3] === 1 && !bgWillChange) {
      parents.push(currentEl);
      return parents;
    }
    if (parsedColor[3] !== 0 || bgWillChange) {
      parents.push(currentEl);
    }
    currentEl = currentEl.parentElement;
  }
  return parents;
};
var WATCHER_CLASS = "va-background-watcher";
var watchElementBackground = (el, cb) => {
  el.className = WATCHER_CLASS + " " + el.className;
  el.addEventListener("transitionend", (e) => {
    if (e.target !== el) {
      return;
    }
    cb();
  });
  return () => {
    el.className = el.className.replace(WATCHER_CLASS, "");
    el.removeEventListener("transitionend", cb);
  };
};
var watchElementsBackground = (els, cb) => {
  const unwatchers = els.map((el) => watchElementBackground(el, cb));
  return () => {
    unwatchers.forEach((unwatch) => unwatch());
  };
};
var applyColors2 = (color1, color2) => {
  const weight = color2[3];
  if (weight === 1) {
    return color2;
  }
  if (weight === 0) {
    return color1;
  }
  const c1 = Math.round(color1[0] * (1 - weight) + color2[0] * weight);
  const c2 = Math.round(color1[1] * (1 - weight) + color2[1] * weight);
  const c3 = Math.round(color1[2] * (1 - weight) + color2[2] * weight);
  return [c1, c2, c3, 1];
};
var getColorFromElements = (els) => {
  let currentColor = [0, 0, 0, 0];
  for (let i = els.length - 1; i >= 0; i--) {
    currentColor = applyColors2(currentColor, parseRgba(window.getComputedStyle(els[i]).backgroundColor));
  }
  return currentColor;
};
var useElementBackground = (el) => {
  const color = ref("#000000");
  let unWatchAll = () => void 0;
  watchEffect(() => {
    unWatchAll();
    if (el.value) {
      const parents = getParentsWithBackground(el.value);
      unWatchAll = watchElementsBackground(parents, () => {
        color.value = toHex(getColorFromElements(parents));
      });
      color.value = toHex(getColorFromElements(parents));
    }
  });
  return color;
};

// node_modules/vuestic-ui/dist/es/src/composables/useStickyTableHeaders/useStickyTableHeaders.js
var syncTh = (thead1, thead2) => {
  const ths1 = thead1.querySelectorAll("th");
  const ths2 = thead2.querySelectorAll("th");
  ths1.forEach((th, index) => {
    const th2 = ths2[index];
    th2.style.width = `${th.getBoundingClientRect().width}px`;
  });
};
var recursiveGetOffset = (el, offset3 = 0) => {
  if (!el) {
    return offset3;
  }
  return recursiveGetOffset(el.offsetParent, offset3 + el.offsetTop);
};
var useStickyTableHeaders = (tableEl, offset3 = 0) => {
  let mutationObserver = null;
  let headClone = null;
  let head = null;
  let table = null;
  let headOffset = 0;
  let hasTransform = false;
  let tableHeight = 0;
  let headHeight = 0;
  const htmlTable = computed(() => {
    if (!tableEl.value) {
      return null;
    }
    const el = "$el" in tableEl.value ? tableEl.value.$el : tableEl.value;
    return el.tagName === "TABLE" ? el : el.querySelector("table");
  });
  const htmlTableHead = computed(() => {
    if (!htmlTable.value) {
      return null;
    }
    return htmlTable.value.querySelector("thead");
  });
  const bg = useElementBackground(htmlTableHead);
  watchEffect(() => {
    if (!tableEl.value) {
      return;
    }
    const rootEl = htmlTable.value;
    if (!rootEl) {
      return;
    }
    table = htmlTable.value;
    head = htmlTableHead.value;
    if (!head) {
      return;
    }
    table.style.position = "relative";
    headClone = head.cloneNode(true);
    headClone.style.position = "fixed";
    headClone.style.top = "0px";
    headClone.style.width = `${table.clientWidth}px`;
    headClone.style.zIndex = "1";
    headClone.style.backgroundColor = bg.value;
    headClone.style.display = "none";
    table.appendChild(headClone);
    syncTh(head, headClone);
    headOffset = recursiveGetOffset(head);
    hasTransform = window.getComputedStyle(table).transform !== "none";
    tableHeight = table.clientHeight;
    headHeight = head.clientHeight;
    mutationObserver = new MutationObserver(() => {
      if (!headClone) {
        return;
      }
      if (!head) {
        return;
      }
      if (!table) {
        return;
      }
      headClone.style.width = `${table.clientWidth}px`;
      syncTh(head, headClone);
      headOffset = recursiveGetOffset(head);
      tableHeight = table.clientHeight;
      headHeight = head.clientHeight;
    });
    mutationObserver.observe(table, {
      childList: true,
      subtree: true,
      attributes: true
    });
  });
  useEvent("scroll", () => {
    if (!headClone) {
      return;
    }
    const y = window.scrollY;
    if (y > headOffset - offset3 && y < headOffset + tableHeight - offset3 - headHeight) {
      headClone.style.display = "block";
      if (hasTransform) {
        headClone.style.top = `${y - headOffset + offset3 - 2}px`;
      } else {
        headClone.style.top = `${offset3}px`;
      }
    } else {
      headClone.style.top = "0px";
      headClone.style.display = "none";
    }
  });
};

// node_modules/vuestic-ui/dist/es/src/services/vue-plugin/utils/global-properties.js
var extractGlobalProperties = (app) => app.config.globalProperties;
var defineGlobalProperty = (app, key, v) => {
  const globalProperties = extractGlobalProperties(app);
  globalProperties[key] = v;
};
var getGlobalProperty = (app, key) => {
  return extractGlobalProperties(app)[key];
};

// node_modules/vuestic-ui/dist/es/src/services/global-config/plugin/index.js
var GlobalConfigPlugin = defineVuesticPlugin((config = {}) => ({
  install(app) {
    const globalConfig = createGlobalConfig(config);
    if (config == null ? void 0 : config.componentsAll) {
      console.warn("Global config -> `componentsAll` was moved to Global config -> components.all. Please replace this to make it work. More info here: https://github.com/epicmaxco/vuestic-ui/issues/1967");
    }
    app.provide(GLOBAL_CONFIG, globalConfig);
    defineGlobalProperty(app, "$vaConfig", globalConfig);
  }
}));

// node_modules/vuestic-ui/dist/es/src/utils/dom.js
var addOrUpdateStyleElement = (id, getStyles) => {
  if (isServer()) {
    return;
  }
  let stylesElement = document.getElementById(id);
  if (stylesElement) {
    stylesElement.innerHTML = getStyles();
  } else {
    stylesElement = document.createElement("style");
    stylesElement.setAttribute("type", "text/css");
    stylesElement.setAttribute("id", id);
    stylesElement.innerHTML = getStyles();
    document.head.append(stylesElement);
  }
};
var removeStyleElement = (id) => {
  var _a2;
  (_a2 = document.getElementById(id)) == null ? void 0 : _a2.remove();
};

// node_modules/vuestic-ui/dist/es/src/services/color/plugin/create-color-config-plugin.js
var generateCSSVariable = (key, value) => {
  return `${cssVariableName(key)}: ${value};
`;
};
var STYLE_ROOT_ATTR = "data-va-app";
var getStyleElementId = (id) => `va-color-variables-${id}`;
var createColorConfigPlugin = (app, config) => {
  const { colors: configColors, getTextColor, getColor, currentPresetName, applyPreset } = useColors();
  const renderCSSVariables = (colors = configColors) => {
    if (!colors) {
      return;
    }
    const colorNames = Object.keys(colors);
    const renderedColors = colorNames.map((key) => `${cssVariableName(key)}: ${colors[key]}`).join(";");
    const renderedOnColors = colorNames.map((key) => `${cssVariableName(`on-${key}`)}: ${getColor(getTextColor(colors[key]))}`).join(";");
    return `${renderedColors};${renderedOnColors}`;
  };
  const renderCSSVariablesStyleContent = (colors = configColors, selector = ":root, :host") => {
    const colorNames = Object.keys(colors);
    let result = `${selector} {
`;
    colorNames.forEach((key) => {
      result += generateCSSVariable(key, colors[key]);
    });
    colorNames.forEach((key) => {
      result += generateCSSVariable(`on-${key}`, getColor(getTextColor(colors[key])));
    });
    result += "}\n";
    return result;
  };
  const uniqueId = computed(() => app._uid);
  const stylesRootSelector = computed(() => ":root, :host");
  const updateColors = (newValue) => {
    if (!newValue || isServer()) {
      return;
    }
    const styleContent = renderCSSVariablesStyleContent(newValue, stylesRootSelector.value);
    addOrUpdateStyleElement(getStyleElementId(uniqueId.value), () => styleContent);
  };
  function getAppStylesRootAttribute() {
    return { [STYLE_ROOT_ATTR]: uniqueId.value };
  }
  const origMount = app.mount;
  app.mount = function(...args) {
    const result = origMount.apply(this, args);
    const appRootElement = app._container;
    const existingStylesId = appRootElement.getAttribute(STYLE_ROOT_ATTR);
    if (existingStylesId && existingStylesId !== uniqueId.value.toString()) {
      removeStyleElement(getStyleElementId(existingStylesId));
    }
    appRootElement.setAttribute(STYLE_ROOT_ATTR, uniqueId.value.toString());
    return result;
  };
  watch(configColors, (newValue) => {
    updateColors(newValue);
  }, { immediate: true, deep: true });
  return {
    colors: configColors,
    currentPresetName,
    getAppStylesRootAttribute,
    renderCSSVariables,
    updateColors,
    renderCSSVariablesStyleContent
  };
};

// node_modules/vuestic-ui/dist/es/src/services/color/plugin/index.js
var ColorConfigPlugin = defineVuesticPlugin((config) => ({
  install(app) {
    defineGlobalProperty(app, "$vaColorConfig", createColorConfigPlugin(app));
  }
}));

// node_modules/vuestic-ui/dist/es/src/utils/uuid.js
var counter = 0;
var getRandomString = (stringLength = 4) => {
  return Math.random().toString(36).substring(2, stringLength + 2);
};
var generateUniqueId = () => {
  return `${getRandomString(8)}-${getRandomString(4)}-${getRandomString(4)}-${++counter}`;
};

// node_modules/vuestic-ui/dist/es/src/composables/useWindowSize.js
function useWindowSize() {
  const windowSizes = reactive({
    width: void 0,
    height: void 0
  });
  const setCurrentWindowSizes = () => {
    windowSizes.width = window == null ? void 0 : window.innerWidth;
    windowSizes.height = window == null ? void 0 : window.innerHeight;
  };
  const isMounted = computed(isClient);
  watch(isMounted, (newValue) => {
    if (!newValue) {
      return;
    }
    setCurrentWindowSizes();
  }, { immediate: true });
  useEvent("resize", setCurrentWindowSizes, true);
  return { windowSizes };
}

// node_modules/vuestic-ui/dist/es/src/composables/useDocument.js
var useDocument = () => useClientOnly(() => document);

// node_modules/vuestic-ui/dist/es/src/services/breakpoint/plugin/create-service.js
var createBreakpointConfigPlugin = (app) => {
  var _a2;
  const globalConfig = (_a2 = getGlobalProperty(app, "$vaConfig")) == null ? void 0 : _a2.globalConfig;
  if (!globalConfig) {
    warn("createBreakpointConfigPlugin: globalConfig is not defined!");
    return {};
  }
  const breakpointConfig = computed(() => {
    const breakpoint = globalConfig.value.breakpoint;
    if (!breakpoint) {
      warn("createBreakpointConfigPlugin: breakpointConfig is not defined!");
    }
    return breakpoint ?? {};
  });
  if (!breakpointConfig.value.enabled) {
    return {};
  }
  if (!breakpointConfig.value.thresholds || !Object.values(breakpointConfig.value.thresholds).length) {
    warn("createBreakpointConfigPlugin: there are no defined thresholds!");
    return {};
  }
  const { windowSizes } = useWindowSize();
  const isMounted = computed(isClient);
  const currentBreakpoint = computed(() => {
    if (!isMounted.value || !windowSizes.width) {
      return;
    }
    return Object.entries(breakpointConfig.value.thresholds).reduce((acc, [key, value]) => {
      if (windowSizes.width >= value) {
        acc = key;
      }
      return acc;
    }, "xs");
  });
  const screenClasses = computed(() => Object.keys(breakpointConfig.value.thresholds).reduce((acc, threshold) => {
    acc[threshold] = `va-screen-${threshold}`;
    return acc;
  }, {}));
  const generateHelpersMediaCss = () => {
    let result = "";
    Object.values(breakpointConfig.value.thresholds).forEach((thresholdValue, index) => {
      result += `@media screen and (min-width: ${thresholdValue}px) {`;
      result += `:root { --va-media-ratio: ${(index + 1) * 0.2} }`;
      result += "}\n";
    });
    return result;
  };
  const uniqueId = computed(generateUniqueId);
  addOrUpdateStyleElement(`va-helpers-media-${uniqueId.value}`, generateHelpersMediaCss);
  const getDocument = useDocument();
  watch(currentBreakpoint, (newValue) => {
    if (!newValue || !breakpointConfig.value.bodyClass || !getDocument.value) {
      return;
    }
    getDocument.value.body.classList.forEach((className) => {
      if (Object.values(screenClasses.value).includes(className)) {
        getDocument.value.body.classList.remove(className);
      }
    });
    getDocument.value.body.classList.add(screenClasses.value[newValue]);
  }, { immediate: true });
  const breakpointHelpers = computed(() => {
    const isXs = currentBreakpoint.value === "xs";
    const isSm = currentBreakpoint.value === "sm";
    const isMd = currentBreakpoint.value === "md";
    const isLg = currentBreakpoint.value === "lg";
    const isXl = currentBreakpoint.value === "xl";
    return {
      xs: isXs,
      sm: isSm,
      md: isMd,
      lg: isLg,
      xl: isXl,
      smUp: isSm || isMd || isLg || isXl,
      mdUp: isMd || isLg || isXl,
      lgUp: isLg || isXl,
      smDown: isXs || isSm,
      mdDown: isXs || isSm || isMd,
      lgDown: isXs || isSm || isMd || isLg
    };
  });
  return useReactiveComputed(() => ({
    width: windowSizes.width,
    height: windowSizes.height,
    current: currentBreakpoint.value,
    thresholds: breakpointConfig.value.thresholds,
    ...breakpointHelpers.value
  }));
};

// node_modules/vuestic-ui/dist/es/src/services/breakpoint/plugin/index.js
var BreakpointConfigPlugin = defineVuesticPlugin(() => ({
  install(app) {
    const breakpointConfig = createBreakpointConfigPlugin(app);
    app.provide(vaBreakpointSymbol, breakpointConfig);
    defineGlobalProperty(app, "$vaBreakpoint", breakpointConfig);
  }
}));

// node_modules/vuestic-ui/dist/es/src/composables/useTimer.js
var useTimer = () => {
  let timer;
  const start = (...args) => {
    timer = window.setTimeout(...args);
    return timer;
  };
  const clear = () => timer && window.clearTimeout(timer);
  return {
    start,
    clear
  };
};

// node_modules/vuestic-ui/dist/es/src/composables/useTranslation.js
var isTranslationKey = (value) => value.startsWith("$t:");
var useTranslationProp = (defaultValue) => {
  return { type: String, default: defaultValue };
};
var applyI18nTemplate = (key, values) => {
  if (!values) {
    return key;
  }
  Object.keys(values).forEach((valueKey) => {
    key = key.replace(`{${valueKey}}`, String(values[valueKey]));
  });
  return key;
};
var useTranslation = () => {
  const { globalConfig } = useGlobalConfig();
  const config = computed(() => globalConfig.value.i18n);
  function t(key, values) {
    var _a2;
    const $t = (_a2 = getCurrentInstance()) == null ? void 0 : _a2.appContext.config.globalProperties.$t;
    if (typeof $t === "function") {
      const translated2 = $t(`vuestic.${key}`, values);
      if (translated2) {
        return translated2;
      }
    }
    const translated = config.value[key];
    if (!translated) {
      warn(`${key} not found in VuesticUI i18n config`);
      return key;
    }
    return applyI18nTemplate(translated, values) || key;
  }
  function tp(key, values) {
    if (!key) {
      return "";
    }
    if (isTranslationKey(key)) {
      return t(key.slice(3), values);
    }
    return applyI18nTemplate(key, values) || key;
  }
  return {
    tp,
    t
  };
};

// node_modules/vuestic-ui/dist/es/src/composables/useTextColor.js
var useTextColor = (componentColor, isTransparent = false) => {
  const { props } = getCurrentInstance();
  const { getColor, getTextColor } = useColors();
  const textColorComputed = computed(() => {
    if (props.textColor) {
      return getColor(props.textColor);
    }
    const bg = componentColor ? unref(componentColor) : props.color;
    if (!bg) {
      return "currentColor";
    }
    const componentColorHex = getColor(bg);
    if (isColorTransparent(componentColorHex)) {
      return "currentColor";
    }
    return unref(isTransparent) ? componentColorHex : getColor(getTextColor(componentColorHex));
  });
  return { textColorComputed };
};

// node_modules/vuestic-ui/dist/es/src/components/va-toast/VaToast.vue_vue_type_script_setup_true_lang.js
import "D:/Github/DONGTIAN/ui/node_modules/vuestic-ui/dist/es/VaToast.css";
var _hoisted_15 = ["role", "aria-live"];
var _hoisted_2 = { class: "va-toast__group" };
var _hoisted_3 = ["textContent"];
var _hoisted_4 = { class: "va-toast__content" };
var _hoisted_5 = ["innerHTML"];
var _hoisted_6 = ["textContent"];
var _hoisted_7 = {
  key: 1,
  class: "va-toast__content"
};
var _sfc_main8 = defineComponent({
  ...{
    name: "VaToast"
  },
  __name: "VaToast",
  props: {
    ...useComponentPresetProp,
    title: { type: String, default: "" },
    offsetY: { type: [Number, String], default: 16 },
    offsetX: { type: [Number, String], default: 16 },
    message: { type: [String, Function], default: "" },
    dangerouslyUseHtmlString: { type: Boolean, default: false },
    icon: { type: String, default: "close" },
    customClass: { type: String, default: "" },
    duration: { type: [Number, String], default: 5e3 },
    color: { type: String, default: "" },
    closeable: { type: Boolean, default: true },
    onClose: { type: Function },
    onClick: { type: Function },
    multiLine: { type: Boolean, default: false },
    position: {
      type: String,
      default: "top-right",
      validator: (value) => ["top-right", "top-left", "bottom-right", "bottom-left"].includes(value)
    },
    render: { type: Function },
    ariaCloseLabel: useTranslationProp("$t:close"),
    role: { type: String, default: void 0 },
    inline: { type: Boolean, default: false }
  },
  emits: ["on-click", "on-close"],
  setup(__props, { emit: __emit }) {
    const VaToastRenderer = defineComponent({
      name: "VaToastRenderer",
      props: {
        render: { type: Function, required: true }
      },
      setup: (props2) => () => props2.render()
    });
    const { tp } = useTranslation();
    const props = __props;
    const emit = __emit;
    const rootElement = shallowRef();
    const { getColor } = useColors();
    const { textColorComputed } = useTextColor(computed(() => getColor(props.color)));
    const offsetYComputed = useNumericProp("offsetY");
    const offsetXComputed = useNumericProp("offsetX");
    const durationComputed = useNumericProp("duration");
    const visible = ref(false);
    const positionX = computed(() => {
      return props.position.includes("right") ? "right" : "left";
    });
    const positionY = computed(() => {
      return props.position.includes("top") ? "top" : "bottom";
    });
    const toastClasses = computed(() => [
      props.customClass,
      props.multiLine ? "va-toast--multiline" : "",
      props.inline ? "va-toast--inline" : ""
    ]);
    const toastStyles = computed(() => ({
      [positionY.value]: `${offsetYComputed.value}px`,
      [positionX.value]: `${offsetXComputed.value}px`,
      backgroundColor: getColor(props.color),
      color: textColorComputed.value
    }));
    const computedAriaLive = computed(() => {
      if (props.role === "status") {
        return "polite";
      } else {
        return "assertive";
      }
    });
    const computedMessage = computed(() => typeof props.message === "function" ? props.message() : props.message);
    const destroyElement = () => {
      var _a2, _b;
      (_a2 = rootElement.value) == null ? void 0 : _a2.removeEventListener("transitionend", destroyElement);
      (_b = rootElement.value) == null ? void 0 : _b.remove();
    };
    const onToastClick = () => {
      if (typeof props.onClick === "function") {
        props.onClick();
      } else {
        emit("on-click");
      }
    };
    const onToastClose = () => {
      var _a2;
      visible.value = false;
      (_a2 = rootElement.value) == null ? void 0 : _a2.addEventListener("transitionend", destroyElement);
      if (typeof props.onClose === "function") {
        props.onClose();
      } else {
        emit("on-close");
      }
    };
    const timer = useTimer();
    const clearTimer = timer.clear;
    const startTimer = () => {
      if (durationComputed.value > 0) {
        timer.start(() => visible.value && onToastClose(), durationComputed.value);
      }
    };
    onMounted(() => {
      visible.value = true;
      startTimer();
    });
    return (_ctx, _cache) => {
      return openBlock(), createBlock(Transition, { name: "va-toast-fade" }, {
        default: withCtx(() => [
          withDirectives(createBaseVNode("div", {
            ref_key: "rootElement",
            ref: rootElement,
            role: _ctx.$props.role ?? _ctx.$props.closeable ? "alertdialog" : "alert",
            "aria-live": computedAriaLive.value,
            "aria-atomic": "true",
            class: normalizeClass(["va-toast", toastClasses.value]),
            style: normalizeStyle(toastStyles.value),
            onMouseenter: _cache[0] || (_cache[0] = //@ts-ignore
            (...args) => unref(clearTimer) && unref(clearTimer)(...args)),
            onMouseleave: startTimer,
            onClick: onToastClick
          }, [
            createBaseVNode("div", _hoisted_2, [
              _ctx.$props.title ? (openBlock(), createElementBlock("h2", {
                key: 0,
                class: "va-toast__title",
                textContent: toDisplayString(_ctx.$props.title)
              }, null, 8, _hoisted_3)) : createCommentVNode("", true),
              withDirectives(createBaseVNode("div", _hoisted_4, [
                _ctx.$props.dangerouslyUseHtmlString ? (openBlock(), createElementBlock("div", {
                  key: 0,
                  innerHTML: computedMessage.value
                }, null, 8, _hoisted_5)) : (openBlock(), createElementBlock("p", {
                  key: 1,
                  textContent: toDisplayString(computedMessage.value)
                }, null, 8, _hoisted_6))
              ], 512), [
                [vShow, _ctx.$props.message]
              ]),
              _ctx.$props.render ? (openBlock(), createElementBlock("div", _hoisted_7, [
                createVNode(unref(VaToastRenderer), {
                  render: _ctx.$props.render
                }, null, 8, ["render"])
              ])) : createCommentVNode("", true),
              _ctx.$props.closeable ? (openBlock(), createBlock(_sfc_main, {
                key: 2,
                class: "va-toast__close-icon",
                role: "button",
                "aria-label": unref(tp)(_ctx.$props.ariaCloseLabel),
                tabindex: "0",
                size: "1rem",
                name: _ctx.$props.icon,
                onClick: withModifiers(onToastClose, ["stop"]),
                onKeydown: withKeys(withModifiers(onToastClose, ["stop"]), ["enter"])
              }, null, 8, ["aria-label", "name", "onKeydown"])) : createCommentVNode("", true)
            ])
          ], 46, _hoisted_15), [
            [vShow, visible.value]
          ])
        ]),
        _: 1
      });
    };
  }
});

// node_modules/vuestic-ui/dist/es/src/components/va-toast/toast.js
var VaToast = withConfigTransport(_sfc_main8);
var GAP = 5;
var seed = 1;
getGlobal().vaToastInstances = [];
var getTranslateValue = (item, position) => {
  if (item.el) {
    const direction = position.includes("bottom") ? -1 : 1;
    return (item.el.offsetHeight + GAP) * direction;
  }
  return 0;
};
var getNewTranslateValue = (transformY, redundantHeight, position) => {
  const direction = position.includes("bottom") ? -1 : 1;
  return parseInt(transformY, 10) - (redundantHeight + GAP) * direction;
};
var getNodeProps = (vNode) => {
  var _a2;
  return ((_a2 = vNode.component) == null ? void 0 : _a2.props) || {};
};
var closeNotification = (targetInstance, destroyElementFn) => {
  var _a2;
  if (!targetInstance) {
    return;
  }
  if (!getGlobal().vaToastInstances.length) {
    seed = 1;
    return;
  }
  const targetInstanceIndex = getGlobal().vaToastInstances.findIndex((instance) => instance === targetInstance);
  if (targetInstanceIndex < 0) {
    return;
  }
  const nodeProps = getNodeProps(targetInstance);
  const {
    offsetX: targetOffsetX,
    offsetY: targetOffsetY,
    position: targetPosition
  } = nodeProps;
  const redundantHeight = (_a2 = targetInstance.el) == null ? void 0 : _a2.offsetHeight;
  destroyElementFn();
  getGlobal().vaToastInstances = getGlobal().vaToastInstances.reduce((acc, instance, index) => {
    if (instance === targetInstance) {
      return acc;
    }
    if (instance.component) {
      const { offsetX, offsetY, position } = getNodeProps(instance);
      const isNextInstance = index > targetInstanceIndex && targetOffsetX === offsetX && targetOffsetY === offsetY && targetPosition === position;
      if (isNextInstance && instance.el && redundantHeight) {
        const [_, transformY] = instance.el.style.transform.match(/[\d-]+(?=px)/g);
        const transformYNew = getNewTranslateValue(transformY, redundantHeight, position);
        instance.el.style.transform = `translate(0, ${transformYNew}px)`;
      }
    }
    return [...acc, instance];
  }, []);
  if (!getGlobal().vaToastInstances.length) {
    seed = 1;
  }
};
var destroy = (el, node) => {
  if (el) {
    render(null, el);
    el.remove();
  }
  el = null;
};
var mount = (component, {
  props,
  children,
  element,
  appContext
} = {}) => {
  let el = element;
  let vNode;
  const onClose = () => {
    closeNotification(vNode, () => destroy(el));
    if (props == null ? void 0 : props.onClose) {
      props.onClose();
    }
  };
  vNode = createVNode(component, { ...props, onClose }, children);
  if (appContext) {
    vNode.appContext = appContext;
  }
  if (el) {
    render(vNode, el);
  } else if (typeof document !== "undefined") {
    render(vNode, el = document.createElement("div"));
  }
  return { vNode, el };
};
var closeAllNotifications = (appContext) => {
  if (!getGlobal().vaToastInstances.length) {
    seed = 1;
    return;
  }
  getGlobal().vaToastInstances.forEach((instance) => {
    if (appContext && instance.appContext !== appContext) {
      return;
    }
    getNodeProps(instance).onClose();
  });
};
var closeById = (id) => {
  const targetInstance = getGlobal().vaToastInstances.find((instance) => {
    var _a2;
    return ((_a2 = instance.el) == null ? void 0 : _a2.id) === id;
  });
  if (targetInstance) {
    const nodeProps = getNodeProps(targetInstance);
    nodeProps.onClose();
  }
};
var getToastOptions = (options) => {
  if (typeof options === "string") {
    return {
      message: options
    };
  }
  return options;
};
var createToastInstance = (customProps, appContext) => {
  const { vNode, el } = mount(VaToast, { appContext, props: getToastOptions(customProps) });
  const nodeProps = getNodeProps(vNode);
  if (el && vNode.el && nodeProps) {
    document.body.appendChild(el.childNodes[0]);
    const { offsetX, offsetY, position } = nodeProps;
    vNode.el.style.display = "flex";
    vNode.el.id = "notification_" + seed;
    let transformY = 0;
    getGlobal().vaToastInstances.filter((item) => {
      const {
        offsetX: itemOffsetX,
        offsetY: itemOffsetY,
        position: itemPosition
      } = getNodeProps(item);
      return itemOffsetX === offsetX && itemOffsetY === offsetY && position === itemPosition;
    }).forEach((item) => {
      transformY += getTranslateValue(item, position);
    });
    vNode.el.style.transform = `translate(0, ${transformY}px)`;
    seed += 1;
    getGlobal().vaToastInstances.push(vNode);
    return vNode.el.id;
  }
  return null;
};

// node_modules/vuestic-ui/dist/es/src/components/va-toast/plugin/index.js
var createVaToastPlugin = (app) => ({
  /** Returns toast instance id */
  init(options) {
    return createToastInstance(options, app == null ? void 0 : app._context);
  },
  close(id) {
    closeById(id);
  },
  closeAll(allApps = false) {
    closeAllNotifications(allApps ? void 0 : app == null ? void 0 : app._context);
  }
});
var VaToastPlugin = defineVuesticPlugin(() => ({
  install(app) {
    defineGlobalProperty(app, "$vaToast", createVaToastPlugin(app));
  }
}));

// node_modules/vuestic-ui/dist/es/src/components/va-dropdown/plugin/index.js
var vaDropdownPlugin = {
  closeDropdown() {
    let vm = this;
    while (vm = vm.$parent) {
      const name = vm.$options.name;
      if (name === "VaDropdown") {
        vm.hide();
        break;
      }
    }
  }
};
var VaDropdownPlugin = defineVuesticPlugin(() => ({
  install(app) {
    defineGlobalProperty(app, "$closeDropdown", vaDropdownPlugin.closeDropdown);
    defineGlobalProperty(app, "$vaDropdown", vaDropdownPlugin);
  }
}));

// node_modules/vuestic-ui/dist/es/src/components/va-button/hooks/useButtonBackground.js
var useButtonBackground = (colorComputed, isPressed, isHovered) => {
  const instance = getCurrentInstance();
  if (!instance) {
    throw new Error("`useButtonBackground` hook must be used only inside of setup function!");
  }
  const props = instance.props;
  const { getColor, getGradientBackground: getGradientBackground2 } = useColors();
  const backgroundColor = computed(() => {
    if (props.plain) {
      return "transparent";
    }
    return props.gradient ? getGradientBackground2(colorComputed.value) : colorComputed.value;
  });
  const hoveredBgState = computed(() => !props.plain && isHovered.value);
  const pressedBgState = computed(() => !props.plain && isPressed.value);
  const backgroundColorOpacity = computed(() => {
    if (pressedBgState.value && props.pressedBehavior === "opacity") {
      return props.pressedOpacity;
    }
    if (hoveredBgState.value && props.hoverBehavior === "opacity") {
      return Number(props.hoverOpacity);
    }
    return Number(props.backgroundOpacity);
  });
  const hoveredMaskState = computed(() => hoveredBgState.value && props.hoverBehavior === "mask");
  const pressedMaskState = computed(() => pressedBgState.value && props.pressedBehavior === "mask");
  const backgroundMaskOpacity = computed(() => {
    if (pressedMaskState.value) {
      return props.pressedOpacity;
    }
    if (hoveredMaskState.value) {
      return Number(props.hoverOpacity);
    }
    return 0;
  });
  const backgroundMaskColor = computed(() => {
    if (pressedMaskState.value) {
      return getColor(props.pressedMaskColor);
    }
    if (hoveredMaskState.value) {
      return getColor(props.hoverMaskColor);
    }
    return "transparent";
  });
  return {
    backgroundColor,
    backgroundColorOpacity,
    backgroundMaskOpacity,
    backgroundMaskColor
  };
};

// node_modules/vuestic-ui/dist/es/src/composables/useRouterLink.js
var useRouterLinkProps = {
  tag: { type: String, default: "span" },
  to: { type: [String, Object], default: void 0 },
  replace: { type: Boolean, default: void 0 },
  append: { type: Boolean, default: void 0 },
  exact: { type: Boolean, default: void 0 },
  activeClass: { type: String, default: void 0 },
  exactActiveClass: { type: String, default: void 0 },
  href: { type: String, default: void 0 },
  target: { type: String, default: void 0 },
  disabled: { type: Boolean, default: false }
};
var useRouterLink = (props) => {
  const currentInstance = getCurrentInstance();
  const globalProperties = computed(() => currentInstance == null ? void 0 : currentInstance.appContext.config.globalProperties);
  const vueRouter = computed(() => {
    var _a2;
    return (_a2 = globalProperties.value) == null ? void 0 : _a2.$router;
  });
  const vueRoute = computed(() => {
    var _a2;
    return (_a2 = globalProperties.value) == null ? void 0 : _a2.$route;
  });
  const { getGlobalConfig } = useGlobalConfig();
  const tagComputed = computed(() => {
    if (props.disabled) {
      return props.tag;
    }
    if (props.href && !props.to) {
      return "a";
    }
    const globalConfig = getGlobalConfig();
    if (globalConfig.routerComponent && props.to) {
      return globalConfig.routerComponent;
    }
    if (props.to && vueRouter.value !== void 0) {
      return "router-link";
    }
    if (props.to && vueRouter.value === void 0) {
      return "a";
    }
    return props.tag || "div";
  });
  const isLinkTag = computed(() => {
    if (props.disabled) {
      return false;
    }
    return Boolean(props.href || props.to);
  });
  const linkAttributesComputed = computed(() => {
    if (!isLinkTag.value) {
      return {};
    }
    return tagComputed.value === "a" ? {
      target: props.target,
      href: hrefComputed.value
    } : {
      target: props.target,
      to: props.to,
      replace: props.replace,
      append: props.append,
      activeClass: props.activeClass,
      exact: props.exact,
      exactActiveClass: props.exactActiveClass
    };
  });
  const isActiveRouterLink = computed(() => {
    if (!vueRouter.value || !props.to) {
      return false;
    }
    const to = vueRouter.value.resolve(props.to).href;
    const currentHref = vueRouter.value.currentRoute.value.path;
    return to.replace("#", "") === currentHref.replace("#", "");
  });
  const hrefComputed = computed(() => {
    var _a2;
    if (props.href) {
      return props.href;
    }
    if (vueRoute.value === void 0 && props.to) {
      return props.to;
    }
    return props.to ? (_a2 = vueRouter.value) == null ? void 0 : _a2.resolve(props.to, vueRoute.value).href : void 0;
  });
  return {
    isLinkTag,
    tagComputed,
    hrefComputed,
    isActiveRouterLink,
    linkAttributesComputed
  };
};

// node_modules/vuestic-ui/dist/es/src/components/va-button/hooks/useButtonAttributes.js
var useButtonAttributes = (props) => {
  const { linkAttributesComputed, isLinkTag } = useRouterLink(props);
  const typeComputed = computed(() => isLinkTag.value ? void 0 : props.type);
  const buttonAttributesComputed = computed(() => {
    const disabledAttributes = {
      "aria-disabled": !!props.disabled,
      disabled: !!props.disabled
    };
    if (isLinkTag.value) {
      return disabledAttributes;
    }
    return {
      type: typeComputed.value,
      tabindex: props.loading || props.disabled ? -1 : 0,
      ...disabledAttributes
    };
  });
  return computed(() => ({ ...linkAttributesComputed.value, ...buttonAttributesComputed.value }));
};

// node_modules/vuestic-ui/dist/es/src/components/va-button/hooks/useButtonTextColor.js
var getOpacity = (opacity) => {
  var _a2, _b, _c;
  if (isServer()) {
    return opacity;
  }
  if (opacity > 0) {
    const userAgent = (_a2 = window == null ? void 0 : window.navigator) == null ? void 0 : _a2.userAgent;
    const isSafari = userAgent && /^((?!chrome|android).)*safari/i.test((_b = window == null ? void 0 : window.navigator) == null ? void 0 : _b.userAgent);
    const isLatestSafari = userAgent && /(version.)15|16/i.test((_c = window == null ? void 0 : window.navigator) == null ? void 0 : _c.userAgent);
    if (isSafari && !isLatestSafari) {
      return opacity < 1 ? 1 - opacity : opacity;
    }
  }
  return opacity;
};
var useButtonTextColor = (textColorComputed, colorComputed, isPressed, isHovered) => {
  const instance = getCurrentInstance();
  if (!instance) {
    throw new Error("`useButtonTextColor` hook must be used only inside of setup function!");
  }
  const props = instance.props;
  const { getColor, colorToRgba: colorToRgba2, getStateMaskGradientBackground: getStateMaskGradientBackground2 } = useColors();
  const plainColorStyles = computed(() => ({
    background: "transparent",
    color: textColorComputed.value,
    "-webkit-background-clip": "text",
    "background-clip": "text",
    opacity: getPlainTextOpacity.value
  }));
  const getStateColor = (maskColor, stateOpacity, stateBehavior) => {
    const maskStateColor = getColor(maskColor);
    let stateStyles;
    if (stateBehavior === "opacity") {
      stateStyles = { color: colorToRgba2(textColorComputed.value, stateOpacity) };
    } else {
      stateStyles = {
        background: getStateMaskGradientBackground2(colorComputed.value, maskStateColor, stateOpacity),
        color: stateOpacity < 1 ? colorToRgba2(textColorComputed.value, getOpacity(stateOpacity)) : maskStateColor
      };
    }
    return { ...plainColorStyles.value, ...stateStyles };
  };
  const hoverTextColorComputed = computed(() => {
    return getStateColor(props.hoverMaskColor, Number(props.hoverOpacity), props.hoverBehavior);
  });
  const pressedTextColorComputed = computed(() => {
    return getStateColor(props.pressedMaskColor, props.pressedOpacity, props.pressedBehavior);
  });
  const getPlainTextOpacity = computed(() => {
    if (props.disabled) {
      return void 0;
    }
    if (props.textOpacity === 1 || isHovered.value && !isPressed.value) {
      return 1;
    }
    return isPressed.value ? 0.9 : props.textOpacity;
  });
  return computed(() => {
    const defaultColorStyles = {
      color: textColorComputed.value,
      background: "transparent"
    };
    props.plain && Object.assign(defaultColorStyles, plainColorStyles.value, { background: textColorComputed.value });
    if (!props.plain) {
      return defaultColorStyles;
    }
    if (isPressed.value) {
      return pressedTextColorComputed.value;
    }
    if (isHovered.value) {
      return hoverTextColorComputed.value;
    }
    return defaultColorStyles;
  });
};

// node_modules/vuestic-ui/dist/es/src/utils/clamp.js
var clamp = (value, min2, max2) => {
  return Math.min(Math.max(value, min2), max2);
};

// node_modules/vuestic-ui/dist/es/src/components/va-progress-circle/VaProgressCircle.vue_vue_type_script_setup_true_lang.js
import "D:/Github/DONGTIAN/ui/node_modules/vuestic-ui/dist/es/VaProgressCircle.css";
var _hoisted_16 = {
  class: "va-progress-circle__wrapper",
  viewBox: "0 0 40 40"
};
var _hoisted_22 = ["r", "stroke", "stroke-width", "stroke-dasharray", "stroke-dashoffset"];
var _sfc_main9 = defineComponent({
  ...{
    name: "VaProgressCircle"
  },
  __name: "VaProgressCircle",
  props: {
    ...useSizeProps,
    ...useComponentPresetProp,
    modelValue: { type: [Number, String], default: 0 },
    indeterminate: { type: Boolean, default: false },
    thickness: { type: [Number, String], default: 0.06 },
    color: { type: String, default: "primary" },
    ariaLabel: useTranslationProp("$t:progressState")
  },
  setup(__props) {
    const props = __props;
    const { getColor } = useColors();
    const { sizeComputed } = useSize(props);
    const cappedThickness = computed(() => clamp(Number(props.thickness), 0, 1) / 2 * 100);
    const radius = computed(() => 20 - 20 * cappedThickness.value / 100);
    const dasharray = computed(() => 2 * Math.PI * radius.value);
    const dashoffset = computed(() => dasharray.value * (1 - clamp(Number(props.modelValue), 0, 100) / 100));
    const colorComputed = computed(() => getColor(props.color, void 0, true));
    const { tp } = useTranslation();
    const infoStyle = computed(() => ({ color: colorComputed.value }));
    const rootStyle = computed(() => ({
      width: sizeComputed.value,
      height: sizeComputed.value
    }));
    const rootClass = computed(() => ({
      "va-progress-circle--indeterminate": props.indeterminate
    }));
    const ariaAttributesComputed = computed(() => ({
      role: "progressbar",
      "aria-label": tp(props.ariaLabel),
      "aria-valuenow": !props.indeterminate ? props.modelValue : void 0
    }));
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", mergeProps({
        class: ["va-progress-circle", rootClass.value],
        style: rootStyle.value
      }, ariaAttributesComputed.value), [
        (openBlock(), createElementBlock("svg", _hoisted_16, [
          createBaseVNode("circle", {
            class: "va-progress-circle__overlay",
            cx: "50%",
            cy: "50%",
            r: radius.value,
            fill: "none",
            stroke: colorComputed.value,
            "stroke-width": cappedThickness.value + "%",
            "stroke-dasharray": dasharray.value,
            "stroke-dashoffset": dashoffset.value
          }, null, 8, _hoisted_22)
        ])),
        _ctx.$slots.default ? (openBlock(), createElementBlock("div", {
          key: 0,
          style: normalizeStyle(infoStyle.value),
          class: "va-progress-circle__info"
        }, [
          renderSlot(_ctx.$slots, "default")
        ], 4)) : createCommentVNode("", true)
      ], 16);
    };
  }
});

// node_modules/vuestic-ui/dist/es/src/components/va-progress-circle/index.js
var VaProgressCircle = withConfigTransport$1(_sfc_main9);

// node_modules/vuestic-ui/dist/es/src/utils/pick.js
var pick = (o, keys) => {
  return Object.keys(o).filter((key) => keys.includes(key)).reduce((acc, key) => {
    acc[key] = o[key];
    return acc;
  }, {});
};

// node_modules/vuestic-ui/dist/es/src/composables/useHoverStyle.js
var useHoverStyleProps = {
  hoverBehavior: {
    type: String,
    default: "mask",
    validator: (value) => ["opacity", "mask"].includes(value)
  },
  hoverOpacity: { type: [Number, String], default: 0.15 },
  hoverMaskColor: { type: String, default: "textInverted" }
};

// node_modules/vuestic-ui/dist/es/src/composables/usePressedStyle.js
var usePressedStyleProps = {
  pressedBehavior: {
    type: String,
    default: "mask",
    validator: (value) => ["opacity", "mask"].includes(value)
  },
  pressedOpacity: { type: Number, default: 0.13 },
  pressedMaskColor: { type: String, default: "textPrimary" }
};

// node_modules/vuestic-ui/dist/es/src/composables/useLoading.js
var useLoadingProps = {
  loading: { type: Boolean, default: false }
};

// node_modules/vuestic-ui/dist/es/src/utils/focus.js
var isHTMLElement = (el) => {
  return el instanceof HTMLElement;
};
var focusElement = (el) => {
  if (!el || !isHTMLElement(el)) {
    return;
  }
  el.focus();
  el.dispatchEvent(new FocusEvent("focus", { bubbles: true }));
};
var blurElement = (el) => {
  if (!el || !isHTMLElement(el)) {
    return;
  }
  el.blur();
  el.dispatchEvent(new Event("blur", { bubbles: true }));
};
var focusFirstFocusableChild = (el) => {
  if (el.tabIndex !== -1) {
    focusElement(el);
    return;
  }
  const focusable = el.querySelector('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
  if (focusable) {
    focusElement(focusable);
  }
};

// node_modules/vuestic-ui/dist/es/src/composables/useCaptureEvent.js
var useCaptureEvent = (event, cb, options = {}) => {
  onMounted(() => window.addEventListener(event, cb, { capture: true, ...options }));
  onBeforeUnmount(() => window.removeEventListener(event, cb, { capture: true, ...options }));
};

// node_modules/vuestic-ui/dist/es/src/composables/useActiveElement.js
var useActiveElement = () => {
  const activeEl = shallowRef();
  const updateActiveElement = () => {
    activeEl.value = document.activeElement;
  };
  onMounted(updateActiveElement);
  useCaptureEvent("focus", updateActiveElement);
  useCaptureEvent("blur", updateActiveElement);
  return activeEl;
};

// node_modules/vuestic-ui/dist/es/src/composables/useFocus.js
var useFocusEmits = ["focus", "blur"];
function useFocus(el, emit) {
  const activeElement = useActiveElement();
  const isFocused = computed({
    get: () => {
      if (isNilValue(activeElement.value)) {
        return false;
      }
      if (isNilValue(el == null ? void 0 : el.value)) {
        return false;
      }
      return activeElement.value === (el == null ? void 0 : el.value);
    },
    set: (value) => {
      if (value) {
        focus();
      } else {
        blur();
      }
    }
  });
  const onFocus = (e) => {
    emit == null ? void 0 : emit("focus", e);
  };
  const onBlur = (e) => {
    emit == null ? void 0 : emit("blur", e);
  };
  const focus = () => {
    if (!(el == null ? void 0 : el.value)) {
      return;
    }
    focusElement(unwrapEl(el == null ? void 0 : el.value));
  };
  const blur = () => {
    if (!(el == null ? void 0 : el.value)) {
      return;
    }
    blurElement(unwrapEl(el == null ? void 0 : el.value));
  };
  useEvent("focus", onFocus, el);
  useEvent("blur", onBlur, el);
  return {
    isFocused,
    onFocus,
    onBlur,
    focus,
    blur
  };
}

// node_modules/vuestic-ui/dist/es/src/composables/useHTMLElement.js
var useHTMLElement = (key) => {
  if (isRef(key)) {
    return computed({
      get() {
        return unwrapEl(key.value);
      },
      set(value) {
        key.value = value;
      }
    });
  }
  if (key) {
    const el2 = useTemplateRef(key);
    return computed({
      get() {
        return unwrapEl(el2.value);
      },
      set(value) {
        el2.value = value;
      }
    });
  }
  const el = shallowRef();
  return computed({
    set(value) {
      el.value = unwrapEl(value);
    },
    get() {
      return el.value;
    }
  });
};

// node_modules/vuestic-ui/dist/es/src/composables/useHover.js
function useHover(el, disabled) {
  const isHovered = ref(false);
  const onMouseEnter = () => {
    if (disabled == null ? void 0 : disabled.value) {
      return;
    }
    isHovered.value = true;
  };
  const onMouseLeave = () => {
    isHovered.value = false;
  };
  disabled && watch(disabled, (v) => {
    if (v) {
      isHovered.value = false;
    }
  });
  const target = useHTMLElement(el);
  useEvent("mouseenter", onMouseEnter, target);
  useEvent("mouseleave", onMouseLeave, target);
  return { isHovered, onMouseEnter, onMouseLeave };
}

// node_modules/vuestic-ui/dist/es/src/composables/usePressed.js
function usePressed(el) {
  const isPressed = ref(false);
  const onMouseDown = () => {
    isPressed.value = true;
  };
  const onMouseUp = () => {
    isPressed.value = false;
  };
  const target = useHTMLElement(el);
  useEvent(["mousedown", "touchstart", "dragstart"], onMouseDown, target);
  useEvent([
    "mouseup",
    "mouseleave",
    "touchend",
    "touchcancel",
    "drop",
    "dragend"
  ], onMouseUp, true);
  return { isPressed, onMouseDown, onMouseUp };
}

// node_modules/vuestic-ui/dist/es/src/composables/useSlotPassed.js
var checkSlotChildrenDeep = (v, initial = true) => {
  var _a2;
  if (isVNode(v)) {
    return true;
  }
  if (!v || initial && (!isFunction(v) || !((_a2 = v()) == null ? void 0 : _a2.length))) {
    return false;
  }
  const slotData = initial ? v() : v;
  if (Array.isArray(slotData)) {
    return slotData.some((el) => {
      return Array.isArray(el.children) ? checkSlotChildrenDeep(el.children, false) : el.children || el.props;
    });
  }
  return !!slotData.children;
};
var useSlotPassed = (name = "default") => {
  const { slots } = getCurrentInstance();
  return computed(() => checkSlotChildrenDeep(slots[name]));
};

// node_modules/vuestic-ui/dist/es/src/composables/useBem.js
var useBem = (prefix2, modifiers) => {
  if (isDev && !prefix2) {
    console.warn('You must pass the @param "prefix" to the useBem hook!');
  }
  const modifiersList = computed(() => typeof modifiers === "function" ? modifiers() : unref(modifiers));
  const computedBemClassesObject = computed(() => {
    return Object.entries(unref(modifiersList)).reduce((classesObj, [modifierName, value]) => {
      if (value) {
        classesObj[`${prefix2}--${camelCaseToKebabCase(modifierName)}`] = true;
      }
      return classesObj;
    }, {});
  });
  const computedBemClassesArray = computed(() => Object.keys(computedBemClassesObject.value));
  const computedBemClassesString = computed(() => computedBemClassesArray.value.join(" "));
  return new Proxy({}, {
    ownKeys() {
      return Reflect.ownKeys(computedBemClassesObject.value);
    },
    getOwnPropertyDescriptor(_, key) {
      return Reflect.getOwnPropertyDescriptor(computedBemClassesObject.value, key);
    },
    get(_, key, receiver) {
      switch (key) {
        case "asArray":
          return computedBemClassesArray;
        case "asString":
          return computedBemClassesString;
        case "asObject":
          return computedBemClassesObject;
        default:
          return Reflect.get(computedBemClassesObject.value, key, receiver);
      }
    }
  });
};

// node_modules/vuestic-ui/dist/es/src/components/va-button/VaButton.vue_vue_type_script_setup_true_lang.js
import "D:/Github/DONGTIAN/ui/node_modules/vuestic-ui/dist/es/VaButton.css";
var _sfc_main10 = defineComponent({
  ...{
    name: "VaButton"
  },
  __name: "VaButton",
  props: {
    ...useComponentPresetProp,
    ...useSizeProps,
    ...useHoverStyleProps,
    ...usePressedStyleProps,
    ...useLoadingProps,
    ...useRouterLinkProps,
    tag: { type: String, default: "button" },
    type: { type: String, default: "button" },
    block: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
    color: { type: String, default: "primary" },
    textColor: { type: String, default: "" },
    textOpacity: { type: [Number, String], default: 1 },
    backgroundOpacity: { type: [Number, String], default: 1 },
    borderColor: { type: String, default: "" },
    // only for filled bg state
    gradient: { type: Boolean, default: false },
    plain: { type: Boolean, default: false },
    round: { type: Boolean, default: false },
    size: {
      type: String,
      default: "medium",
      validator: (v) => ["small", "medium", "large"].includes(v)
    },
    icon: { type: String, default: "" },
    iconRight: { type: String, default: "" },
    iconColor: { type: String, default: "" }
  },
  setup(__props, { expose: __expose }) {
    const props = __props;
    const { getColor } = useColors();
    const colorComputed = computed(() => getColor(props.color));
    const { sizeComputed } = useSize(props);
    const iconSizeComputed = computed(() => {
      const size3 = /([0-9]*)(px)/.exec(sizeComputed.value);
      return size3 ? `${+size3[1] / 2}${size3[2]}` : sizeComputed.value;
    });
    const { tagComputed } = useRouterLink(props);
    const attributesComputed = useButtonAttributes(props);
    const { disabled } = toRefs(props);
    const button = shallowRef();
    const { focus, blur } = useFocus(button);
    const { isHovered } = useHover(button, disabled);
    const { isPressed } = usePressed(button);
    const iconColorComputed = computed(() => props.iconColor ? getColor(props.iconColor) : textColorComputed.value);
    const iconAttributesComputed = computed(() => ({
      color: iconColorComputed.value,
      size: props.size
    }));
    const wrapperClassComputed = computed(() => ({ "va-button__content--loading": props.loading }));
    const isSlotContentPassed = useSlotPassed();
    const isOneIcon = computed(() => !!(props.iconRight && !props.icon || !props.iconRight && props.icon));
    const isOnlyIcon = computed(() => !isSlotContentPassed.value && isOneIcon.value);
    const textOpacityComputed = useNumericProp("textOpacity");
    const backgroundOpacityComputed = useNumericProp("backgroundOpacity");
    const computedClass = useBem("va-button", () => ({
      ...pick(props, ["disabled", "block", "loading", "round", "plain"]),
      small: props.size === "small",
      normal: !props.size || props.size === "medium",
      large: props.size === "large",
      opacity: textOpacityComputed.value < 1,
      bordered: !!props.borderColor,
      iconOnly: isOnlyIcon.value,
      leftIcon: !isOnlyIcon.value && !!props.icon && !props.iconRight,
      rightIcon: !isOnlyIcon.value && !props.icon && !!props.iconRight
    }));
    const isTransparentBg = computed(() => props.plain || backgroundOpacityComputed.value < 0.5);
    const { textColorComputed } = useTextColor(colorComputed, isTransparentBg);
    const {
      backgroundColor,
      backgroundColorOpacity,
      backgroundMaskOpacity,
      backgroundMaskColor
    } = useButtonBackground(colorComputed, isPressed, isHovered);
    const contentColorComputed = useButtonTextColor(textColorComputed, colorComputed, isPressed, isHovered);
    const computedStyle = computed(() => ({
      borderColor: props.borderColor ? getColor(props.borderColor) : "transparent",
      ...contentColorComputed.value
    }));
    __expose({
      focus,
      blur
    });
    return (_ctx, _cache) => {
      return openBlock(), createBlock(resolveDynamicComponent(unref(tagComputed)), mergeProps({
        ref_key: "button",
        ref: button,
        class: ["va-button", unref(computedClass)],
        style: [computedStyle.value, `--va-background-color: ${String(unref(backgroundColor))};--va-background-color-opacity: ${String(unref(backgroundColorOpacity))};--va-background-mask-color: ${String(unref(backgroundMaskColor))};--va-background-mask-opacity: ${String(unref(backgroundMaskOpacity))}`]
      }, unref(attributesComputed)), {
        default: withCtx(() => [
          createBaseVNode("span", {
            class: normalizeClass(["va-button__content", wrapperClassComputed.value])
          }, [
            renderSlot(_ctx.$slots, "prepend", normalizeProps(guardReactiveProps({ icon: __props.icon, iconAttributes: iconAttributesComputed.value })), () => [
              __props.icon ? (openBlock(), createBlock(unref(VaIcon), mergeProps({
                key: 0,
                class: "va-button__left-icon",
                name: __props.icon
              }, iconAttributesComputed.value), null, 16, ["name"])) : createCommentVNode("", true)
            ]),
            renderSlot(_ctx.$slots, "default"),
            renderSlot(_ctx.$slots, "append", normalizeProps(guardReactiveProps({ icon: __props.iconRight, iconAttributes: iconAttributesComputed.value })), () => [
              __props.iconRight ? (openBlock(), createBlock(unref(VaIcon), mergeProps({
                key: 0,
                class: "va-button__right-icon",
                name: __props.iconRight
              }, iconAttributesComputed.value), null, 16, ["name"])) : createCommentVNode("", true)
            ])
          ], 2),
          _ctx.loading ? renderSlot(_ctx.$slots, "loading", normalizeProps(mergeProps({ key: 0 }, {
            size: iconSizeComputed.value,
            color: unref(textColorComputed)
          })), () => [
            createVNode(unref(VaProgressCircle), {
              class: "va-button__loader",
              size: iconSizeComputed.value,
              color: unref(textColorComputed),
              thickness: 0.15,
              indeterminate: ""
            }, null, 8, ["size", "color"])
          ]) : createCommentVNode("", true)
        ]),
        _: 3
      }, 16, ["class", "style"]);
    };
  }
});

// node_modules/vuestic-ui/dist/es/src/components/va-button/index.js
var VaButton = withConfigTransport$1(_sfc_main10);

// node_modules/vuestic-ui/dist/es/src/composables/useCurrentComponentId.js
var useCurrentComponentId = () => {
  const instance = getCurrentInstance();
  if (!instance.appContext.app) {
    return String(instance.uid);
  }
  return `${instance.appContext.app._uid}_${instance.uid}`;
};

// node_modules/vuestic-ui/dist/es/src/components/va-modal/hooks/useBlur.js
var openedModals = [];
var useBlur = (shouldBlur, isModalShown) => {
  const id = useCurrentComponentId();
  const document2 = useDocument();
  const blur = () => {
    var _a2;
    if (openedModals.includes(id)) {
      return;
    }
    openedModals.push(id);
    (_a2 = document2.value) == null ? void 0 : _a2.body.classList.add("va-modal-overlay-background--blurred");
  };
  const removeBlur = () => {
    var _a2;
    const modalIndex = openedModals.indexOf(id);
    if (modalIndex === -1) {
      return;
    }
    openedModals.splice(modalIndex, 1);
    if (openedModals.length === 0) {
      (_a2 = document2.value) == null ? void 0 : _a2.body.classList.remove("va-modal-overlay-background--blurred");
    }
  };
  watchEffect(() => {
    if (!shouldBlur.value) {
      return;
    }
    if (isModalShown.value) {
      blur();
    } else {
      removeBlur();
    }
  });
  onBeforeUnmount(removeBlur);
};

// node_modules/vuestic-ui/dist/es/src/composables/useZIndex.js
var createInstance = () => {
  return generateUniqueId();
};
var zIndexStack = shallowReactive([]);
var useZIndex = (isVisible) => {
  const instance = createInstance();
  const register = () => {
    if (zIndexStack.includes(instance)) {
      return;
    }
    zIndexStack.push(instance);
  };
  const unregister = () => {
    const index = zIndexStack.findIndex((item) => item === instance);
    if (index !== -1) {
      zIndexStack.splice(index, 1);
    }
  };
  const zIndex = computed(() => {
    const index = zIndexStack.findIndex((item) => item === instance);
    if (index === -1) {
      return -1;
    }
    return index + 1;
  });
  const isTop = computed(() => zIndex.value === zIndexStack.length - 1);
  const isLowest = computed(() => zIndex.value === 0);
  onMounted(() => {
    if (isVisible.value) {
      register();
    }
  });
  onBeforeUnmount(() => {
    unregister();
  });
  watch(isVisible, (value) => {
    if (value) {
      register();
    } else {
      unregister();
    }
  });
  return {
    zIndex,
    isTop,
    isLowest,
    register,
    unregister
  };
};

// node_modules/vuestic-ui/dist/es/src/composables/useUserProvidedProp.js
var NOT_PROVIDED = Symbol("NOT_PROVIDED");
var useUserProvidedProp = (propName, props) => {
  const vm = getCurrentInstance();
  return computed(() => {
    if (!(vm == null ? void 0 : vm.vnode.props)) {
      return NOT_PROVIDED;
    }
    const originalProp = props[propName];
    return propName in vm.vnode.props ? originalProp : NOT_PROVIDED;
  });
};

// node_modules/vuestic-ui/dist/es/src/composables/useStateful.js
var useStatefulProps = {
  stateful: { type: Boolean, default: false },
  modelValue: { type: void 0 }
};
var createStatefulProps = (statefulDefault = false) => {
  return {
    stateful: { type: Boolean, default: statefulDefault }
  };
};
var useStatefulEmits = ["update:modelValue"];
var useStateful = (props, emit, key = "modelValue", options = {}) => {
  const { eventName, defaultValue } = options;
  const event = eventName || `update:${key.toString()}`;
  const passedProp = useUserProvidedProp(key, props);
  const defaultValuePassed = "defaultValue" in options;
  const valueState = ref(
    passedProp.value === NOT_PROVIDED ? defaultValuePassed ? defaultValue : props[key] : passedProp.value
  );
  let unwatchModelValue;
  const watchModelValue = () => {
    unwatchModelValue = watch(() => props[key], (modelValue) => {
      valueState.value = modelValue;
    });
  };
  watch(() => props.stateful, (stateful) => {
    stateful ? watchModelValue() : unwatchModelValue == null ? void 0 : unwatchModelValue();
  }, { immediate: true });
  const valueComputed = computed({
    get: () => {
      if (props.stateful) {
        return valueState.value;
      }
      return props[key];
    },
    set: (value) => {
      if (props.stateful) {
        valueState.value = value;
      }
      emit(event, value);
    }
  });
  Object.defineProperty(valueComputed, "stateful", {
    get: () => props.stateful
  });
  Object.defineProperty(valueComputed, "userProvided", {
    get: () => passedProp.value !== NOT_PROVIDED
  });
  return { valueComputed };
};

// node_modules/vuestic-ui/dist/es/src/composables/useTrapFocus.js
var FOCUSABLE_ELEMENTS_SELECTOR = ":where(a, button, input, textarea, select):not([disabled]), *[tabindex]";
var useTrapFocus = () => {
  const document2 = useDocument();
  const window2 = useWindow();
  const trapInEl = useAppGlobal("trapInEl", null);
  let focusableElements = [];
  let firstFocusableElement = null;
  let lastFocusableElement = null;
  const isFocusIn = (evt) => {
    var _a2;
    return ((_a2 = trapInEl.value) == null ? void 0 : _a2.contains(evt.target)) || false;
  };
  const focusFirstElement = () => {
    firstFocusableElement == null ? void 0 : firstFocusableElement.focus();
  };
  const focusLastElement = () => {
    lastFocusableElement == null ? void 0 : lastFocusableElement.focus();
  };
  const onKeydown = (evt) => {
    var _a2, _b;
    const isTabPressed = evt.code === "Tab";
    const isShiftPressed = evt.shiftKey;
    if (!isTabPressed) {
      return;
    }
    if (!isFocusIn(evt)) {
      evt.preventDefault();
      isShiftPressed ? focusLastElement() : focusFirstElement();
      return;
    }
    if (((_a2 = document2.value) == null ? void 0 : _a2.activeElement) === lastFocusableElement && !isShiftPressed) {
      evt.preventDefault();
      focusFirstElement();
      return;
    }
    if (((_b = document2.value) == null ? void 0 : _b.activeElement) === firstFocusableElement && isShiftPressed) {
      evt.preventDefault();
      focusLastElement();
    }
  };
  const trapFocusIn = (el) => {
    trapInEl.value = el;
    freeFocus();
    trapFocus();
  };
  const trapFocus = () => {
    var _a2;
    if (!trapInEl.value) {
      return;
    }
    focusableElements = Array.from(trapInEl.value.querySelectorAll(FOCUSABLE_ELEMENTS_SELECTOR));
    firstFocusableElement = focusableElements[0];
    lastFocusableElement = focusableElements[focusableElements.length - 1];
    (_a2 = window2.value) == null ? void 0 : _a2.addEventListener("keydown", onKeydown);
  };
  const freeFocus = () => {
    var _a2;
    focusableElements = [];
    firstFocusableElement = null;
    lastFocusableElement = null;
    (_a2 = window2.value) == null ? void 0 : _a2.removeEventListener("keydown", onKeydown);
  };
  return {
    trapFocus,
    freeFocus,
    trapFocusIn
  };
};

// node_modules/vuestic-ui/dist/es/src/composables/useModalLevel.js
var modalsStack = shallowReactive([]);
var useModalLevel = () => {
  const modalId = useComponentUuid();
  const modalLevel = computed(
    () => modalsStack.findIndex(({ id }) => id === String(modalId))
  );
  const registerModal = () => {
    if (modalLevel.value !== -1) {
      return;
    }
    modalsStack.push({
      id: String(modalId)
    });
  };
  const unregisterModal = () => {
    if (modalLevel.value === -1) {
      return;
    }
    modalsStack.splice(modalLevel.value, 1);
  };
  const isTopLevelModal = computed(
    () => modalLevel.value !== -1 && modalLevel.value === modalsStack.length - 1
  );
  const isLowestLevelModal = computed(
    () => modalLevel.value === 0
  );
  const isMoreThenOneModalOpen = computed(() => modalsStack.length > 1);
  return {
    modalId,
    modalLevel,
    registerModal,
    unregisterModal,
    isTopLevelModal,
    isLowestLevelModal,
    isMoreThenOneModalOpen
  };
};

// node_modules/vuestic-ui/dist/es/src/composables/useTeleported.js
var TELEPORT_FROM_ATTR = "data-va-teleported-from";
var TELEPORT_ATTR = "data-va-teleported";
var findTeleportedFrom = (el) => {
  if (!el) {
    return null;
  }
  const teleportId = el.getAttribute(TELEPORT_ATTR);
  if (teleportId === null) {
    return findTeleportedFrom(el.parentElement);
  }
  return document.querySelector(`[${TELEPORT_FROM_ATTR}="${teleportId}"]`);
};
var useTeleported = () => {
  var _a2, _b;
  const componentId = useCurrentComponentId();
  const currentInstance = getCurrentInstance();
  const scopedDataV = currentInstance == null ? void 0 : currentInstance.vnode.scopeId;
  return {
    teleportFromAttrs: {
      [TELEPORT_FROM_ATTR]: componentId
    },
    teleportedAttrs: {
      [TELEPORT_ATTR]: componentId,
      ...scopedDataV ? { [scopedDataV]: "" } : void 0,
      ...(_b = (_a2 = currentInstance == null ? void 0 : currentInstance.appContext.config) == null ? void 0 : _a2.globalProperties) == null ? void 0 : _b.$vaColorConfig.getAppStylesRootAttribute()
    },
    findTeleportedFrom
  };
};

// node_modules/vuestic-ui/dist/es/src/composables/useClickOutside.js
var checkIfElementChild = (parent, child) => {
  if (!child) {
    return false;
  }
  if (child.parentElement === parent) {
    return true;
  }
  return parent.contains(child);
};
var safeArray = (a) => Array.isArray(a) ? a : [a];
var useClickOutside = (elements, cb) => {
  useCaptureEvent("mousedown", (event) => {
    const clickTarget = event.target;
    if (event.target.shadowRoot) {
      return;
    }
    const teleportParent = findTeleportedFrom(clickTarget);
    const isClickInside = safeArray(elements).some((element) => {
      const el = unwrapEl(unref(element));
      if (!el) {
        return false;
      }
      if (!teleportParent) {
        return checkIfElementChild(el, clickTarget);
      }
      return checkIfElementChild(el, clickTarget) || checkIfElementChild(el, teleportParent);
    });
    if (!isClickInside) {
      cb(clickTarget);
    }
  });
};

// node_modules/vuestic-ui/dist/es/src/components/va-modal/VaModal.vue_vue_type_script_setup_true_lang.js
import "D:/Github/DONGTIAN/ui/node_modules/vuestic-ui/dist/es/VaModal.css";
var _hoisted_17 = ["aria-labelledby"];
var _hoisted_23 = {
  key: 2,
  class: "va-modal__inner"
};
var _hoisted_32 = { class: "va-modal__header" };
var _hoisted_42 = {
  key: 0,
  class: "va-modal__message"
};
var _hoisted_52 = {
  key: 1,
  class: "va-modal__message"
};
var _hoisted_62 = {
  key: 2,
  class: "va-modal__footer"
};
var _hoisted_72 = {
  key: 3,
  class: "va-modal__footer"
};
var WithTransition = defineComponent({
  name: "ModalElement",
  inheritAttrs: false,
  props: {
    ...useComponentPresetProp,
    isTransition: { type: Boolean, default: true }
  },
  setup: (props, { slots, attrs }) => () => {
    var _a2;
    return props.isTransition ? h(Transition, { ...attrs }, slots) : (_a2 = slots.default) == null ? void 0 : _a2.call(slots, attrs);
  }
});
var _sfc_main11 = defineComponent({
  ...{
    name: "VaModal",
    inheritAttrs: false
  },
  __name: "VaModal",
  props: {
    ...defineChildProps({
      cancelButton: VaButton,
      okButton: VaButton,
      closeButton: VaIcon
    }),
    ...useStatefulProps,
    modelValue: { type: Boolean, default: false },
    attachElement: { type: String, default: "body" },
    allowBodyScroll: { type: Boolean, default: false },
    disableAttachment: { type: Boolean, default: false },
    title: { type: String, default: "" },
    message: { type: String, default: "" },
    okText: useTranslationProp("$t:ok"),
    cancelText: useTranslationProp("$t:cancel"),
    hideDefaultActions: { type: Boolean, default: false },
    fullscreen: { type: Boolean, default: false },
    closeButton: { type: Boolean, default: false },
    mobileFullscreen: { type: Boolean, default: true },
    noDismiss: { type: Boolean, default: false },
    noOutsideDismiss: { type: Boolean, default: false },
    noEscDismiss: { type: Boolean, default: false },
    maxWidth: { type: String, default: "" },
    maxHeight: { type: String, default: "" },
    anchorClass: { type: String },
    size: {
      type: String,
      default: "medium"
    },
    sizesConfig: {
      type: Object,
      default: () => ({
        defaultSize: "medium",
        sizes: {
          small: 576,
          medium: 768,
          large: 992,
          auto: "max-content"
        }
      })
    },
    fixedLayout: { type: Boolean, default: false },
    withoutTransitions: { type: Boolean, default: false },
    overlay: { type: Boolean, default: true },
    overlayOpacity: { type: [Number, String], default: 0.6 },
    showNestedOverlay: { type: Boolean, default: false },
    blur: { type: Boolean, default: false },
    zIndex: { type: [Number, String], default: void 0 },
    backgroundColor: { type: String, default: "background-secondary" },
    noPadding: { type: Boolean, default: false },
    beforeClose: { type: Function },
    beforeOk: { type: Function },
    beforeCancel: { type: Function },
    ariaCloseLabel: useTranslationProp("$t:close")
  },
  emits: [
    ...useStatefulEmits,
    "cancel",
    "ok",
    "before-open",
    "open",
    "before-close",
    "close",
    "click-outside"
  ],
  setup(__props, { expose: __expose, emit: __emit }) {
    const props = __props;
    useChildComponents(props);
    const emit = __emit;
    const rootElement = shallowRef();
    const modalDialog = shallowRef();
    const { trapFocusIn, freeFocus } = useTrapFocus();
    const {
      registerModal,
      unregisterModal,
      isTopLevelModal,
      isLowestLevelModal
    } = useModalLevel();
    const { getColor } = useColors();
    const { textColorComputed } = useTextColor(toRef(props, "backgroundColor"));
    const { valueComputed } = useStateful(props, emit);
    const computedClass = computed(() => ({
      "va-modal--fullscreen": props.fullscreen,
      "va-modal--mobile-fullscreen": props.mobileFullscreen,
      "va-modal--fixed-layout": props.fixedLayout,
      "va-modal--no-padding": props.noPadding
    }));
    const {
      zIndex: zIndexInherited
    } = useZIndex(valueComputed);
    const zIndexComputed = computed(() => {
      if (props.zIndex) {
        return Number(props.zIndex);
      }
      return zIndexInherited.value;
    });
    const sizeComputed = useSizeRef(props);
    const computedDialogStyle = computed(() => ({
      maxWidth: props.maxWidth || sizeComputed.value,
      maxHeight: props.maxHeight,
      color: textColorComputed.value,
      background: getColor(props.backgroundColor)
    }));
    const computedOverlayClass = computed(() => ({
      "va-modal__overlay--lowest": isLowestLevelModal.value,
      "va-modal__overlay--top": isTopLevelModal.value
    }));
    const getOverlayOpacity = () => {
      if (props.showNestedOverlay && !isLowestLevelModal.value) {
        return "var(--va-modal-overlay-nested-opacity)";
      }
      return "var(--va-modal-overlay-opacity)";
    };
    const computedOverlayStyles = computed(() => {
      if (!props.overlay) {
        return;
      }
      if (isTopLevelModal.value || props.showNestedOverlay) {
        return {
          "background-color": "var(--va-modal-overlay-color)",
          opacity: getOverlayOpacity()
        };
      }
      return "";
    });
    const show = () => {
      valueComputed.value = true;
    };
    const hide3 = (cb) => {
      const _hide = () => {
        valueComputed.value = false;
        cb == null ? void 0 : cb();
      };
      props.beforeClose ? props.beforeClose(_hide) : _hide();
    };
    const toggle = () => {
      valueComputed.value = !valueComputed.value;
    };
    const cancel = () => {
      const _hide = () => {
        hide3(() => emit("cancel"));
      };
      props.beforeCancel ? props.beforeCancel(_hide) : _hide();
    };
    const ok = () => {
      const _hide = () => {
        hide3(() => emit("ok"));
      };
      props.beforeOk ? props.beforeOk(_hide) : _hide();
    };
    const trapFocusInModal = () => {
      nextTick(() => {
        if (modalDialog.value) {
          trapFocusIn(modalDialog.value);
        }
      });
    };
    const onBeforeEnterTransition = (el) => emit("before-open", el);
    const onAfterEnterTransition = (el) => emit("open", el);
    const onBeforeLeaveTransition = (el) => emit("before-close", el);
    const onAfterLeaveTransition = (el) => emit("close", el);
    const listenKeyUp = (e) => {
      const hideModal = () => {
        if (e.code === "Escape" && !props.noEscDismiss && !props.noDismiss && isTopLevelModal.value) {
          cancel();
        }
      };
      setTimeout(hideModal);
    };
    useClickOutside([modalDialog], () => {
      if (!valueComputed.value || props.noOutsideDismiss || props.noDismiss || !isTopLevelModal.value) {
        return;
      }
      emit("click-outside");
      cancel();
    });
    const window2 = useWindow();
    watchEffect(() => {
      var _a2, _b;
      if (valueComputed.value) {
        (_a2 = window2.value) == null ? void 0 : _a2.addEventListener("keyup", listenKeyUp);
      } else {
        (_b = window2.value) == null ? void 0 : _b.removeEventListener("keyup", listenKeyUp);
      }
    });
    useBlur(toRef(props, "blur"), valueComputed);
    const documentRef = useDocument();
    const setBodyOverflow = (overflow) => {
      if (!documentRef.value || props.allowBodyScroll) {
        return;
      }
      if (overflow === "hidden") {
        documentRef.value.body.classList.add("va-modal-open");
      } else {
        documentRef.value.body.classList.remove("va-modal-open");
      }
    };
    const onShow = () => {
      registerModal();
      setBodyOverflow("hidden");
    };
    const onHide = () => {
      if (isLowestLevelModal.value) {
        freeFocus();
        setBodyOverflow("");
      }
      unregisterModal();
    };
    watch(valueComputed, (newValue) => {
      if (newValue) {
        onShow();
      } else {
        onHide();
      }
    });
    onMounted(() => {
      if (valueComputed.value) {
        onShow();
      }
      if (isTopLevelModal.value) {
        trapFocusInModal();
      }
    });
    onBeforeUnmount(() => {
      onHide();
    });
    watch(isTopLevelModal, (newIsTopLevelModal) => {
      if (newIsTopLevelModal) {
        trapFocusInModal();
      }
    }, { immediate: true });
    __expose({
      show,
      hide: hide3,
      toggle,
      cancel,
      ok,
      onBeforeEnterTransition,
      onAfterEnterTransition,
      onBeforeLeaveTransition,
      onAfterLeaveTransition,
      listenKeyUp
    });
    const { tp } = useTranslation();
    const {
      teleportFromAttrs,
      teleportedAttrs
    } = useTeleported();
    const slotBind = { show, hide: hide3, toggle, cancel, ok };
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        ref_key: "rootElement",
        ref: rootElement,
        class: normalizeClass(["va-modal-entry", _ctx.$props.anchorClass])
      }, [
        _ctx.$slots.anchor ? (openBlock(), createElementBlock("div", mergeProps({
          key: 0,
          class: "va-modal__anchor"
        }, unref(teleportFromAttrs)), [
          renderSlot(_ctx.$slots, "anchor", normalizeProps(guardReactiveProps(slotBind)))
        ], 16)) : createCommentVNode("", true),
        (openBlock(), createBlock(Teleport, {
          to: __props.attachElement,
          disabled: _ctx.$props.disableAttachment
        }, [
          createVNode(unref(WithTransition), mergeProps({
            name: "va-modal",
            isTransition: !_ctx.$props.withoutTransitions,
            duration: 300,
            style: { zIndex: zIndexComputed.value },
            appear: ""
          }, { ..._ctx.$attrs, ...unref(teleportedAttrs) }, {
            onBeforeEnter: onBeforeEnterTransition,
            onAfterEnter: onAfterEnterTransition,
            onBeforeLeave: onBeforeLeaveTransition,
            onAfterLeave: onAfterLeaveTransition
          }), {
            default: withCtx(() => [
              unref(valueComputed) ? (openBlock(), createElementBlock("div", {
                key: 0,
                "aria-labelledby": __props.title,
                class: normalizeClass([computedClass.value, "va-modal"]),
                role: "dialog",
                "aria-modal": "true"
              }, [
                _ctx.$props.overlay ? (openBlock(), createElementBlock("div", {
                  key: 0,
                  class: normalizeClass(["va-modal__overlay", computedOverlayClass.value]),
                  style: normalizeStyle(computedOverlayStyles.value)
                }, null, 6)) : createCommentVNode("", true),
                createBaseVNode("div", {
                  ref_key: "modalDialog",
                  ref: modalDialog,
                  class: "va-modal__dialog",
                  style: normalizeStyle([computedDialogStyle.value])
                }, [
                  _ctx.$props.fullscreen || _ctx.$props.closeButton ? (openBlock(), createBlock(unref(VaIcon), {
                    key: 0,
                    "va-child": "closeButton",
                    class: normalizeClass([{ "va-modal__close--fullscreen": _ctx.$props.fullscreen }, "va-modal__close"]),
                    "aria-label": unref(tp)(_ctx.$props.ariaCloseLabel),
                    role: "button",
                    tabindex: "0",
                    name: "va-close",
                    onClick: cancel,
                    onKeydown: [
                      withKeys(cancel, ["space"]),
                      withKeys(cancel, ["enter"])
                    ]
                  }, null, 8, ["class", "aria-label"])) : createCommentVNode("", true),
                  _ctx.$slots.content ? renderSlot(_ctx.$slots, "content", normalizeProps(mergeProps({ key: 1 }, slotBind))) : (openBlock(), createElementBlock("div", _hoisted_23, [
                    createBaseVNode("div", _hoisted_32, [
                      renderSlot(_ctx.$slots, "header", normalizeProps(guardReactiveProps(slotBind)), () => [
                        __props.title ? (openBlock(), createElementBlock("div", {
                          key: 0,
                          class: "va-modal__title",
                          style: normalizeStyle({ color: unref(getColor)("primary") })
                        }, toDisplayString(_ctx.$props.title), 5)) : createCommentVNode("", true)
                      ])
                    ]),
                    _ctx.$props.message ? (openBlock(), createElementBlock("div", _hoisted_42, toDisplayString(_ctx.$props.message), 1)) : createCommentVNode("", true),
                    _ctx.$slots.default ? (openBlock(), createElementBlock("div", _hoisted_52, [
                      renderSlot(_ctx.$slots, "default", normalizeProps(guardReactiveProps(slotBind)))
                    ])) : createCommentVNode("", true),
                    (_ctx.$props.cancelText || _ctx.$props.okText) && !_ctx.$props.hideDefaultActions ? (openBlock(), createElementBlock("div", _hoisted_62, [
                      _ctx.$props.cancelText ? (openBlock(), createBlock(unref(VaButton), {
                        key: 0,
                        "va-child": "cancelButton",
                        preset: "secondary",
                        color: "secondary",
                        class: "va-modal__default-cancel-button",
                        onClick: cancel
                      }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(unref(tp)(_ctx.$props.cancelText)), 1)
                        ]),
                        _: 1
                      })) : createCommentVNode("", true),
                      createVNode(unref(VaButton), {
                        "va-child": "okButton",
                        onClick: ok
                      }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(unref(tp)(_ctx.$props.okText)), 1)
                        ]),
                        _: 1
                      })
                    ])) : createCommentVNode("", true),
                    _ctx.$slots.footer ? (openBlock(), createElementBlock("div", _hoisted_72, [
                      renderSlot(_ctx.$slots, "footer", normalizeProps(guardReactiveProps(slotBind)))
                    ])) : createCommentVNode("", true)
                  ]))
                ], 4)
              ], 10, _hoisted_17)) : createCommentVNode("", true)
            ]),
            _: 3
          }, 16, ["isTransition", "style"])
        ], 8, ["to", "disabled"]))
      ], 2);
    };
  }
});

// node_modules/vuestic-ui/dist/es/src/components/va-modal/VaModal.js
import "D:/Github/DONGTIAN/ui/node_modules/vuestic-ui/dist/es/VaModal.css";
var VaModal = withConfigTransport$1(_sfc_main11);

// node_modules/vuestic-ui/dist/es/src/components/va-modal/modal.js
var getNodeProps2 = (vNode) => {
  var _a2;
  return ((_a2 = vNode.component) == null ? void 0 : _a2.props) || {};
};
var destroy2 = (el, vNode) => {
  if (el) {
    render(null, el);
    el.remove();
  }
  el = null;
};
var mount2 = (component, { props, appContext } = {}) => {
  const el = document == null ? void 0 : document.createElement("div");
  let vNode;
  const onClose = (event) => {
    var _a2;
    (_a2 = props == null ? void 0 : props.onClose) == null ? void 0 : _a2.call(props, event);
    destroy2(el);
  };
  const onUpdateModelValue = (value) => {
    var _a2;
    (_a2 = props == null ? void 0 : props["onUpdate:modelValue"]) == null ? void 0 : _a2.call(props, value);
    if ((props == null ? void 0 : props.withoutTransitions) && !value) {
      nextTick(() => {
        destroy2(el);
      });
    }
  };
  vNode = h(component, {
    ...props,
    stateful: (props == null ? void 0 : props.stateful) ?? true,
    modelValue: true,
    onClose,
    "onUpdate:modelValue": onUpdateModelValue
  });
  if (appContext) {
    vNode.appContext = appContext;
  }
  if (el) {
    render(vNode, el);
  }
  return { vNode, el };
};
var getModalOptions = (options) => typeof options === "string" ? { message: options } : options;
var createModalInstance = (customProps, appContext) => {
  const { vNode, el } = mount2(VaModal, { appContext, props: getModalOptions(customProps) });
  if (el && vNode.el && getNodeProps2(vNode)) {
    document.body.appendChild(el.childNodes[0]);
  }
  return vNode;
};

// node_modules/vuestic-ui/dist/es/src/components/va-modal/plugin/index.js
var createVaModalPlugin = (app) => ({
  init(options) {
    return createModalInstance(options, app == null ? void 0 : app._context);
  },
  confirm(options) {
    if (typeof options === "string") {
      return new Promise((resolve) => {
        createModalInstance({
          message: options,
          onOk() {
            resolve(true);
          },
          onCancel() {
            resolve(false);
          }
        }, app == null ? void 0 : app._context);
      });
    }
    return new Promise((resolve) => {
      createModalInstance({
        ...options,
        onOk() {
          var _a2;
          (_a2 = options == null ? void 0 : options.onOk) == null ? void 0 : _a2.call(options);
          resolve(true);
        },
        onCancel() {
          var _a2;
          (_a2 = options == null ? void 0 : options.onCancel) == null ? void 0 : _a2.call(options);
          resolve(false);
        }
      }, app == null ? void 0 : app._context);
    });
  }
});
var VaModalPlugin = defineVuesticPlugin(() => ({
  install(app) {
    defineGlobalProperty(app, "$vaModal", createVaModalPlugin(app));
  }
}));

// node_modules/vuestic-ui/dist/es/src/services/colors-classes/plugin/index.js
var getColorsClassesHelpers = (helpers, colors) => {
  const colorsEntries = Object.entries(colors);
  return helpers.reduce((acc, helper) => acc.concat(
    colorsEntries.map(([colorName, colorValue]) => ({
      ...helper,
      postfix: helper.postfix ?? colorName,
      value: helper.value ?? colorValue
    }))
  ), []);
};
var getColorsClassesStyles = (helpers) => {
  return helpers.reduce((styles, helper) => {
    const style = [helper.property].flat().map((prop) => `${prop}: ${helper.value};`).join("");
    styles += `.va-${helper.prefix}--${helper.postfix} { ${style} }`;
    return styles;
  }, "");
};
var handleConfigUpdate = (helpers, colors) => {
  const coloredHelpers = getColorsClassesHelpers(helpers, colors);
  addOrUpdateStyleElement(
    "va-color-helpers",
    () => getColorsClassesStyles(coloredHelpers)
  );
};
var createColorHelpersPlugin = () => {
  if (isServer()) {
    return;
  }
  const { globalConfig } = useGlobalConfig();
  watch(() => globalConfig.value.colorsClasses, (newHelpers) => {
    if (newHelpers.length) {
      handleConfigUpdate(newHelpers, globalConfig.value.colors.variables);
    }
  }, { immediate: true, deep: true });
  watch(() => globalConfig.value.colors.variables, (newColors) => {
    if (!newColors) {
      return;
    }
    handleConfigUpdate(globalConfig.value.colorsClasses, newColors);
  }, { immediate: true, deep: true });
  return {
    renderColorHelpers: () => {
      const coloredHelpers = getColorsClassesHelpers(globalConfig.value.colorsClasses, globalConfig.value.colors.variables);
      return getColorsClassesStyles(coloredHelpers);
    }
  };
};
var ColorsClassesPlugin = defineVuesticPlugin(() => ({
  install(app) {
    defineGlobalProperty(app, "$vaColorsClasses", createColorHelpersPlugin());
  }
}));

// node_modules/vuestic-ui/dist/es/src/components/va-accordion/hooks/useAccordion.js
var AccordionServiceKey = Symbol("AccordionService");
var useAccordion = (props, state) => {
  const items2 = ref([]);
  const makeState = () => {
    const correctItemsCount = Math.max(items2.value.length, state.value.length);
    return Array.from({ length: correctItemsCount }, (_, index) => {
      return state.value[index] ?? false;
    });
  };
  const getItemValue = (item) => {
    return state.value[items2.value.indexOf(item)] ?? false;
  };
  const onItemsChanged = () => {
    state.value = makeState();
  };
  const registerItem = (item) => {
    items2.value.push(item);
    onItemsChanged();
  };
  const unregisterItem = (item) => {
    items2.value = items2.value.filter((i) => i !== item);
    nextTick(onItemsChanged);
  };
  const setItemValue = (item, value) => {
    const index = items2.value.indexOf(item);
    if (index === -1) {
      warn("Accordion item is not registered yet");
      return;
    }
    if (!props.multiple) {
      state.value = makeState().map((el, i) => {
        if (i === index) {
          return value;
        }
        return false;
      });
    } else {
      state.value[index] = value;
    }
  };
  provide(AccordionServiceKey, {
    registerItem,
    unregisterItem,
    getItemValue,
    setItemValue,
    props: computed(() => props)
  });
  return { items: items2 };
};
var useAccordionItem = () => {
  const accordion = inject(AccordionServiceKey, void 0);
  if (!accordion) {
    return { accordionProps: ref({}) };
  }
  const item = {};
  accordion.registerItem(item);
  onBeforeUnmount(() => accordion.unregisterItem(item));
  const accordionItemValue = computed({
    get: () => accordion.getItemValue(item),
    set: (value) => accordion.setItemValue(item, value)
  });
  return {
    accordionItemValue,
    accordionProps: accordion.props
  };
};

// node_modules/vuestic-ui/dist/es/src/components/va-accordion/VaAccordion.vue_vue_type_script_setup_true_lang.js
import "D:/Github/DONGTIAN/ui/node_modules/vuestic-ui/dist/es/VaAccordion.css";
var _hoisted_18 = { class: "va-accordion" };
var _sfc_main12 = defineComponent({
  ...{
    name: "VaAccordion"
  },
  __name: "VaAccordion",
  props: {
    ...useStatefulProps,
    ...useComponentPresetProp,
    modelValue: { type: Array, default: () => [] },
    multiple: { type: Boolean, default: false },
    inset: { type: Boolean, default: false },
    stateful: { type: Boolean, default: true },
    popout: { type: Boolean, default: false }
  },
  emits: [...useStatefulEmits],
  setup(__props, { expose: __expose, emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const { valueComputed } = useStateful(props, emit, "modelValue");
    const { items: items2 } = useAccordion(props, valueComputed);
    const collapses = items2;
    const value = valueComputed;
    __expose({
      collapses,
      value
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_18, [
        renderSlot(_ctx.$slots, "default")
      ]);
    };
  }
});

// node_modules/vuestic-ui/dist/es/src/components/va-accordion/index.js
var VaAccordion = withConfigTransport$1(_sfc_main12);

// node_modules/vuestic-ui/dist/es/src/utils/noop.js
var noop = () => {
};

// node_modules/vuestic-ui/dist/es/src/utils/throttle.js
var throttle = (func, wait) => {
  let lastTime = 0;
  return function(...args) {
    const now = Date.now();
    if (now - lastTime < wait) {
      return;
    }
    func.apply(this, args);
    lastTime = now;
  };
};

// node_modules/vuestic-ui/dist/es/src/components/va-affix/VaAffix-utils.js
function getWindowHeight() {
  return document.documentElement.clientHeight || window.innerHeight || document.body.clientHeight;
}
function computeAffixedState({
  coordinates,
  offsetTop,
  offsetBottom,
  target
}) {
  let isTopAffixed = false;
  let isBottomAffixed = false;
  const windowHeight = getWindowHeight();
  if (offsetTop != null && windowHeight) {
    if (target === window) {
      isTopAffixed = coordinates.top <= offsetTop;
    } else {
      const { top } = target.getBoundingClientRect();
      isTopAffixed = coordinates.top - top <= offsetTop;
    }
  }
  if (offsetBottom != null && windowHeight) {
    if (target === window) {
      isBottomAffixed = coordinates.bottom >= windowHeight - offsetBottom;
    } else {
      const { bottom } = target.getBoundingClientRect();
      isBottomAffixed = bottom - coordinates.bottom <= offsetBottom;
    }
  }
  return {
    isTopAffixed,
    isBottomAffixed
  };
}
function checkAffixedStateChange(currentState, nextState) {
  return currentState.isTopAffixed !== nextState.isTopAffixed || currentState.isBottomAffixed !== nextState.isBottomAffixed;
}
function handleThrottledEvent(eventName, context) {
  const { target, element, offsetTop, offsetBottom, setState, getState, initialPosition } = context;
  if (!element) {
    return;
  }
  const isInitialCall = !eventName;
  const coordinates = element.getBoundingClientRect();
  const options = {
    offsetBottom,
    offsetTop,
    target
  };
  const nextState = isInitialCall && initialPosition ? computeAffixedState({ coordinates: initialPosition, ...options }) : computeAffixedState({ coordinates, ...options });
  const prevState = getState();
  if (checkAffixedStateChange(prevState, nextState)) {
    setState({ ...nextState, width: coordinates.width });
  } else if (prevState.width !== coordinates.width) {
    setState({ ...prevState, width: coordinates.width });
  }
}
function useCaptureDefault(eventName) {
  return eventName === "scroll";
}
function useEventsHandlerWithThrottle(events, {
  handler,
  useCapture = useCaptureDefault,
  wait = 50
}) {
  const clearHandlersArray = events.map((eventName) => {
    const _handler = throttle((event) => handler(eventName, event), wait);
    window.addEventListener(eventName, _handler, useCapture(eventName));
    return () => window.removeEventListener(eventName, _handler, useCapture(eventName));
  });
  return () => clearHandlersArray.forEach((clear) => clear());
}

// node_modules/vuestic-ui/dist/es/src/components/va-affix/VaAffix.vue_vue_type_script_setup_true_lang.js
import "D:/Github/DONGTIAN/ui/node_modules/vuestic-ui/dist/es/VaAffix.css";
var _sfc_main13 = defineComponent({
  ...{
    name: "VaAffix"
  },
  __name: "VaAffix",
  props: {
    ...useComponentPresetProp,
    offsetTop: { type: [Number, String], default: void 0 },
    offsetBottom: { type: [Number, String], default: void 0 },
    target: { type: [Object, Function], default: getWindow }
  },
  emits: ["change"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const element = shallowRef();
    const getTargetElement2 = () => typeof props.target === "function" ? props.target() : props.target;
    const isAffixed = computed(() => state.value.isTopAffixed || state.value.isBottomAffixed);
    const state = ref({
      isTopAffixed: false,
      isBottomAffixed: false
    });
    const getState = () => state.value;
    const setState = (newState) => {
      state.value = newState;
      emit("change", isAffixed);
    };
    const offsetTopComputed = useNumericProp("offsetTop");
    const offsetBottomComputed = useNumericProp("offsetBottom");
    const calculateTop = () => {
      const target = getTargetElement2();
      if (!target) {
        return 0;
      }
      if (offsetTopComputed.value === void 0) {
        return;
      }
      if (!(target instanceof Window)) {
        const { top } = target.getBoundingClientRect();
        return top + offsetTopComputed.value;
      }
      return offsetTopComputed.value;
    };
    const calculateBottom = () => {
      const target = getTargetElement2();
      if (!target) {
        return 0;
      }
      if (offsetBottomComputed.value === void 0) {
        return;
      }
      if (!(target instanceof Window)) {
        const { bottom } = target.getBoundingClientRect();
        const { borderTopWidth, borderBottomWidth } = getComputedStyle(target);
        const { offsetHeight, clientHeight } = target;
        const scrollBarHeight = offsetHeight - clientHeight - parseInt(borderTopWidth) - parseInt(borderBottomWidth);
        return getWindowHeight() - (bottom - offsetBottomComputed.value) + scrollBarHeight;
      }
      return offsetBottomComputed.value;
    };
    const convertToPixels = (calculate) => {
      const result = calculate();
      return result === void 0 ? void 0 : `${result}px`;
    };
    const computedClass = computed(() => [{ "va-affix--affixed": isAffixed }]);
    const computedStyle = computed(() => ({
      top: state.value.isTopAffixed ? convertToPixels(calculateTop) : void 0,
      bottom: state.value.isBottomAffixed ? convertToPixels(calculateBottom) : void 0,
      width: `${state.value.width}px`
    }));
    const initialPosition = ref();
    const throttledEventHandler = (eventName, event) => {
      const context = {
        ...props,
        offsetTop: offsetTopComputed.value,
        offsetBottom: offsetBottomComputed.value,
        initialPosition: initialPosition.value,
        element: element.value,
        target: getTargetElement2(),
        setState,
        getState
      };
      if (!eventName || eventName === "resize") {
        handleThrottledEvent(eventName, context);
      } else if (event && event.target) {
        const target = getTargetElement2();
        if (target === event.target || target instanceof Window) {
          handleThrottledEvent(eventName, context);
        } else {
          setState({
            isBottomAffixed: false,
            isTopAffixed: false
          });
        }
      }
    };
    let clearEventListeners = noop;
    onMounted(() => {
      var _a2;
      initialPosition.value = (_a2 = element.value) == null ? void 0 : _a2.getBoundingClientRect();
      const events = ["scroll", "resize"];
      clearEventListeners = useEventsHandlerWithThrottle(events, {
        handler: throttledEventHandler
      });
      nextTick(() => {
        throttledEventHandler(null);
      });
    });
    onBeforeUnmount(clearEventListeners);
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        ref_key: "element",
        ref: element,
        class: "va-affix"
      }, [
        createBaseVNode("div", {
          style: normalizeStyle({ visibility: isAffixed.value ? "hidden" : "inherit" })
        }, [
          renderSlot(_ctx.$slots, "default")
        ], 4),
        isAffixed.value ? (openBlock(), createElementBlock("div", {
          key: 0,
          class: normalizeClass(computedClass.value),
          style: normalizeStyle(computedStyle.value)
        }, [
          renderSlot(_ctx.$slots, "default")
        ], 6)) : createCommentVNode("", true)
      ], 512);
    };
  }
});

// node_modules/vuestic-ui/dist/es/src/components/va-affix/index.js
var VaAffix = withConfigTransport$1(_sfc_main13);

// node_modules/vuestic-ui/dist/es/src/composables/useElementTextColor.js
var useElementTextColor = (background) => {
  const { textColorComputed } = useTextColor(background);
  return textColorComputed;
};

// node_modules/vuestic-ui/dist/es/src/composables/useCurrentElement.js
var useCurrentElement = (el) => {
  if (el) {
    return el;
  }
  const vm = getCurrentInstance();
  const currentEl = shallowRef();
  onMounted(() => {
    currentEl.value = vm.proxy.$el ?? void 0;
  });
  onUpdated(() => {
    currentEl.value = vm.proxy.$el ?? void 0;
  });
  onBeforeUnmount(() => {
    currentEl.value = vm.proxy.$el ?? void 0;
  });
  return currentEl;
};

// node_modules/vuestic-ui/dist/es/src/components/va-alert/useAlertStyles.js
var useAlertStyles = (props) => {
  const { getColor } = useColors();
  const isTransparentBackground = computed(() => Boolean(props.outline || props.border));
  const { textColorComputed } = useTextColor(toRef(props, "color"), isTransparentBackground);
  const colorComputed = computed(() => getColor(props.color));
  const alertStyle = computed(() => {
    let background = colorComputed.value;
    let boxShadow = "none";
    if (props.outline) {
      background = "transparent";
    }
    if (props.border) {
      background = "var(--va-background-primary)";
      boxShadow = "var(--va-alert-box-shadow)";
    }
    return {
      border: props.outline ? `1px solid ${colorComputed.value}` : "",
      padding: props.dense ? "var(--va-alert-padding-y-dense) var(--va-alert-padding-x)" : "",
      backgroundColor: background,
      boxShadow
    };
  });
  const currentColor = useElementTextColor(useElementBackground(useCurrentElement()));
  const contentStyle = computed(() => {
    return {
      alignItems: props.center ? "center" : "",
      color: props.border || props.outline ? currentColor.value : textColorComputed.value
    };
  });
  const titleStyle = computed(() => {
    return { color: textColorComputed.value };
  });
  const borderStyle = computed(() => ({
    backgroundColor: props.borderColor ? getColor(props.borderColor) : colorComputed.value
  }));
  return {
    alertStyle,
    contentStyle,
    titleStyle,
    borderStyle
  };
};

// node_modules/vuestic-ui/dist/es/src/components/va-alert/VaAlert.vue_vue_type_script_setup_true_lang.js
import "D:/Github/DONGTIAN/ui/node_modules/vuestic-ui/dist/es/VaAlert.css";
var _hoisted_19 = {
  key: 1,
  class: "va-alert__close"
};
var _hoisted_24 = ["aria-label"];
var _sfc_main14 = defineComponent({
  ...{
    name: "VaAlert"
  },
  __name: "VaAlert",
  props: {
    ...useStatefulProps,
    ...useComponentPresetProp,
    modelValue: { type: Boolean, default: true },
    stateful: { type: Boolean, default: true },
    color: { type: String, default: "primary" },
    textColor: { type: String, default: "" },
    title: { type: String, default: "" },
    description: { type: String, default: "" },
    icon: { type: String, default: "" },
    closeText: { type: String, default: "" },
    closeIcon: { type: String, default: "close" },
    closeable: { type: Boolean, default: false },
    dense: { type: Boolean, default: false },
    outline: { type: Boolean, default: false },
    center: { type: Boolean, default: false },
    borderColor: { type: String, default: "" },
    border: {
      type: String,
      default: "",
      validator: (value) => ["top", "right", "bottom", "left", ""].includes(value)
    }
  },
  emits: [...useStatefulEmits],
  setup(__props, { expose: __expose, emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const {
      contentStyle,
      titleStyle,
      alertStyle,
      borderStyle
    } = useAlertStyles(props);
    const { valueComputed } = useStateful(props, emit);
    const hide3 = () => {
      valueComputed.value = false;
    };
    const show = () => {
      valueComputed.value = true;
    };
    const slots = useSlots();
    const hasIcon = computed(() => props.icon || slots.icon);
    const hasTitle = computed(() => props.title || slots.title);
    const borderClass = computed(() => `va-alert__border--${props.border}`);
    const { tp, t } = useTranslation();
    __expose({
      hide: hide3,
      show
    });
    return (_ctx, _cache) => {
      return openBlock(), createBlock(Transition, { name: "fade" }, {
        default: withCtx(() => [
          unref(valueComputed) ? (openBlock(), createElementBlock("div", {
            key: 0,
            class: "va-alert",
            style: normalizeStyle(unref(alertStyle)),
            role: "alert"
          }, [
            createBaseVNode("div", {
              style: normalizeStyle(unref(borderStyle)),
              class: normalizeClass([borderClass.value, "va-alert__border"])
            }, null, 6),
            hasIcon.value ? (openBlock(), createElementBlock("div", {
              key: 0,
              style: normalizeStyle(unref(contentStyle)),
              class: "va-alert__icon",
              "aria-hidden": "true"
            }, [
              renderSlot(_ctx.$slots, "icon", {}, () => [
                createVNode(unref(VaIcon), { name: __props.icon }, null, 8, ["name"])
              ])
            ], 4)) : createCommentVNode("", true),
            createBaseVNode("div", {
              style: normalizeStyle(unref(contentStyle)),
              class: "va-alert__content"
            }, [
              hasTitle.value ? (openBlock(), createElementBlock("div", {
                key: 0,
                style: normalizeStyle(unref(titleStyle)),
                class: "va-alert__title"
              }, [
                renderSlot(_ctx.$slots, "title", {}, () => [
                  createTextVNode(toDisplayString(__props.title), 1)
                ])
              ], 4)) : createCommentVNode("", true),
              createBaseVNode("span", null, [
                renderSlot(_ctx.$slots, "default", {}, () => [
                  createTextVNode(toDisplayString(_ctx.$props.description), 1)
                ])
              ])
            ], 4),
            __props.closeable ? (openBlock(), createElementBlock("div", _hoisted_19, [
              createBaseVNode("div", {
                role: "button",
                class: "va-alert__close--closeable",
                tabindex: "0",
                "aria-label": __props.closeText || unref(t)("closeAlert"),
                style: normalizeStyle(unref(contentStyle)),
                onClick: hide3,
                onKeydown: [
                  withKeys(hide3, ["space"]),
                  withKeys(hide3, ["enter"])
                ]
              }, [
                renderSlot(_ctx.$slots, "close", {}, () => [
                  !__props.closeText ? (openBlock(), createBlock(unref(VaIcon), {
                    key: 0,
                    name: __props.closeIcon
                  }, null, 8, ["name"])) : createCommentVNode("", true),
                  createTextVNode(" " + toDisplayString(__props.closeText), 1)
                ])
              ], 44, _hoisted_24)
            ])) : createCommentVNode("", true)
          ], 4)) : createCommentVNode("", true)
        ]),
        _: 3
      });
    };
  }
});

// node_modules/vuestic-ui/dist/es/src/components/va-alert/index.js
var VaAlert = withConfigTransport$1(_sfc_main14);

// node_modules/vuestic-ui/dist/es/src/composables/useFixedBar.js
var useFixedBarProps = {
  hideOnScroll: { type: Boolean, default: false },
  fixed: { type: Boolean, default: false },
  bottom: { type: Boolean, default: false }
};
function useFixedBar(props, isScrolledDown) {
  const isHiddenComputed = computed(() => isScrolledDown.value ? !!props.hideOnScroll : false);
  const transformComputed = computed(() => {
    if (!props.bottom && !isHiddenComputed.value) {
      return;
    }
    if (props.bottom && isHiddenComputed.value) {
      return "translateY(100%)";
    }
    if (props.bottom) {
      return props.fixed ? "translateY(-100%)" : "translateY(0)";
    }
    return "translateY(-100%)";
  });
  const positionComputed = computed(() => {
    if (props.fixed) {
      return "fixed";
    }
    return isHiddenComputed.value ? "absolute" : void 0;
  });
  const fixedBarStyleComputed = computed(() => {
    const result = {
      top: props.bottom && (isHiddenComputed.value || props.fixed) ? "100%" : void 0,
      transform: props.hideOnScroll || props.fixed ? transformComputed.value : void 0
    };
    positionComputed.value && Object.assign(result, { position: positionComputed.value });
    return result;
  });
  return { fixedBarStyleComputed };
}

// node_modules/vuestic-ui/dist/es/src/composables/useScroll.js
function getTargetElement(target) {
  if (!target) {
    throw new Error("No target was provided for `useScroll` hook!");
  }
  return typeof target === "string" ? document.querySelector(target) : target;
}
function setupScroll(fixed, target) {
  const scrollRoot = shallowRef();
  let targetElement;
  const isScrolledDown = ref(false);
  const prevScrollPosition = ref(0);
  const onScroll = (e) => {
    const target2 = e.target;
    const scrollValue = e.target instanceof Window ? target2.scrollY : target2.scrollTop;
    isScrolledDown.value = prevScrollPosition.value < scrollValue;
    prevScrollPosition.value = scrollValue;
  };
  onMounted(() => {
    targetElement = fixed ? window : getTargetElement(target || scrollRoot.value);
    targetElement == null ? void 0 : targetElement.addEventListener("scroll", onScroll, fixed);
  });
  onBeforeUnmount(() => {
    targetElement == null ? void 0 : targetElement.removeEventListener("scroll", onScroll);
  });
  return { scrollRoot, isScrolledDown };
}

// node_modules/vuestic-ui/dist/es/src/components/va-app-bar/VaAppBar.vue_vue_type_script_setup_true_lang.js
import "D:/Github/DONGTIAN/ui/node_modules/vuestic-ui/dist/es/VaAppBar.css";
var _sfc_main15 = defineComponent({
  ...{
    name: "VaAppBar"
  },
  __name: "VaAppBar",
  props: {
    ...useFixedBarProps,
    ...useComponentPresetProp,
    gradient: { type: Boolean, default: false },
    target: { type: [Object, String], default: "" },
    shadowOnScroll: { type: Boolean, default: false },
    shadowColor: { type: String, default: "" },
    color: { type: String, default: "primary" }
  },
  setup(__props) {
    const props = __props;
    const { scrollRoot, isScrolledDown } = setupScroll(props.fixed, props.target);
    const { fixedBarStyleComputed } = useFixedBar(props, isScrolledDown);
    const { getColor, getGradientBackground: getGradientBackground2, getBoxShadowColor: getBoxShadowColor2 } = useColors();
    const colorComputed = computed(() => getColor(props.color));
    const { textColorComputed } = useTextColor(toRef(props, "color"));
    const showShadowComputed = computed(() => isScrolledDown.value ? !!props.shadowOnScroll : false);
    const shadowColorComputed = computed(() => getColor(props.shadowColor, colorComputed.value));
    const computedShadow = computed(() => {
      const shadow = getBoxShadowColor2(props.shadowColor ? shadowColorComputed.value : colorComputed.value);
      return showShadowComputed.value ? `var(--va-app-bar-shadow) ${shadow}` : "";
    });
    const computedStyle = computed(() => ({
      ...fixedBarStyleComputed.value,
      background: props.gradient ? getGradientBackground2(colorComputed.value) : colorComputed.value,
      boxShadow: computedShadow.value,
      color: textColorComputed.value
    }));
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("header", {
        ref_key: "scrollRoot",
        ref: scrollRoot,
        role: "toolbar",
        class: "va-app-bar",
        style: normalizeStyle(computedStyle.value)
      }, [
        renderSlot(_ctx.$slots, "default")
      ], 4);
    };
  }
});

// node_modules/vuestic-ui/dist/es/src/components/va-app-bar/index.js
var VaAppBar = withConfigTransport$1(_sfc_main15);

// node_modules/vuestic-ui/dist/es/src/components/va-aspect-ratio/VaAspectRatio.vue_vue_type_script_setup_true_lang.js
import "D:/Github/DONGTIAN/ui/node_modules/vuestic-ui/dist/es/VaAspectRatio.css";
var _sfc_main16 = defineComponent({
  ...{
    name: "VaAspectRatio"
  },
  __name: "VaAspectRatio",
  props: {
    ...useComponentPresetProp,
    ratio: {
      type: [Number, String],
      default: "auto"
    },
    contentHeight: { type: [Number, String], default: 1 },
    contentWidth: { type: [Number, String], default: 1 },
    maxWidth: {
      type: [Number, String],
      default: 0,
      validator: (v) => Number(v) >= 0
    }
  },
  setup(__props) {
    const props = __props;
    const contentHeightComputed = useNumericProp("contentHeight");
    const contentWidthComputed = useNumericProp("contentWidth");
    const aspectRatio = computed(() => {
      if (props.ratio === "auto" && props.contentHeight === 1 && props.contentWidth === 1) {
        return 0;
      }
      if (!isNaN(+props.ratio)) {
        return props.ratio;
      }
      return contentWidthComputed.value / contentHeightComputed.value;
    });
    const stylesComputed = computed(() => {
      if (!aspectRatio.value) {
        return;
      }
      return { paddingBottom: `${1 / aspectRatio.value * 100}%` };
    });
    const maxWidthComputed = computed(() => props.maxWidth ? `${props.maxWidth}px` : void 0);
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: "va-aspect-ratio",
        style: normalizeStyle(`--va-max-width-computed: ${String(maxWidthComputed.value)}`)
      }, [
        stylesComputed.value ? (openBlock(), createElementBlock("div", {
          key: 0,
          style: normalizeStyle(stylesComputed.value)
        }, null, 4)) : createCommentVNode("", true),
        renderSlot(_ctx.$slots, "default")
      ], 4);
    };
  }
});

// node_modules/vuestic-ui/dist/es/src/components/va-aspect-ratio/index.js
var VaAspectRatio = withConfigTransport$1(_sfc_main16);

// node_modules/vuestic-ui/dist/es/src/components/va-fallback/VaFallback.vue_vue_type_script_lang.js
var _sfc_main17 = defineComponent({
  name: "VaFallback",
  props: {
    fallbackSrc: {
      type: String
    },
    fallbackText: {
      type: String
    },
    fallbackIcon: {
      type: String
    },
    fallbackRender: {
      type: Function
    }
  },
  components: { VaIcon },
  emits: ["fallback"],
  setup(props, { emit }) {
    onMounted(() => {
      emit("fallback");
    });
    if (props.fallbackIcon) {
      return () => h(VaIcon, {
        name: props.fallbackIcon
      });
    }
    if (props.fallbackSrc) {
      return () => h("img", {
        src: props.fallbackSrc
      });
    }
    if (props.fallbackRender) {
      return () => {
        var _a2;
        return h((_a2 = props.fallbackRender) == null ? void 0 : _a2.call(props));
      };
    }
    return () => h("span", props.fallbackText);
  }
});

// node_modules/vuestic-ui/dist/es/src/components/va-fallback/index.js
var VaFallback = withConfigTransport$1(_sfc_main17);

// node_modules/vuestic-ui/dist/es/src/utils/component-options/resolve-component-props.js
function normalizeProps2(props) {
  switch (true) {
    case Array.isArray(props):
      return props.reduce((acc, prop) => ({ ...acc, [prop]: null }), {});
    case (typeof props === "object" && props !== null):
      return props;
    default:
      return {};
  }
}
function mergeProps2(to, from, optionsType = "props") {
  const { mixins, extends: extendsOptions } = from;
  extendsOptions && mergeProps2(to, extendsOptions, optionsType);
  mixins && mixins.forEach((m) => mergeProps2(to, m, optionsType));
  const props = normalizeProps2(from[optionsType]);
  for (const key in props) {
    to[key] = props[key];
  }
}
function getComponentOptions(component) {
  if (component.options) {
    return component.options;
  }
  if (component.__vccOpts || component.__b) {
    return { ...component.__vccOpts, ...component.__b };
  }
  return component;
}
function resolveProps(options, optionsType = "props") {
  const mixins = options.mixins ?? [];
  const extendsOptions = options.extends ?? [];
  const result = {};
  mergeProps2(result, extendsOptions, optionsType);
  for (let i = 0; i < mixins.length; i++) {
    mergeProps2(result, mixins[i], optionsType);
  }
  Object.assign(result, normalizeProps2(options[optionsType]));
  return result;
}
var getComponentProps = (component) => {
  return resolveProps(getComponentOptions(component));
};

// node_modules/vuestic-ui/dist/es/src/utils/component-options/extract-component-options.js
function extractComponentProps(component, ignoreProps) {
  const props = getComponentProps(component);
  if (ignoreProps) {
    return Object.keys(props).reduce((acc, propName) => {
      if (ignoreProps.includes(propName)) {
        return acc;
      }
      if (props[propName] === void 0) {
        return acc;
      }
      acc[propName] = typeof props[propName] === "string" ? {} : props[propName];
      return acc;
    }, {});
  }
  return props;
}
function extractComponentEmits(component) {
  return [...new Set(component.emits)];
}

// node_modules/vuestic-ui/dist/es/src/utils/component-options/filter-props.js
var filterComponentProps = (childProps) => {
  const { props } = getCurrentInstance();
  return computed(() => {
    return Object.keys(childProps).reduce((acc, propName) => {
      acc[propName] = props[propName];
      return acc;
    }, {});
  });
};

// node_modules/vuestic-ui/dist/es/src/components/va-avatar/VaAvatar.vue_vue_type_script_setup_true_lang.js
import "D:/Github/DONGTIAN/ui/node_modules/vuestic-ui/dist/es/VaAvatar.css";
var _hoisted_110 = ["src", "alt"];
var VaFallbackPropsDeclaration = extractComponentProps(VaFallback);
var _sfc_main18 = defineComponent({
  ...{
    name: "VaAvatar"
  },
  __name: "VaAvatar",
  props: {
    ...useLoadingProps,
    ...useSizeProps,
    ...useComponentPresetProp,
    ...VaFallbackPropsDeclaration,
    color: { type: String, default: "primary" },
    textColor: { type: String },
    square: { type: Boolean, default: false },
    fontSize: { type: String, default: "" },
    src: { type: String, default: null },
    icon: { type: String, default: "" },
    alt: { type: String, default: "" }
  },
  emits: ["error", "fallback"],
  setup(__props, { expose: __expose, emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const { getColor } = useColors();
    const colorComputed = computed(() => getColor(props.color));
    const backgroundColorComputed = computed(() => {
      if (props.loading || props.src && !hasLoadError.value) {
        return void 0;
      }
      return colorComputed.value;
    });
    const { sizeComputed, fontSizeComputed } = useSize(props, "VaAvatar");
    const { textColorComputed } = useTextColor(backgroundColorComputed);
    const computedStyle = computed(() => ({
      fontSize: props.fontSize || fontSizeComputed.value
    }));
    const classesComputed = useBem("va-avatar", () => ({
      ...pick(props, ["square"])
    }));
    const hasLoadError = ref(false);
    const onLoadError = (event) => {
      hasLoadError.value = true;
      emit("error", event);
    };
    watch(() => props.src, () => {
      hasLoadError.value = false;
    });
    const avatarOptions = computed(() => ({
      hasError: hasLoadError.value,
      onError: onLoadError
    }));
    const VaFallbackProps2 = filterComponentProps(VaFallbackPropsDeclaration);
    __expose({
      hasLoadError
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: normalizeClass(["va-avatar", unref(classesComputed)]),
        style: normalizeStyle([computedStyle.value, `--va-background-color-computed: ${String(backgroundColorComputed.value)};--va-text-color-computed: ${String(unref(textColorComputed))};--va-size-computed: ${String(unref(sizeComputed))}`])
      }, [
        _ctx.$props.loading ? (openBlock(), createBlock(unref(VaProgressCircle), {
          key: 0,
          size: unref(sizeComputed),
          color: colorComputed.value,
          indeterminate: ""
        }, null, 8, ["size", "color"])) : renderSlot(_ctx.$slots, "default", normalizeProps(mergeProps({ key: 1 }, avatarOptions.value)), () => [
          _ctx.$props.src && !hasLoadError.value ? (openBlock(), createElementBlock("img", {
            key: 0,
            src: _ctx.$props.src,
            alt: _ctx.$props.alt,
            onError: onLoadError
          }, null, 40, _hoisted_110)) : hasLoadError.value && _ctx.$props.src ? renderSlot(_ctx.$slots, "fallback", { key: 1 }, () => [
            createVNode(unref(VaFallback), mergeProps(unref(VaFallbackProps2), {
              onFallback: _cache[0] || (_cache[0] = ($event) => _ctx.$emit("fallback"))
            }), null, 16)
          ]) : _ctx.$props.icon ? (openBlock(), createBlock(unref(VaIcon), {
            key: 2,
            name: _ctx.$props.icon
          }, null, 8, ["name"])) : renderSlot(_ctx.$slots, "fallback", { key: 3 }, () => [
            createVNode(unref(VaFallback), mergeProps(unref(VaFallbackProps2), {
              onFallback: _cache[1] || (_cache[1] = ($event) => _ctx.$emit("fallback"))
            }), null, 16)
          ])
        ])
      ], 6);
    };
  }
});

// node_modules/vuestic-ui/dist/es/src/components/va-avatar/index.js
var VaAvatar = withConfigTransport$1(_sfc_main18);

// node_modules/vuestic-ui/dist/es/src/components/va-avatar-group/VaAvatarGroup.vue_vue_type_script_setup_true_lang.js
import "D:/Github/DONGTIAN/ui/node_modules/vuestic-ui/dist/es/VaAvatarGroup.css";
var VaAvatarProps = extractComponentProps(VaAvatar);
var _sfc_main19 = defineComponent({
  ...{
    name: "VaAvatarGroup"
  },
  __name: "VaAvatarGroup",
  props: {
    ...useSizeProps,
    ...useComponentPresetProp,
    ...VaAvatarProps,
    max: {
      type: [Number, String],
      default: 0
    },
    vertical: {
      type: Boolean,
      default: false
    },
    options: {
      type: Array,
      default: () => []
    },
    /** If there are more avatars that can be displayed we show rest number. This prop changes color of rest indicator. */
    restColor: {
      type: String,
      default: "secondary"
    }
  },
  setup(__props) {
    const props = __props;
    const maxComputed = useNumericProp("max");
    const classComputed = useBem("va-avatar-group", () => ({
      ...pick(props, ["vertical"])
    }));
    const maxOptions = computed(() => maxComputed.value && maxComputed.value <= props.options.length ? props.options.slice(0, maxComputed.value) : props.options);
    const restOptionsCount = computed(() => {
      const hasOptions = props.options.length > 0;
      const canAddMoreOptions = maxOptions.value.length < props.options.length;
      const remainingOptions = props.options.length - (maxComputed.value || 0);
      return hasOptions && canAddMoreOptions ? remainingOptions : 0;
    });
    const { sizeComputed, fontSizeComputed } = useSize(props, "VaAvatarGroup");
    const filteredAvatarProps = filterComponentProps(VaAvatarProps);
    const avatarProps = computed(() => ({
      ...filteredAvatarProps.value,
      fontSize: fontSizeComputed.value,
      size: sizeComputed.value
    }));
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: normalizeClass(["va-avatar-group", unref(classComputed)]),
        role: "list"
      }, [
        (openBlock(true), createElementBlock(Fragment, null, renderList(maxOptions.value, (option, idx) => {
          return openBlock(), createBlock(unref(VaAvatar), mergeProps({ key: idx }, { ...avatarProps.value, ...option }, { role: "listitem" }), null, 16);
        }), 128)),
        restOptionsCount.value > 0 ? renderSlot(_ctx.$slots, "rest", normalizeProps(mergeProps({ key: 0 }, avatarProps.value)), () => [
          createVNode(unref(VaAvatar), mergeProps(avatarProps.value, {
            color: __props.restColor,
            class: "va-avatar-group__rest",
            role: "listitem"
          }), {
            default: withCtx(() => [
              createTextVNode(" +" + toDisplayString(restOptionsCount.value), 1)
            ]),
            _: 1
          }, 16, ["color"])
        ]) : createCommentVNode("", true)
      ], 2);
    };
  }
});

// node_modules/vuestic-ui/dist/es/src/components/va-avatar-group/index.js
var VaAvatarGroup = withConfigTransport$1(_sfc_main19);

// node_modules/vuestic-ui/dist/es/src/components/va-backtop/VaBacktop.vue_vue_type_script_setup_true_lang.js
import "D:/Github/DONGTIAN/ui/node_modules/vuestic-ui/dist/es/VaBacktop.css";
var _hoisted_111 = ["aria-label", "onKeydown"];
var _sfc_main20 = defineComponent({
  ...{
    name: "VaBacktop"
  },
  __name: "VaBacktop",
  props: {
    ...useComponentPresetProp,
    target: {
      type: [Object, String],
      default: void 0
    },
    visibilityHeight: { type: [Number, String], default: 300 },
    speed: { type: [Number, String], default: 50 },
    verticalOffset: { type: String, default: "1rem" },
    horizontalOffset: { type: String, default: "1rem" },
    color: { type: String, default: "" },
    horizontalPosition: {
      type: String,
      default: "right",
      validator: (value) => ["right", "left"].includes(value)
    },
    verticalPosition: {
      type: String,
      default: "bottom",
      validator: (value) => ["bottom", "top"].includes(value)
    },
    ariaLabel: useTranslationProp("$t:backToTop")
  },
  setup(__props) {
    const props = __props;
    const targetScrollValue = ref(0);
    const computedStyle = computed(() => ({
      [props.verticalPosition]: props.verticalOffset,
      [props.horizontalPosition]: props.horizontalOffset
    }));
    let targetElement;
    const visibilityHeightComputed = useNumericProp("visibilityHeight");
    const speedComputed = useNumericProp("speed");
    const getTargetElement2 = () => {
      if (!props.target) {
        return window;
      }
      if (typeof props.target === "string") {
        const target = document.querySelector(props.target);
        if (!target) {
          warn(`Target element [${props.target}] is not found, falling back to window.`);
          return window;
        }
        return target;
      }
      return props.target;
    };
    const scrolled = ref(false);
    const interval = ref(0);
    const scrollToTop = () => {
      if (scrolled.value) {
        return;
      }
      scrolled.value = true;
      if (targetElement instanceof Window) {
        window.scrollTo({
          top: 0,
          behavior: "smooth"
        });
        return;
      }
      interval.value = window.setInterval(() => {
        if (targetElement instanceof Element) {
          if (targetElement.scrollTop === 0) {
            clearInterval(interval.value);
            scrolled.value = false;
          } else {
            const next = Math.floor(targetElement.scrollTop - speedComputed.value);
            targetElement.scrollTo(0, next);
          }
        }
      }, 15);
    };
    const handleScroll = () => {
      targetScrollValue.value = targetElement instanceof Window ? targetElement.scrollY : targetElement.scrollTop;
    };
    const server = isServer();
    const visible = computed(() => {
      if (server) {
        return false;
      }
      return targetScrollValue.value > visibilityHeightComputed.value;
    });
    if (!server) {
      onMounted(() => {
        targetElement = getTargetElement2();
        targetElement.addEventListener("scroll", handleScroll, true);
      });
      onBeforeUnmount(() => targetElement == null ? void 0 : targetElement.removeEventListener("scroll", handleScroll));
    }
    const { tp } = useTranslation();
    return (_ctx, _cache) => {
      return visible.value ? (openBlock(), createElementBlock("div", {
        key: 0,
        class: "va-backtop",
        role: "button",
        "aria-label": unref(tp)(_ctx.$props.ariaLabel),
        tabindex: "1",
        style: normalizeStyle(computedStyle.value),
        onClick: scrollToTop,
        onKeydown: withKeys(withModifiers(scrollToTop, ["stop"]), ["enter"])
      }, [
        renderSlot(_ctx.$slots, "default", {}, () => [
          createVNode(unref(VaButton), {
            "aria-hidden": "true",
            icon: "va-arrow-up",
            color: __props.color
          }, null, 8, ["color"])
        ])
      ], 44, _hoisted_111)) : createCommentVNode("", true);
    };
  }
});

// node_modules/vuestic-ui/dist/es/src/components/va-backtop/index.js
var VaBacktop = withConfigTransport$1(_sfc_main20);

// node_modules/vuestic-ui/dist/es/src/composables/usePlacementAliases.js
var verticalPlacement = ["top", "bottom"];
var horizontalPlacement = ["left", "right"];
var placementPosition = [...verticalPlacement, ...horizontalPlacement];
var placementAlignment = ["start", "end", "center"];
var placementsPositions = placementPosition.reduce((acc, position) => {
  acc.push(position);
  placementAlignment.forEach((alignment) => acc.push(`${position}-${alignment}`));
  return acc;
}, ["auto"]);
var placementAliasesPositions = verticalPlacement.reduce((acc, yPosition) => {
  horizontalPlacement.forEach((xPosition) => {
    acc.push(`${yPosition}-${xPosition}`);
    acc.push(`${xPosition}-${yPosition}`);
  });
  return acc;
}, []);
var placementsPositionsWithAliases = [...placementsPositions, ...placementAliasesPositions];
var aliasToPlacement = {
  "top-left": "top-start",
  "left-top": "top-start",
  "top-right": "top-end",
  "right-top": "top-end",
  "bottom-left": "bottom-start",
  "left-bottom": "bottom-start",
  "bottom-right": "bottom-end",
  "right-bottom": "bottom-end"
};
var usePlacementAliasesProps = {
  placement: {
    type: String,
    default: "auto",
    validator: (position) => placementsPositionsWithAliases.includes(position)
  }
};
var usePlacementAliases = (props) => {
  const placementArray = computed(() => {
    const placement = aliasToPlacement[props.placement] || props.placement;
    return placement.split("-");
  });
  const position = computed(() => {
    const position2 = placementArray.value[0];
    return position2 === "auto" ? "bottom" : position2;
  });
  const align = computed(() => {
    return placementArray.value[1] || "center";
  });
  return { position, align };
};

// node_modules/vuestic-ui/dist/es/src/composables/useParsableMeasure.js
var useParsableMeasure = () => {
  const isParsableMeasure2 = (value) => {
    if (typeof value === "string") {
      return !isNaN(+value) || value.endsWith("px") || value.endsWith("rem");
    }
    return false;
  };
  const isParsablePositiveMeasure2 = (value) => {
    if (typeof value === "number") {
      return value >= 0;
    }
    return isParsableMeasure2(value) && parseInt(value) >= 0;
  };
  const parseSizeValue3 = (value, pageFontSize = 16) => {
    const valueUnref = unref(value);
    if (typeof valueUnref === "string") {
      const parsedValue = parseInt(valueUnref);
      if (isNaN(parsedValue)) {
        return 0;
      }
      return valueUnref.endsWith("rem") ? parsedValue * unref(pageFontSize) : parsedValue;
    }
    return valueUnref;
  };
  return { isParsableMeasure: isParsableMeasure2, isParsablePositiveMeasure: isParsablePositiveMeasure2, parseSizeValue: parseSizeValue3 };
};

// node_modules/vuestic-ui/dist/es/src/components/va-badge/hooks/useFloatingPositionStyles.js
var { isParsableMeasure, parseSizeValue } = useParsableMeasure();
var useFloatingPositionProps = {
  overlap: { type: Boolean, default: false },
  placement: {
    type: String,
    default: "top-end",
    validator: (position) => placementsPositionsWithAliases.includes(position)
  },
  offset: {
    type: [Number, String, Array],
    default: 0,
    validator: (value) => {
      if (Array.isArray(value)) {
        return value.every(isParsableMeasure);
      }
      if (typeof value === "string") {
        return isParsableMeasure(value);
      }
      return !isNaN(value);
    }
  }
};
var useFloatingPosition = (props, floating) => {
  if (!floating.value) {
    return {};
  }
  const { position, align } = usePlacementAliases(props);
  const alignmentShiftComputed = computed(() => {
    const alignOptions = {
      start: props.overlap ? "-50%" : "-100%",
      center: "-50%",
      end: props.overlap ? "-50%" : "0%"
    };
    return alignOptions[align.value];
  });
  const offsetMarginComputed = computed(() => {
    if (!props.offset) {
      return {};
    }
    const mainAxis = ["left", "right"].includes(position.value) ? "top" : "left";
    const crossAxis = mainAxis === "top" ? "left" : "top";
    if (Array.isArray(props.offset)) {
      const [x, y] = props.offset.map(parseSizeValue);
      return {
        [`margin-${mainAxis}`]: `${x}px`,
        [`margin-${crossAxis}`]: `${y}px`
      };
    }
    const offset3 = parseSizeValue(props.offset);
    return {
      [`margin-${crossAxis}`]: `${offset3}px`
    };
  });
  const alignmentComputed = computed(() => {
    const mainAxis = ["left", "right"].includes(position.value) ? "top" : "left";
    const crossAxis = mainAxis === "top" ? "left" : "top";
    let shiftValue = "0%";
    if (crossAxis === "top" && position.value === "bottom") {
      shiftValue = "100%";
    }
    if (crossAxis === "left" && position.value === "right") {
      shiftValue = "100%";
    }
    const alignmentOptions = {
      start: { [mainAxis]: "0%", [crossAxis]: shiftValue },
      center: { [mainAxis]: "50%", [crossAxis]: shiftValue },
      end: { [mainAxis]: "100%", [crossAxis]: shiftValue }
    };
    return alignmentOptions[align.value];
  });
  const transformComputed = computed(() => {
    const coords = {
      top: {
        x: alignmentShiftComputed.value,
        y: props.overlap ? "-50%" : "-100%"
      },
      bottom: {
        x: alignmentShiftComputed.value,
        y: props.overlap ? "-50%" : "0%"
      },
      left: {
        x: props.overlap ? "-50%" : "-100%",
        y: alignmentShiftComputed.value
      },
      right: {
        x: props.overlap ? "-50%" : "0%",
        y: alignmentShiftComputed.value
      }
    };
    const { x, y } = coords[position.value];
    return { transform: `translate(${x}, ${y})` };
  });
  return computed(() => ({
    ...alignmentComputed.value,
    ...transformComputed.value,
    ...offsetMarginComputed.value
  }));
};

// node_modules/vuestic-ui/dist/es/src/composables/useDeprecated.js
var OPTIONS_LIST = {
  props: "prop",
  attrs: "prop",
  slots: "slot"
};
var useDeprecated = (deprecatedList, deprecationSource = ["props", "attrs"]) => {
  if (!isDev) {
    return void 0;
  }
  const instance = getCurrentInstance();
  if (!instance) {
    throw new Error("`useDeprecated` hook must be used only inside of setup function!");
  }
  const instanceName = instance.type.name;
  const deprecatedItems = unref(deprecatedList);
  deprecationSource.every((source) => {
    var _a2;
    const option = OPTIONS_LIST[source];
    const throwWarning = (key) => console.warn(`The '${key}' ${option} (${instanceName} component) is deprecated! Please, check the documentation.`);
    if (source === "props") {
      const propsOptions = ((_a2 = instance.propsOptions) == null ? void 0 : _a2[0]) || {};
      const propsValues = instance.props || {};
      deprecatedItems.forEach((propName) => {
        propsOptions[propName] && propsValues[propName] !== propsOptions[propName].default && throwWarning(propName);
      });
      return true;
    }
    Object.keys({ ...instance[source] }).forEach((key) => {
      if (deprecatedItems.includes(key)) {
        throwWarning(key);
      }
    });
    return true;
  });
};

// node_modules/vuestic-ui/dist/es/src/components/va-badge/VaBadge.vue_vue_type_script_setup_true_lang.js
import "D:/Github/DONGTIAN/ui/node_modules/vuestic-ui/dist/es/VaBadge.css";
var _hoisted_112 = ["aria-labelledby"];
var _hoisted_25 = { class: "va-badge__text" };
var _sfc_main21 = defineComponent({
  ...{
    name: "VaBadge"
  },
  __name: "VaBadge",
  props: {
    ...useComponentPresetProp,
    ...useFloatingPositionProps,
    color: { type: String, default: "danger" },
    textColor: { type: String },
    text: { type: [String, Number], default: "" },
    multiLine: { type: Boolean, default: false },
    visibleEmpty: { type: Boolean, default: false },
    dot: { type: Boolean, default: false },
    // TODO: Remove after 1.8.0
    transparent: { type: Boolean, default: false }
  },
  setup(__props) {
    const props = __props;
    useDeprecated(["transparent"]);
    const slots = useSlots();
    const isEmpty = computed(() => !(props.text || props.visibleEmpty || props.dot || slots.text));
    const isFloating = computed(() => !!(slots.default || props.dot));
    const badgeClass = useBem("va-badge", () => ({
      ...pick(props, ["visibleEmpty", "dot", "multiLine"]),
      empty: isEmpty.value,
      floating: isFloating.value
    }));
    const { getColor } = useColors();
    const colorComputed = computed(() => getColor(props.color));
    const { textColorComputed } = useTextColor(colorComputed);
    const positionStylesComputed = useFloatingPosition(props, isFloating);
    const stylesComputed = computed(() => ({
      color: textColorComputed.value,
      borderColor: colorComputed.value,
      backgroundColor: colorComputed.value,
      opacity: props.transparent ? 0.5 : 1,
      ...unref(positionStylesComputed)
    }));
    const ariaLabelledByComputed = computed(() => props.text ? String(props.text) : void 0);
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: normalizeClass(["va-badge", unref(badgeClass)]),
        role: "status",
        "aria-labelledby": ariaLabelledByComputed.value
      }, [
        createBaseVNode("span", {
          class: "va-badge__text-wrapper",
          style: normalizeStyle(stylesComputed.value)
        }, [
          createBaseVNode("span", _hoisted_25, [
            renderSlot(_ctx.$slots, "text", {}, () => [
              createTextVNode(toDisplayString(__props.text), 1)
            ])
          ])
        ], 4),
        renderSlot(_ctx.$slots, "default")
      ], 10, _hoisted_112);
    };
  }
});

// node_modules/vuestic-ui/dist/es/src/components/va-badge/index.js
var VaBadge = withConfigTransport$1(_sfc_main21);

// node_modules/vuestic-ui/dist/es/src/utils/has-own-property.js
var hasOwnProperty = (object, key) => {
  return Object.prototype.hasOwnProperty.call(object, key);
};

// node_modules/vuestic-ui/dist/es/src/utils/resolveSlot.js
var resolveSlot = (slot) => {
  return slot && typeof slot === "function" ? slot() : slot;
};

// node_modules/vuestic-ui/dist/es/src/composables/useAlign.js
var useAlignProps = {
  align: {
    type: String,
    default: "left"
  },
  vertical: {
    type: Boolean,
    default: false
  }
};
var horizontalMap = {
  left: "flex-start",
  center: "center",
  right: "flex-end",
  between: "space-between",
  around: "space-around"
};
var verticalMap = {
  left: "flex-start",
  center: "center",
  right: "flex-end",
  stretch: "stretch"
};
var justify = (align, vertical) => {
  return vertical ? "center" : align ? horizontalMap[align] : "flex-start";
};
var items = (align, vertical) => {
  return vertical ? verticalMap[align] : "center";
};
function useAlign(props) {
  const alignComputed = computed(() => {
    return {
      display: "flex",
      flexDirection: props.vertical ? "column" : "row",
      justifyContent: justify(props.align, props.vertical),
      alignItems: items(props.align, props.vertical)
    };
  });
  return {
    alignComputed
  };
}

// node_modules/vuestic-ui/dist/es/src/components/va-breadcrumbs/VaBreadcrumbs.vue_vue_type_script_lang.js
import "D:/Github/DONGTIAN/ui/node_modules/vuestic-ui/dist/es/VaBreadcrumbs.css";
var _sfc_main22 = defineComponent({
  name: "VaBreadcrumbs",
  props: {
    ...useAlignProps,
    ...useComponentPresetProp,
    separator: { type: String, default: "/" },
    color: { type: String, default: null },
    disabledColor: { type: String, default: "secondary" },
    activeColor: { type: String, default: null },
    separatorColor: { type: String, default: null },
    ariaLabel: useTranslationProp("$t:breadcrumbs")
  },
  setup(props, { slots }) {
    const { alignComputed } = useAlign(props);
    const { getColor } = useColors();
    const computedThemesSeparatorColor = computed(() => {
      return props.separatorColor ? getColor(props.separatorColor) : null;
    });
    const computedThemesColor = computed(() => props.color ? getColor(props.color) : null);
    const computedThemesActiveColor = computed(() => {
      return props.activeColor ? getColor(props.activeColor) : null;
    });
    const childNodeFilter = (result, node) => {
      const nodes = node && node.type === Fragment && node.children ? node.children : [node];
      return [
        ...result,
        ...nodes.filter((node2) => {
          var _a2, _b;
          return !!((_b = (_a2 = node2 == null ? void 0 : node2.type) == null ? void 0 : _a2.name) == null ? void 0 : _b.match(/VaBreadcrumbsItem$/));
        })
      ];
    };
    const createSeparatorComponent = () => {
      const separatorNode = resolveSlot(slots.separator) || [props.separator];
      return h("span", {
        "aria-hidden": true,
        class: ["va-breadcrumbs__separator"],
        style: [{ color: computedThemesSeparatorColor.value }]
      }, separatorNode);
    };
    const isDisabledChild = (child) => {
      const childPropData = child == null ? void 0 : child.props;
      if (!childPropData || !hasOwnProperty(childPropData, "disabled")) {
        return false;
      }
      if (childPropData.disabled === "") {
        return true;
      }
      return Boolean(childPropData.disabled);
    };
    const isAllChildLinks = ref(true);
    const getChildren = () => {
      const defaultSlotContent = resolveSlot(slots.default);
      if (!defaultSlotContent) {
        return;
      }
      const childNodes = defaultSlotContent.reduce(childNodeFilter, []) || [];
      const childNodesLength = childNodes.length;
      const isLastIndexChildNodes = (index) => index === childNodesLength - 1;
      const isChildLink = (child) => {
        const childPropData = child == null ? void 0 : child.props;
        if (!childPropData || !hasOwnProperty(childPropData, "to")) {
          return false;
        }
        return !!(childPropData.to && !childPropData.disabled);
      };
      const createChildComponent = (child, index) => h(
        "span",
        {
          class: ["va-breadcrumbs__item", { "va-breadcrumbs__item--disabled": isDisabledChild(child) }],
          "aria-current": isLastIndexChildNodes(index) && isChildLink(child) ? "location" : false,
          style: {
            color: isDisabledChild(child) ? getColor(props.disabledColor) : isLastIndexChildNodes(index) ? computedThemesActiveColor.value : computedThemesColor.value
          }
        },
        [child]
      );
      const children = [];
      if (childNodesLength) {
        childNodes.forEach((child, index) => {
          if (isAllChildLinks.value && !isChildLink(child)) {
            isAllChildLinks.value = false;
          }
          children.push(createChildComponent(child, index));
          if (!isLastIndexChildNodes(index)) {
            children.push(createSeparatorComponent());
          }
        });
      }
      return children;
    };
    const { tp } = useTranslation();
    return () => h("div", {
      class: "va-breadcrumbs",
      style: alignComputed.value,
      role: isAllChildLinks.value ? "navigation" : void 0,
      "aria-label": isAllChildLinks.value ? tp(props.ariaLabel) : void 0
    }, getChildren());
  }
});

// node_modules/vuestic-ui/dist/es/src/components/va-breadcrumbs/VaBreadcrumbsItem/VaBreadcrumbsItem.vue_vue_type_script_setup_true_lang.js
import "D:/Github/DONGTIAN/ui/node_modules/vuestic-ui/dist/es/VaBreadcrumbsItem.css";
var _sfc_main23 = defineComponent({
  ...{
    name: "VaBreadcrumbsItem"
  },
  __name: "VaBreadcrumbsItem",
  props: {
    ...useRouterLinkProps,
    disabled: { type: Boolean, default: false },
    label: { type: String, default: "" }
  },
  setup(__props) {
    const props = __props;
    const { tagComputed, hrefComputed, isLinkTag } = useRouterLink(props);
    const classComputed = computed(() => ({
      "va-breadcrumb-item--link": isLinkTag.value
    }));
    return (_ctx, _cache) => {
      return openBlock(), createBlock(resolveDynamicComponent(unref(tagComputed)), {
        class: normalizeClass(["va-breadcrumb-item", classComputed.value]),
        "active-class": _ctx.$props.activeClass,
        href: unref(hrefComputed),
        to: _ctx.$props.to,
        target: _ctx.$props.target,
        replace: _ctx.$props.replace,
        append: _ctx.$props.append,
        exact: _ctx.$props.exact,
        "exact-active-class": _ctx.$props.exactActiveClass
      }, {
        default: withCtx(() => [
          renderSlot(_ctx.$slots, "default", {}, () => [
            createTextVNode(toDisplayString(__props.label), 1)
          ])
        ]),
        _: 3
      }, 8, ["class", "active-class", "href", "to", "target", "replace", "append", "exact", "exact-active-class"]);
    };
  }
});

// node_modules/vuestic-ui/dist/es/src/components/va-breadcrumbs/index.js
var VaBreadcrumbsItem = withConfigTransport$1(_sfc_main23);
var VaBreadcrumbs = withConfigTransport$1(_sfc_main22);

// node_modules/vuestic-ui/dist/es/src/components/va-button-group/VaButtonGroup.vue_vue_type_script_setup_true_lang.js
import "D:/Github/DONGTIAN/ui/node_modules/vuestic-ui/dist/es/VaButtonGroup.css";
var VaButtonProps = omit(extractComponentProps(VaButton), ["block", "gradient"]);
var _sfc_main24 = defineComponent({
  ...{
    name: "VaButtonGroup"
  },
  __name: "VaButtonGroup",
  props: {
    ...VaButtonProps,
    ...useComponentPresetProp,
    grow: { type: Boolean, default: false },
    gradient: { type: Boolean, default: false }
  },
  setup(__props) {
    const props = __props;
    const { getColor, getGradientBackground: getGradientBackground2 } = useColors();
    const colorComputed = computed(() => getColor(props.color));
    const { textColorComputed } = useTextColor(colorComputed);
    const filteredProps = filterComponentProps(VaButtonProps);
    const buttonConfig = computed(() => ({
      VaButton: {
        ...filteredProps.value,
        ...props.gradient && {
          color: "#00000000",
          textColor: textColorComputed.value
        }
      }
    }));
    const computedClass = useBem("va-button-group", () => ({
      square: !props.round,
      grow: props.grow,
      small: props.size === "small",
      large: props.size === "large"
    }));
    const backgroundColor = computed(
      () => props.gradient ? getGradientBackground2(colorComputed.value) : "transparent"
    );
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: normalizeClass(["va-button-group", unref(computedClass)]),
        style: normalizeStyle(`--va-background-color: ${String(backgroundColor.value)}`)
      }, [
        createVNode(unref(_sfc_main4), { components: buttonConfig.value }, {
          default: withCtx(() => [
            renderSlot(_ctx.$slots, "default")
          ]),
          _: 3
        }, 8, ["components"])
      ], 6);
    };
  }
});

// node_modules/vuestic-ui/dist/es/src/components/va-button-group/index.js
var VaButtonGroup = withConfigTransport$1(_sfc_main24);

// node_modules/vuestic-ui/dist/es/src/utils/debounce.js
var debounce = (func, wait) => {
  let timeout = null;
  const fn = function(...args) {
    timeout && clearTimeout(timeout);
    timeout = setTimeout(() => {
      timeout = null;
      func.apply(this, args);
    }, wait);
  };
  fn.cancel = () => {
    timeout && clearTimeout(timeout);
    timeout = null;
  };
  return fn;
};

// node_modules/vuestic-ui/dist/es/src/composables/useDebounce.js
var useDebounceFn = (timeout) => {
  let callback = null;
  const createDebounced = () => {
    return debounce(() => {
      callback == null ? void 0 : callback();
      callback = null;
    }, unref(timeout));
  };
  let debounced = createDebounced();
  if (isRef(timeout)) {
    watch(timeout, () => {
      debounced = createDebounced();
    });
  }
  return {
    // todo check if we need to create proxy here
    debounced: (cb) => {
      callback = cb;
      debounced();
    },
    cancel: () => debounced.cancel()
  };
};

// node_modules/vuestic-ui/dist/es/src/components/va-dropdown/hooks/useDropdownNavigation.js
var isTyping = (e) => {
  const target = e.target;
  if (!(target.tagName === "INPUT" || target.tagName === "TEXTAREA")) {
    return false;
  }
  if (target.attributes.getNamedItem("readonly")) {
    return false;
  }
  return true;
};
var isReadonlyArray = (arr) => {
  return Array.isArray(arr);
};
var useNavigation = (isOpen, anchorRef, contentRef, props) => {
  const normalizeTriggerName = (t) => {
    t = t.replace(/-/g, "").toLowerCase();
    if (t === "space") {
      return " ";
    }
    if (t === "rightclick") {
      return "contextmenu";
    }
    return t;
  };
  const normalizedTriggers = computed(() => {
    if (isReadonlyArray(props.trigger)) {
      return props.trigger.map((t) => normalizeTriggerName(t));
    }
    return [normalizeTriggerName(props.trigger)];
  });
  useEvent("keydown", (e) => {
    if (props.disabled) {
      return;
    }
    if (e.key === "Escape" && isOpen.value) {
      isOpen.value = false;
      e.preventDefault();
    }
    if (isTyping(e)) {
      return;
    }
    if (normalizedTriggers.value.includes(normalizeTriggerName(e.key))) {
      isOpen.value = !isOpen.value;
      e.preventDefault();
    }
  }, anchorRef);
  useEvent("keydown", (e) => {
    if (props.disabled) {
      return;
    }
    if (e.key === "Escape" && isOpen.value) {
      isOpen.value = false;
      e.preventDefault();
    }
  }, contentRef);
  useEvent(["click", "contextmenu", "dblclick"], (e) => {
    if (props.disabled) {
      return;
    }
    if (isTyping(e)) {
      return;
    }
    if (normalizedTriggers.value.includes(normalizeTriggerName(e.type))) {
      e.preventDefault();
      if (isOpen.value && props.closeOnAnchorClick) {
        isOpen.value = false;
        if (props.cursor) {
          setTimeout(() => {
            isOpen.value = true;
          }, 16);
        }
      } else {
        isOpen.value = true;
      }
    }
  }, anchorRef);
  useEvent(["click", "contextmenu", "dblclick"], (e) => {
    if (props.closeOnContentClick) {
      isOpen.value = false;
    }
  }, contentRef);
  const { debounced: debounceHover, cancel: cancelHoverDebounce } = useDebounceFn(useNumericProp("hoverOverTimeout"));
  const { debounced: debounceUnHover, cancel: cancelUnHoverDebounce } = useDebounceFn(useNumericProp("hoverOutTimeout"));
  const onMouseHover = (e) => {
    if (props.disabled) {
      return;
    }
    if (!normalizedTriggers.value.includes("hover")) {
      return;
    }
    if (e.type === "mouseleave") {
      cancelHoverDebounce();
      if (!props.isContentHoverable) {
        isOpen.value = false;
        return;
      }
      debounceUnHover(() => {
        isOpen.value = false;
      });
    } else {
      cancelUnHoverDebounce();
      debounceHover(() => {
        isOpen.value = true;
      });
    }
  };
  useEvent(["mouseleave", "mouseenter"], onMouseHover, anchorRef);
  useEvent(["mouseleave", "mouseenter"], onMouseHover, contentRef);
};

// node_modules/vuestic-ui/dist/es/src/components/va-dropdown/hooks/useAnchorSelector.js
var useAnchorSelector = (props) => {
  const anchorRef = ref();
  const document2 = useDocument();
  const isMounted = useIsMounted();
  const computedAnchorRef = computed({
    set(v) {
      anchorRef.value = unwrapEl(v);
    },
    get() {
      var _a2, _b, _c;
      isMounted.value;
      if (typeof props.anchor === "string") {
        return ((_a2 = document2.value) == null ? void 0 : _a2.querySelector(props.anchor)) ?? anchorRef.value;
      }
      if (typeof props.anchor === "object") {
        return props.anchor;
      }
      if (props.anchorSelector) {
        return ((_b = document2.value) == null ? void 0 : _b.querySelector(props.anchorSelector)) ?? anchorRef.value;
      } else if (props.innerAnchorSelector && anchorRef.value) {
        return ((_c = anchorRef.value) == null ? void 0 : _c.querySelector(props.innerAnchorSelector)) ?? anchorRef.value;
      }
      return anchorRef.value;
    }
  });
  return {
    anchorRef: computedAnchorRef
  };
};

// node_modules/vuestic-ui/dist/es/src/components/va-dropdown/hooks/useCursorAnchor.js
var useCursorAnchor = (anchorRef, enabled) => {
  const position = reactive({ x: 0, y: 0 });
  useEvent(["mousemove", "mousedown", "mouseup"], (e) => {
    var _a2;
    if (!enabled.value) {
      return;
    }
    const { x, y } = ((_a2 = anchorRef.value) == null ? void 0 : _a2.getBoundingClientRect()) ?? { x: 0, y: 0 };
    position.x = e.clientX - x;
    position.y = e.clientY - y;
  }, anchorRef);
  return computed(() => {
    return {
      getBoundingClientRect() {
        var _a2;
        const { x, y } = ((_a2 = anchorRef.value) == null ? void 0 : _a2.getBoundingClientRect()) ?? { x: 0, y: 0 };
        const resX = position.x + x;
        const resY = position.y + y;
        return {
          width: 0,
          height: 0,
          x: resX,
          y: resY,
          top: resY,
          right: resX,
          bottom: resY,
          left: resX
        };
      },
      contextElement: anchorRef.value
    };
  });
};

// node_modules/@floating-ui/utils/dist/floating-ui.utils.mjs
var sides = ["top", "right", "bottom", "left"];
var alignments = ["start", "end"];
var placements = sides.reduce((acc, side) => acc.concat(side, side + "-" + alignments[0], side + "-" + alignments[1]), []);
var min = Math.min;
var max = Math.max;
var round = Math.round;
var floor = Math.floor;
var createCoords = (v) => ({
  x: v,
  y: v
});
var oppositeSideMap = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
};
var oppositeAlignmentMap = {
  start: "end",
  end: "start"
};
function clamp2(start, value, end) {
  return max(start, min(value, end));
}
function evaluate(value, param) {
  return typeof value === "function" ? value(param) : value;
}
function getSide(placement) {
  return placement.split("-")[0];
}
function getAlignment(placement) {
  return placement.split("-")[1];
}
function getOppositeAxis(axis) {
  return axis === "x" ? "y" : "x";
}
function getAxisLength(axis) {
  return axis === "y" ? "height" : "width";
}
function getSideAxis(placement) {
  return ["top", "bottom"].includes(getSide(placement)) ? "y" : "x";
}
function getAlignmentAxis(placement) {
  return getOppositeAxis(getSideAxis(placement));
}
function getAlignmentSides(placement, rects, rtl) {
  if (rtl === void 0) {
    rtl = false;
  }
  const alignment = getAlignment(placement);
  const alignmentAxis = getAlignmentAxis(placement);
  const length = getAxisLength(alignmentAxis);
  let mainAlignmentSide = alignmentAxis === "x" ? alignment === (rtl ? "end" : "start") ? "right" : "left" : alignment === "start" ? "bottom" : "top";
  if (rects.reference[length] > rects.floating[length]) {
    mainAlignmentSide = getOppositePlacement(mainAlignmentSide);
  }
  return [mainAlignmentSide, getOppositePlacement(mainAlignmentSide)];
}
function getExpandedPlacements(placement) {
  const oppositePlacement = getOppositePlacement(placement);
  return [getOppositeAlignmentPlacement(placement), oppositePlacement, getOppositeAlignmentPlacement(oppositePlacement)];
}
function getOppositeAlignmentPlacement(placement) {
  return placement.replace(/start|end/g, (alignment) => oppositeAlignmentMap[alignment]);
}
function getSideList(side, isStart, rtl) {
  const lr = ["left", "right"];
  const rl = ["right", "left"];
  const tb = ["top", "bottom"];
  const bt = ["bottom", "top"];
  switch (side) {
    case "top":
    case "bottom":
      if (rtl) return isStart ? rl : lr;
      return isStart ? lr : rl;
    case "left":
    case "right":
      return isStart ? tb : bt;
    default:
      return [];
  }
}
function getOppositeAxisPlacements(placement, flipAlignment, direction, rtl) {
  const alignment = getAlignment(placement);
  let list = getSideList(getSide(placement), direction === "start", rtl);
  if (alignment) {
    list = list.map((side) => side + "-" + alignment);
    if (flipAlignment) {
      list = list.concat(list.map(getOppositeAlignmentPlacement));
    }
  }
  return list;
}
function getOppositePlacement(placement) {
  return placement.replace(/left|right|bottom|top/g, (side) => oppositeSideMap[side]);
}
function expandPaddingObject(padding) {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    ...padding
  };
}
function getPaddingObject(padding) {
  return typeof padding !== "number" ? expandPaddingObject(padding) : {
    top: padding,
    right: padding,
    bottom: padding,
    left: padding
  };
}
function rectToClientRect(rect) {
  const {
    x,
    y,
    width,
    height
  } = rect;
  return {
    width,
    height,
    top: y,
    left: x,
    right: x + width,
    bottom: y + height,
    x,
    y
  };
}

// node_modules/@floating-ui/core/dist/floating-ui.core.mjs
function computeCoordsFromPlacement(_ref, placement, rtl) {
  let {
    reference,
    floating
  } = _ref;
  const sideAxis = getSideAxis(placement);
  const alignmentAxis = getAlignmentAxis(placement);
  const alignLength = getAxisLength(alignmentAxis);
  const side = getSide(placement);
  const isVertical = sideAxis === "y";
  const commonX = reference.x + reference.width / 2 - floating.width / 2;
  const commonY = reference.y + reference.height / 2 - floating.height / 2;
  const commonAlign = reference[alignLength] / 2 - floating[alignLength] / 2;
  let coords;
  switch (side) {
    case "top":
      coords = {
        x: commonX,
        y: reference.y - floating.height
      };
      break;
    case "bottom":
      coords = {
        x: commonX,
        y: reference.y + reference.height
      };
      break;
    case "right":
      coords = {
        x: reference.x + reference.width,
        y: commonY
      };
      break;
    case "left":
      coords = {
        x: reference.x - floating.width,
        y: commonY
      };
      break;
    default:
      coords = {
        x: reference.x,
        y: reference.y
      };
  }
  switch (getAlignment(placement)) {
    case "start":
      coords[alignmentAxis] -= commonAlign * (rtl && isVertical ? -1 : 1);
      break;
    case "end":
      coords[alignmentAxis] += commonAlign * (rtl && isVertical ? -1 : 1);
      break;
  }
  return coords;
}
var computePosition = async (reference, floating, config) => {
  const {
    placement = "bottom",
    strategy = "absolute",
    middleware = [],
    platform: platform2
  } = config;
  const validMiddleware = middleware.filter(Boolean);
  const rtl = await (platform2.isRTL == null ? void 0 : platform2.isRTL(floating));
  let rects = await platform2.getElementRects({
    reference,
    floating,
    strategy
  });
  let {
    x,
    y
  } = computeCoordsFromPlacement(rects, placement, rtl);
  let statefulPlacement = placement;
  let middlewareData = {};
  let resetCount = 0;
  for (let i = 0; i < validMiddleware.length; i++) {
    const {
      name,
      fn
    } = validMiddleware[i];
    const {
      x: nextX,
      y: nextY,
      data,
      reset
    } = await fn({
      x,
      y,
      initialPlacement: placement,
      placement: statefulPlacement,
      strategy,
      middlewareData,
      rects,
      platform: platform2,
      elements: {
        reference,
        floating
      }
    });
    x = nextX != null ? nextX : x;
    y = nextY != null ? nextY : y;
    middlewareData = {
      ...middlewareData,
      [name]: {
        ...middlewareData[name],
        ...data
      }
    };
    if (reset && resetCount <= 50) {
      resetCount++;
      if (typeof reset === "object") {
        if (reset.placement) {
          statefulPlacement = reset.placement;
        }
        if (reset.rects) {
          rects = reset.rects === true ? await platform2.getElementRects({
            reference,
            floating,
            strategy
          }) : reset.rects;
        }
        ({
          x,
          y
        } = computeCoordsFromPlacement(rects, statefulPlacement, rtl));
      }
      i = -1;
    }
  }
  return {
    x,
    y,
    placement: statefulPlacement,
    strategy,
    middlewareData
  };
};
async function detectOverflow(state, options) {
  var _await$platform$isEle;
  if (options === void 0) {
    options = {};
  }
  const {
    x,
    y,
    platform: platform2,
    rects,
    elements,
    strategy
  } = state;
  const {
    boundary = "clippingAncestors",
    rootBoundary = "viewport",
    elementContext = "floating",
    altBoundary = false,
    padding = 0
  } = evaluate(options, state);
  const paddingObject = getPaddingObject(padding);
  const altContext = elementContext === "floating" ? "reference" : "floating";
  const element = elements[altBoundary ? altContext : elementContext];
  const clippingClientRect = rectToClientRect(await platform2.getClippingRect({
    element: ((_await$platform$isEle = await (platform2.isElement == null ? void 0 : platform2.isElement(element))) != null ? _await$platform$isEle : true) ? element : element.contextElement || await (platform2.getDocumentElement == null ? void 0 : platform2.getDocumentElement(elements.floating)),
    boundary,
    rootBoundary,
    strategy
  }));
  const rect = elementContext === "floating" ? {
    x,
    y,
    width: rects.floating.width,
    height: rects.floating.height
  } : rects.reference;
  const offsetParent = await (platform2.getOffsetParent == null ? void 0 : platform2.getOffsetParent(elements.floating));
  const offsetScale = await (platform2.isElement == null ? void 0 : platform2.isElement(offsetParent)) ? await (platform2.getScale == null ? void 0 : platform2.getScale(offsetParent)) || {
    x: 1,
    y: 1
  } : {
    x: 1,
    y: 1
  };
  const elementClientRect = rectToClientRect(platform2.convertOffsetParentRelativeRectToViewportRelativeRect ? await platform2.convertOffsetParentRelativeRectToViewportRelativeRect({
    elements,
    rect,
    offsetParent,
    strategy
  }) : rect);
  return {
    top: (clippingClientRect.top - elementClientRect.top + paddingObject.top) / offsetScale.y,
    bottom: (elementClientRect.bottom - clippingClientRect.bottom + paddingObject.bottom) / offsetScale.y,
    left: (clippingClientRect.left - elementClientRect.left + paddingObject.left) / offsetScale.x,
    right: (elementClientRect.right - clippingClientRect.right + paddingObject.right) / offsetScale.x
  };
}
var flip = function(options) {
  if (options === void 0) {
    options = {};
  }
  return {
    name: "flip",
    options,
    async fn(state) {
      var _middlewareData$arrow, _middlewareData$flip;
      const {
        placement,
        middlewareData,
        rects,
        initialPlacement,
        platform: platform2,
        elements
      } = state;
      const {
        mainAxis: checkMainAxis = true,
        crossAxis: checkCrossAxis = true,
        fallbackPlacements: specifiedFallbackPlacements,
        fallbackStrategy = "bestFit",
        fallbackAxisSideDirection = "none",
        flipAlignment = true,
        ...detectOverflowOptions
      } = evaluate(options, state);
      if ((_middlewareData$arrow = middlewareData.arrow) != null && _middlewareData$arrow.alignmentOffset) {
        return {};
      }
      const side = getSide(placement);
      const initialSideAxis = getSideAxis(initialPlacement);
      const isBasePlacement = getSide(initialPlacement) === initialPlacement;
      const rtl = await (platform2.isRTL == null ? void 0 : platform2.isRTL(elements.floating));
      const fallbackPlacements = specifiedFallbackPlacements || (isBasePlacement || !flipAlignment ? [getOppositePlacement(initialPlacement)] : getExpandedPlacements(initialPlacement));
      const hasFallbackAxisSideDirection = fallbackAxisSideDirection !== "none";
      if (!specifiedFallbackPlacements && hasFallbackAxisSideDirection) {
        fallbackPlacements.push(...getOppositeAxisPlacements(initialPlacement, flipAlignment, fallbackAxisSideDirection, rtl));
      }
      const placements2 = [initialPlacement, ...fallbackPlacements];
      const overflow = await detectOverflow(state, detectOverflowOptions);
      const overflows = [];
      let overflowsData = ((_middlewareData$flip = middlewareData.flip) == null ? void 0 : _middlewareData$flip.overflows) || [];
      if (checkMainAxis) {
        overflows.push(overflow[side]);
      }
      if (checkCrossAxis) {
        const sides2 = getAlignmentSides(placement, rects, rtl);
        overflows.push(overflow[sides2[0]], overflow[sides2[1]]);
      }
      overflowsData = [...overflowsData, {
        placement,
        overflows
      }];
      if (!overflows.every((side2) => side2 <= 0)) {
        var _middlewareData$flip2, _overflowsData$filter;
        const nextIndex = (((_middlewareData$flip2 = middlewareData.flip) == null ? void 0 : _middlewareData$flip2.index) || 0) + 1;
        const nextPlacement = placements2[nextIndex];
        if (nextPlacement) {
          return {
            data: {
              index: nextIndex,
              overflows: overflowsData
            },
            reset: {
              placement: nextPlacement
            }
          };
        }
        let resetPlacement = (_overflowsData$filter = overflowsData.filter((d) => d.overflows[0] <= 0).sort((a, b) => a.overflows[1] - b.overflows[1])[0]) == null ? void 0 : _overflowsData$filter.placement;
        if (!resetPlacement) {
          switch (fallbackStrategy) {
            case "bestFit": {
              var _overflowsData$filter2;
              const placement2 = (_overflowsData$filter2 = overflowsData.filter((d) => {
                if (hasFallbackAxisSideDirection) {
                  const currentSideAxis = getSideAxis(d.placement);
                  return currentSideAxis === initialSideAxis || // Create a bias to the `y` side axis due to horizontal
                  // reading directions favoring greater width.
                  currentSideAxis === "y";
                }
                return true;
              }).map((d) => [d.placement, d.overflows.filter((overflow2) => overflow2 > 0).reduce((acc, overflow2) => acc + overflow2, 0)]).sort((a, b) => a[1] - b[1])[0]) == null ? void 0 : _overflowsData$filter2[0];
              if (placement2) {
                resetPlacement = placement2;
              }
              break;
            }
            case "initialPlacement":
              resetPlacement = initialPlacement;
              break;
          }
        }
        if (placement !== resetPlacement) {
          return {
            reset: {
              placement: resetPlacement
            }
          };
        }
      }
      return {};
    }
  };
};
async function convertValueToCoords(state, options) {
  const {
    placement,
    platform: platform2,
    elements
  } = state;
  const rtl = await (platform2.isRTL == null ? void 0 : platform2.isRTL(elements.floating));
  const side = getSide(placement);
  const alignment = getAlignment(placement);
  const isVertical = getSideAxis(placement) === "y";
  const mainAxisMulti = ["left", "top"].includes(side) ? -1 : 1;
  const crossAxisMulti = rtl && isVertical ? -1 : 1;
  const rawValue = evaluate(options, state);
  let {
    mainAxis,
    crossAxis,
    alignmentAxis
  } = typeof rawValue === "number" ? {
    mainAxis: rawValue,
    crossAxis: 0,
    alignmentAxis: null
  } : {
    mainAxis: 0,
    crossAxis: 0,
    alignmentAxis: null,
    ...rawValue
  };
  if (alignment && typeof alignmentAxis === "number") {
    crossAxis = alignment === "end" ? alignmentAxis * -1 : alignmentAxis;
  }
  return isVertical ? {
    x: crossAxis * crossAxisMulti,
    y: mainAxis * mainAxisMulti
  } : {
    x: mainAxis * mainAxisMulti,
    y: crossAxis * crossAxisMulti
  };
}
var offset = function(options) {
  if (options === void 0) {
    options = 0;
  }
  return {
    name: "offset",
    options,
    async fn(state) {
      var _middlewareData$offse, _middlewareData$arrow;
      const {
        x,
        y,
        placement,
        middlewareData
      } = state;
      const diffCoords = await convertValueToCoords(state, options);
      if (placement === ((_middlewareData$offse = middlewareData.offset) == null ? void 0 : _middlewareData$offse.placement) && (_middlewareData$arrow = middlewareData.arrow) != null && _middlewareData$arrow.alignmentOffset) {
        return {};
      }
      return {
        x: x + diffCoords.x,
        y: y + diffCoords.y,
        data: {
          ...diffCoords,
          placement
        }
      };
    }
  };
};
var shift = function(options) {
  if (options === void 0) {
    options = {};
  }
  return {
    name: "shift",
    options,
    async fn(state) {
      const {
        x,
        y,
        placement
      } = state;
      const {
        mainAxis: checkMainAxis = true,
        crossAxis: checkCrossAxis = false,
        limiter = {
          fn: (_ref) => {
            let {
              x: x2,
              y: y2
            } = _ref;
            return {
              x: x2,
              y: y2
            };
          }
        },
        ...detectOverflowOptions
      } = evaluate(options, state);
      const coords = {
        x,
        y
      };
      const overflow = await detectOverflow(state, detectOverflowOptions);
      const crossAxis = getSideAxis(getSide(placement));
      const mainAxis = getOppositeAxis(crossAxis);
      let mainAxisCoord = coords[mainAxis];
      let crossAxisCoord = coords[crossAxis];
      if (checkMainAxis) {
        const minSide = mainAxis === "y" ? "top" : "left";
        const maxSide = mainAxis === "y" ? "bottom" : "right";
        const min2 = mainAxisCoord + overflow[minSide];
        const max2 = mainAxisCoord - overflow[maxSide];
        mainAxisCoord = clamp2(min2, mainAxisCoord, max2);
      }
      if (checkCrossAxis) {
        const minSide = crossAxis === "y" ? "top" : "left";
        const maxSide = crossAxis === "y" ? "bottom" : "right";
        const min2 = crossAxisCoord + overflow[minSide];
        const max2 = crossAxisCoord - overflow[maxSide];
        crossAxisCoord = clamp2(min2, crossAxisCoord, max2);
      }
      const limitedCoords = limiter.fn({
        ...state,
        [mainAxis]: mainAxisCoord,
        [crossAxis]: crossAxisCoord
      });
      return {
        ...limitedCoords,
        data: {
          x: limitedCoords.x - x,
          y: limitedCoords.y - y
        }
      };
    }
  };
};
var size = function(options) {
  if (options === void 0) {
    options = {};
  }
  return {
    name: "size",
    options,
    async fn(state) {
      const {
        placement,
        rects,
        platform: platform2,
        elements
      } = state;
      const {
        apply = () => {
        },
        ...detectOverflowOptions
      } = evaluate(options, state);
      const overflow = await detectOverflow(state, detectOverflowOptions);
      const side = getSide(placement);
      const alignment = getAlignment(placement);
      const isYAxis = getSideAxis(placement) === "y";
      const {
        width,
        height
      } = rects.floating;
      let heightSide;
      let widthSide;
      if (side === "top" || side === "bottom") {
        heightSide = side;
        widthSide = alignment === (await (platform2.isRTL == null ? void 0 : platform2.isRTL(elements.floating)) ? "start" : "end") ? "left" : "right";
      } else {
        widthSide = side;
        heightSide = alignment === "end" ? "top" : "bottom";
      }
      const maximumClippingHeight = height - overflow.top - overflow.bottom;
      const maximumClippingWidth = width - overflow.left - overflow.right;
      const overflowAvailableHeight = min(height - overflow[heightSide], maximumClippingHeight);
      const overflowAvailableWidth = min(width - overflow[widthSide], maximumClippingWidth);
      const noShift = !state.middlewareData.shift;
      let availableHeight = overflowAvailableHeight;
      let availableWidth = overflowAvailableWidth;
      if (isYAxis) {
        availableWidth = alignment || noShift ? min(overflowAvailableWidth, maximumClippingWidth) : maximumClippingWidth;
      } else {
        availableHeight = alignment || noShift ? min(overflowAvailableHeight, maximumClippingHeight) : maximumClippingHeight;
      }
      if (noShift && !alignment) {
        const xMin = max(overflow.left, 0);
        const xMax = max(overflow.right, 0);
        const yMin = max(overflow.top, 0);
        const yMax = max(overflow.bottom, 0);
        if (isYAxis) {
          availableWidth = width - 2 * (xMin !== 0 || xMax !== 0 ? xMin + xMax : max(overflow.left, overflow.right));
        } else {
          availableHeight = height - 2 * (yMin !== 0 || yMax !== 0 ? yMin + yMax : max(overflow.top, overflow.bottom));
        }
      }
      await apply({
        ...state,
        availableWidth,
        availableHeight
      });
      const nextDimensions = await platform2.getDimensions(elements.floating);
      if (width !== nextDimensions.width || height !== nextDimensions.height) {
        return {
          reset: {
            rects: true
          }
        };
      }
      return {};
    }
  };
};

// node_modules/@floating-ui/utils/dist/floating-ui.utils.dom.mjs
function getNodeName(node) {
  if (isNode(node)) {
    return (node.nodeName || "").toLowerCase();
  }
  return "#document";
}
function getWindow2(node) {
  var _node$ownerDocument;
  return (node == null || (_node$ownerDocument = node.ownerDocument) == null ? void 0 : _node$ownerDocument.defaultView) || window;
}
function getDocumentElement(node) {
  var _ref;
  return (_ref = (isNode(node) ? node.ownerDocument : node.document) || window.document) == null ? void 0 : _ref.documentElement;
}
function isNode(value) {
  return value instanceof Node || value instanceof getWindow2(value).Node;
}
function isElement(value) {
  return value instanceof Element || value instanceof getWindow2(value).Element;
}
function isHTMLElement2(value) {
  return value instanceof HTMLElement || value instanceof getWindow2(value).HTMLElement;
}
function isShadowRoot(value) {
  if (typeof ShadowRoot === "undefined") {
    return false;
  }
  return value instanceof ShadowRoot || value instanceof getWindow2(value).ShadowRoot;
}
function isOverflowElement(element) {
  const {
    overflow,
    overflowX,
    overflowY,
    display
  } = getComputedStyle2(element);
  return /auto|scroll|overlay|hidden|clip/.test(overflow + overflowY + overflowX) && !["inline", "contents"].includes(display);
}
function isTableElement(element) {
  return ["table", "td", "th"].includes(getNodeName(element));
}
function isTopLayer(element) {
  return [":popover-open", ":modal"].some((selector) => {
    try {
      return element.matches(selector);
    } catch (e) {
      return false;
    }
  });
}
function isContainingBlock(elementOrCss) {
  const webkit = isWebKit();
  const css = isElement(elementOrCss) ? getComputedStyle2(elementOrCss) : elementOrCss;
  return css.transform !== "none" || css.perspective !== "none" || (css.containerType ? css.containerType !== "normal" : false) || !webkit && (css.backdropFilter ? css.backdropFilter !== "none" : false) || !webkit && (css.filter ? css.filter !== "none" : false) || ["transform", "perspective", "filter"].some((value) => (css.willChange || "").includes(value)) || ["paint", "layout", "strict", "content"].some((value) => (css.contain || "").includes(value));
}
function getContainingBlock(element) {
  let currentNode = getParentNode(element);
  while (isHTMLElement2(currentNode) && !isLastTraversableNode(currentNode)) {
    if (isContainingBlock(currentNode)) {
      return currentNode;
    } else if (isTopLayer(currentNode)) {
      return null;
    }
    currentNode = getParentNode(currentNode);
  }
  return null;
}
function isWebKit() {
  if (typeof CSS === "undefined" || !CSS.supports) return false;
  return CSS.supports("-webkit-backdrop-filter", "none");
}
function isLastTraversableNode(node) {
  return ["html", "body", "#document"].includes(getNodeName(node));
}
function getComputedStyle2(element) {
  return getWindow2(element).getComputedStyle(element);
}
function getNodeScroll(element) {
  if (isElement(element)) {
    return {
      scrollLeft: element.scrollLeft,
      scrollTop: element.scrollTop
    };
  }
  return {
    scrollLeft: element.scrollX,
    scrollTop: element.scrollY
  };
}
function getParentNode(node) {
  if (getNodeName(node) === "html") {
    return node;
  }
  const result = (
    // Step into the shadow DOM of the parent of a slotted node.
    node.assignedSlot || // DOM Element detected.
    node.parentNode || // ShadowRoot detected.
    isShadowRoot(node) && node.host || // Fallback.
    getDocumentElement(node)
  );
  return isShadowRoot(result) ? result.host : result;
}
function getNearestOverflowAncestor(node) {
  const parentNode = getParentNode(node);
  if (isLastTraversableNode(parentNode)) {
    return node.ownerDocument ? node.ownerDocument.body : node.body;
  }
  if (isHTMLElement2(parentNode) && isOverflowElement(parentNode)) {
    return parentNode;
  }
  return getNearestOverflowAncestor(parentNode);
}
function getOverflowAncestors(node, list, traverseIframes) {
  var _node$ownerDocument2;
  if (list === void 0) {
    list = [];
  }
  if (traverseIframes === void 0) {
    traverseIframes = true;
  }
  const scrollableAncestor = getNearestOverflowAncestor(node);
  const isBody = scrollableAncestor === ((_node$ownerDocument2 = node.ownerDocument) == null ? void 0 : _node$ownerDocument2.body);
  const win = getWindow2(scrollableAncestor);
  if (isBody) {
    const frameElement = getFrameElement(win);
    return list.concat(win, win.visualViewport || [], isOverflowElement(scrollableAncestor) ? scrollableAncestor : [], frameElement && traverseIframes ? getOverflowAncestors(frameElement) : []);
  }
  return list.concat(scrollableAncestor, getOverflowAncestors(scrollableAncestor, [], traverseIframes));
}
function getFrameElement(win) {
  return win.parent && Object.getPrototypeOf(win.parent) ? win.frameElement : null;
}

// node_modules/@floating-ui/dom/dist/floating-ui.dom.mjs
function getCssDimensions(element) {
  const css = getComputedStyle2(element);
  let width = parseFloat(css.width) || 0;
  let height = parseFloat(css.height) || 0;
  const hasOffset = isHTMLElement2(element);
  const offsetWidth = hasOffset ? element.offsetWidth : width;
  const offsetHeight = hasOffset ? element.offsetHeight : height;
  const shouldFallback = round(width) !== offsetWidth || round(height) !== offsetHeight;
  if (shouldFallback) {
    width = offsetWidth;
    height = offsetHeight;
  }
  return {
    width,
    height,
    $: shouldFallback
  };
}
function unwrapElement(element) {
  return !isElement(element) ? element.contextElement : element;
}
function getScale(element) {
  const domElement = unwrapElement(element);
  if (!isHTMLElement2(domElement)) {
    return createCoords(1);
  }
  const rect = domElement.getBoundingClientRect();
  const {
    width,
    height,
    $
  } = getCssDimensions(domElement);
  let x = ($ ? round(rect.width) : rect.width) / width;
  let y = ($ ? round(rect.height) : rect.height) / height;
  if (!x || !Number.isFinite(x)) {
    x = 1;
  }
  if (!y || !Number.isFinite(y)) {
    y = 1;
  }
  return {
    x,
    y
  };
}
var noOffsets = createCoords(0);
function getVisualOffsets(element) {
  const win = getWindow2(element);
  if (!isWebKit() || !win.visualViewport) {
    return noOffsets;
  }
  return {
    x: win.visualViewport.offsetLeft,
    y: win.visualViewport.offsetTop
  };
}
function shouldAddVisualOffsets(element, isFixed, floatingOffsetParent) {
  if (isFixed === void 0) {
    isFixed = false;
  }
  if (!floatingOffsetParent || isFixed && floatingOffsetParent !== getWindow2(element)) {
    return false;
  }
  return isFixed;
}
function getBoundingClientRect(element, includeScale, isFixedStrategy, offsetParent) {
  if (includeScale === void 0) {
    includeScale = false;
  }
  if (isFixedStrategy === void 0) {
    isFixedStrategy = false;
  }
  const clientRect = element.getBoundingClientRect();
  const domElement = unwrapElement(element);
  let scale = createCoords(1);
  if (includeScale) {
    if (offsetParent) {
      if (isElement(offsetParent)) {
        scale = getScale(offsetParent);
      }
    } else {
      scale = getScale(element);
    }
  }
  const visualOffsets = shouldAddVisualOffsets(domElement, isFixedStrategy, offsetParent) ? getVisualOffsets(domElement) : createCoords(0);
  let x = (clientRect.left + visualOffsets.x) / scale.x;
  let y = (clientRect.top + visualOffsets.y) / scale.y;
  let width = clientRect.width / scale.x;
  let height = clientRect.height / scale.y;
  if (domElement) {
    const win = getWindow2(domElement);
    const offsetWin = offsetParent && isElement(offsetParent) ? getWindow2(offsetParent) : offsetParent;
    let currentWin = win;
    let currentIFrame = getFrameElement(currentWin);
    while (currentIFrame && offsetParent && offsetWin !== currentWin) {
      const iframeScale = getScale(currentIFrame);
      const iframeRect = currentIFrame.getBoundingClientRect();
      const css = getComputedStyle2(currentIFrame);
      const left = iframeRect.left + (currentIFrame.clientLeft + parseFloat(css.paddingLeft)) * iframeScale.x;
      const top = iframeRect.top + (currentIFrame.clientTop + parseFloat(css.paddingTop)) * iframeScale.y;
      x *= iframeScale.x;
      y *= iframeScale.y;
      width *= iframeScale.x;
      height *= iframeScale.y;
      x += left;
      y += top;
      currentWin = getWindow2(currentIFrame);
      currentIFrame = getFrameElement(currentWin);
    }
  }
  return rectToClientRect({
    width,
    height,
    x,
    y
  });
}
function convertOffsetParentRelativeRectToViewportRelativeRect(_ref) {
  let {
    elements,
    rect,
    offsetParent,
    strategy
  } = _ref;
  const isFixed = strategy === "fixed";
  const documentElement = getDocumentElement(offsetParent);
  const topLayer = elements ? isTopLayer(elements.floating) : false;
  if (offsetParent === documentElement || topLayer && isFixed) {
    return rect;
  }
  let scroll = {
    scrollLeft: 0,
    scrollTop: 0
  };
  let scale = createCoords(1);
  const offsets = createCoords(0);
  const isOffsetParentAnElement = isHTMLElement2(offsetParent);
  if (isOffsetParentAnElement || !isOffsetParentAnElement && !isFixed) {
    if (getNodeName(offsetParent) !== "body" || isOverflowElement(documentElement)) {
      scroll = getNodeScroll(offsetParent);
    }
    if (isHTMLElement2(offsetParent)) {
      const offsetRect = getBoundingClientRect(offsetParent);
      scale = getScale(offsetParent);
      offsets.x = offsetRect.x + offsetParent.clientLeft;
      offsets.y = offsetRect.y + offsetParent.clientTop;
    }
  }
  return {
    width: rect.width * scale.x,
    height: rect.height * scale.y,
    x: rect.x * scale.x - scroll.scrollLeft * scale.x + offsets.x,
    y: rect.y * scale.y - scroll.scrollTop * scale.y + offsets.y
  };
}
function getClientRects(element) {
  return Array.from(element.getClientRects());
}
function getWindowScrollBarX(element) {
  return getBoundingClientRect(getDocumentElement(element)).left + getNodeScroll(element).scrollLeft;
}
function getDocumentRect(element) {
  const html = getDocumentElement(element);
  const scroll = getNodeScroll(element);
  const body = element.ownerDocument.body;
  const width = max(html.scrollWidth, html.clientWidth, body.scrollWidth, body.clientWidth);
  const height = max(html.scrollHeight, html.clientHeight, body.scrollHeight, body.clientHeight);
  let x = -scroll.scrollLeft + getWindowScrollBarX(element);
  const y = -scroll.scrollTop;
  if (getComputedStyle2(body).direction === "rtl") {
    x += max(html.clientWidth, body.clientWidth) - width;
  }
  return {
    width,
    height,
    x,
    y
  };
}
function getViewportRect(element, strategy) {
  const win = getWindow2(element);
  const html = getDocumentElement(element);
  const visualViewport = win.visualViewport;
  let width = html.clientWidth;
  let height = html.clientHeight;
  let x = 0;
  let y = 0;
  if (visualViewport) {
    width = visualViewport.width;
    height = visualViewport.height;
    const visualViewportBased = isWebKit();
    if (!visualViewportBased || visualViewportBased && strategy === "fixed") {
      x = visualViewport.offsetLeft;
      y = visualViewport.offsetTop;
    }
  }
  return {
    width,
    height,
    x,
    y
  };
}
function getInnerBoundingClientRect(element, strategy) {
  const clientRect = getBoundingClientRect(element, true, strategy === "fixed");
  const top = clientRect.top + element.clientTop;
  const left = clientRect.left + element.clientLeft;
  const scale = isHTMLElement2(element) ? getScale(element) : createCoords(1);
  const width = element.clientWidth * scale.x;
  const height = element.clientHeight * scale.y;
  const x = left * scale.x;
  const y = top * scale.y;
  return {
    width,
    height,
    x,
    y
  };
}
function getClientRectFromClippingAncestor(element, clippingAncestor, strategy) {
  let rect;
  if (clippingAncestor === "viewport") {
    rect = getViewportRect(element, strategy);
  } else if (clippingAncestor === "document") {
    rect = getDocumentRect(getDocumentElement(element));
  } else if (isElement(clippingAncestor)) {
    rect = getInnerBoundingClientRect(clippingAncestor, strategy);
  } else {
    const visualOffsets = getVisualOffsets(element);
    rect = {
      ...clippingAncestor,
      x: clippingAncestor.x - visualOffsets.x,
      y: clippingAncestor.y - visualOffsets.y
    };
  }
  return rectToClientRect(rect);
}
function hasFixedPositionAncestor(element, stopNode) {
  const parentNode = getParentNode(element);
  if (parentNode === stopNode || !isElement(parentNode) || isLastTraversableNode(parentNode)) {
    return false;
  }
  return getComputedStyle2(parentNode).position === "fixed" || hasFixedPositionAncestor(parentNode, stopNode);
}
function getClippingElementAncestors(element, cache) {
  const cachedResult = cache.get(element);
  if (cachedResult) {
    return cachedResult;
  }
  let result = getOverflowAncestors(element, [], false).filter((el) => isElement(el) && getNodeName(el) !== "body");
  let currentContainingBlockComputedStyle = null;
  const elementIsFixed = getComputedStyle2(element).position === "fixed";
  let currentNode = elementIsFixed ? getParentNode(element) : element;
  while (isElement(currentNode) && !isLastTraversableNode(currentNode)) {
    const computedStyle = getComputedStyle2(currentNode);
    const currentNodeIsContaining = isContainingBlock(currentNode);
    if (!currentNodeIsContaining && computedStyle.position === "fixed") {
      currentContainingBlockComputedStyle = null;
    }
    const shouldDropCurrentNode = elementIsFixed ? !currentNodeIsContaining && !currentContainingBlockComputedStyle : !currentNodeIsContaining && computedStyle.position === "static" && !!currentContainingBlockComputedStyle && ["absolute", "fixed"].includes(currentContainingBlockComputedStyle.position) || isOverflowElement(currentNode) && !currentNodeIsContaining && hasFixedPositionAncestor(element, currentNode);
    if (shouldDropCurrentNode) {
      result = result.filter((ancestor) => ancestor !== currentNode);
    } else {
      currentContainingBlockComputedStyle = computedStyle;
    }
    currentNode = getParentNode(currentNode);
  }
  cache.set(element, result);
  return result;
}
function getClippingRect(_ref) {
  let {
    element,
    boundary,
    rootBoundary,
    strategy
  } = _ref;
  const elementClippingAncestors = boundary === "clippingAncestors" ? isTopLayer(element) ? [] : getClippingElementAncestors(element, this._c) : [].concat(boundary);
  const clippingAncestors = [...elementClippingAncestors, rootBoundary];
  const firstClippingAncestor = clippingAncestors[0];
  const clippingRect = clippingAncestors.reduce((accRect, clippingAncestor) => {
    const rect = getClientRectFromClippingAncestor(element, clippingAncestor, strategy);
    accRect.top = max(rect.top, accRect.top);
    accRect.right = min(rect.right, accRect.right);
    accRect.bottom = min(rect.bottom, accRect.bottom);
    accRect.left = max(rect.left, accRect.left);
    return accRect;
  }, getClientRectFromClippingAncestor(element, firstClippingAncestor, strategy));
  return {
    width: clippingRect.right - clippingRect.left,
    height: clippingRect.bottom - clippingRect.top,
    x: clippingRect.left,
    y: clippingRect.top
  };
}
function getDimensions(element) {
  const {
    width,
    height
  } = getCssDimensions(element);
  return {
    width,
    height
  };
}
function getRectRelativeToOffsetParent(element, offsetParent, strategy) {
  const isOffsetParentAnElement = isHTMLElement2(offsetParent);
  const documentElement = getDocumentElement(offsetParent);
  const isFixed = strategy === "fixed";
  const rect = getBoundingClientRect(element, true, isFixed, offsetParent);
  let scroll = {
    scrollLeft: 0,
    scrollTop: 0
  };
  const offsets = createCoords(0);
  if (isOffsetParentAnElement || !isOffsetParentAnElement && !isFixed) {
    if (getNodeName(offsetParent) !== "body" || isOverflowElement(documentElement)) {
      scroll = getNodeScroll(offsetParent);
    }
    if (isOffsetParentAnElement) {
      const offsetRect = getBoundingClientRect(offsetParent, true, isFixed, offsetParent);
      offsets.x = offsetRect.x + offsetParent.clientLeft;
      offsets.y = offsetRect.y + offsetParent.clientTop;
    } else if (documentElement) {
      offsets.x = getWindowScrollBarX(documentElement);
    }
  }
  const x = rect.left + scroll.scrollLeft - offsets.x;
  const y = rect.top + scroll.scrollTop - offsets.y;
  return {
    x,
    y,
    width: rect.width,
    height: rect.height
  };
}
function isStaticPositioned(element) {
  return getComputedStyle2(element).position === "static";
}
function getTrueOffsetParent(element, polyfill) {
  if (!isHTMLElement2(element) || getComputedStyle2(element).position === "fixed") {
    return null;
  }
  if (polyfill) {
    return polyfill(element);
  }
  return element.offsetParent;
}
function getOffsetParent(element, polyfill) {
  const win = getWindow2(element);
  if (isTopLayer(element)) {
    return win;
  }
  if (!isHTMLElement2(element)) {
    let svgOffsetParent = getParentNode(element);
    while (svgOffsetParent && !isLastTraversableNode(svgOffsetParent)) {
      if (isElement(svgOffsetParent) && !isStaticPositioned(svgOffsetParent)) {
        return svgOffsetParent;
      }
      svgOffsetParent = getParentNode(svgOffsetParent);
    }
    return win;
  }
  let offsetParent = getTrueOffsetParent(element, polyfill);
  while (offsetParent && isTableElement(offsetParent) && isStaticPositioned(offsetParent)) {
    offsetParent = getTrueOffsetParent(offsetParent, polyfill);
  }
  if (offsetParent && isLastTraversableNode(offsetParent) && isStaticPositioned(offsetParent) && !isContainingBlock(offsetParent)) {
    return win;
  }
  return offsetParent || getContainingBlock(element) || win;
}
var getElementRects = async function(data) {
  const getOffsetParentFn = this.getOffsetParent || getOffsetParent;
  const getDimensionsFn = this.getDimensions;
  const floatingDimensions = await getDimensionsFn(data.floating);
  return {
    reference: getRectRelativeToOffsetParent(data.reference, await getOffsetParentFn(data.floating), data.strategy),
    floating: {
      x: 0,
      y: 0,
      width: floatingDimensions.width,
      height: floatingDimensions.height
    }
  };
};
function isRTL(element) {
  return getComputedStyle2(element).direction === "rtl";
}
var platform = {
  convertOffsetParentRelativeRectToViewportRelativeRect,
  getDocumentElement,
  getClippingRect,
  getOffsetParent,
  getElementRects,
  getClientRects,
  getDimensions,
  getScale,
  isElement,
  isRTL
};
function observeMove(element, onMove) {
  let io = null;
  let timeoutId;
  const root = getDocumentElement(element);
  function cleanup() {
    var _io;
    clearTimeout(timeoutId);
    (_io = io) == null || _io.disconnect();
    io = null;
  }
  function refresh(skip, threshold) {
    if (skip === void 0) {
      skip = false;
    }
    if (threshold === void 0) {
      threshold = 1;
    }
    cleanup();
    const {
      left,
      top,
      width,
      height
    } = element.getBoundingClientRect();
    if (!skip) {
      onMove();
    }
    if (!width || !height) {
      return;
    }
    const insetTop = floor(top);
    const insetRight = floor(root.clientWidth - (left + width));
    const insetBottom = floor(root.clientHeight - (top + height));
    const insetLeft = floor(left);
    const rootMargin = -insetTop + "px " + -insetRight + "px " + -insetBottom + "px " + -insetLeft + "px";
    const options = {
      rootMargin,
      threshold: max(0, min(1, threshold)) || 1
    };
    let isFirstUpdate = true;
    function handleObserve(entries) {
      const ratio = entries[0].intersectionRatio;
      if (ratio !== threshold) {
        if (!isFirstUpdate) {
          return refresh();
        }
        if (!ratio) {
          timeoutId = setTimeout(() => {
            refresh(false, 1e-7);
          }, 1e3);
        } else {
          refresh(false, ratio);
        }
      }
      isFirstUpdate = false;
    }
    try {
      io = new IntersectionObserver(handleObserve, {
        ...options,
        // Handle <iframe>s
        root: root.ownerDocument
      });
    } catch (e) {
      io = new IntersectionObserver(handleObserve, options);
    }
    io.observe(element);
  }
  refresh(true);
  return cleanup;
}
function autoUpdate(reference, floating, update, options) {
  if (options === void 0) {
    options = {};
  }
  const {
    ancestorScroll = true,
    ancestorResize = true,
    elementResize = typeof ResizeObserver === "function",
    layoutShift = typeof IntersectionObserver === "function",
    animationFrame = false
  } = options;
  const referenceEl = unwrapElement(reference);
  const ancestors = ancestorScroll || ancestorResize ? [...referenceEl ? getOverflowAncestors(referenceEl) : [], ...getOverflowAncestors(floating)] : [];
  ancestors.forEach((ancestor) => {
    ancestorScroll && ancestor.addEventListener("scroll", update, {
      passive: true
    });
    ancestorResize && ancestor.addEventListener("resize", update);
  });
  const cleanupIo = referenceEl && layoutShift ? observeMove(referenceEl, update) : null;
  let reobserveFrame = -1;
  let resizeObserver = null;
  if (elementResize) {
    resizeObserver = new ResizeObserver((_ref) => {
      let [firstEntry] = _ref;
      if (firstEntry && firstEntry.target === referenceEl && resizeObserver) {
        resizeObserver.unobserve(floating);
        cancelAnimationFrame(reobserveFrame);
        reobserveFrame = requestAnimationFrame(() => {
          var _resizeObserver;
          (_resizeObserver = resizeObserver) == null || _resizeObserver.observe(floating);
        });
      }
      update();
    });
    if (referenceEl && !animationFrame) {
      resizeObserver.observe(referenceEl);
    }
    resizeObserver.observe(floating);
  }
  let frameId;
  let prevRefRect = animationFrame ? getBoundingClientRect(reference) : null;
  if (animationFrame) {
    frameLoop();
  }
  function frameLoop() {
    const nextRefRect = getBoundingClientRect(reference);
    if (prevRefRect && (nextRefRect.x !== prevRefRect.x || nextRefRect.y !== prevRefRect.y || nextRefRect.width !== prevRefRect.width || nextRefRect.height !== prevRefRect.height)) {
      update();
    }
    prevRefRect = nextRefRect;
    frameId = requestAnimationFrame(frameLoop);
  }
  update();
  return () => {
    var _resizeObserver2;
    ancestors.forEach((ancestor) => {
      ancestorScroll && ancestor.removeEventListener("scroll", update);
      ancestorResize && ancestor.removeEventListener("resize", update);
    });
    cleanupIo == null || cleanupIo();
    (_resizeObserver2 = resizeObserver) == null || _resizeObserver2.disconnect();
    resizeObserver = null;
    if (animationFrame) {
      cancelAnimationFrame(frameId);
    }
  };
}
var offset2 = offset;
var shift2 = shift;
var flip2 = flip;
var size2 = size;
var computePosition2 = (reference, floating, options) => {
  const cache = /* @__PURE__ */ new Map();
  const mergedOptions = {
    platform,
    ...options
  };
  const platformWithCache = {
    ...mergedOptions.platform,
    _c: cache
  };
  return computePosition(reference, floating, {
    ...mergedOptions,
    platform: platformWithCache
  });
};

// node_modules/@floating-ui/vue/dist/floating-ui.vue.mjs
function isComponentPublicInstance(target) {
  return target != null && typeof target === "object" && "$el" in target;
}
function unwrapElement2(target) {
  if (isComponentPublicInstance(target)) {
    const element = target.$el;
    return isNode(element) && getNodeName(element) === "#comment" ? null : element;
  }
  return target;
}
function toValue(source) {
  return typeof source === "function" ? source() : unref(source);
}
function getDPR(element) {
  if (typeof window === "undefined") {
    return 1;
  }
  const win = element.ownerDocument.defaultView || window;
  return win.devicePixelRatio || 1;
}
function roundByDPR(element, value) {
  const dpr = getDPR(element);
  return Math.round(value * dpr) / dpr;
}
function useFloating(reference, floating, options) {
  if (options === void 0) {
    options = {};
  }
  const whileElementsMountedOption = options.whileElementsMounted;
  const openOption = computed(() => {
    var _toValue;
    return (_toValue = toValue(options.open)) != null ? _toValue : true;
  });
  const middlewareOption = computed(() => toValue(options.middleware));
  const placementOption = computed(() => {
    var _toValue2;
    return (_toValue2 = toValue(options.placement)) != null ? _toValue2 : "bottom";
  });
  const strategyOption = computed(() => {
    var _toValue3;
    return (_toValue3 = toValue(options.strategy)) != null ? _toValue3 : "absolute";
  });
  const transformOption = computed(() => {
    var _toValue4;
    return (_toValue4 = toValue(options.transform)) != null ? _toValue4 : true;
  });
  const referenceElement = computed(() => unwrapElement2(reference.value));
  const floatingElement = computed(() => unwrapElement2(floating.value));
  const x = ref(0);
  const y = ref(0);
  const strategy = ref(strategyOption.value);
  const placement = ref(placementOption.value);
  const middlewareData = shallowRef({});
  const isPositioned = ref(false);
  const floatingStyles = computed(() => {
    const initialStyles = {
      position: strategy.value,
      left: "0",
      top: "0"
    };
    if (!floatingElement.value) {
      return initialStyles;
    }
    const xVal = roundByDPR(floatingElement.value, x.value);
    const yVal = roundByDPR(floatingElement.value, y.value);
    if (transformOption.value) {
      return {
        ...initialStyles,
        transform: "translate(" + xVal + "px, " + yVal + "px)",
        ...getDPR(floatingElement.value) >= 1.5 && {
          willChange: "transform"
        }
      };
    }
    return {
      position: strategy.value,
      left: xVal + "px",
      top: yVal + "px"
    };
  });
  let whileElementsMountedCleanup;
  function update() {
    if (referenceElement.value == null || floatingElement.value == null) {
      return;
    }
    computePosition2(referenceElement.value, floatingElement.value, {
      middleware: middlewareOption.value,
      placement: placementOption.value,
      strategy: strategyOption.value
    }).then((position) => {
      x.value = position.x;
      y.value = position.y;
      strategy.value = position.strategy;
      placement.value = position.placement;
      middlewareData.value = position.middlewareData;
      isPositioned.value = true;
    });
  }
  function cleanup() {
    if (typeof whileElementsMountedCleanup === "function") {
      whileElementsMountedCleanup();
      whileElementsMountedCleanup = void 0;
    }
  }
  function attach() {
    cleanup();
    if (whileElementsMountedOption === void 0) {
      update();
      return;
    }
    if (referenceElement.value != null && floatingElement.value != null) {
      whileElementsMountedCleanup = whileElementsMountedOption(referenceElement.value, floatingElement.value, update);
      return;
    }
  }
  function reset() {
    if (!openOption.value) {
      isPositioned.value = false;
    }
  }
  watch([middlewareOption, placementOption, strategyOption], update, {
    flush: "sync"
  });
  watch([referenceElement, floatingElement], attach, {
    flush: "sync"
  });
  watch(openOption, reset, {
    flush: "sync"
  });
  if (getCurrentScope()) {
    onScopeDispose(cleanup);
  }
  return {
    x: shallowReadonly(x),
    y: shallowReadonly(y),
    strategy: shallowReadonly(strategy),
    placement: shallowReadonly(placement),
    middlewareData: shallowReadonly(middlewareData),
    isPositioned: shallowReadonly(isPositioned),
    floatingStyles,
    update
  };
}

// node_modules/vuestic-ui/dist/es/src/components/va-dropdown/hooks/useDropdown.js
var useDropdown = (anchorComputed, floating, target, options) => {
  const placementComputed = computed(() => {
    const { position, align } = usePlacementAliases({ placement: options.value.placement });
    return `${position.value}-${align.value}`;
  });
  const offsetComputed = computed(() => {
    const dropdownOffset = options.value.offset;
    const result = { mainAxis: 0, crossAxis: 0 };
    if (Array.isArray(dropdownOffset)) {
      result.mainAxis = dropdownOffset[0];
      result.crossAxis = dropdownOffset[1];
    }
    if (typeof dropdownOffset === "number") {
      result.mainAxis = dropdownOffset;
    }
    return result;
  });
  const middlewareComputed = computed(() => {
    const { autoPlacement: autoPlacement3, stickToEdges, keepAnchorWidth, verticalScrollOnOverflow } = options.value;
    const result = [
      offset2(offsetComputed.value)
    ];
    if (autoPlacement3) {
      result.push(
        // boundary doesn't work with ssr (trying to access document)
        flip2({
          boundary: target.value
        })
      );
    }
    if (stickToEdges) {
      result.push(
        shift2()
      );
    }
    if (keepAnchorWidth || verticalScrollOnOverflow) {
      result.push(size2({
        apply({ elements, availableHeight }) {
          if (keepAnchorWidth) {
            const reference = elements.reference;
            const availableWidth = reference.getBoundingClientRect().width;
            Object.assign(elements.floating.style, {
              // Don't set width here, because some plugin applies width 100% and it breaks layout
              maxWidth: `${availableWidth}px`,
              minWidth: `${availableWidth}px`
            });
          }
          if (verticalScrollOnOverflow) {
            Object.assign(elements.floating.style, {
              maxHeight: `${availableHeight}px`
            });
          }
        }
      }));
    }
    return result;
  });
  const { floatingStyles, isPositioned } = typeof document === "undefined" ? { floatingStyles: {}, isPositioned: ref(false) } : useFloating(anchorComputed, floating, {
    placement: placementComputed,
    whileElementsMounted: autoUpdate,
    middleware: middlewareComputed,
    transform: true
  });
  return {
    // Because floating ui by default set top and left to 0 before position calculated, dropdown jumps to the left top corner
    // If user wants to make focus on el as soon as Dropdown is opened, page will be scrolled on the left top corner
    floatingStyles: computed(() => {
      if (!isPositioned.value) {
        return {
          position: "fixed"
        };
      }
      return floatingStyles.value;
    }),
    isPositioned
  };
};

// node_modules/vuestic-ui/dist/es/src/composables/useFocusOutside.js
var checkIfElementChild2 = (parent, child) => {
  if (!child) {
    return false;
  }
  if (child instanceof Window) {
    return false;
  }
  if (child.parentElement === parent) {
    return true;
  }
  return parent.contains(child);
};
var safeArray2 = (a) => Array.isArray(a) ? a : [a];
var useFocusOutside = (elements, cb, options = {}) => {
  let previouslyClicked2 = false;
  if (options.onlyKeyboard) {
    useEvent("mousedown", (e) => {
      previouslyClicked2 = true;
      setTimeout(() => {
        previouslyClicked2 = false;
      }, 200);
    }, true);
  }
  useEvent("focus", (event) => {
    if (options.onlyKeyboard && previouslyClicked2) {
      return;
    }
    const focusTarget = event.target;
    if (event.target.shadowRoot) {
      return;
    }
    const isFocusInside = safeArray2(elements).some((element) => {
      const el = unwrapEl(unref(element));
      return el && checkIfElementChild2(el, focusTarget);
    });
    if (!isFocusInside) {
      cb(focusTarget);
    }
  }, true);
};

// node_modules/vuestic-ui/dist/es/src/composables/useHTMLElementSelector.js
var useHTMLElementSelector = (key) => {
  return computed(() => {
    if (typeof (key == null ? void 0 : key.value) === "string") {
      return document == null ? void 0 : document.querySelector(key.value);
    }
    return unwrapEl(key == null ? void 0 : key.value);
  });
};

// node_modules/vuestic-ui/dist/es/src/components/va-dropdown/VaDropdown.vue_vue_type_script_lang.js
import "D:/Github/DONGTIAN/ui/node_modules/vuestic-ui/dist/es/VaDropdown.css";
var _sfc_main25 = defineComponent({
  name: "VaDropdown",
  props: {
    ...usePlacementAliasesProps,
    ...createStatefulProps(true),
    modelValue: { type: Boolean, default: false },
    anchor: { type: [String, Object], default: void 0 },
    anchorSelector: { type: String, default: "" },
    innerAnchorSelector: { type: String, default: "" },
    trigger: {
      type: [String, Array],
      default: () => ["click", "space", "enter", "arrow-down", "arrow-up"]
    },
    disabled: { type: Boolean },
    readonly: { type: Boolean },
    closeOnClickOutside: { type: Boolean, default: true },
    closeOnFocusOutside: { type: Boolean, default: true },
    closeOnAnchorClick: { type: Boolean, default: true },
    closeOnContentClick: { type: Boolean, default: true },
    hoverOverTimeout: { type: [Number, String], default: 30 },
    hoverOutTimeout: { type: [Number, String], default: 200 },
    isContentHoverable: { type: Boolean, default: true },
    offset: { type: [Array, Number], default: 0 },
    keepAnchorWidth: { type: Boolean, default: false },
    verticalScrollOnOverflow: { type: Boolean, default: true },
    cursor: { type: [Boolean, Object], default: false },
    autoPlacement: { type: Boolean, default: true },
    stickToEdges: { type: Boolean, default: false },
    /** Viewport where dropdown will be rendered. Autoplacement will be calculated relative to `target` */
    target: { type: [String, Object], default: void 0 },
    /** Element where dropdown content will be rendered. */
    teleport: { type: [String, Object], default: void 0 },
    /** Not reactive */
    keyboardNavigation: { type: Boolean, default: true },
    ariaLabel: useTranslationProp("$t:toggleDropdown"),
    role: { type: String, default: "button" },
    contentClass: { type: String, default: "" }
  },
  emits: [...useStatefulEmits, "anchor-click", "anchor-right-click", "content-click", "click-outside", "focus-outside", "close", "open", "anchor-dblclick"],
  setup(props, { emit }) {
    const { valueComputed } = useStateful(props, emit, "modelValue");
    watch(valueComputed, (isOpened) => {
      if (isOpened) {
        emit("open");
      } else {
        emit("close");
      }
    });
    const isMounted = useIsMounted();
    const { anchorRef } = useAnchorSelector(props);
    const cursorAnchor = useCursorAnchor(anchorRef, computed(() => Boolean(props.cursor)));
    const floating = useHTMLElement("floating");
    const body = useHTMLElementSelector(ref("body"));
    const target = useHTMLElementSelector(computed(() => props.target));
    const teleport = useHTMLElementSelector(computed(() => props.teleport));
    const anchorClass = useBem("va-dropdown", () => pick(props, ["disabled"]));
    const teleportTarget = computed(() => {
      if (teleport.value) {
        return teleport.value;
      }
      if (target.value) {
        return target.value;
      }
      if (anchorRef.value) {
        const root = anchorRef.value.getRootNode();
        if (root instanceof ShadowRoot) {
          const el = [...root.children].find((c) => c.tagName !== "STYLE");
          if (el) {
            return el;
          }
        }
      }
      return body.value;
    });
    const showFloating = computed(() => isMounted.value && valueComputed.value);
    useNavigation(
      valueComputed,
      anchorRef,
      floating,
      props
    );
    const emitAndClose = (eventName, close, e) => {
      emit(eventName, e);
      if (close) {
        valueComputed.value = false;
      }
    };
    useClickOutside([anchorRef, floating], () => {
      if (props.closeOnClickOutside && valueComputed.value) {
        emitAndClose("click-outside", props.closeOnClickOutside);
      }
    });
    useFocusOutside([floating], () => {
      if (props.closeOnFocusOutside && valueComputed.value) {
        emitAndClose("focus-outside", props.closeOnFocusOutside);
      }
    }, { onlyKeyboard: true });
    const anchorComputed = computed(() => {
      if (typeof props.cursor === "object") {
        return props.cursor;
      }
      return props.cursor ? cursorAnchor.value : anchorRef.value;
    });
    const { floatingStyles } = useDropdown(
      anchorComputed,
      floating,
      target,
      computed(() => ({
        placement: props.placement,
        offset: props.offset,
        autoPlacement: props.autoPlacement,
        stickToEdges: props.stickToEdges,
        keepAnchorWidth: props.keepAnchorWidth,
        verticalScrollOnOverflow: props.verticalScrollOnOverflow
      }))
    );
    const hide3 = () => {
      valueComputed.value = false;
    };
    const show = () => {
      valueComputed.value = true;
    };
    const {
      zIndex
    } = useZIndex(valueComputed);
    watch(valueComputed, (isOpened) => {
      if (!props.keyboardNavigation) {
        return;
      }
      if (isOpened) {
        nextTick(() => {
          const el = unwrapEl(floating.value);
          if (!el) {
            return;
          }
          focusFirstFocusableChild(el);
        });
      } else {
        if (!anchorRef.value) {
          return;
        }
        focusFirstFocusableChild(anchorRef.value);
      }
    });
    return {
      ...useTranslation(),
      ...useTeleported(),
      anchorRef,
      anchorClass,
      floating,
      floatingStyles,
      showFloating,
      teleportTarget,
      isMounted,
      valueComputed,
      hide: hide3,
      show,
      zIndex
    };
  },
  render() {
    const slotBind = {
      isOpened: this.valueComputed,
      hide: this.hide,
      show: this.show,
      toggle: () => this.valueComputed ? this.hide() : this.show(),
      getAnchorWidth: () => {
        var _a2;
        return ((_a2 = this.anchorRef) == null ? void 0 : _a2.offsetWidth) + "px";
      },
      getAnchorHeight: () => {
        var _a2;
        return ((_a2 = this.anchorRef) == null ? void 0 : _a2.offsetHeight) + "px";
      }
    };
    const floatingSlotNode = this.showFloating && renderSlotNode2(this.$slots.default, slotBind, {
      ref: "floating",
      class: ["va-dropdown__content-wrapper", this.$props.contentClass],
      style: [this.floatingStyles, { zIndex: this.zIndex }],
      ...this.teleportedAttrs
    });
    const anchorSlotVNode = renderSlotNode2(this.$slots.anchor, slotBind, {
      ref: "anchorRef",
      role: this.$props.role,
      class: ["va-dropdown", ...this.anchorClass.asArray.value],
      style: { position: "relative" },
      "aria-label": this.tp(this.$props.ariaLabel),
      "aria-disabled": this.$props.disabled,
      "aria-expanded": this.$props.role && this.$props.role !== "none" ? !!this.showFloating : void 0,
      ...this.teleportFromAttrs,
      ...this.$attrs
    });
    if (typeof this.$props.cursor === "object" && floatingSlotNode) {
      return h(
        Teleport,
        {
          to: this.teleportTarget,
          disabled: this.$props.disabled
        },
        [floatingSlotNode]
      );
    }
    if (!this.$props.anchorSelector && !anchorSlotVNode) {
      warn("VaDropdown: #anchor slot is missing");
      return;
    }
    if (this.showFloating && !floatingSlotNode) {
      warn("VaDropdown: default slot is missing");
      return;
    }
    return h(Fragment, {}, [
      anchorSlotVNode,
      floatingSlotNode && h(
        Teleport,
        {
          to: this.teleportTarget,
          disabled: this.$props.disabled
        },
        [floatingSlotNode]
      )
    ]);
  }
});

// node_modules/vuestic-ui/dist/es/src/components/va-dropdown/index.js
var VaDropdown = withConfigTransport$1(_sfc_main25);

// node_modules/vuestic-ui/dist/es/src/components/va-dropdown/components/VaDropdownContent/VaDropdownContent.vue_vue_type_script_setup_true_lang.js
import "D:/Github/DONGTIAN/ui/node_modules/vuestic-ui/dist/es/VaDropdownContent.css";
var _sfc_main26 = defineComponent({
  ...{
    name: "VaDropdownContent"
  },
  __name: "VaDropdownContent",
  props: {
    noPadding: { type: Boolean, default: false },
    background: { type: String, default: "background-secondary" },
    textColor: { type: String }
  },
  setup(__props) {
    const props = __props;
    const { getColor } = useColors();
    const { textColorComputed } = useTextColor(toRef(props, "background"));
    const computedStyle = computed(() => ({
      background: getColor(props.background, void 0, true),
      color: textColorComputed.value,
      padding: props.noPadding ? 0 : void 0
    }));
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: "va-dropdown__content",
        style: normalizeStyle(computedStyle.value),
        role: "listbox"
      }, [
        renderSlot(_ctx.$slots, "default")
      ], 4);
    };
  }
});

// node_modules/vuestic-ui/dist/es/src/components/va-dropdown/components/VaDropdownContent/index.js
var VaDropdownContent = withConfigTransport$1(_sfc_main26);

// node_modules/vuestic-ui/dist/es/src/composables/useEmitProxy.js
var getEvent = (event) => typeof event === "object" ? event.listen : event;
var getEmit = (event) => typeof event === "object" ? event.emit : event;
var useEmitProxy = (events) => {
  const createEmits3 = () => events.map(getEmit);
  const eventToListenerName = (event) => {
    const eventName = event.charAt(0).toUpperCase() + event.slice(1);
    return `on${eventName}`;
  };
  const createListeners3 = (emit) => {
    return events.reduce((acc, key) => ({
      ...acc,
      [eventToListenerName(getEvent(key))]: (...args) => emit(getEmit(key), ...args)
    }), {});
  };
  const createVOnListeners = (emit) => {
    return events.reduce((acc, key) => ({
      ...acc,
      [getEvent(key)]: (...args) => emit(getEmit(key), ...args)
    }), {});
  };
  return {
    createListeners: createListeners3,
    createVOnListeners,
    createEmits: createEmits3
  };
};

// node_modules/vuestic-ui/dist/es/src/components/va-button-dropdown/VaButtonDropdown.vue_vue_type_script_setup_true_lang.js
import "D:/Github/DONGTIAN/ui/node_modules/vuestic-ui/dist/es/VaButtonDropdown.css";
var { createEmits, createVOnListeners: createListeners } = useEmitProxy(["click"]);
var { createEmits: createMainButtonEmits, createVOnListeners: createMainButtonListeners } = useEmitProxy(
  [{ listen: "click", emit: "main-button-click" }]
);
var VaButtonProps2 = omit(extractComponentProps(VaButton), ["iconRight", "block"]);
var VaDropdownProps = extractComponentProps(VaDropdown);
var _sfc_main27 = defineComponent({
  ...{
    name: "VaButtonDropdown"
  },
  __name: "VaButtonDropdown",
  props: {
    ...useComponentPresetProp,
    ...VaButtonProps2,
    ...VaDropdownProps,
    ...useStatefulProps,
    ...usePlacementAliasesProps,
    modelValue: { type: Boolean, default: false },
    stateful: { type: Boolean, default: true },
    icon: { type: String, default: "va-arrow-down" },
    openedIcon: { type: String, default: "va-arrow-up" },
    hideIcon: { type: Boolean, default: false },
    leftIcon: { type: Boolean, default: false },
    iconColor: { type: String, default: "" },
    disabled: { type: Boolean, default: false },
    disableButton: { type: Boolean, default: false },
    disableDropdown: { type: Boolean, default: false },
    offset: { type: [Number, Array], default: 2 },
    keepAnchorWidth: { type: Boolean, default: false },
    closeOnContentClick: { type: Boolean, default: true },
    split: { type: Boolean },
    splitTo: { type: String, default: "" },
    splitHref: { type: String, default: "" },
    loading: { type: Boolean, default: false },
    label: { type: String },
    ariaLabel: useTranslationProp("$t:toggleDropdown")
  },
  emits: ["update:modelValue", ...createEmits(), ...createMainButtonEmits()],
  setup(__props, { expose: __expose, emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const { valueComputed } = useStateful(props, emit);
    const computedIcon = computed(() => valueComputed.value ? props.openedIcon : props.icon);
    const computedClass = useBem("va-button-dropdown", () => ({
      split: props.split
    }));
    const slots = useSlots();
    const computedButtonIcons = computed(() => {
      if (props.hideIcon) {
        return {};
      }
      const propName = (props.label || slots.label) && !props.leftIcon ? "icon-right" : "icon";
      return { [propName]: computedIcon.value };
    });
    const buttonPropsFiltered = computed(() => {
      const ignoredProps = ["to", "href", "loading", "icon"];
      const presetProps = [
        "plain",
        "textOpacity",
        "backgroundOpacity",
        "hoverOpacity",
        "hoverBehavior",
        "hoverOpacity",
        "pressedOpacity",
        "pressedBehavior",
        "pressedOpacity"
      ];
      if (props.preset) {
        return Object.keys(omit(VaButtonProps2, [...ignoredProps, ...presetProps]));
      }
      return Object.keys(omit(VaButtonProps2, ignoredProps));
    });
    const buttonPropsComputed = computed(
      () => Object.entries(props).filter(([key, _]) => buttonPropsFiltered.value.includes(key)).reduce((acc, [key, value]) => {
        Object.assign(acc, { [key]: value });
        return acc;
      }, {})
    );
    const computedMainButtonProps = computed(() => ({
      to: props.splitTo,
      href: props.splitHref,
      loading: props.loading
    }));
    const hideDropdown = () => {
      valueComputed.value = false;
    };
    const vaDropdownProps = filterComponentProps(VaDropdownProps);
    const listeners = createListeners(emit);
    const mainButtonListeners = createMainButtonListeners(emit);
    const { t, tp } = useTranslation();
    __expose({
      hideDropdown
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: normalizeClass(["va-button-dropdown", unref(computedClass)])
      }, [
        !_ctx.$props.split ? (openBlock(), createBlock(unref(VaDropdown), mergeProps({ key: 0 }, unref(vaDropdownProps), {
          modelValue: unref(valueComputed),
          "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => isRef(valueComputed) ? valueComputed.value = $event : null),
          disabled: _ctx.$props.disabled || _ctx.$props.disableDropdown
        }), {
          anchor: withCtx(() => [
            createVNode(unref(VaButton), mergeProps({
              "aria-label": unref(tp)(_ctx.$props.ariaLabel)
            }, { ...computedButtonIcons.value, ...buttonPropsComputed.value }, toHandlers(unref(listeners))), {
              default: withCtx(() => [
                renderSlot(_ctx.$slots, "label", {}, () => [
                  createTextVNode(toDisplayString(__props.label), 1)
                ])
              ]),
              _: 3
            }, 16, ["aria-label"])
          ]),
          default: withCtx(() => [
            renderSlot(_ctx.$slots, "content", {}, () => [
              createVNode(unref(VaDropdownContent), null, {
                default: withCtx(() => [
                  renderSlot(_ctx.$slots, "default")
                ]),
                _: 3
              })
            ])
          ]),
          _: 3
        }, 16, ["modelValue", "disabled"])) : (openBlock(), createBlock(unref(VaButtonGroup), normalizeProps(mergeProps({ key: 1 }, buttonPropsComputed.value)), {
          default: withCtx(() => [
            !_ctx.$props.leftIcon ? (openBlock(), createBlock(unref(VaButton), mergeProps({
              key: 0,
              disabled: _ctx.$props.disabled || _ctx.$props.disableButton
            }, computedMainButtonProps.value, toHandlers(unref(mainButtonListeners))), {
              default: withCtx(() => [
                renderSlot(_ctx.$slots, "label", {}, () => [
                  createTextVNode(toDisplayString(__props.label), 1)
                ])
              ]),
              _: 3
            }, 16, ["disabled"])) : createCommentVNode("", true),
            createVNode(unref(VaDropdown), mergeProps(unref(vaDropdownProps), {
              modelValue: unref(valueComputed),
              "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => isRef(valueComputed) ? valueComputed.value = $event : null),
              disabled: _ctx.$props.disabled || _ctx.$props.disableDropdown,
              teleport: _ctx.$el
            }), {
              anchor: withCtx(() => [
                createVNode(unref(VaButton), mergeProps({
                  "aria-label": _ctx.$props.ariaLabel || unref(t)("toggleDropdown"),
                  disabled: _ctx.$props.disabled || _ctx.$props.disableDropdown,
                  icon: computedIcon.value,
                  "icon-color": _ctx.$props.iconColor
                }, toHandlers(unref(listeners)), {
                  onKeydown: withKeys(withModifiers(hideDropdown, ["prevent"]), ["esc"])
                }), null, 16, ["aria-label", "disabled", "icon", "icon-color", "onKeydown"])
              ]),
              default: withCtx(() => [
                createVNode(unref(VaDropdownContent), null, {
                  default: withCtx(() => [
                    renderSlot(_ctx.$slots, "default")
                  ]),
                  _: 3
                })
              ]),
              _: 3
            }, 16, ["modelValue", "disabled", "teleport"]),
            _ctx.$props.leftIcon ? (openBlock(), createBlock(unref(VaButton), mergeProps({
              key: 1,
              disabled: _ctx.$props.disabled || _ctx.$props.disableButton
            }, computedMainButtonProps.value, toHandlers(unref(mainButtonListeners))), {
              default: withCtx(() => [
                renderSlot(_ctx.$slots, "label", {}, () => [
                  createTextVNode(toDisplayString(__props.label), 1)
                ])
              ]),
              _: 3
            }, 16, ["disabled"])) : createCommentVNode("", true)
          ]),
          _: 3
        }, 16))
      ], 2);
    };
  }
});

// node_modules/vuestic-ui/dist/es/src/components/va-button-dropdown/index.js
var VaButtonDropdown = withConfigTransport$1(_sfc_main27);

// node_modules/vuestic-ui/dist/es/src/utils/value-by-key.js
var getNestedValue = (option, propsArray) => {
  if (propsArray.length === 0) {
    return option;
  }
  const nestedItem = option[propsArray[0]];
  if (!isObject(nestedItem)) {
    if (propsArray.length === 1) {
      return nestedItem;
    }
    return void 0;
  }
  return getNestedValue(nestedItem, propsArray.slice(1));
};
var getValueByPath = (option, prop) => {
  if (prop in option) {
    return option[prop];
  }
  prop = prop.replace(/^\./, "");
  return getNestedValue(option, prop.split("."));
};
var getValueByKey = (option, prop) => {
  if (isNilValue(option) || typeof option !== "object" || Array.isArray(option)) {
    return void 0;
  }
  if (!prop) {
    return option;
  }
  if (typeof prop === "string") {
    return getValueByPath(option, prop);
  }
  if (typeof prop === "function") {
    return prop(option);
  }
  return option;
};

// node_modules/vuestic-ui/dist/es/src/composables/useSelectableList.js
var useSelectableListProps = {
  options: { type: Array, default: () => [] },
  textBy: { type: [String, Function], default: "text" },
  valueBy: { type: [String, Function], default: "" },
  trackBy: { type: [String, Function], default: "" },
  disabledBy: { type: [String, Function], default: "disabled" },
  groupBy: { type: [String, Function], default: "group" }
};
function useSelectableList(props) {
  const tryResolveByValue = (value) => {
    const options = props.options;
    for (let i = 0; i < options.length; i++) {
      if (getValue(options[i]) === value) {
        return options[i];
      }
    }
    return value;
  };
  const getOptionProperty = (option, prop) => {
    if (!isObject(option)) {
      return option;
    }
    return getValueByKey(option, prop);
  };
  const getTrackBy = (option) => {
    return props.trackBy ? getOptionProperty(option, props.trackBy) : getValue(option);
  };
  const getDisabled = (option) => {
    if (!isObject(option)) {
      return false;
    }
    return getOptionProperty(option, props.disabledBy);
  };
  const getText = (option) => {
    const optionText = getOptionProperty(option, props.textBy);
    if (["number", "boolean"].includes(typeof optionText)) {
      return String(optionText);
    }
    return optionText;
  };
  const getGroupBy = (option) => {
    if (!isObject(option)) {
      return void 0;
    }
    return getOptionProperty(option, props.groupBy);
  };
  const getValue = (option) => getOptionProperty(option, props.valueBy);
  return {
    tryResolveByValue,
    getValue,
    getText,
    getDisabled,
    getTrackBy,
    getGroupBy
  };
}

// node_modules/vuestic-ui/dist/es/src/components/va-button-toggle/VaButtonToggle.vue_vue_type_script_setup_true_lang.js
import "D:/Github/DONGTIAN/ui/node_modules/vuestic-ui/dist/es/VaButtonToggle.css";
var VaButtonGroupProps = extractComponentProps(VaButtonGroup);
var _sfc_main28 = defineComponent({
  ...{
    name: "VaButtonToggle"
  },
  __name: "VaButtonToggle",
  props: {
    ...VaButtonGroupProps,
    ...useComponentPresetProp,
    ...useSelectableListProps,
    modelValue: { type: [String, Number, Boolean, Object], default: "" },
    options: {
      type: Array,
      required: true
    },
    activeButtonTextColor: { type: String },
    toggleColor: { type: String, default: "" },
    textBy: { type: [String, Function], default: "label" },
    valueBy: { type: [String, Function], default: "value" }
  },
  emits: ["update:modelValue"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const { getText, getTrackBy } = useSelectableList(props);
    const { getColor, shiftHSLAColor: shiftHSLAColor2 } = useColors();
    const colorComputed = computed(() => getColor(props.color));
    const isToggled = (value) => getTrackBy(value) === props.modelValue;
    const activeButtonColor = computed(() => {
      if (props.toggleColor) {
        return getColor(props.toggleColor);
      }
      return shiftHSLAColor2(colorComputed.value, { l: props.plain ? -16 : -6 });
    });
    const activeButtonBackgroundOpacityComputed = computed(() => {
      if (!props.preset || props.preset === "default") {
        return {};
      }
      return { backgroundOpacity: props.pressedOpacity };
    });
    const activeButtonPropsComputed = computed(() => ({
      color: activeButtonColor.value,
      textColor: props.activeButtonTextColor,
      ...activeButtonBackgroundOpacityComputed.value
    }));
    const getButtonProps = (option = {}) => {
      const iconsProps = { icon: option.icon, iconRight: option.iconRight };
      if (!isToggled(option)) {
        return iconsProps;
      }
      return {
        ...isToggled(option) && activeButtonPropsComputed.value,
        ...iconsProps
      };
    };
    const buttonGroupPropsComputed = filterComponentProps(VaButtonGroupProps);
    const changeValue = (value) => emit("update:modelValue", getTrackBy(value));
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(VaButtonGroup), mergeProps({ class: "va-button-toggle" }, unref(buttonGroupPropsComputed)), {
        default: withCtx(() => [
          (openBlock(true), createElementBlock(Fragment, null, renderList(__props.options, (option) => {
            return openBlock(), createBlock(unref(VaButton), mergeProps({
              key: unref(getTrackBy)(option),
              "aria-pressed": isToggled(option)
            }, getButtonProps(option), {
              onClick: ($event) => changeValue(option)
            }), {
              default: withCtx(() => [
                createTextVNode(toDisplayString(unref(getText)(option)), 1)
              ]),
              _: 2
            }, 1040, ["aria-pressed", "onClick"]);
          }), 128))
        ]),
        _: 1
      }, 16);
    };
  }
});

// node_modules/vuestic-ui/dist/es/src/components/va-button-toggle/index.js
var VaButtonToggle = withConfigTransport$1(_sfc_main28);

// node_modules/vuestic-ui/dist/es/src/components/va-card/VaCard.vue_vue_type_script_setup_true_lang.js
import "D:/Github/DONGTIAN/ui/node_modules/vuestic-ui/dist/es/VaCard.css";
var _sfc_main29 = defineComponent({
  ...{
    name: "VaCard"
  },
  __name: "VaCard",
  props: {
    ...useRouterLinkProps,
    ...useComponentPresetProp,
    tag: { type: String, default: "div" },
    square: { type: Boolean, default: false },
    outlined: { type: Boolean, default: false },
    bordered: { type: Boolean, default: true },
    disabled: { type: Boolean, default: false },
    href: { type: String, default: "" },
    target: { type: String, default: "" },
    stripe: { type: Boolean, default: false },
    stripeColor: { type: String, default: "" },
    gradient: { type: Boolean, default: false },
    textColor: { type: String },
    color: { type: String, default: "background-secondary" }
  },
  setup(__props) {
    const props = __props;
    const { getColor } = useColors();
    const { isLinkTag, tagComputed, hrefComputed } = useRouterLink(props);
    const { textColorComputed } = useTextColor(computed(() => getColor(props.color)));
    const stripeColorComputed = computed(() => getColor(props.stripeColor));
    const classComputed = useBem("va-card", () => ({
      ...pick(props, ["square", "outlined", "disabled", "stripe"]),
      noBorder: !props.bordered,
      link: isLinkTag.value
    }));
    const cardStyles = computed(() => {
      const background = props.gradient && props.color ? getGradientBackground(getColor(props.color)) : getColor(props.color);
      return {
        background,
        color: textColorComputed.value
      };
    });
    return (_ctx, _cache) => {
      return openBlock(), createBlock(resolveDynamicComponent(unref(tagComputed)), {
        class: normalizeClass(["va-card", unref(classComputed)]),
        style: normalizeStyle([cardStyles.value, `--va-stripe-color-computed: ${String(stripeColorComputed.value)}`]),
        href: unref(hrefComputed),
        target: __props.target,
        to: _ctx.to,
        replace: _ctx.replace,
        exact: _ctx.exact,
        "active-class": _ctx.activeClass,
        "exact-active-class": _ctx.exactActiveClass
      }, {
        default: withCtx(() => [
          renderSlot(_ctx.$slots, "default")
        ]),
        _: 3
      }, 8, ["class", "style", "href", "target", "to", "replace", "exact", "active-class", "exact-active-class"]);
    };
  }
});

// node_modules/vuestic-ui/dist/es/src/components/va-card/components/va-card-content/VaCardContent.vue_vue_type_script_setup_true_lang.js
import "D:/Github/DONGTIAN/ui/node_modules/vuestic-ui/dist/es/VaCardContent.css";
var _hoisted_113 = { class: "va-card__content" };
var _sfc_main30 = defineComponent({
  ...{
    name: "VaCardContent"
  },
  __name: "VaCardContent",
  setup(__props) {
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_113, [
        renderSlot(_ctx.$slots, "default")
      ]);
    };
  }
});

// node_modules/vuestic-ui/dist/es/src/components/va-card/components/va-card-title/VaCardTitle.vue_vue_type_script_setup_true_lang.js
import "D:/Github/DONGTIAN/ui/node_modules/vuestic-ui/dist/es/VaCardTitle.css";
var _sfc_main31 = defineComponent({
  ...{
    name: "VaCardTitle"
  },
  __name: "VaCardTitle",
  props: {
    ...useComponentPresetProp,
    textColor: { type: String }
  },
  setup(__props) {
    const props = __props;
    const { getColor } = useColors();
    const titleStyles = computed(() => ({
      color: props.textColor ? getColor(props.textColor) : ""
    }));
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: "va-card-title va-card__title",
        style: normalizeStyle(titleStyles.value)
      }, [
        renderSlot(_ctx.$slots, "default", {}, void 0, true)
      ], 4);
    };
  }
});

// node_modules/vuestic-ui/dist/es/plugin-vue_export-helper.js
var _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};

// node_modules/vuestic-ui/dist/es/src/components/va-card/components/va-card-title/VaCardTitle.js
import "D:/Github/DONGTIAN/ui/node_modules/vuestic-ui/dist/es/VaCardTitle.css";
var VaCardTitleBase = _export_sfc(_sfc_main31, [["__scopeId", "data-v-5cd66b25"]]);

// node_modules/vuestic-ui/dist/es/src/components/va-card/components/va-card-actions/VaCardActions.vue_vue_type_script_setup_true_lang.js
import "D:/Github/DONGTIAN/ui/node_modules/vuestic-ui/dist/es/VaCardActions.css";
var _sfc_main32 = defineComponent({
  ...{
    name: "VaCardActions"
  },
  __name: "VaCardActions",
  props: {
    ...useAlignProps,
    ...useComponentPresetProp
  },
  setup(__props) {
    const props = __props;
    const { alignComputed } = useAlign(props);
    const classComputed = useBem("va-card__actions", () => ({
      ...pick(props, ["vertical"])
    }));
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: normalizeClass(["va-card__actions", unref(classComputed)]),
        style: normalizeStyle(unref(alignComputed))
      }, [
        renderSlot(_ctx.$slots, "default")
      ], 6);
    };
  }
});

// node_modules/vuestic-ui/dist/es/src/components/va-card/components/va-card-block/VaCardBlock.vue_vue_type_script_setup_true_lang.js
import "D:/Github/DONGTIAN/ui/node_modules/vuestic-ui/dist/es/VaCardBlock.css";
var _sfc_main33 = defineComponent({
  ...{
    name: "VaCardBlock"
  },
  __name: "VaCardBlock",
  props: {
    horizontal: {
      type: Boolean,
      default: false
    }
  },
  setup(__props) {
    const props = __props;
    const classComputed = computed(() => ({
      "va-card-block--horizontal": props.horizontal
    }));
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: normalizeClass(["va-card-block", classComputed.value])
      }, [
        renderSlot(_ctx.$slots, "default")
      ], 2);
    };
  }
});

// node_modules/vuestic-ui/dist/es/src/components/va-card/index.js
var VaCardContent = withConfigTransport$1(_sfc_main30);
var VaCardTitle = withConfigTransport$1(VaCardTitleBase);
var VaCardActions = withConfigTransport$1(_sfc_main32);
var VaCardBlock = withConfigTransport$1(_sfc_main33);
var VaCard = withConfigTransport$1(_sfc_main29);

// node_modules/vuestic-ui/dist/es/src/components/va-carousel/hooks/useCarousel.js
var useCarousel = (props, currentSlide) => {
  const goTo = (index) => {
    currentSlide.value = index;
  };
  const prev = () => {
    if (props.infinite) {
      if (currentSlide.value <= 0) {
        currentSlide.value = props.items.length - 1;
        return;
      }
    }
    currentSlide.value -= 1;
  };
  const next = () => {
    if (props.infinite) {
      if (currentSlide.value >= props.items.length - 1) {
        currentSlide.value = 0;
        return;
      }
    }
    currentSlide.value += 1;
  };
  const doShowDirectionButtons = computed(() => props.items.length > 1);
  const doShowPrevButton = computed(() => currentSlide.value > 0 || props.infinite);
  const doShowNextButton = computed(() => currentSlide.value < props.items.length - 1 || props.infinite);
  return {
    doShowPrevButton,
    doShowNextButton,
    doShowDirectionButtons,
    goTo,
    prev,
    next
  };
};

// node_modules/vuestic-ui/dist/es/src/components/va-carousel/hooks/useCarouselAnimation.js
var useCarouselAnimation = (props, currentSlide) => {
  let animationInterval = -1;
  const start = () => {
    if (!props.autoscroll) {
      return;
    }
    clearInterval(animationInterval);
    animationInterval = setInterval(() => {
      currentSlide.value += 1;
      if (currentSlide.value >= props.items.length) {
        currentSlide.value = 0;
      }
    }, props.autoscrollInterval);
  };
  let pauseTimeout;
  const pause = () => {
    if (!props.autoscroll) {
      return;
    }
    clearInterval(animationInterval);
    pauseTimeout = setTimeout(() => {
      start();
      clearTimeout(pauseTimeout);
    }, props.autoscrollPauseDuration);
  };
  const stop = () => {
    clearInterval(animationInterval);
    clearTimeout(pauseTimeout);
  };
  onMounted(() => start());
  onBeforeUnmount(() => stop());
  const withPause = (fn) => {
    return (...args) => {
      pause();
      fn(...args);
    };
  };
  const slidesContainerStyle = ref({
    transition: void 0
  });
  const sliderToBeShown = ref(0);
  const computedSlidesStyle = computed(() => {
    if (props.effect === "fade") {
      return {
        ...slidesContainerStyle.value,
        transition: "none"
      };
    }
    if (props.vertical) {
      return {
        ...slidesContainerStyle.value,
        transform: `translateY(${sliderToBeShown.value * -100}%)`
      };
    }
    return {
      ...slidesContainerStyle.value,
      transform: `translateX(${sliderToBeShown.value * -100}%)`
    };
  });
  const animator = {
    isAnimating: false,
    speed: 0.3,
    order: [],
    move(from, to) {
      const last = props.items.length - 1;
      const firstAfterLast = props.items.length;
      if (to === 0 && from === last) {
        this.order.push({ to: firstAfterLast });
        this.order.push({ to: 0, animate: false });
      } else if (to === last && from === 0) {
        this.order.push({ to: firstAfterLast, animate: false });
        this.order.push({ to });
      } else {
        this.order.push({ to });
      }
      if (!this.isAnimating) {
        this.runAnimation();
      }
    },
    runAnimation() {
      this.isAnimating = true;
      const animation = this.order.shift();
      if (!animation) {
        this.isAnimating = false;
        return;
      }
      sliderToBeShown.value = animation == null ? void 0 : animation.to;
      if (animation.animate || animation.animate === void 0) {
        slidesContainerStyle.value.transition = `all ${this.speed}s linear`;
        setTimeout(() => {
          this.runAnimation();
        }, this.speed * 1e3);
      } else {
        slidesContainerStyle.value.transition = "none";
        setTimeout(() => {
          this.runAnimation();
        }, 16);
      }
    }
  };
  watch(currentSlide, (newValue, oldValue) => {
    animator.move(oldValue, newValue);
  });
  const slides = computed(() => {
    if (props.effect === "fade") {
      return [props.items[currentSlide.value]];
    }
    if (props.infinite || props.autoscroll) {
      return [...props.items, props.items[0]];
    }
    return props.items;
  });
  return {
    start,
    pause,
    stop,
    withPause,
    computedSlidesStyle,
    slides
  };
};

// node_modules/vuestic-ui/dist/es/src/components/va-carousel/hooks/useCarouselColors.js
var useCarouselColor = () => {
  const { setHSLAColor: setHSLAColor2, getColor } = useColors();
  return {
    computedColor: computed(() => setHSLAColor2(getColor("background-element"), { a: 0.7 })),
    computedHoverColor: computed(() => setHSLAColor2(getColor("primary"), { a: 0.7 })),
    computedActiveColor: computed(() => getColor("primary"))
  };
};

// node_modules/vuestic-ui/dist/es/src/components/va-image/hooks/useNativeImgAttributes.js
var useNativeImgAttributesProps = {
  src: { type: String, required: true },
  alt: { type: String, default: "" },
  title: { type: String, default: "" },
  sizes: { type: String, default: "" },
  srcset: { type: String, default: "" },
  draggable: { type: Boolean, default: true },
  loading: {
    type: String
  },
  crossorigin: {
    type: String
  },
  decoding: {
    type: String
  },
  fetchpriority: {
    type: String,
    default: "auto"
  },
  referrerpolicy: {
    type: String
  }
};
var useNativeImgAttributes = (props) => {
  return computed(
    () => pick(props, ["src", "alt", "title", "sizes", "srcset", "loading", "referrerpolicy", "fetchpriority", "decoding", "crossorigin", "draggable"])
  );
};

// node_modules/vuestic-ui/dist/es/src/composables/useIntersectionObserver.js
var useIntersectionObserver = (cb, options = ref({}), target = ref([]), enabled = true) => {
  const observer = ref();
  const disconnectObserver = () => {
    var _a2;
    (_a2 = observer.value) == null ? void 0 : _a2.disconnect();
  };
  const observeTarget = (target2) => {
    var _a2;
    const disclosedTarget = unwrapEl(unref(target2));
    disclosedTarget && ((_a2 = observer.value) == null ? void 0 : _a2.observe(disclosedTarget));
  };
  const observeAll = (targets) => {
    targets.forEach(observeTarget);
  };
  const initObserver = () => {
    observer.value = new IntersectionObserver(cb, options.value);
  };
  const isIntersectionDisabled = computed(() => !enabled || !(typeof window !== "undefined" && "IntersectionObserver" in window));
  watch([target, options], ([newTarget]) => {
    if (isIntersectionDisabled.value) {
      return;
    }
    disconnectObserver();
    if (!newTarget) {
      return;
    }
    initObserver();
    Array.isArray(newTarget) ? observeAll(newTarget) : observeTarget(newTarget);
  }, { immediate: true });
  onBeforeUnmount(disconnectObserver);
  return { isIntersectionDisabled };
};

// node_modules/vuestic-ui/dist/es/src/components/va-image/VaImage.vue_vue_type_script_setup_true_lang.js
import "D:/Github/DONGTIAN/ui/node_modules/vuestic-ui/dist/es/VaImage.css";
var _hoisted_114 = ["aria-busy"];
var _hoisted_26 = {
  key: 0,
  class: "va-image__overlay"
};
var _hoisted_33 = {
  key: 1,
  class: "va-image__error"
};
var _hoisted_43 = {
  key: 2,
  class: "va-image__loader"
};
var _hoisted_53 = {
  key: 3,
  class: "va-image__placeholder"
};
var _hoisted_63 = ["src"];
var VaFallbackProps = extractComponentProps(VaFallback);
var _sfc_main34 = defineComponent({
  ...{
    name: "VaImage"
  },
  __name: "VaImage",
  props: {
    ...useComponentPresetProp,
    ...useNativeImgAttributesProps,
    ...VaFallbackProps,
    ratio: {
      type: [Number, String],
      default: "auto",
      validator: (v) => {
        if (typeof v === "number") {
          return v > 0;
        }
        return v === "auto";
      }
    },
    fit: {
      type: String,
      default: "cover"
    },
    maxWidth: {
      type: [Number, String],
      default: 0,
      validator: (v) => Number(v) >= 0
    },
    lazy: { type: Boolean, default: false },
    placeholderSrc: { type: String, default: "" }
  },
  emits: ["loaded", "error", "fallback"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const root = ref();
    const image = ref();
    const renderedImage = ref();
    const currentImage = computed(() => renderedImage.value || props.src);
    const imgWidth = ref(1);
    const imgHeight = ref(1);
    const isLoading = ref(false);
    const isError = ref(false);
    const handleLoad = () => {
      var _a2;
      isLoading.value = true;
      if (!isReadyForLoad.value) {
        return;
      }
      isLoading.value = false;
      renderedImage.value = (_a2 = image.value) == null ? void 0 : _a2.currentSrc;
      getImgSizes();
      emit("loaded", currentImage.value);
    };
    const handleError = (err) => {
      isError.value = true;
      isLoading.value = false;
      emit("error", err || currentImage.value);
    };
    const isIntersecting = ref(false);
    const handleIntersection = (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }
        isIntersecting.value = true;
        init();
        observer.disconnect();
      });
    };
    const { isIntersectionDisabled } = useIntersectionObserver(handleIntersection, void 0, root, props.lazy);
    const isReadyForLoad = computed(() => isIntersectionDisabled.value || isIntersecting.value);
    const isMounted = useIsMounted();
    const isReadyForRender = computed(() => !props.lazy || props.lazy && isMounted.value && isReadyForLoad.value);
    const init = () => {
      if (!props.src || isLoading.value && isIntersectionDisabled.value || !isReadyForLoad.value) {
        return;
      }
      isLoading.value = true;
      isError.value = false;
      nextTick(() => {
        var _a2;
        if (!((_a2 = image.value) == null ? void 0 : _a2.complete)) {
          return;
        }
        if (!image.value.naturalWidth) {
          handleError();
          return;
        }
        handleLoad();
      });
    };
    let timer;
    const getImgSizes = () => {
      clearTimeout(timer);
      if (isLoading.value) {
        timer = window.setTimeout(getImgSizes, 100);
      }
      const { naturalHeight, naturalWidth } = image.value || {};
      if (naturalHeight && naturalWidth) {
        imgWidth.value = naturalHeight;
        imgHeight.value = naturalWidth;
      }
    };
    onBeforeMount(init);
    onBeforeUnmount(() => clearTimeout(timer));
    watch(() => props.src, init);
    const slots = useSlots();
    const isPlaceholderPassed = computed(() => {
      var _a2;
      return ((_a2 = slots == null ? void 0 : slots.placeholder) == null ? void 0 : _a2.call(slots)) || props.placeholderSrc;
    });
    const isLoaderShown = computed(() => {
      var _a2;
      return isLoading.value && !((_a2 = slots == null ? void 0 : slots.loader) == null ? void 0 : _a2.call(slots));
    });
    const isErrorShown = computed(() => {
      var _a2;
      return isError.value && (!((_a2 = slots == null ? void 0 : slots.error) == null ? void 0 : _a2.call(slots)) && !isAnyFallbackPassed.value);
    });
    const isPlaceholderShown = computed(() => (isLoaderShown.value || isErrorShown.value) && isPlaceholderPassed.value);
    const isSuccessfullyLoaded = computed(() => !(isLoading.value || isError.value));
    const imgAttributesComputed = useNativeImgAttributes(props);
    const aspectRationAttributesComputed = computed(() => ({
      ...pick(props, ["ratio", "maxWidth"]),
      contentWidth: imgWidth.value,
      contentHeight: imgHeight.value
    }));
    const fallbackProps = filterComponentProps(VaFallbackProps);
    const checkObjectNonEmptyValues = (obj) => !!Object.values(obj || {}).filter((prop) => prop).length;
    const hasFallbackGlobalConfig = computed(() => {
      var _a2, _b, _c, _d;
      return checkObjectNonEmptyValues((_d = (_c = (_b = (_a2 = useGlobalConfig()) == null ? void 0 : _a2.globalConfig) == null ? void 0 : _b.value) == null ? void 0 : _c.components) == null ? void 0 : _d.VaFallback);
    });
    const isAnyFallbackPassed = computed(() => checkObjectNonEmptyValues(fallbackProps.value) || hasFallbackGlobalConfig.value);
    const fitComputed = computed(() => props.fit);
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(VaAspectRatio), mergeProps({
        ref_key: "root",
        ref: root,
        class: "va-image"
      }, aspectRationAttributesComputed.value, {
        style: `--va-fit-computed: ${String(fitComputed.value)}`
      }), {
        default: withCtx(() => [
          withDirectives(createBaseVNode("picture", {
            class: "va-image__content",
            "aria-busy": isLoading.value
          }, [
            _ctx.$slots.sources ? renderSlot(_ctx.$slots, "sources", { key: 0 }) : createCommentVNode("", true),
            isReadyForRender.value ? (openBlock(), createElementBlock("img", mergeProps({
              key: 1,
              ref_key: "image",
              ref: image
            }, unref(imgAttributesComputed), {
              onError: handleError,
              onLoad: handleLoad
            }), null, 16)) : createCommentVNode("", true)
          ], 8, _hoisted_114), [
            [vShow, isSuccessfullyLoaded.value]
          ]),
          _ctx.$slots.default && isSuccessfullyLoaded.value ? (openBlock(), createElementBlock("div", _hoisted_26, [
            renderSlot(_ctx.$slots, "default")
          ])) : createCommentVNode("", true),
          isError.value && (_ctx.$slots.error || isAnyFallbackPassed.value) ? (openBlock(), createElementBlock("div", _hoisted_33, [
            renderSlot(_ctx.$slots, "error", {}, () => [
              createVNode(unref(VaFallback), mergeProps(unref(fallbackProps), {
                onFallback: _cache[0] || (_cache[0] = ($event) => _ctx.$emit("fallback"))
              }), null, 16)
            ])
          ])) : createCommentVNode("", true),
          isLoading.value && _ctx.$slots.loader ? (openBlock(), createElementBlock("div", _hoisted_43, [
            renderSlot(_ctx.$slots, "loader")
          ])) : createCommentVNode("", true),
          isPlaceholderShown.value ? (openBlock(), createElementBlock("div", _hoisted_53, [
            renderSlot(_ctx.$slots, "placeholder", {}, () => [
              _ctx.$props.placeholderSrc ? (openBlock(), createElementBlock("img", {
                key: 0,
                src: _ctx.$props.placeholderSrc,
                alt: ""
              }, null, 8, _hoisted_63)) : createCommentVNode("", true)
            ])
          ])) : createCommentVNode("", true)
        ]),
        _: 3
      }, 16, ["style"]);
    };
  }
});

// node_modules/vuestic-ui/dist/es/src/components/va-image/index.js
var VaImage = withConfigTransport$1(_sfc_main34);

// node_modules/vuestic-ui/dist/es/src/components/va-hover/VaHover.vue_vue_type_script_setup_true_lang.js
var _sfc_main35 = defineComponent({
  ...{
    name: "VaHover"
  },
  __name: "VaHover",
  props: {
    ...createStatefulProps(true),
    ...useComponentPresetProp,
    disabled: { type: Boolean, default: false },
    modelValue: { type: Boolean, default: false }
  },
  emits: [...useStatefulEmits],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const { valueComputed } = useStateful(props, emit);
    const onMouseEnter = () => {
      if (!props.disabled) {
        valueComputed.value = true;
      }
    };
    const onMouseLeave = () => {
      if (!props.disabled) {
        valueComputed.value = false;
      }
    };
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: "va-hover",
        onMouseenter: onMouseEnter,
        onMouseleave: onMouseLeave
      }, [
        renderSlot(_ctx.$slots, "default", normalizeProps(guardReactiveProps({ hover: unref(valueComputed) })))
      ], 32);
    };
  }
});

// node_modules/vuestic-ui/dist/es/src/components/va-hover/index.js
var VaHover = withConfigTransport$1(_sfc_main35);

// node_modules/vuestic-ui/dist/es/src/composables/useSwipe.js
var mouseEvents = ["mousedown", "mousemove"];
var touchEvents = ["touchstart", "touchmove"];
var commonAllowedDirections = {
  vertical: ["", "all", "vertical"],
  horizontal: ["", "all", "horizontal"]
};
var verticalSpecificAllowedDirections = [...commonAllowedDirections.vertical, "up", "down"];
var horizontalSpecificAllowedDirections = [...commonAllowedDirections.horizontal, "left", "right"];
var useSwipeProps = {
  swipable: { type: Boolean, default: false },
  swipeDistance: { type: Number, default: 75 },
  swipeDirection: { type: String, default: "all" }
};
var useSwipe = (props, container, cb) => {
  const swipeStarted = ref(false);
  const swipePath = reactive({
    start: { x: 0, y: 0 },
    end: { x: 0, y: 0 }
  });
  const swipeDuration = reactive({
    start: 0,
    end: 0
  });
  const setState = (e, type) => {
    let event;
    if (mouseEvents.includes(e.type)) {
      event = e;
    }
    if (touchEvents.includes(e.type)) {
      const touchEvent = e;
      event = touchEvent.changedTouches[touchEvent.changedTouches.length - 1];
    }
    if (!event) {
      return;
    }
    swipePath[type].x = event.pageX;
    swipePath[type].y = event.pageY;
    swipeDuration[type] = (/* @__PURE__ */ new Date()).getTime();
  };
  const onSwipeStart = (e) => {
    if (!props.swipable || swipeStarted.value) {
      return;
    }
    swipeStarted.value = true;
    setState(e, "start");
  };
  const onSwipeMove = (e) => {
    if (!swipeStarted.value) {
      return;
    }
    setState(e, "end");
  };
  const resetSwipe = () => {
    ["start", "end"].forEach((type) => {
      swipePath[type].x = 0;
      swipePath[type].y = 0;
      swipeDuration[type] = 0;
    });
    swipeStarted.value = false;
  };
  const isSwipeAllowed = reactive({
    vertical: false,
    horizontal: false
  });
  watchEffect(() => {
    isSwipeAllowed.horizontal = horizontalSpecificAllowedDirections.includes(props.swipeDirection);
    isSwipeAllowed.vertical = verticalSpecificAllowedDirections.includes(props.swipeDirection);
  });
  const calcDistance = (axis) => {
    return isSwipeAllowed[axis === "x" ? "horizontal" : "vertical"] && swipePath.start[axis] && swipePath.end[axis] ? Math.trunc(swipePath.start[axis] - swipePath.end[axis]) : 0;
  };
  const getAcceptableValue = (direction, result) => {
    return result === props.swipeDirection || commonAllowedDirections[direction].includes(props.swipeDirection) ? result : "";
  };
  const swipeState = reactive({ direction: "", duration: 0 });
  watch(swipePath, () => {
    const xDistance = calcDistance("x");
    const yDistance = calcDistance("y");
    if ((xDistance || yDistance) && [xDistance, yDistance].some((el) => Math.abs(el) >= props.swipeDistance)) {
      if (Math.abs(xDistance) >= Math.abs(yDistance) && isSwipeAllowed.horizontal) {
        const result = xDistance > 0 ? "left" : "right";
        swipeState.direction = getAcceptableValue("horizontal", result);
      } else if (Math.abs(xDistance) < Math.abs(yDistance) && isSwipeAllowed.vertical) {
        const result = yDistance > 0 ? "down" : "up";
        swipeState.direction = getAcceptableValue("vertical", result);
      }
      swipeState.duration = swipeDuration.end - swipeDuration.start;
      resetSwipe();
    }
  }, { deep: true });
  watch(swipeState, () => cb(swipeState), { deep: true });
  if (props.swipable) {
    useEvent(["touchstart", "mousedown"], onSwipeStart, container);
    useEvent(["touchmove", "mousemove"], onSwipeMove, container);
    useEvent(["touchcancel", "mouseup", "touchend", "mouseleave"], resetSwipe, container);
  }
  return { swipeState };
};

// node_modules/vuestic-ui/dist/es/src/components/va-carousel/VaCarousel.vue_vue_type_script_setup_true_lang.js
import "D:/Github/DONGTIAN/ui/node_modules/vuestic-ui/dist/es/VaCarousel.css";
var _hoisted_115 = ["aria-label"];
var _hoisted_27 = {
  key: 1,
  class: "va-carousel__indicators"
};
var _hoisted_34 = { class: "va-carousel__content" };
var _hoisted_44 = ["aria-hidden", "aria-current", "aria-label"];
var VaImageProps = extractComponentProps(VaImage, ["src", "alt"]);
var _sfc_main36 = defineComponent({
  ...{
    name: "VaCarousel"
  },
  __name: "VaCarousel",
  props: {
    ...useSwipeProps,
    ...useStatefulProps,
    ...useComponentPresetProp,
    ...VaImageProps,
    stateful: { type: Boolean, default: true },
    modelValue: { type: Number, default: 0 },
    items: { type: Array, required: true },
    // Animations
    autoscroll: { type: Boolean, default: false },
    autoscrollInterval: { type: [Number, String], default: 5e3 },
    autoscrollPauseDuration: { type: [Number, String], default: 2e3 },
    infinite: { type: Boolean, default: true },
    fadeKeyframe: { type: String, default: "va-carousel-fade-appear 1s" },
    // Visual
    arrows: { type: Boolean, default: true },
    indicators: { type: Boolean, default: true },
    indicatorTrigger: {
      type: String,
      default: "click",
      validator: (value) => ["click", "hover", "none"].includes(value)
    },
    vertical: { type: Boolean, default: false },
    height: { type: String, default: "300px" },
    effect: {
      type: String,
      default: "transition",
      validator: (value) => ["fade", "transition"].includes(value)
    },
    color: { type: String, default: "primary" },
    ratio: { type: [Number, String] },
    ariaLabel: useTranslationProp("$t:carousel"),
    ariaPreviousLabel: useTranslationProp("$t:goPreviousSlide"),
    ariaNextLabel: useTranslationProp("$t:goNextSlide"),
    ariaGoToSlideLabel: useTranslationProp("$t:goSlide"),
    ariaSlideOfLabel: useTranslationProp("$t:slideOf")
  },
  emits: [...useStatefulEmits],
  setup(__props, { expose: __expose, emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const { valueComputed: currentSlide } = useStateful(props, emit, "modelValue");
    const autoscrollIntervalComputed = useNumericProp("autoscrollInterval");
    const autoscrollPauseDurationComputed = useNumericProp("autoscrollPauseDuration");
    const ratioComputed = useNumericProp("ratio");
    const {
      goTo,
      next,
      prev,
      doShowNextButton,
      doShowPrevButton,
      doShowDirectionButtons
    } = useCarousel(props, currentSlide);
    const { withPause, computedSlidesStyle, slides } = useCarouselAnimation({
      items: props.items,
      autoscrollInterval: autoscrollIntervalComputed.value,
      autoscrollPauseDuration: autoscrollPauseDurationComputed.value,
      autoscroll: props.autoscroll,
      infinite: props.infinite,
      effect: props.effect,
      vertical: props.vertical,
      fadeKeyframe: props.fadeKeyframe
    }, currentSlide);
    const isObjectSlides = computed(() => {
      return props.items.length && props.items.every((el) => !!el && typeof el === "object" && !!(el == null ? void 0 : el.src));
    });
    const isCurrentSlide = (index) => index === currentSlide.value;
    const slideStyleComputed = computed(() => ({
      animation: props.effect === "fade" ? "fadeKeyframe" : void 0
    }));
    const slidesContainer = shallowRef();
    const onSwipe = (state) => {
      switch (state.direction) {
        case "right":
        case "up":
          doShowPrevButton.value && prev();
          break;
        case "left":
        case "down":
          doShowNextButton.value && next();
      }
    };
    useSwipe(props, slidesContainer, onSwipe);
    const getIndicatorEvents = (index) => {
      if (props.indicatorTrigger === "hover") {
        return { onmouseover: () => goTo(index) };
      }
      if (props.indicatorTrigger === "click") {
        return { onclick: () => goTo(index) };
      }
      return {};
    };
    const { tp, t } = useTranslation();
    const {
      computedActiveColor,
      computedColor,
      computedHoverColor
    } = useCarouselColor();
    const vaImageProps = filterComponentProps(VaImageProps);
    const goToWithPause = withPause(goTo);
    const prevWithPause = withPause(prev);
    const nextWithPause = withPause(next);
    __expose({
      currentSlide,
      goTo,
      next,
      prev,
      goToWithPause,
      prevWithPause,
      nextWithPause
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: normalizeClass(["va-carousel", {
          "va-carousel--vertical": _ctx.$props.vertical,
          [`va-carousel--${_ctx.$props.effect}`]: true
        }]),
        style: normalizeStyle({ height: unref(ratioComputed) ? "auto" : __props.height }),
        role: "region",
        "aria-label": unref(tp)(_ctx.$props.ariaLabel)
      }, [
        _ctx.$props.arrows && unref(doShowDirectionButtons) ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
          unref(doShowPrevButton) ? (openBlock(), createElementBlock("div", {
            key: 0,
            class: "va-carousel__arrow va-carousel__arrow--left",
            onClick: _cache[0] || (_cache[0] = //@ts-ignore
            (...args) => unref(prevWithPause) && unref(prevWithPause)(...args)),
            onKeydown: _cache[1] || (_cache[1] = withKeys(withModifiers(
              //@ts-ignore
              (...args) => unref(prevWithPause) && unref(prevWithPause)(...args),
              ["stop"]
            ), ["enter"]))
          }, [
            renderSlot(_ctx.$slots, "prev-arrow", {}, () => [
              createVNode(unref(VaHover), { stateful: "" }, {
                default: withCtx(({ hover }) => [
                  createVNode(unref(VaButton), {
                    color: hover ? unref(computedHoverColor) : unref(computedColor),
                    icon: __props.vertical ? "va-arrow-up" : "va-arrow-left",
                    "aria-label": unref(tp)(_ctx.$props.ariaPreviousLabel)
                  }, null, 8, ["color", "icon", "aria-label"])
                ]),
                _: 1
              })
            ])
          ], 32)) : createCommentVNode("", true),
          unref(doShowNextButton) ? (openBlock(), createElementBlock("div", {
            key: 1,
            class: "va-carousel__arrow va-carousel__arrow--right",
            onClick: _cache[2] || (_cache[2] = //@ts-ignore
            (...args) => unref(nextWithPause) && unref(nextWithPause)(...args)),
            onKeydown: _cache[3] || (_cache[3] = withKeys(withModifiers(
              //@ts-ignore
              (...args) => unref(nextWithPause) && unref(nextWithPause)(...args),
              ["stop"]
            ), ["enter"]))
          }, [
            renderSlot(_ctx.$slots, "next-arrow", {}, () => [
              createVNode(unref(VaHover), { stateful: "" }, {
                default: withCtx(({ hover }) => [
                  createVNode(unref(VaButton), {
                    color: hover ? unref(computedHoverColor) : unref(computedColor),
                    icon: __props.vertical ? "va-arrow-down" : "va-arrow-right",
                    "aria-label": unref(tp)(_ctx.$props.ariaNextLabel)
                  }, null, 8, ["color", "icon", "aria-label"])
                ]),
                _: 1
              })
            ])
          ], 32)) : createCommentVNode("", true)
        ], 64)) : createCommentVNode("", true),
        _ctx.$props.indicators ? (openBlock(), createElementBlock("div", _hoisted_27, [
          (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.$props.items, (item, index) => {
            return openBlock(), createElementBlock("div", mergeProps({
              class: ["va-carousel__indicator", { "va-carousel__indicator--active": isCurrentSlide(index) }],
              key: index
            }, getIndicatorEvents(index)), [
              renderSlot(_ctx.$slots, "indicator", normalizeProps(guardReactiveProps({ item, index, goTo: unref(goToWithPause), isActive: isCurrentSlide(index) })), () => [
                createVNode(unref(VaHover), { stateful: "" }, {
                  default: withCtx(({ hover }) => [
                    createVNode(unref(VaButton), {
                      "aria-label": unref(tp)(_ctx.$props.ariaGoToSlideLabel, { index: index + 1 }),
                      round: "",
                      color: isCurrentSlide(index) ? unref(computedActiveColor) : hover ? unref(computedHoverColor) : unref(computedColor)
                    }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(index + 1), 1)
                      ]),
                      _: 2
                    }, 1032, ["aria-label", "color"])
                  ]),
                  _: 2
                }, 1024)
              ])
            ], 16);
          }), 128))
        ])) : createCommentVNode("", true),
        createBaseVNode("div", _hoisted_34, [
          createBaseVNode("div", {
            ref_key: "slidesContainer",
            ref: slidesContainer,
            class: "va-carousel__slides",
            style: normalizeStyle(unref(computedSlidesStyle)),
            role: "list"
          }, [
            (openBlock(true), createElementBlock(Fragment, null, renderList(unref(slides), (item, index) => {
              return openBlock(), createElementBlock("div", {
                key: item,
                role: "listitem",
                class: "va-carousel__slide",
                style: normalizeStyle(slideStyleComputed.value),
                "aria-hidden": !isCurrentSlide(index),
                "aria-current": isCurrentSlide(index),
                "aria-label": unref(tp)(_ctx.$props.ariaSlideOfLabel, { index: index + 1, length: unref(slides).length })
              }, [
                renderSlot(_ctx.$slots, "default", normalizeProps(guardReactiveProps({ item, index, goTo: unref(goToWithPause), isActive: isCurrentSlide(index) })), () => [
                  createVNode(unref(VaImage), mergeProps(unref(vaImageProps), {
                    src: isObjectSlides.value ? item.src : item,
                    alt: isObjectSlides.value ? item.alt : "",
                    draggable: false
                  }), null, 16, ["src", "alt"])
                ])
              ], 12, _hoisted_44);
            }), 128))
          ], 4)
        ])
      ], 14, _hoisted_115);
    };
  }
});

// node_modules/vuestic-ui/dist/es/src/components/va-carousel/index.js
var VaCarousel = withConfigTransport$1(_sfc_main36);

// node_modules/vuestic-ui/dist/es/src/composables/useSelectable.js
var useSelectableProps = {
  ...useStatefulProps,
  ...useLoadingProps,
  ...useValidationProps,
  arrayValue: { type: [String, Boolean, Object, Number], default: null },
  label: { type: String, default: "" },
  leftLabel: { type: Boolean, default: false },
  trueValue: { type: null, default: true },
  falseValue: { type: null, default: false },
  indeterminate: { type: Boolean, default: false },
  indeterminateValue: { type: null, default: null },
  disabled: { type: Boolean, default: false },
  readonly: { type: Boolean, default: false }
};
var useSelectableEmits = [...useValidationEmits, "update:modelValue", "focus", "blur"];
var checkDuplicates = (props) => {
  const values = [props.falseValue, props.trueValue];
  if (props.indeterminate) {
    values.push(props.indeterminateValue);
  }
  const hasDuplicates = new Set(values).size !== values.length;
  if (hasDuplicates) {
    throw new Error("falseValue, trueValue, indeterminateValue props should have strictly different values, which is not the case.");
  }
};
var useSelectable = (props, emit, { input, label, container }) => {
  checkDuplicates(props);
  const reset = () => withoutValidation(() => {
    emit("update:modelValue", false);
    resetValidation();
  });
  const focus = () => {
    var _a2;
    (_a2 = unwrapEl(input.value)) == null ? void 0 : _a2.focus();
  };
  const { valueComputed } = useStateful(props, emit);
  const {
    computedError,
    computedErrorMessages,
    validate,
    validationAriaAttributes,
    listeners: validationListeners,
    withoutValidation,
    resetValidation,
    isDirty,
    isTouched,
    isError,
    isLoading,
    isValid
  } = useValidation(props, emit, { reset, focus, value: valueComputed });
  const { isFocused } = useFocus();
  const onBlur = (event) => {
    emit("blur", event);
    isFocused.value = false;
    validationListeners.onBlur();
  };
  const onFocus = (event) => {
    isFocused.value = true;
    emit("focus", event);
  };
  const isIndeterminate = computed(() => props.indeterminate && valueComputed.value === props.indeterminateValue);
  const modelIsArray = computed(() => props.arrayValue !== void 0 && props.arrayValue !== null);
  const isChecked = computed(() => {
    var _a2;
    if (modelIsArray.value) {
      return (_a2 = props.modelValue) == null ? void 0 : _a2.includes(props.arrayValue);
    }
    return valueComputed.value === props.trueValue;
  });
  const toggleSelection = () => {
    if (props.readonly || props.disabled || props.loading) {
      return;
    }
    if (modelIsArray.value) {
      if (!props.modelValue) {
        emit("update:modelValue", [props.arrayValue]);
      } else if (!Array.isArray(props.modelValue)) {
        emit("update:modelValue", props.modelValue === props.arrayValue ? [] : [props.modelValue, props.arrayValue]);
      } else if (props.modelValue.includes(props.arrayValue)) {
        emit("update:modelValue", props.modelValue.filter((option) => option !== props.arrayValue));
      } else {
        emit("update:modelValue", props.modelValue.concat(props.arrayValue));
      }
      return;
    }
    if (props.indeterminate) {
      if (isIndeterminate.value) {
        valueComputed.value = props.trueValue;
      } else if (isChecked.value) {
        valueComputed.value = props.falseValue;
      } else {
        valueComputed.value = props.indeterminateValue;
      }
      return;
    }
    if (isChecked.value) {
      valueComputed.value = props.falseValue;
    } else {
      valueComputed.value = props.trueValue;
    }
  };
  return {
    isDirty,
    isTouched,
    isError,
    isLoading,
    isValid,
    isChecked,
    isIndeterminate,
    onBlur,
    onFocus,
    toggleSelection,
    reset,
    focus,
    computedError,
    computedErrorMessages,
    validationAriaAttributes
  };
};

// node_modules/vuestic-ui/dist/es/src/composables/useKeyboardOnlyFocus.js
var _a;
function useKeyboardOnlyFocus() {
  const hasKeyboardFocus = ref(false);
  let previouslyClicked2 = false;
  const keyboardFocusListeners = {
    mousedown: () => {
      previouslyClicked2 = true;
    },
    focus: () => {
      if (!previouslyClicked2) {
        hasKeyboardFocus.value = true;
      }
      previouslyClicked2 = false;
    },
    blur: () => {
      hasKeyboardFocus.value = false;
      previouslyClicked2 = false;
    }
  };
  return {
    hasKeyboardFocus,
    keyboardFocusListeners
  };
}
var previouslyClicked = false;
(_a = getWindow()) == null ? void 0 : _a.addEventListener("mousedown", () => {
  previouslyClicked = true;
  setTimeout(() => {
    previouslyClicked = false;
  }, 300);
});
function useKeyboardOnlyFocusGlobal() {
  const hasKeyboardFocus = ref(false);
  const keyboardFocusListeners = {
    focus: () => {
      if (!previouslyClicked) {
        hasKeyboardFocus.value = true;
      }
    },
    blur: () => {
      hasKeyboardFocus.value = false;
    }
  };
  return {
    hasKeyboardFocus,
    keyboardFocusListeners
  };
}

// node_modules/vuestic-ui/dist/es/src/components/va-checkbox/VaCheckbox.vue_vue_type_script_setup_true_lang.js
import "D:/Github/DONGTIAN/ui/node_modules/vuestic-ui/dist/es/VaCheckbox.css";
var _hoisted_116 = ["id", "indeterminate", "value", "checked"];
var _hoisted_28 = ["for"];
var VaCheckboxValueType = [Boolean, Array, String, Object];
var _sfc_main37 = defineComponent({
  ...{
    name: "VaCheckbox"
  },
  __name: "VaCheckbox",
  props: {
    ...useSelectableProps,
    ...useComponentPresetProp,
    modelValue: { type: VaCheckboxValueType, default: false },
    color: { type: String, default: "primary" },
    checkedIcon: { type: String, default: "va-check" },
    indeterminate: { type: Boolean, default: false },
    indeterminateValue: { type: VaCheckboxValueType, default: null },
    indeterminateIcon: { type: String, default: "remove" },
    id: { type: String, default: "" },
    name: { type: String, default: "" },
    ariaLabel: { type: String, default: void 0 },
    vertical: { type: Boolean, default: false }
  },
  emits: useSelectableEmits,
  setup(__props, { expose: __expose, emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const elements = {
      container: shallowRef(),
      input: shallowRef(),
      label: shallowRef()
    };
    const {
      isChecked,
      computedError,
      isIndeterminate,
      computedErrorMessages,
      validationAriaAttributes,
      toggleSelection,
      onBlur,
      onFocus,
      isDirty,
      isTouched,
      isError,
      isLoading,
      isValid
    } = useSelectable(props, emit, elements);
    const { getColor } = useColors();
    const { hasKeyboardFocus, keyboardFocusListeners } = useKeyboardOnlyFocus();
    const { textColorComputed } = useTextColor(computed(() => getColor(props.color)));
    const isActive = computed(() => isChecked.value || isIndeterminate.value);
    const computedClass = computed(() => ({
      "va-checkbox--selected": isChecked.value,
      "va-checkbox--readonly": props.readonly,
      "va-checkbox--disabled": props.disabled,
      "va-checkbox--indeterminate": props.indeterminate,
      "va-checkbox--error": computedError.value,
      "va-checkbox--left-label": props.leftLabel,
      "va-checkbox--on-keyboard-focus": hasKeyboardFocus.value
    }));
    const getPaddingStyle = () => {
      switch (true) {
        case !props.label:
          return "";
        case props.vertical:
          return "var(--va-checkbox-vertical-padding)";
        case Boolean(props.arrayValue):
          return "var(--va-checkbox-horizontal-padding)";
        case props.leftLabel:
          return "var(--va-checkbox-right-padding)";
        default:
          return "var(--va-checkbox-left-padding)";
      }
    };
    const labelStyle = computed(() => {
      return {
        color: computedError.value ? getColor("danger") : props.success ? getColor("success") : "",
        padding: getPaddingStyle()
      };
    });
    const inputStyle = computed(() => {
      const style = {
        background: isActive.value ? getColor(props.color) : "",
        borderColor: isActive.value ? getColor(props.color) : ""
      };
      if (computedError.value) {
        style.borderColor = getColor("danger");
      }
      if (props.success) {
        style.borderColor = getColor("success");
      }
      return style;
    });
    const computedIconName = computed(
      () => props.indeterminate && isIndeterminate.value ? props.indeterminateIcon : props.checkedIcon
    );
    const uniqueId = useComponentUuid();
    const computedId = computed(() => props.id || String(uniqueId));
    const computedName = computed(() => props.name || String(uniqueId));
    const inputAttributesComputed = computed(() => ({
      name: computedName.value,
      disabled: props.disabled,
      readonly: props.readonly,
      tabindex: props.disabled ? -1 : 0,
      "aria-label": props.ariaLabel,
      "aria-disabled": props.disabled,
      "aria-readOnly": props.readonly,
      "aria-checked": isActive.value,
      ...validationAriaAttributes.value
    }));
    const displayVal = computed(() => props.vertical ? "--va-checkbox-display-flex" : "var(--va-checkbox-display)");
    __expose({
      toggleSelection,
      isDirty,
      isTouched,
      isError,
      isLoading,
      isValid
    });
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(_sfc_main3), {
        class: normalizeClass(["va-checkbox", computedClass.value]),
        disabled: _ctx.disabled,
        success: _ctx.success,
        messages: _ctx.messages,
        error: unref(computedError),
        "error-messages": unref(computedErrorMessages),
        "error-count": _ctx.errorCount,
        style: normalizeStyle(`--va-display-val: ${String(displayVal.value)}`)
      }, {
        default: withCtx(() => [
          createBaseVNode("div", {
            ref: "container",
            class: "va-checkbox__input-container",
            onClick: _cache[6] || (_cache[6] = //@ts-ignore
            (...args) => unref(toggleSelection) && unref(toggleSelection)(...args)),
            onBlur: _cache[7] || (_cache[7] = //@ts-ignore
            (...args) => unref(onBlur) && unref(onBlur)(...args))
          }, [
            createBaseVNode("div", {
              class: "va-checkbox__square",
              style: normalizeStyle(inputStyle.value),
              onSelectstart: _cache[4] || (_cache[4] = withModifiers(() => {
              }, ["prevent"]))
            }, [
              createBaseVNode("input", mergeProps({
                ref: "input",
                type: "checkbox",
                class: "va-checkbox__input",
                id: computedId.value,
                indeterminate: __props.indeterminate,
                value: _ctx.label,
                checked: isActive.value
              }, inputAttributesComputed.value, toHandlers(unref(keyboardFocusListeners), true), {
                onFocus: _cache[0] || (_cache[0] = //@ts-ignore
                (...args) => unref(onFocus) && unref(onFocus)(...args)),
                onBlur: _cache[1] || (_cache[1] = //@ts-ignore
                (...args) => unref(onBlur) && unref(onBlur)(...args)),
                onClick: _cache[2] || (_cache[2] = withModifiers(() => {
                }, ["stop", "prevent"])),
                onKeypress: _cache[3] || (_cache[3] = withModifiers(
                  //@ts-ignore
                  (...args) => unref(toggleSelection) && unref(toggleSelection)(...args),
                  ["prevent"]
                ))
              }), null, 16, _hoisted_116),
              isActive.value ? (openBlock(), createBlock(unref(VaIcon), {
                key: 0,
                class: "va-checkbox__icon",
                name: computedIconName.value,
                color: unref(textColorComputed)
              }, null, 8, ["name", "color"])) : createCommentVNode("", true)
            ], 36),
            _ctx.label || _ctx.$slots.label ? (openBlock(), createElementBlock("label", {
              key: 0,
              ref: "label",
              class: "va-checkbox__label",
              for: computedId.value,
              style: normalizeStyle(labelStyle.value),
              onBlur: _cache[5] || (_cache[5] = //@ts-ignore
              (...args) => unref(onBlur) && unref(onBlur)(...args))
            }, [
              renderSlot(_ctx.$slots, "label", {}, () => [
                createTextVNode(toDisplayString(_ctx.label), 1)
              ])
            ], 44, _hoisted_28)) : createCommentVNode("", true)
          ], 544)
        ]),
        _: 3
      }, 8, ["class", "disabled", "success", "messages", "error", "error-messages", "error-count", "style"]);
    };
  }
});

// node_modules/vuestic-ui/dist/es/src/components/va-checkbox/index.js
var VaCheckbox = withConfigTransport$1(_sfc_main37);

// node_modules/vuestic-ui/dist/es/src/components/va-chip/VaChip.vue_vue_type_script_setup_true_lang.js
import "D:/Github/DONGTIAN/ui/node_modules/vuestic-ui/dist/es/VaChip.css";
var _hoisted_117 = { class: "va-chip__content" };
var _sfc_main38 = defineComponent({
  ...{
    name: "VaChip"
  },
  __name: "VaChip",
  props: {
    ...useRouterLinkProps,
    ...useColorProps,
    ...useStatefulProps,
    ...useComponentPresetProp,
    modelValue: { type: Boolean, default: true },
    closeable: { type: Boolean, default: false },
    outline: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
    readonly: { type: Boolean, default: false },
    square: { type: Boolean, default: false },
    shadow: { type: Boolean, default: false },
    flat: { type: Boolean, default: false },
    icon: { type: String, default: "" },
    tag: { type: String, default: "span" },
    size: {
      type: String,
      default: "medium",
      validator: (value) => ["small", "medium", "large"].includes(value)
    },
    ariaCloseLabel: useTranslationProp("$t:close")
  },
  emits: [...useStatefulEmits, "focus"],
  setup(__props, { expose: __expose, emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const { getColor } = useColors();
    const colorComputed = computed(() => getColor(props.color));
    const borderColor = computed(() => props.outline ? colorComputed.value : "");
    const isTransparentBackground = computed(() => Boolean(props.outline || props.flat));
    const { textColorComputed } = useTextColor(colorComputed, isTransparentBackground);
    const { hasKeyboardFocus, keyboardFocusListeners } = useKeyboardOnlyFocus();
    const shadowStyle = computed(() => {
      if (!props.shadow || props.flat || props.outline || props.disabled || hasKeyboardFocus.value) {
        return;
      }
      return `0 0.125rem 0.19rem 0 ${getBoxShadowColor(colorComputed.value)}`;
    });
    const { valueComputed } = useStateful(props, emit);
    const { tagComputed, hrefComputed } = useRouterLink(props);
    const { isHovered, onMouseEnter, onMouseLeave } = useHover();
    const close = () => {
      if (!props.disabled) {
        valueComputed.value = false;
      }
    };
    const iconSize = computed(() => props.size);
    const tabIndexComputed = computed(() => props.disabled ? -1 : 0);
    const computedClass = useBem("va-chip", () => ({
      ...pick(props, ["disabled", "readonly", "square"]),
      small: props.size === "small",
      large: props.size === "large"
    }));
    const computedStyle = computed(() => {
      const result = {
        color: textColorComputed.value,
        borderColor: borderColor.value,
        background: "",
        boxShadow: shadowStyle.value
      };
      if (props.outline || props.flat) {
        if (hasKeyboardFocus.value) {
          result.background = getFocusColor(colorComputed.value);
        } else if (!props.readonly && isHovered.value) {
          result.background = getHoverColor(colorComputed.value);
        }
      } else {
        result.background = colorComputed.value;
      }
      return result;
    });
    const { tp } = useTranslation();
    __expose({
      close
    });
    return (_ctx, _cache) => {
      return unref(valueComputed) ? (openBlock(), createBlock(resolveDynamicComponent(unref(tagComputed)), {
        key: 0,
        class: normalizeClass(["va-chip", unref(computedClass)]),
        href: unref(hrefComputed),
        target: _ctx.target,
        to: _ctx.to,
        replace: _ctx.replace,
        exact: _ctx.exact,
        "active-class": _ctx.activeClass,
        "exact-active-class": _ctx.exactActiveClass,
        style: normalizeStyle(computedStyle.value)
      }, {
        default: withCtx(() => [
          createBaseVNode("span", mergeProps({
            class: "va-chip__inner",
            onFocus: _cache[0] || (_cache[0] = ($event) => _ctx.$emit("focus")),
            onMouseenter: _cache[1] || (_cache[1] = //@ts-ignore
            (...args) => unref(onMouseEnter) && unref(onMouseEnter)(...args)),
            onMouseleave: _cache[2] || (_cache[2] = //@ts-ignore
            (...args) => unref(onMouseLeave) && unref(onMouseLeave)(...args))
          }, toHandlers(unref(keyboardFocusListeners), true)), [
            __props.icon ? (openBlock(), createBlock(unref(VaIcon), {
              key: 0,
              class: "va-chip__icon",
              name: __props.icon,
              size: iconSize.value
            }, null, 8, ["name", "size"])) : createCommentVNode("", true),
            createBaseVNode("span", _hoisted_117, [
              renderSlot(_ctx.$slots, "default")
            ]),
            __props.closeable ? (openBlock(), createBlock(unref(VaIcon), {
              key: 1,
              role: "button",
              name: "va-close",
              class: "va-chip__close-icon",
              "aria-label": unref(tp)(_ctx.$props.ariaCloseLabel),
              tabindex: tabIndexComputed.value,
              size: iconSize.value,
              onClick: withModifiers(close, ["stop"]),
              onKeydown: [
                withKeys(withModifiers(close, ["stop"]), ["enter"]),
                withKeys(withModifiers(close, ["stop"]), ["space"])
              ]
            }, null, 8, ["aria-label", "tabindex", "size", "onKeydown"])) : createCommentVNode("", true)
          ], 16)
        ]),
        _: 3
      }, 8, ["href", "target", "to", "replace", "exact", "active-class", "exact-active-class", "class", "style"])) : createCommentVNode("", true);
    };
  }
});

// node_modules/vuestic-ui/dist/es/src/components/va-chip/index.js
var VaChip = withConfigTransport$1(_sfc_main38);

// node_modules/vuestic-ui/dist/es/src/components/va-collapse/VaCollapse.vue_vue_type_script_setup_true_lang.js
import "D:/Github/DONGTIAN/ui/node_modules/vuestic-ui/dist/es/VaCollapse.css";
var _hoisted_118 = { class: "va-collapse__header__text" };
var _hoisted_29 = ["id", "aria-labelledby"];
var _hoisted_35 = { class: "va-collapse__content" };
var _sfc_main39 = defineComponent({
  ...{
    name: "VaCollapse"
  },
  __name: "VaCollapse",
  props: {
    ...useComponentPresetProp,
    ...useStatefulProps,
    modelValue: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
    header: { type: String, default: "" },
    icon: { type: String, default: "" },
    color: { type: String, default: void 0 },
    bodyColor: { type: String, default: void 0 },
    textColor: { type: String, default: "" },
    bodyTextColor: { type: String, default: "" },
    iconColor: { type: String, default: "secondary" },
    colorAll: { type: Boolean, default: false },
    stateful: { type: Boolean, default: true }
  },
  emits: ["update:modelValue", ...useSelectableEmits],
  setup(__props, { expose: __expose, emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const body = shallowRef();
    const { valueComputed } = useStateful(props, emit, "modelValue");
    const { getColor, getTextColor, setHSLAColor: setHSLAColor2 } = useColors();
    const { accordionProps, accordionItemValue } = useAccordionItem();
    const computedModelValue = computed({
      get() {
        if (valueComputed.userProvided) {
          return valueComputed.value;
        }
        if (!isNilValue(accordionItemValue)) {
          return accordionItemValue.value;
        }
        return valueComputed.value;
      },
      set(v) {
        if (!isNilValue(accordionItemValue)) {
          accordionItemValue.value = v;
        }
        valueComputed.value = v;
      }
    });
    if (valueComputed.userProvided && !isNilValue(accordionItemValue)) {
      accordionItemValue.value = valueComputed.value;
    }
    const bodyHeight = ref();
    useResizeObserver([body], ([body2]) => {
      bodyHeight.value = body2.contentRect.height ?? 0;
    });
    const height = computed(() => computedModelValue.value ? bodyHeight.value : 0);
    const getTransition = () => {
      const duration = height.value / 1e3 * 0.2;
      return `${duration > 0.2 ? duration : 0.2}s`;
    };
    const contentBackground = computed(() => {
      if (props.bodyColor) {
        return getColor(props.bodyColor);
      }
      return props.color && props.colorAll ? setHSLAColor2(getColor(props.color), { a: 0.07 }) : void 0;
    });
    const headerBackground = computed(() => {
      return props.color ? getColor(props.color) : void 0;
    });
    const uniqueId = useComponentUuid();
    const headerIdComputed = computed(() => `header-${uniqueId}`);
    const panelIdComputed = computed(() => `panel-${uniqueId}`);
    const tabIndexComputed = computed(() => props.disabled ? -1 : 0);
    const headerAttributes = computed(() => ({
      id: headerIdComputed.value,
      tabindex: tabIndexComputed.value,
      "aria-controls": panelIdComputed.value,
      "aria-expanded": computedModelValue.value,
      "aria-disabled": props.disabled,
      role: "button"
    }));
    const isHeightChanging = ref(false);
    watch(height, (newValue, oldValue) => {
      if (oldValue === void 0) {
        return;
      }
      if (isHeightChanging.value === true) {
        return;
      }
      isHeightChanging.value = true;
    });
    const onTransitionEnd = (e) => {
      if (e.propertyName === "height" && e.target === e.currentTarget) {
        isHeightChanging.value = false;
      }
    };
    const computedClasses = useBem("va-collapse", () => ({
      ...pick(props, ["disabled"]),
      expanded: computedModelValue.value,
      active: computedModelValue.value,
      popout: !!(accordionProps.value.popout && computedModelValue.value),
      inset: !!(accordionProps.value.inset && computedModelValue.value),
      "height-changing": isHeightChanging.value,
      "colored-body": Boolean(contentBackground.value),
      "colored-header": Boolean(headerBackground.value)
    }));
    const toggle = () => {
      if (props.disabled) {
        return;
      }
      computedModelValue.value = !computedModelValue.value;
    };
    const { textColorComputed } = useTextColor(headerBackground);
    const headerStyle = computed(() => ({
      color: textColorComputed.value,
      backgroundColor: headerBackground.value
    }));
    const doRenderBody = computed(() => {
      if (computedModelValue.value) {
        return true;
      }
      if (isHeightChanging.value) {
        return true;
      }
      return false;
    });
    const contentStyle = computed(() => {
      return {
        height: `${height.value}px`,
        transitionDuration: getTransition(),
        background: computedModelValue.value ? contentBackground.value : "",
        color: props.bodyTextColor ? getColor(props.bodyTextColor) : contentBackground.value ? getColor(getTextColor(contentBackground.value)) : "currentColor"
      };
    });
    __expose({
      toggle
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: normalizeClass(["va-collapse", unref(computedClasses)])
      }, [
        createBaseVNode("div", {
          class: "va-collapse__header-wrapper",
          onClick: toggle,
          onKeydown: [
            withKeys(toggle, ["enter"]),
            withKeys(toggle, ["space"])
          ]
        }, [
          renderSlot(_ctx.$slots, "header", normalizeProps(guardReactiveProps({
            value: computedModelValue.value,
            bind: headerAttributes.value,
            attributes: headerAttributes.value,
            attrs: headerAttributes.value,
            iconAttrs: {
              class: [
                "va-collapse__expand-icon",
                computedModelValue.value ? "a-collapse__expand-icon--expanded" : "a-collapse__expand-icon--collapsed"
              ]
            },
            text: __props.header
          })), () => [
            createBaseVNode("div", mergeProps(headerAttributes.value, {
              class: "va-collapse__header",
              style: headerStyle.value
            }), [
              __props.icon ? (openBlock(), createBlock(unref(VaIcon), {
                key: 0,
                class: "va-collapse__header__icon",
                name: __props.icon
              }, null, 8, ["name"])) : createCommentVNode("", true),
              renderSlot(_ctx.$slots, "header-content", normalizeProps(guardReactiveProps({ header: __props.header })), () => [
                createBaseVNode("div", _hoisted_118, toDisplayString(__props.header), 1)
              ]),
              renderSlot(_ctx.$slots, "expand-icon", {}, () => [
                createVNode(unref(VaIcon), {
                  class: normalizeClass(["va-collapse__expand-icon", computedModelValue.value ? "va-collapse__expand-icon--expanded" : "va-collapse__expand-icon--collapsed"]),
                  name: "va-arrow-down"
                }, null, 8, ["class"])
              ])
            ], 16)
          ])
        ], 32),
        createBaseVNode("div", {
          class: normalizeClass(["va-collapse__body-wrapper", {
            "va-collapse__body-wrapper--bordered": !_ctx.$slots.body && !_ctx.$slots.header
          }]),
          style: normalizeStyle(contentStyle.value),
          onTransitionend: onTransitionEnd
        }, [
          doRenderBody.value ? (openBlock(), createElementBlock("div", {
            key: 0,
            class: "va-collapse__body",
            ref_key: "body",
            ref: body,
            role: "region",
            id: panelIdComputed.value,
            "aria-labelledby": headerIdComputed.value
          }, [
            renderSlot(_ctx.$slots, "body", {}, () => [
              createBaseVNode("div", _hoisted_35, [
                renderSlot(_ctx.$slots, "default", {}, () => [
                  renderSlot(_ctx.$slots, "content")
                ])
              ])
            ])
          ], 8, _hoisted_29)) : createCommentVNode("", true)
        ], 38)
      ], 2);
    };
  }
});

// node_modules/vuestic-ui/dist/es/src/components/va-collapse/index.js
var VaCollapse = withConfigTransport$1(_sfc_main39);

// node_modules/vuestic-ui/dist/es/src/components/va-color-indicator/VaColorIndicator.vue_vue_type_script_setup_true_lang.js
import "D:/Github/DONGTIAN/ui/node_modules/vuestic-ui/dist/es/VaColorIndicator.css";
var _sfc_main40 = defineComponent({
  ...{
    name: "VaColorIndicator"
  },
  __name: "VaColorIndicator",
  props: {
    ...useStatefulProps,
    ...useComponentPresetProp,
    modelValue: { type: Boolean, default: null },
    color: { type: String, default: "" },
    square: { type: Boolean, default: false },
    size: { type: String, default: "1rem" }
  },
  emits: [...useStatefulEmits],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const { valueComputed } = useStateful(props, emit);
    const { getColor } = useColors();
    const { hasKeyboardFocus, keyboardFocusListeners } = useKeyboardOnlyFocus();
    const colorComputed = computed(() => getColor(props.color));
    const borderRadiusComputed = computed(() => props.square ? "0px" : "50%");
    const computedStyle = computed(() => ({
      backgroundColor: colorComputed.value,
      height: props.size,
      width: props.size
    }));
    const computedClass = computed(() => ({
      "va-color-indicator--selected": valueComputed.value,
      "va-color-indicator--on-keyboard-focus": hasKeyboardFocus.value
    }));
    const toggleModelValue = () => {
      valueComputed.value = !valueComputed.value;
    };
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", mergeProps({
        class: ["va-color-indicator", computedClass.value],
        style: [computedStyle.value, `--va-border-radius-computed: ${String(borderRadiusComputed.value)}`],
        onClick: toggleModelValue,
        onKeydown: [
          withKeys(toggleModelValue, ["enter"]),
          withKeys(toggleModelValue, ["space"])
        ]
      }, toHandlers(unref(keyboardFocusListeners), true)), [
        createBaseVNode("div", {
          class: "va-color-indicator__core",
          style: normalizeStyle(computedStyle.value)
        }, null, 4)
      ], 16);
    };
  }
});

// node_modules/vuestic-ui/dist/es/src/components/va-color-indicator/index.js
var VaColorIndicator = withConfigTransport$1(_sfc_main40);

// node_modules/vuestic-ui/dist/es/src/components/va-input-wrapper/components/VaInputLabel.vue_vue_type_script_setup_true_lang.js
import "D:/Github/DONGTIAN/ui/node_modules/vuestic-ui/dist/es/VaInputLabel.css";
var _hoisted_119 = {
  key: 0,
  class: "va-input-label__required-mark"
};
var _sfc_main41 = defineComponent({
  ...{
    name: "VaInputLabel"
  },
  __name: "VaInputLabel",
  props: {
    label: {
      type: String,
      default: ""
    },
    requiredMark: {
      type: Boolean,
      default: false
    },
    color: {
      type: String,
      default: "primary"
    }
  },
  setup(__props) {
    const { getColor } = useColors();
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("label", {
        "aria-hidden": "true",
        class: "va-input-label",
        style: normalizeStyle({ color: unref(getColor)(_ctx.$props.color, void 0, true) })
      }, [
        renderSlot(_ctx.$slots, "default", normalizeProps(guardReactiveProps({ label: __props.label, requiredMark: __props.requiredMark, color: unref(getColor)(_ctx.$props.color) })), () => [
          createTextVNode(toDisplayString(__props.label) + " ", 1),
          __props.requiredMark ? (openBlock(), createElementBlock("span", _hoisted_119, " * ")) : createCommentVNode("", true)
        ])
      ], 4);
    };
  }
});

// node_modules/vuestic-ui/dist/es/src/components/va-input-wrapper/hooks/useInputFieldAria.js
var useInputFieldAriaProps = {
  label: { type: String, default: "" },
  inputAriaLabel: useTranslationProp("$t:inputField"),
  inputAriaLabelledby: { type: String },
  inputAriaDescribedby: { type: String }
};
var useInputFieldAria = (props) => {
  const id = useComponentUuid();
  const labelId = `input-label-${id}`;
  const characterCountId = `input-character-count-${id}`;
  const ariaAttributes = computed(() => ({
    "aria-label": props.label !== "" ? props.label : props.inputAriaLabel,
    "aria-labelledby": props.inputAriaLabelledby ? props.inputAriaLabelledby : labelId,
    "aria-describedby": props.inputAriaDescribedby ? props.inputAriaDescribedby : characterCountId
  }));
  return {
    labelId,
    characterCountId,
    ariaAttributes
  };
};

// node_modules/vuestic-ui/dist/es/src/utils/with-slot-inheritance/with-slot-inheritance.js
var WithSlotInheritance = (component) => {
  return defineComponent({
    name: "ProxySlots",
    props: {
      inheritSlots: { type: Array, required: true }
    },
    render() {
      var _a2;
      const parentSlots = ((_a2 = this.$parent) == null ? void 0 : _a2.$slots) || {};
      const slotsToProxy = this.$props.inheritSlots || Object.keys(parentSlots);
      const slots = slotsToProxy.reduce(
        (slots2, name) => {
          if (parentSlots[name]) {
            slots2[name] = parentSlots[name];
          }
          return slots2;
        },
        {}
      );
      return h(component, this.$attrs, {
        ...slots,
        ...this.$slots
      });
    }
  });
};

// node_modules/vuestic-ui/dist/es/src/composables/useFormField.js
var useFormFieldProps = {
  disabled: { type: Boolean, default: false },
  readonly: { type: Boolean, default: false }
};
var useFormField = (prefix2, props) => {
  const computedClasses = useBem(prefix2, computed(() => pick(props, ["disabled", "readonly"])));
  return { computedClasses };
};

// node_modules/vuestic-ui/dist/es/src/composables/useFocusDeep.js
var useFocusDeep = (el) => {
  const focused = useActiveElement();
  const current = useCurrentElement(el ? useHTMLElement(el) : void 0);
  let previouslyFocusedElement = null;
  const isFocused = computed({
    get() {
      var _a2;
      if (!focused.value) {
        return false;
      }
      if (focused.value === current.value) {
        return true;
      }
      const isFocused2 = (_a2 = current.value) == null ? void 0 : _a2.contains(focused.value);
      if (isFocused2) {
        previouslyFocusedElement = focused.value;
      }
      return isFocused2;
    },
    set(value) {
      var _a2;
      let target = previouslyFocusedElement ?? current.value;
      if (!((_a2 = current.value) == null ? void 0 : _a2.contains(target))) {
        target = current.value;
      }
      if (value) {
        target == null ? void 0 : target.focus();
      } else {
        target == null ? void 0 : target.blur();
      }
    }
  });
  return Object.assign(isFocused, {
    /** Focus `el` if focus is not set to any other element */
    focusIfNothingIfFocused: () => {
      if (focused.value === document.body) {
        isFocused.value = true;
      }
    },
    focusPreviousElement: () => {
      if (previouslyFocusedElement) {
        previouslyFocusedElement.focus();
      } else {
        document.body.focus();
      }
    }
  });
};

// node_modules/vuestic-ui/dist/es/src/components/va-input-wrapper/VaInputWrapper.vue_vue_type_script_lang.js
import "D:/Github/DONGTIAN/ui/node_modules/vuestic-ui/dist/es/VaInputWrapper.css";
var VaInputLabelProps = extractComponentProps(_sfc_main41);
var _sfc_main42 = defineComponent({
  name: "VaInputWrapper",
  components: { VaMessageList: WithSlotInheritance(VaMessageList), VaIcon, VaInputLabel: _sfc_main41 },
  props: {
    ...useComponentPresetProp,
    ...useInputFieldAriaProps,
    ...useFormFieldProps,
    ...useValidationProps,
    ...VaInputLabelProps,
    modelValue: { type: null, default: "" },
    counter: { type: Boolean },
    maxLength: { type: [Number, String], default: void 0 },
    label: { type: String, default: "" },
    placeholder: { type: String, default: "" },
    color: { type: String, default: "primary" },
    background: { type: String },
    success: { type: Boolean, default: false },
    loading: { type: Boolean, default: false },
    requiredMark: { type: Boolean, default: false },
    innerLabel: { type: Boolean, default: false }
  },
  emits: [
    "click",
    "click-prepend",
    "click-append",
    "click-prepend-inner",
    "click-append-inner",
    "click-field",
    "update:modelValue"
  ],
  setup(props, { emit, slots }) {
    const { getColor } = useColors();
    const [vModel] = useSyncProp("modelValue", props, emit, "");
    const inputRef = ref();
    const isFocused = useFocusDeep();
    const counterValue = computed(
      () => props.counter && typeof vModel.value === "string" ? vModel.value.length : void 0
    );
    const wrapperClass = useBem("va-input-wrapper", () => ({
      ...pick(props, ["success", "error", "disabled", "readonly"]),
      focused: Boolean(isFocused.value),
      labeled: Boolean(props.label || slots.label),
      labeledInner: Boolean(props.label || slots.label) && props.innerLabel
    }));
    const colorComputed = computed(() => getColor(props.color));
    const backgroundComputed = computed(() => props.background ? getColor(props.background) : "#ffffff00");
    const messagesComputed = computed(() => props.error ? props.errorMessages : props.messages);
    const { textColorComputed } = useTextColor(backgroundComputed);
    const maxLengthComputed = useNumericProp("maxLength");
    const messagesColor = computed(() => {
      if (props.error) {
        return "danger";
      }
      if (props.success) {
        return "success";
      }
      return "";
    });
    const errorLimit = computed(() => props.error ? Number(props.errorCount) : 99);
    const isCounterVisible = computed(() => counterValue.value !== void 0);
    const counterComputed = computed(
      () => maxLengthComputed.value !== void 0 ? `${counterValue.value}/${maxLengthComputed.value}` : counterValue.value
    );
    const {
      labelId,
      characterCountId,
      ariaAttributes
    } = useInputFieldAria(props);
    const vaInputLabelProps = filterComponentProps(VaInputLabelProps);
    const focus = () => {
      isFocused.value = true;
    };
    const blur = () => {
      isFocused.value = false;
    };
    return {
      inputRef,
      focus,
      blur,
      labelId,
      characterCountId,
      ariaAttributes,
      vModel,
      counterValue,
      vaInputLabelProps,
      wrapperClass,
      textColorComputed,
      isCounterVisible,
      counterComputed,
      colorComputed,
      backgroundComputed,
      messagesColor,
      messagesComputed,
      errorLimit
    };
  }
});

// node_modules/vuestic-ui/dist/es/src/components/va-input-wrapper/VaInputWrapper.js
import "D:/Github/DONGTIAN/ui/node_modules/vuestic-ui/dist/es/VaInputWrapper.css";
var _hoisted_120 = { class: "va-input-wrapper__fieldset va-input-wrapper__size-keeper" };
var _hoisted_210 = { class: "va-input-wrapper__container" };
var _hoisted_36 = { class: "va-input-wrapper__text" };
var _hoisted_45 = ["placeholder", "readonly", "disabled"];
var _hoisted_54 = ["id"];
var _hoisted_64 = { class: "va-input-wrapper__counter" };
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_VaInputLabel = resolveComponent("VaInputLabel");
  const _component_va_icon = resolveComponent("va-icon");
  const _component_va_message_list = resolveComponent("va-message-list");
  return openBlock(), createElementBlock("div", {
    class: normalizeClass(["va-input-wrapper", _ctx.wrapperClass]),
    onClick: _cache[6] || (_cache[6] = ($event) => _ctx.$emit("click", $event)),
    style: normalizeStyle(`--va-background-computed: ${String(_ctx.backgroundComputed)};--va-color-computed: ${String(_ctx.colorComputed)};--va-text-color-computed: ${String(_ctx.textColorComputed)}`)
  }, [
    createBaseVNode("fieldset", _hoisted_120, [
      createVNode(_component_va_message_list, {
        color: _ctx.messagesColor,
        "model-value": _ctx.messagesComputed,
        limit: _ctx.errorLimit,
        "inherit-slots": ["message", "messages"]
      }, {
        default: withCtx(({ ariaAttributes: messagesChildAriaAttributes }) => [
          (_ctx.$props.label || _ctx.$slots.label) && !_ctx.$props.innerLabel ? (openBlock(), createBlock(_component_VaInputLabel, mergeProps({
            key: 0,
            class: "va-input-wrapper__label va-input-wrapper__label--outer"
          }, _ctx.vaInputLabelProps, { id: _ctx.labelId }), {
            default: withCtx((bind) => [
              renderSlot(_ctx.$slots, "label", normalizeProps(guardReactiveProps(bind)))
            ]),
            _: 3
          }, 16, ["id"])) : createCommentVNode("", true),
          createBaseVNode("div", _hoisted_210, [
            _ctx.$slots.prepend ? (openBlock(), createElementBlock("div", {
              key: 0,
              class: "va-input-wrapper__prepend-inner",
              onClick: _cache[0] || (_cache[0] = ($event) => _ctx.$emit("click-prepend"))
            }, [
              renderSlot(_ctx.$slots, "prepend")
            ])) : createCommentVNode("", true),
            createBaseVNode("div", {
              onClick: _cache[4] || (_cache[4] = ($event) => _ctx.$emit("click-field", $event)),
              class: "va-input-wrapper__field"
            }, [
              _ctx.$slots.prependInner ? (openBlock(), createElementBlock("div", {
                key: 0,
                class: "va-input-wrapper__prepend-inner",
                ref: "container",
                onClick: _cache[1] || (_cache[1] = ($event) => _ctx.$emit("click-prepend-inner", $event))
              }, [
                renderSlot(_ctx.$slots, "prependInner")
              ], 512)) : createCommentVNode("", true),
              createBaseVNode("div", _hoisted_36, [
                (_ctx.$props.label || _ctx.$slots.label) && _ctx.$props.innerLabel ? (openBlock(), createBlock(_component_VaInputLabel, mergeProps({
                  key: 0,
                  class: "va-input-wrapper__label va-input-wrapper__label--inner"
                }, _ctx.vaInputLabelProps, { id: _ctx.labelId }), {
                  default: withCtx((bind) => [
                    renderSlot(_ctx.$slots, "label", normalizeProps(guardReactiveProps(bind)))
                  ]),
                  _: 3
                }, 16, ["id"])) : createCommentVNode("", true),
                renderSlot(_ctx.$slots, "default", normalizeProps(guardReactiveProps({ ariaAttributes: { ...messagesChildAriaAttributes, ..._ctx.ariaAttributes }, value: _ctx.vModel })), () => [
                  withDirectives(createBaseVNode("input", mergeProps({ ...messagesChildAriaAttributes, ..._ctx.ariaAttributes }, {
                    "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => _ctx.vModel = $event),
                    ref: "inputRef",
                    placeholder: _ctx.$props.placeholder,
                    readonly: _ctx.$props.readonly,
                    disabled: _ctx.$props.disabled
                  }), null, 16, _hoisted_45), [
                    [vModelDynamic, _ctx.vModel]
                  ])
                ])
              ]),
              _ctx.success ? (openBlock(), createBlock(_component_va_icon, {
                key: 1,
                color: "success",
                name: "va-check-circle",
                class: "va-input-wrapper__icon va-input-wrapper__icon--success"
              })) : createCommentVNode("", true),
              _ctx.error ? (openBlock(), createBlock(_component_va_icon, {
                key: 2,
                color: "danger",
                name: "va-warning",
                class: "va-input-wrapper__icon va-input-wrapper__icon--error"
              })) : createCommentVNode("", true),
              _ctx.$props.loading ? (openBlock(), createBlock(_component_va_icon, {
                key: 3,
                color: _ctx.$props.color,
                name: "va-loading",
                spin: "counter-clockwise",
                class: "va-input-wrapper__icon va-input-wrapper__icon--loading"
              }, null, 8, ["color"])) : createCommentVNode("", true),
              renderSlot(_ctx.$slots, "icon"),
              _ctx.$slots.appendInner ? (openBlock(), createElementBlock("div", {
                key: 4,
                class: "va-input-wrapper__append-inner",
                onClick: _cache[3] || (_cache[3] = ($event) => _ctx.$emit("click-append-inner", $event))
              }, [
                renderSlot(_ctx.$slots, "appendInner")
              ])) : createCommentVNode("", true)
            ]),
            _ctx.$slots.append ? (openBlock(), createElementBlock("div", {
              key: 1,
              class: "va-input-wrapper__append-inner",
              onClick: _cache[5] || (_cache[5] = ($event) => _ctx.$emit("click-append"))
            }, [
              renderSlot(_ctx.$slots, "append")
            ])) : createCommentVNode("", true)
          ]),
          _ctx.isCounterVisible ? (openBlock(), createElementBlock("div", {
            key: 1,
            class: "va-input-wrapper__counter-wrapper",
            id: _ctx.characterCountId
          }, [
            renderSlot(_ctx.$slots, "counter", normalizeProps(guardReactiveProps({ valueLength: _ctx.counterValue, maxLength: _ctx.$props.maxLength })), () => [
              createBaseVNode("div", _hoisted_64, toDisplayString(_ctx.counterComputed), 1)
            ])
          ], 8, _hoisted_54)) : createCommentVNode("", true)
        ]),
        _: 3
      }, 8, ["color", "model-value", "limit"])
    ])
  ], 6);
}
var _VaInputWrapper = _export_sfc(_sfc_main42, [["render", _sfc_render]]);

// node_modules/vuestic-ui/dist/es/src/components/va-input-wrapper/index.js
var VaInputWrapper = withConfigTransport$1(_VaInputWrapper);

// node_modules/vuestic-ui/dist/es/src/utils/combine-functions.js
var combineFunctions = (...list) => {
  return (...args) => list.forEach((fn) => fn(...args));
};

// node_modules/vuestic-ui/dist/es/src/composables/useFocusable.js
var useFocusableProps = {
  /** Focus element when mounted */
  autofocus: { type: Boolean, default: false }
};
var useFocusable = (el, props) => {
  const focus = () => {
    focusElement(unwrapEl(el.value));
  };
  const blur = () => {
    blurElement(unwrapEl(el.value));
  };
  onMounted(() => {
    if (props.autofocus) {
      focus();
    }
  });
  return {
    focus,
    blur
  };
};

// node_modules/vuestic-ui/dist/es/src/composables/useClearable.js
var useClearableProps = {
  clearable: { type: Boolean, default: false },
  clearableIcon: { type: String, default: "va-clear" },
  clearValue: { type: String, default: "" }
};
var useClearableEmits = ["clear"];
var useClearable = (props, inputValue, el, hasError) => {
  const { isFocused, onFocus, onBlur } = useFocus(el);
  const clearedValues = [null, void 0, props.clearValue];
  const canBeCleared = computed(() => props.clearable && !props.disabled && !props.readonly && !clearedValues.includes(inputValue.value));
  const clearIconColor = computed(() => {
    if (isFocused == null ? void 0 : isFocused.value) {
      return props.color || "primary";
    }
    if (hasError == null ? void 0 : hasError.value) {
      return "danger";
    }
    if (props.success) {
      return "success";
    }
    return "secondary";
  });
  const clearIconProps = computed(() => ({
    name: props.clearableIcon,
    color: clearIconColor.value,
    size: "medium",
    tabindex: canBeCleared.value ? 0 : -1
  }));
  return {
    canBeCleared,
    clearIconColor,
    clearIconProps,
    onFocus,
    onBlur
  };
};

// node_modules/vuestic-ui/dist/es/src/composables/useDeprecatedCondition.js
var useDeprecatedCondition = (validators) => {
  if (!isDev) {
    return void 0;
  }
  const instance = getCurrentInstance();
  if (!instance) {
    throw new Error("`useDeprecated` hook must be used only inside of setup function!");
  }
  validators.forEach((validator) => {
    const message = validator();
    if (typeof message === "string") {
      warn(`(${instance.type.name} component) ${message}`);
    }
  });
};

// node_modules/vuestic-ui/dist/es/src/components/va-input/VaInput.vue_vue_type_script_setup_true_lang.js
var VaInputWrapperProps = extractComponentProps(VaInputWrapper);
var { createEmits: createInputEmits, createListeners: createInputListeners } = useEmitProxy(
  ["change", "keyup", "keypress", "keydown", "focus", "blur", "input"]
);
var { createEmits: createFieldEmits, createListeners: createFieldListeners } = useEmitProxy([
  "click",
  "click-prepend",
  "click-append",
  "click-prepend-inner",
  "click-append-inner"
]);
var _sfc_main43 = defineComponent({
  ...{
    name: "VaInput"
  },
  __name: "VaInput",
  props: {
    ...VaInputWrapperProps,
    ...useFormFieldProps,
    ...useFocusableProps,
    ...useValidationProps,
    ...useClearableProps,
    ...useComponentPresetProp,
    ...useStatefulProps,
    // input
    placeholder: { type: String, default: "" },
    tabindex: { type: [String, Number], default: 0 },
    modelValue: { type: [Number, String, null], default: "" },
    type: { type: String, default: "text" },
    inputClass: { type: String, default: "" },
    pattern: { type: String },
    inputmode: { type: String, default: "text" },
    counter: { type: Boolean, default: false },
    // style
    ariaResetLabel: useTranslationProp("$t:reset"),
    /** Set value to input when model value is updated */
    strictBindInputValue: { type: Boolean, default: false }
  },
  emits: [
    "update:modelValue",
    ...useValidationEmits,
    ...useClearableEmits,
    ...createInputEmits(),
    ...createFieldEmits(),
    ...useStatefulEmits
  ],
  setup(__props, { expose: __expose, emit: __emit }) {
    const props = __props;
    const emit = __emit;
    useDeprecatedCondition([
      () => props.type !== "textarea" || 'Use VaTextarea component instead of VaInput with type="textarea"'
    ]);
    const input = shallowRef();
    const { valueComputed } = useStateful(props, emit, "modelValue");
    const reset = () => withoutValidation(() => {
      valueComputed.value = props.clearValue;
      emit("clear");
      resetValidation();
    });
    const { focus, blur } = useFocusable(input, props);
    const slots = useSlots();
    const filterSlots = computed(() => {
      const iconSlot = ["icon"];
      return Object.keys(slots).filter((slot) => !iconSlot.includes(slot));
    });
    const { tp } = useTranslation();
    const {
      isValid,
      isTouched,
      isDirty,
      computedError,
      computedErrorMessages,
      listeners: { onBlur },
      validationAriaAttributes,
      isLoading,
      withoutValidation,
      resetValidation
    } = useValidation(props, emit, { reset, focus, value: valueComputed });
    const { modelValue } = toRefs(props);
    const {
      canBeCleared,
      clearIconProps
    } = useClearable(props, modelValue, input, computedError);
    const inputListeners = createInputListeners(emit);
    const inputEvents = {
      ...inputListeners,
      onBlur: combineFunctions(onBlur, inputListeners.onBlur)
    };
    const setInputValue = (newValue) => {
      if (!props.strictBindInputValue) {
        return;
      }
      const target = input.value;
      if (!target) {
        return;
      }
      const selectionStart = target.selectionStart || 0;
      const selectionEnd = target.selectionEnd || 0;
      if (target.value !== newValue) {
        target.value = String(newValue);
      }
      target.setSelectionRange(selectionStart, selectionEnd);
    };
    watch(valueComputed, (newValue) => {
      setInputValue(String(newValue));
    }, { immediate: true });
    useEvent("input", () => {
      setInputValue(String(valueComputed.value));
    }, input);
    const tabIndexComputed = computed(() => props.disabled ? -1 : props.tabindex);
    const attrs = useAttrs();
    const computedChildAttributes = computed(() => ({
      "aria-label": props.inputAriaLabel || props.label,
      "aria-labelledby": props.inputAriaLabelledby,
      "aria-required": props.requiredMark,
      tabindex: tabIndexComputed.value,
      class: props.inputClass,
      "aria-disabled": props.disabled,
      "aria-readonly": props.readonly,
      ...validationAriaAttributes.value
    }));
    const computedInputAttributes = computed(() => ({
      ...computedChildAttributes.value,
      ...pick(props, ["type", "disabled", "readonly", "placeholder", "pattern", "inputmode", "name"]),
      ...pick(attrs, ["minlength", "minlength"])
    }));
    const valueLengthComputed = computed(
      () => props.counter && typeof valueComputed.value === "string" ? valueComputed.value.length : void 0
    );
    const onFieldClick = (e) => {
      if (!e.target || !("tagName" in e.target)) {
        return;
      }
      if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA") {
        return;
      }
      focus();
    };
    const wrapperProps = filterComponentProps(VaInputWrapperProps);
    const fieldListeners = createFieldListeners(emit);
    __expose({
      isValid,
      isDirty,
      isTouched,
      isLoading,
      computedError,
      computedErrorMessages,
      reset,
      focus,
      blur,
      value: valueComputed,
      withoutValidation,
      resetValidation
    });
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(VaInputWrapper), mergeProps({
        ...unref(fieldListeners),
        ...unref(wrapperProps)
      }, {
        class: ["va-input", _ctx.$attrs.class],
        style: _ctx.$attrs.style,
        loading: _ctx.$props.loading || unref(isLoading),
        error: unref(computedError),
        "error-messages": unref(computedErrorMessages),
        "error-count": _ctx.errorCount,
        "counter-value": valueLengthComputed.value,
        onClick: onFieldClick
      }), createSlots({
        icon: withCtx((slotScope) => [
          unref(canBeCleared) ? (openBlock(), createBlock(unref(VaIcon), mergeProps({
            key: 0,
            role: "button",
            "aria-label": unref(tp)(_ctx.$props.ariaResetLabel)
          }, unref(clearIconProps), {
            onClick: withModifiers(reset, ["stop"]),
            onKeydown: [
              withKeys(withModifiers(reset, ["stop"]), ["enter"]),
              withKeys(withModifiers(reset, ["stop"]), ["space"])
            ]
          }), null, 16, ["aria-label", "onKeydown"])) : createCommentVNode("", true),
          renderSlot(_ctx.$slots, "icon", normalizeProps(guardReactiveProps(slotScope)))
        ]),
        default: withCtx(() => [
          !_ctx.$slots.content ? withDirectives((openBlock(), createElementBlock("input", mergeProps({
            key: 0,
            ref_key: "input",
            ref: input,
            class: "va-input__content__input"
          }, { ...computedInputAttributes.value, ...inputEvents }, {
            "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => isRef(valueComputed) ? valueComputed.value = $event : null)
          }), null, 16)), [
            [vModelDynamic, unref(valueComputed)]
          ]) : createCommentVNode("", true)
        ]),
        _: 2
      }, [
        renderList(filterSlots.value, (name) => {
          return {
            name,
            fn: withCtx((slotScope) => [
              renderSlot(_ctx.$slots, name, normalizeProps(guardReactiveProps(slotScope)))
            ])
          };
        })
      ]), 1040, ["class", "style", "loading", "error", "error-messages", "error-count", "counter-value"]);
    };
  }
});

// node_modules/vuestic-ui/dist/es/src/components/va-input/index.js
var VaInput = withConfigTransport$1(_sfc_main43);

// node_modules/vuestic-ui/dist/es/src/components/va-color-input/VaColorInput.vue_vue_type_script_setup_true_lang.js
import "D:/Github/DONGTIAN/ui/node_modules/vuestic-ui/dist/es/VaColorInput.css";
var _hoisted_121 = { class: "va-color-input" };
var VaInputProps = extractComponentProps(VaInput);
var _sfc_main44 = defineComponent({
  ...{
    name: "VaColorInput"
  },
  __name: "VaColorInput",
  props: {
    ...VaInputProps,
    ...useStatefulProps,
    ...useComponentPresetProp,
    modelValue: { type: String, default: null },
    disabled: { type: Boolean, default: false },
    indicator: {
      type: String,
      default: "dot",
      validator: (value) => ["dot", "square"].includes(value)
    },
    ariaOpenColorPickerLabel: useTranslationProp("$t:openColorPicker")
  },
  emits: [...useStatefulEmits],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const colorPicker = shallowRef();
    const { valueComputed } = useStateful(props, emit);
    const callPickerDialog = () => {
      var _a2;
      return !props.disabled && ((_a2 = colorPicker.value) == null ? void 0 : _a2.click());
    };
    const tabIndexComputed = computed(() => props.disabled ? -1 : 0);
    const inputValue = computed({
      get: () => props.modelValue,
      set: throttle((value) => emit("update:modelValue", value), 500)
    });
    const vaInputProps = filterComponentProps(VaInputProps);
    const { tp } = useTranslation();
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_121, [
        createVNode(unref(VaInput), mergeProps(unref(vaInputProps), {
          modelValue: unref(valueComputed),
          "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => isRef(valueComputed) ? valueComputed.value = $event : null),
          class: "va-color-input__input",
          tabindex: tabIndexComputed.value
        }), {
          appendInner: withCtx(() => [
            createVNode(unref(VaColorIndicator), {
              class: "va-color-input__dot",
              role: "button",
              "aria-label": unref(tp)(_ctx.$props.ariaOpenColorPickerLabel),
              "aria-disabled": _ctx.$props.disabled,
              tabindex: tabIndexComputed.value,
              color: unref(valueComputed),
              indicator: _ctx.$props.indicator,
              size: "16px",
              onClick: callPickerDialog,
              onKeydown: [
                withKeys(callPickerDialog, ["space"]),
                withKeys(callPickerDialog, ["enter"])
              ]
            }, null, 8, ["aria-label", "aria-disabled", "tabindex", "color", "indicator"])
          ]),
          _: 1
        }, 16, ["modelValue", "tabindex"]),
        withDirectives(createBaseVNode("input", {
          ref_key: "colorPicker",
          ref: colorPicker,
          type: "color",
          class: "va-color-input__hidden-input",
          "aria-hidden": "true",
          tabindex: "-1",
          "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => inputValue.value = $event)
        }, null, 512), [
          [vModelText, inputValue.value]
        ])
      ]);
    };
  }
});

// node_modules/vuestic-ui/dist/es/src/components/va-color-input/index.js
var VaColorInput = withConfigTransport$1(_sfc_main44);

// node_modules/vuestic-ui/dist/es/src/components/va-color-palette/VaColorPalette.vue_vue_type_script_setup_true_lang.js
import "D:/Github/DONGTIAN/ui/node_modules/vuestic-ui/dist/es/VaColorPalette.css";
var _hoisted_122 = ["aria-label"];
var _sfc_main45 = defineComponent({
  ...{
    name: "VaColorPalette"
  },
  __name: "VaColorPalette",
  props: {
    ...useStatefulProps,
    ...useComponentPresetProp,
    modelValue: { type: String, default: null },
    palette: { type: Array, default: () => [] },
    indicator: {
      type: String,
      default: "dot",
      validator: (value) => ["dot", "square"].includes(value)
    },
    ariaLabel: useTranslationProp("$t:colorSelection"),
    ariaIndicatorLabel: useTranslationProp("$t:color")
  },
  emits: [...useStatefulEmits],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const { valueComputed } = useStateful(props, emit);
    const isSelected = (color) => valueComputed.value === color;
    const { tp } = useTranslation();
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("ul", {
        class: "va-color-palette",
        role: "listbox",
        "aria-label": unref(tp)(_ctx.$props.ariaLabel)
      }, [
        (openBlock(true), createElementBlock(Fragment, null, renderList(__props.palette, (color, index) => {
          return openBlock(), createBlock(unref(VaColorIndicator), {
            key: index,
            role: "option",
            "aria-label": unref(tp)(_ctx.$props.ariaIndicatorLabel, { color }),
            "aria-selected": isSelected(color),
            tabindex: "0",
            modelValue: isSelected(color),
            color,
            square: __props.indicator === "square",
            "onUpdate:modelValue": ($event) => valueComputed.value = color
          }, null, 8, ["aria-label", "aria-selected", "modelValue", "color", "square", "onUpdate:modelValue"]);
        }), 128))
      ], 8, _hoisted_122);
    };
  }
});

// node_modules/vuestic-ui/dist/es/src/components/va-color-palette/index.js
var VaColorPalette = withConfigTransport$1(_sfc_main45);

// node_modules/vuestic-ui/dist/es/src/components/va-content/VaContent.js
var _sfc_main46 = {
  name: "VaContent"
};
var _hoisted_123 = { class: "va-typography-block" };
function _sfc_render2(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", _hoisted_123, [
    renderSlot(_ctx.$slots, "default")
  ]);
}
var _VaContent = _export_sfc(_sfc_main46, [["render", _sfc_render2]]);

// node_modules/vuestic-ui/dist/es/src/components/va-content/index.js
var VaContent = withConfigTransport$1(_VaContent);

// node_modules/vuestic-ui/dist/es/src/utils/css.js
var safeCSSLength = (length) => typeof length === "number" ? `${length}px` : length;

// node_modules/vuestic-ui/dist/es/src/components/va-counter/hooks/useCounterPropsValidation.js
function useCounterPropsValidation(props) {
  const validateCounterProps = () => {
    const val = Number(props.modelValue);
    const max2 = Number(props.max);
    const min2 = Number(props.min);
    const step = Number(props.step);
    if (Number.isNaN(val)) {
      warn("The value is not a number or cannot be reduced to a number.");
      return;
    }
    if (min2 && max2 && min2 > max2) {
      warn(`The maximum value (${max2}) can not be less than the minimum value (${min2}).`);
    }
    if (min2 && val < min2) {
      warn(`The value of the counter (${val}) can not be less than the minimum value (${min2}).`);
    }
    if (max2 && val > max2) {
      warn(`The value of the counter (${val}) can not be greater than the maximum value (${max2}).`);
    }
    if (min2 && max2 && step > max2 - min2) {
      warn(`The value of the step (${step}) can not be greater than the difference (${max2 - min2}) between maximum value (${max2}) and minimum value (${min2}).`);
    }
  };
  watch(
    [
      () => props.step,
      () => props.min,
      () => props.max
    ],
    validateCounterProps,
    { immediate: true }
  );
}

// node_modules/vuestic-ui/dist/es/src/utils/to-float.js
var toFloat = (num) => {
  return Number(num.toPrecision(13));
};
var isDividable = (num, step) => {
  const result = toFloat(num % step);
  return result === 0 || result === step;
};

// node_modules/vuestic-ui/dist/es/src/composables/useLongPress.js
function useLongPress(el, options) {
  let timeoutId = -1;
  let intervalId = -1;
  const handleMouseDown = () => {
    var _a2;
    (_a2 = options.onStart) == null ? void 0 : _a2.call(options);
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      intervalId = setInterval(() => {
        var _a22;
        return (_a22 = options.onUpdate) == null ? void 0 : _a22.call(options);
      }, options.interval || 100);
    }, unref(options.delay) || 500);
  };
  const handleMouseUp = () => {
    var _a2;
    clearTimeout(timeoutId);
    clearInterval(intervalId);
    (_a2 = options.onEnd) == null ? void 0 : _a2.call(options);
  };
  const htmlElement = useHTMLElement(el);
  useEvent(["mousedown", "touchstart", "dragstart"], handleMouseDown, htmlElement);
  useEvent([
    "mouseup",
    "mouseleave",
    "touchend",
    "touchcancel",
    "drop",
    "dragend",
    "blur"
  ], handleMouseUp, true);
}

// node_modules/vuestic-ui/dist/es/src/components/va-counter/VaCounter.vue_vue_type_script_setup_true_lang.js
import "D:/Github/DONGTIAN/ui/node_modules/vuestic-ui/dist/es/VaCounter.css";
var _hoisted_124 = ["value", "aria-live"];
var { createEmits: createInputEmits2, createListeners: createInputListeners2 } = useEmitProxy(
  ["change"]
);
var { createEmits: createFieldEmits2, createListeners: createFieldListeners2 } = useEmitProxy([
  { listen: "click-prepend", emit: "click:decrease-button" },
  { listen: "click-append", emit: "click:increase-button" },
  { listen: "click-prepend-inner", emit: "click:decrease-icon" },
  { listen: "click-append-inner", emit: "click:increase-icon" }
]);
var VaInputWrapperProps2 = extractComponentProps(VaInputWrapper);
var _sfc_main47 = defineComponent({
  ...{
    name: "VaCounter",
    inheritAttrs: false
  },
  __name: "VaCounter",
  props: {
    ...useFormFieldProps,
    ...useStatefulProps,
    ...useComponentPresetProp,
    ...useClearableProps,
    ...VaInputWrapperProps2,
    // input
    modelValue: { type: [String, Number], default: 0 },
    manualInput: { type: Boolean, default: false },
    min: { type: [Number, String] },
    max: { type: [Number, String] },
    step: { type: [Number, String], default: 1 },
    color: { type: String, default: "primary" },
    // icons & buttons
    increaseIcon: { type: String, default: "va-plus" },
    decreaseIcon: { type: String, default: "va-minus" },
    buttons: { type: Boolean, default: false },
    flat: { type: Boolean, default: true },
    rounded: { type: Boolean, default: false },
    margins: { type: [String, Number], default: "4px" },
    longPressDelay: { type: [Number, String], default: 500 },
    ariaLabel: useTranslationProp("$t:counterValue"),
    ariaDecreaseLabel: useTranslationProp("$t:decreaseCounter"),
    ariaIncreaseLabel: useTranslationProp("$t:increaseCounter")
  },
  emits: [
    "update:modelValue",
    ...useValidationEmits,
    ...createInputEmits2(),
    ...createFieldEmits2(),
    ...useFocusEmits
  ],
  setup(__props, { expose: __expose, emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const input = shallowRef();
    const { min: min2 = ref(void 0), max: max2 = ref(void 0), step } = toRefs(props);
    const longPressDelayComputed = useNumericProp("longPressDelay");
    const {
      isFocused,
      focus,
      blur
    } = useFocus(input, emit);
    const { valueComputed: statefulValue } = useStateful(props, emit);
    function floatify(num) {
      return parseFloat(Number(num).toFixed(10));
    }
    const valueComputed = computed({
      get() {
        return statefulValue.value;
      },
      set(v) {
        statefulValue.value = floatify(v);
      }
    });
    const reset = () => withoutValidation(() => {
      emit("update:modelValue", props.clearValue);
      emit("clear");
      resetValidation();
    });
    const {
      computedError,
      computedErrorMessages,
      withoutValidation,
      resetValidation,
      listeners: validationListeners,
      isDirty,
      isTouched
    } = useValidation(props, emit, { reset, focus, value: valueComputed });
    const setCountInput = ({ target }) => {
      valueComputed.value = Number(target == null ? void 0 : target.value);
    };
    const setCountChange = ({ target }) => {
      calculateCounterValue(Number(target == null ? void 0 : target.value));
    };
    const getRoundDownWithStep = (value) => {
      if (typeof min2.value === "undefined" || !Number(step.value)) {
        return value;
      }
      return toFloat(Number(min2.value) + Number(step.value) * ((Number(value) - Number(min2.value)) / Number(step.value)));
    };
    const calculateCounterValue = (counterValue) => {
      if (typeof min2.value !== "undefined" && counterValue < Number(min2.value)) {
        valueComputed.value = Number(min2.value);
        return;
      }
      if (typeof max2.value !== "undefined" && counterValue > Number(max2.value)) {
        valueComputed.value = getRoundDownWithStep(Number(max2.value));
        return;
      }
      valueComputed.value = getRoundDownWithStep(counterValue);
    };
    const isMinReached = computed(() => {
      if (isNilValue(min2.value)) {
        return false;
      }
      return Number(valueComputed.value) <= Number(min2.value);
    });
    const isMaxReached = computed(() => {
      if (isNilValue(max2.value)) {
        return false;
      }
      return step.value ? Number(valueComputed.value) > Number(max2.value) - Number(step.value) : Number(valueComputed.value) >= Number(max2.value);
    });
    const tabIndexComputed = computed(() => props.disabled ? -1 : 0);
    const isDecreaseActionDisabled = computed(() => isMinReached.value || props.disabled || props.readonly);
    const isIncreaseActionDisabled = computed(() => isMaxReached.value || props.disabled || props.readonly);
    const decreaseCount = () => {
      if (isDecreaseActionDisabled.value) {
        return;
      }
      calculateCounterValue(Number(valueComputed.value) - Number(step.value));
    };
    const increaseCount = () => {
      if (isIncreaseActionDisabled.value) {
        return;
      }
      calculateCounterValue(Number(valueComputed.value) + Number(step.value));
    };
    useLongPress(useTemplateRef("decreaseButtonRef"), {
      onUpdate: decreaseCount,
      delay: longPressDelayComputed
    });
    useLongPress(useTemplateRef("increaseButtonRef"), {
      onUpdate: increaseCount,
      delay: longPressDelayComputed
    });
    const { getColor } = useColors();
    const colorComputed = computed(() => getColor(props.color));
    const decreaseIconProps = computed(() => ({
      class: { "va-counter__icon--inactive": isDecreaseActionDisabled.value },
      color: colorComputed.value,
      icon: props.decreaseIcon,
      plain: true,
      disabled: isDecreaseActionDisabled.value,
      readonly: props.readonly,
      tabindex: -1,
      "aria-label": tp(props.ariaDecreaseLabel),
      ...!isDecreaseActionDisabled.value && { onClick: decreaseCount }
    }));
    const increaseIconProps = computed(() => ({
      class: { "va-counter__icon--inactive": isIncreaseActionDisabled.value },
      color: colorComputed.value,
      icon: props.increaseIcon,
      plain: true,
      disabled: isIncreaseActionDisabled.value,
      readonly: props.readonly,
      tabindex: -1,
      "aria-label": tp(props.ariaIncreaseLabel),
      ...!isIncreaseActionDisabled.value && { onClick: increaseCount }
    }));
    const isSquareCorners = computed(() => (typeof props.margins === "string" ? parseFloat(props.margins) : props.margins) === 0);
    const buttonsColor = () => {
      if (isFocused.value) {
        return props.color;
      }
      return "background-border";
    };
    const buttonProps = computed(() => ({
      ...pick(props, ["color"]),
      round: props.rounded,
      preset: props.flat ? "secondary" : "",
      borderColor: props.flat ? buttonsColor() : ""
    }));
    const decreaseButtonProps = computed(() => ({
      ...buttonProps.value,
      icon: props.decreaseIcon,
      disabled: isDecreaseActionDisabled.value,
      "aria-label": tp(props.ariaDecreaseLabel),
      ...!isDecreaseActionDisabled.value && { onClick: decreaseCount }
    }));
    const increaseButtonProps = computed(() => ({
      ...buttonProps.value,
      icon: props.increaseIcon,
      disabled: isIncreaseActionDisabled.value,
      "aria-label": tp(props.ariaIncreaseLabel),
      ...!isIncreaseActionDisabled.value && { onClick: increaseCount }
    }));
    const { tp } = useTranslation();
    const attrs = useAttrs();
    const slots = useSlots();
    const inputAttributesComputed = computed(() => ({
      tabindex: tabIndexComputed.value,
      "aria-label": tp(props.ariaLabel),
      "aria-valuemin": Number(min2.value),
      "aria-valuemax": Number(max2.value),
      ...omit(attrs, ["class", "style"]),
      ...pick(props, ["disabled", "min", "max", "step"]),
      readonly: props.readonly || !props.manualInput
    }));
    const classComputed = computed(() => [
      attrs.class,
      { "va-counter--input-square": isSquareCorners.value },
      { "va-counter--content-slot": slots.content && props.buttons }
    ].filter(Boolean));
    const styleComputed = computed(() => ({
      ...attrs.style || {}
    }));
    const marginComputed = computed(() => safeCSSLength(props.margins));
    useCounterPropsValidation(props);
    const fieldListeners = createFieldListeners2(emit);
    const inputListeners = createInputListeners2(emit);
    const inputWrapperPropsComputed = filterComponentProps(VaInputWrapperProps2);
    __expose({
      isDirty,
      isTouched,
      focus,
      blur,
      decreaseCount,
      increaseCount,
      reset
    });
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(VaInputWrapper), mergeProps({ class: "va-counter" }, { ...unref(fieldListeners), ...unref(inputWrapperPropsComputed), ...unref(validationListeners) }, {
        class: classComputed.value,
        style: styleComputed.value,
        focused: unref(isFocused),
        error: unref(computedError),
        "error-messages": unref(computedErrorMessages),
        onKeydown: [
          withKeys(withModifiers(increaseCount, ["prevent"]), ["up"]),
          withKeys(withModifiers(increaseCount, ["prevent"]), ["right"]),
          withKeys(withModifiers(decreaseCount, ["prevent"]), ["down"]),
          withKeys(withModifiers(decreaseCount, ["prevent"]), ["left"])
        ]
      }), createSlots({
        default: withCtx(() => [
          !_ctx.$slots.content ? (openBlock(), createElementBlock("input", mergeProps({
            key: 0,
            ref_key: "input",
            ref: input,
            class: "va-input__content__input",
            type: "number",
            inputmode: "decimal"
          }, { ...inputAttributesComputed.value, ...unref(inputListeners) }, {
            value: valueComputed.value,
            "aria-live": _ctx.$props.disabled ? "off" : "polite",
            onInput: setCountInput,
            onChange: setCountChange
          }), null, 16, _hoisted_124)) : createCommentVNode("", true)
        ]),
        _: 2
      }, [
        _ctx.$props.buttons ? {
          name: "prepend",
          fn: withCtx((slotScope) => [
            createBaseVNode("div", {
              class: "va-counter__prepend-wrapper",
              style: normalizeStyle({ marginRight: marginComputed.value }),
              onMousedown: _cache[0] || (_cache[0] = withModifiers(
                //@ts-ignore
                (...args) => unref(focus) && unref(focus)(...args),
                ["prevent"]
              ))
            }, [
              renderSlot(_ctx.$slots, "decreaseAction", normalizeProps(guardReactiveProps({ ...slotScope, decreaseCount })), () => [
                createVNode(unref(VaButton), mergeProps({ class: "va-counter__button-decrease" }, decreaseButtonProps.value, { ref: "decreaseButtonRef" }), null, 16)
              ])
            ], 36)
          ]),
          key: "0"
        } : {
          name: "prependInner",
          fn: withCtx((slotScope) => [
            createBaseVNode("div", {
              class: "va-counter__prepend-inner",
              onMousedown: _cache[1] || (_cache[1] = withModifiers(
                //@ts-ignore
                (...args) => unref(focus) && unref(focus)(...args),
                ["prevent"]
              ))
            }, [
              renderSlot(_ctx.$slots, "decreaseAction", normalizeProps(guardReactiveProps({ ...slotScope, decreaseCount })), () => [
                createVNode(unref(VaButton), mergeProps(decreaseIconProps.value, { ref: "decreaseButtonRef" }), null, 16)
              ])
            ], 32)
          ]),
          key: "1"
        },
        _ctx.$props.buttons ? {
          name: "append",
          fn: withCtx((slotScope) => [
            createBaseVNode("div", {
              class: "va-counter__append-wrapper",
              style: normalizeStyle({ marginLeft: marginComputed.value }),
              onMousedown: _cache[2] || (_cache[2] = withModifiers(
                //@ts-ignore
                (...args) => unref(focus) && unref(focus)(...args),
                ["prevent"]
              ))
            }, [
              renderSlot(_ctx.$slots, "increaseAction", normalizeProps(guardReactiveProps({ ...slotScope, increaseCount })), () => [
                createVNode(unref(VaButton), mergeProps({ class: "va-counter__button-increase" }, increaseButtonProps.value, { ref: "increaseButtonRef" }), null, 16)
              ])
            ], 36)
          ]),
          key: "2"
        } : {
          name: "appendInner",
          fn: withCtx((slotScope) => [
            createBaseVNode("div", {
              class: "va-counter__append-inner",
              onMousedown: _cache[3] || (_cache[3] = withModifiers(
                //@ts-ignore
                (...args) => unref(focus) && unref(focus)(...args),
                ["prevent"]
              ))
            }, [
              renderSlot(_ctx.$slots, "increaseAction", normalizeProps(guardReactiveProps({ ...slotScope, increaseCount })), () => [
                createVNode(unref(VaButton), mergeProps(increaseIconProps.value, { ref: "increaseButtonRef" }), null, 16)
              ])
            ], 32)
          ]),
          key: "3"
        },
        _ctx.$slots.content ? {
          name: "default",
          fn: withCtx((slotScope) => [
            createBaseVNode("div", {
              ref_key: "input",
              ref: input,
              tabindex: "0",
              class: "va-counter__content-wrapper"
            }, [
              renderSlot(_ctx.$slots, "content", normalizeProps(guardReactiveProps({ ...slotScope, value: Number(valueComputed.value) })))
            ], 512)
          ]),
          key: "4"
        } : void 0
      ]), 1040, ["class", "style", "focused", "error", "error-messages", "onKeydown"]);
    };
  }
});

// node_modules/vuestic-ui/dist/es/src/components/va-counter/index.js
var VaCounter = withConfigTransport$1(_sfc_main47);

// node_modules/vuestic-ui/dist/es/src/components/va-data-table/hooks/useCommonProps.js
var useCurrentPageProp = { currentPage: { type: Number } };
var createItemsProp = () => ({
  items: { type: Array, default: () => [] }
});
var useSelectableProp = { selectable: { type: Boolean, default: false } };
var useItemsTrackByProp = { itemsTrackBy: { type: [String, Function], default: "" } };

// node_modules/vuestic-ui/dist/es/src/components/va-data-table/hooks/useColumns.js
var sortingOptionsValidator = (options) => {
  const isAllowedOptionsLength = options.length === 2 || options.length === 3;
  const isAvailableOptions = options.every((option) => ["asc", "desc", null].includes(option));
  const isUniqueOptions = options.length === new Set(options).size;
  return isAllowedOptionsLength && isAvailableOptions && isUniqueOptions;
};
var useColumnsProps = {
  ...createItemsProp(),
  columns: { type: Array, default: () => [] },
  sortingOptions: {
    type: Array,
    default: () => ["asc", "desc", null],
    validator: sortingOptionsValidator
  }
};
var buildTableColumn = (source, initialIndex, props) => {
  const input = typeof source === "string" ? { key: source } : source;
  const isValidOptions = input.sortingOptions ? sortingOptionsValidator(input.sortingOptions) : true;
  if (!isValidOptions) {
    warn(`The "sortingOptions" array in the column with "${input.key}" key is invalid. For this column, the "sortingOptions" value is taken as for the table: ${JSON.stringify(props.sortingOptions)}.`);
  }
  return {
    source,
    initialIndex,
    key: input.key,
    name: input.name || input.key,
    label: input.label || startCase(input.key),
    thTitle: input.thTitle || input.headerTitle || input.label || startCase(input.key),
    sortable: input.sortable || false,
    sortingFn: input.sortingFn,
    displayFormatFn: input.displayFormatFn,
    sortingOptions: isValidOptions && input.sortingOptions || props.sortingOptions,
    thAlign: input.thAlign || input.alignHead || "left",
    thVerticalAlign: input.thVerticalAlign || input.verticalAlignHead || "middle",
    tdAlign: input.tdAlign || input.align || "left",
    tdVerticalAlign: input.tdVerticalAlign || input.verticalAlign || "middle",
    width: input.width,
    tdClass: input.tdClass || input.classes,
    thClass: input.thClass || input.headerClasses,
    tdStyle: input.tdStyle || input.style,
    thStyle: input.thStyle || input.headerStyle
  };
};
var buildColumnsFromItems = (props) => {
  return Object.keys(mergeDeepMultiple({}, ...props.items)).map((item, index) => buildTableColumn(item, index, props));
};
var buildNormalizedColumns = (props) => {
  return props.columns.map((item, index) => buildTableColumn(item, index, props));
};
var useColumns = (props) => {
  const columnsComputed = computed(() => {
    if (props.columns.length === 0) {
      return buildColumnsFromItems(props);
    } else {
      return buildNormalizedColumns(props);
    }
  });
  return {
    columnsComputed
  };
};

// node_modules/vuestic-ui/dist/es/src/composables/useThrottle.js
var useThrottleProps = {
  delay: {
    type: Number,
    default: 0,
    validator: (value) => value >= 0
  }
};
function useThrottleFunction(fn, props) {
  const delay = toRef(props, "delay") ?? 0;
  const isThrottled = ref(true);
  let lastCallResult = void 0;
  return function(...args) {
    const invoke = () => fn.apply(this, args);
    if (!unref(delay)) {
      return invoke();
    }
    if (isThrottled.value) {
      isThrottled.value = false;
      setTimeout(() => isThrottled.value = true, unref(delay));
      lastCallResult = invoke();
    }
    return lastCallResult;
  };
}
function useThrottleValue(value, props) {
  const delay = toRef(props, "delay") ?? 0;
  if (!unref(delay)) {
    return value;
  }
  const isThrottled = ref(true);
  const previousCallValue = ref();
  const previousReturnedValue = ref();
  const currentCallValue = ref();
  watch(value, () => {
    previousCallValue.value = value.value;
    const lastCallValue = setTimeout(() => {
      currentCallValue.value = previousCallValue.value;
    }, unref(delay));
    if (isThrottled.value) {
      isThrottled.value = false;
      currentCallValue.value = value.value;
      previousReturnedValue.value = value.value;
      clearTimeout(lastCallValue);
      setTimeout(() => isThrottled.value = true, unref(delay));
    } else {
      currentCallValue.value = previousReturnedValue.value;
    }
  }, { immediate: true });
  return currentCallValue;
}

// node_modules/vuestic-ui/dist/es/src/components/va-data-table/hooks/usePaginatedRows.js
var usePaginatedRowsProps = {
  ...useThrottleProps,
  ...useCurrentPageProp,
  perPage: { type: Number }
};
var usePaginatedRows = (sortedRows, props) => {
  const paginatedRows = computed(() => {
    if (!props.perPage || props.perPage < 0) {
      return sortedRows.value;
    }
    if (!props.currentPage || props.currentPage < 0) {
      return sortedRows.value.slice(0, props.perPage);
    }
    const pageStartIndex = props.perPage * (props.currentPage - 1);
    return sortedRows.value.slice(pageStartIndex, pageStartIndex + props.perPage);
  });
  const paginatedRowsThrottled = useThrottleValue(paginatedRows, props);
  return {
    paginatedRows: paginatedRowsThrottled
  };
};

// node_modules/vuestic-ui/dist/es/src/components/va-data-table/hooks/useRows.js
var getItemKey = (source, itemsTrackBy) => typeof itemsTrackBy === "function" ? itemsTrackBy(source) : getValueByPath(source, itemsTrackBy) || source;
var createRowsProps = () => ({
  ...createItemsProp(),
  ...useItemsTrackByProp
});
var buildTableCell = (rowIndex, rowKey, rowData, column) => {
  var _a2;
  const source = getValueByPath(rowData, column.key);
  return {
    rowIndex,
    rowKey,
    rowData,
    column,
    source,
    value: ((_a2 = source == null ? void 0 : source.toString) == null ? void 0 : _a2.call(source)) || ""
  };
};
var buildTableRow = (source, initialIndex, itemsTrackBy, columns) => {
  const itemKey = getItemKey(source, itemsTrackBy);
  return {
    initialIndex,
    itemKey,
    source,
    cells: columns.map((column) => buildTableCell(initialIndex, itemKey, source, column)),
    rowData: source
  };
};
var useRows = (columns, props) => {
  const expandableRows = ref({});
  const rowsComputed = computed(() => props.items.map((rawItem, index) => ({
    ...buildTableRow(rawItem, index, props.itemsTrackBy, columns.value),
    toggleRowDetails: (show) => {
      if (typeof show === "boolean") {
        expandableRows.value[index] = show;
      } else {
        expandableRows.value[index] = !expandableRows.value[index];
      }
    },
    isExpandableRowVisible: !!expandableRows.value[index]
  })));
  return {
    rowsComputed
  };
};

// node_modules/vuestic-ui/dist/es/src/components/va-data-table/hooks/useSelectableRow.js
var useSelectableProps2 = {
  ...useSelectableProp,
  ...useItemsTrackByProp,
  modelValue: { type: Array },
  selectMode: { type: String, default: "multiple" }
};
var useSelectableRow = (paginatedRows, props, emit) => {
  const selectedItemsFallback = ref([]);
  const selectedItemsSync = computed({
    get() {
      if (props.modelValue === void 0) {
        return selectedItemsFallback.value;
      } else {
        return props.modelValue;
      }
    },
    set(modelValue) {
      if (props.modelValue === void 0) {
        selectedItemsFallback.value = modelValue;
      }
      emit("update:modelValue", modelValue);
    }
  });
  const prevSelectedRowIndex = ref(-1);
  watch(() => props.selectMode, (newSelectMode, oldSelectMode) => {
    if (newSelectMode === "single" && oldSelectMode === "multiple") {
      selectedItemsSync.value = [];
      setPrevSelectedRowIndex(-1);
    }
  });
  watch(paginatedRows, () => {
    setPrevSelectedRowIndex(-1);
  });
  watch(selectedItemsSync, (currentSelectedItems, previousSelectedItems = []) => {
    emit("selectionChange", {
      currentSelectedItems,
      previousSelectedItems
    });
  }, { immediate: true });
  const getKey = (source) => getItemKey(source, props.itemsTrackBy);
  const noRowsSelected = computed(() => !paginatedRows.value.some(({ source }) => selectedItemsSync.value.includes(getKey(source))));
  const allRowsSelected = computed(() => {
    if (paginatedRows.value.length === 0) {
      return false;
    }
    return paginatedRows.value.every(({ source }) => selectedItemsSync.value.includes(getKey(source)));
  });
  const severalRowsSelected = computed(() => !noRowsSelected.value && !allRowsSelected.value);
  function isRowSelected(row) {
    return selectedItemsSync.value.includes(getKey(row.source));
  }
  function selectAllRows() {
    selectedItemsSync.value = [.../* @__PURE__ */ new Set([
      ...selectedItemsSync.value,
      ...paginatedRows.value.map((row) => getKey(row.source))
    ])];
  }
  function unselectAllRows() {
    const paginatedRowsKeys = paginatedRows.value.map((row) => getKey(row.source));
    selectedItemsSync.value = selectedItemsSync.value.filter((item) => !paginatedRowsKeys.includes(item));
  }
  function selectRow(row) {
    selectedItemsSync.value = [...selectedItemsSync.value, getKey(row.source)];
  }
  function selectOnlyRow(row) {
    selectedItemsSync.value = [getKey(row.source)];
  }
  function unselectRow(row) {
    const index = selectedItemsSync.value.findIndex((item) => item === getKey(row.source));
    selectedItemsSync.value = [
      ...selectedItemsSync.value.slice(0, index),
      ...selectedItemsSync.value.slice(index + 1)
    ];
  }
  function setPrevSelectedRowIndex(rowInitialIndex) {
    if (rowInitialIndex === -1) {
      prevSelectedRowIndex.value = -1;
    } else {
      const prevSelectedRow = paginatedRows.value.find((row) => row.initialIndex === rowInitialIndex);
      prevSelectedRow ? prevSelectedRowIndex.value = paginatedRows.value.indexOf(prevSelectedRow) : prevSelectedRowIndex.value = -1;
    }
  }
  function getRowsToSelect(targetIndex) {
    let start;
    let end;
    if (isRowSelected(paginatedRows.value[prevSelectedRowIndex.value])) {
      start = Math.min(prevSelectedRowIndex.value, targetIndex);
      end = Math.max(prevSelectedRowIndex.value, targetIndex);
    } else {
      start = Math.min(prevSelectedRowIndex.value + 1, targetIndex);
      end = Math.max(prevSelectedRowIndex.value - 1, targetIndex);
    }
    return paginatedRows.value.slice(start, end + 1);
  }
  function mergeSelection(rowsToSelect) {
    const rowsToSelectedItems = rowsToSelect.map((row) => getKey(row.source));
    if (noRowsSelected.value) {
      selectedItemsSync.value = rowsToSelectedItems;
      return;
    }
    const isInternalSelection = rowsToSelectedItems.every((item) => selectedItemsSync.value.includes(item));
    if (isInternalSelection) {
      selectedItemsSync.value = selectedItemsSync.value.filter((item) => !rowsToSelectedItems.includes(item));
      return;
    }
    selectedItemsSync.value = [.../* @__PURE__ */ new Set([
      ...selectedItemsSync.value,
      ...rowsToSelectedItems
    ])];
  }
  function toggleRowSelection(row) {
    if (!props.selectable) {
      return;
    }
    if (isRowSelected(row)) {
      unselectRow(row);
      props.selectMode === "single" ? setPrevSelectedRowIndex(-1) : setPrevSelectedRowIndex(row.initialIndex);
    } else {
      props.selectMode === "single" ? selectOnlyRow(row) : selectRow(row);
      setPrevSelectedRowIndex(row.initialIndex);
    }
  }
  function ctrlSelectRow(row) {
    if (!props.selectable) {
      return;
    }
    toggleRowSelection(row);
  }
  function shiftSelectRows(row) {
    if (!props.selectable) {
      return;
    }
    if (props.selectMode === "single" || prevSelectedRowIndex.value === -1) {
      return toggleRowSelection(row);
    }
    const targetIndex = paginatedRows.value.indexOf(row);
    mergeSelection(getRowsToSelect(targetIndex));
    setPrevSelectedRowIndex(-1);
  }
  function toggleBulkSelection() {
    if (allRowsSelected.value) {
      unselectAllRows();
    } else {
      selectAllRows();
    }
    setPrevSelectedRowIndex(-1);
  }
  return {
    ctrlSelectRow,
    shiftSelectRows,
    toggleRowSelection,
    toggleBulkSelection,
    isRowSelected,
    noRowsSelected,
    severalRowsSelected,
    allRowsSelected
  };
};

// node_modules/vuestic-ui/dist/es/src/components/va-data-table/hooks/useStylable.js
var prefix = "--va-data-table";
var isFunction2 = (val) => typeof val === "function";
var useStylableProps = {
  ...useSelectableProp,
  selectedColor: { type: String, default: "primary" },
  allowFooterSorting: { type: Boolean, default: false },
  stickyHeader: { type: Boolean, default: false },
  stickyFooter: { type: Boolean, default: false },
  height: { type: [String, Number] }
};
var getClass = (classes) => isFunction2(classes) ? classes() : classes;
var getStyle = (styles) => isFunction2(styles) ? styles() : styles;
var useStylable = (props) => {
  const { getColor, getFocusColor: getFocusColor2, getHoverColor: getHoverColor2 } = useColors();
  const color = computed(() => getColor(props.selectedColor));
  const CSSVariables = computed(() => ({
    hoverColor: getHoverColor2(color.value),
    selectedColor: props.selectable ? getFocusColor2(color.value) : void 0,
    tableHeight: props.height ? safeCSSLength(props.height) : "var(--va-data-table-height)",
    theadBg: props.stickyHeader ? "var(--va-data-table-thead-background, var(--va-data-table-header-background))" : "var(--va-data-table-thead-background)",
    tfootBg: props.stickyFooter ? "var(--va-data-table-tfoot-background, var(--va-data-table-header-background))" : "var(--va-data-table-tfoot-background)"
  }));
  const getHeaderCSSVariables = (column) => ({
    [`${prefix}-width`]: column.width && safeCSSLength(column.width),
    [`${prefix}-align`]: column.thAlign,
    [`${prefix}-vertical-align`]: column.thVerticalAlign,
    [`${prefix}-cursor`]: column.sortable ? "pointer" : "default"
  });
  const getCellCSSVariables = (cell) => ({
    [`${prefix}-align`]: cell.column.tdAlign,
    [`${prefix}-vertical-align`]: cell.column.tdVerticalAlign
  });
  const getFooterCSSVariables = (column) => ({
    [`${prefix}-align`]: column.thAlign,
    [`${prefix}-vertical-align`]: column.thVerticalAlign,
    [`${prefix}-cursor`]: props.allowFooterSorting && column.sortable ? "pointer" : "default"
  });
  return {
    CSSVariables,
    getHeaderCSSVariables,
    getCellCSSVariables,
    getFooterCSSVariables,
    getClass,
    getStyle
  };
};

// node_modules/vuestic-ui/dist/es/src/components/va-data-table/hooks/useBinding.js
var isFunction3 = (val) => typeof val === "function";
var isObject3 = (val) => val !== null && typeof val === "object";
var useBindingProps = {
  rowBind: { type: null },
  cellBind: { type: null }
};
var useBinding = (props) => {
  const getRowBind = (row) => isFunction3(props.rowBind) ? props.rowBind(row.source, row.initialIndex) : isObject3(props.rowBind) ? props.rowBind : {};
  const getCellBind = (cell, row) => isFunction3(props.cellBind) ? props.cellBind(cell.source, row.source, cell.column, row.initialIndex) : isObject3(props.cellBind) ? props.cellBind : {};
  return {
    getRowBind,
    getCellBind
  };
};

// node_modules/vuestic-ui/dist/es/src/components/va-data-table/hooks/useAnimationName.js
var useAnimationNameProps = {
  ...useCurrentPageProp,
  animated: { type: Boolean, default: true }
};
var useAnimationName = (props, rows) => {
  const animationType = ref("shuffle");
  const animationName = computed(() => props.animated ? `table-transition-${animationType.value}` : "");
  const oldRowsLength = ref(rows.value.length);
  const isDifferentRowLength = computed(() => rows.value.length !== oldRowsLength.value);
  watch(rows, (newRows, oldRows) => {
    const hasRows = !!(newRows.length && oldRows.length);
    animationType.value = newRows.length > 50 || isDifferentRowLength.value && hasRows ? "fade" : "shuffle";
    oldRowsLength.value = newRows.length;
  });
  watch(() => props.currentPage, () => {
    if (!isDifferentRowLength.value) {
      animationType.value = "shuffle";
    }
  });
  return animationName;
};

// node_modules/vuestic-ui/dist/es/src/components/va-data-table/hooks/useFilterable.js
var useFilterableProps = {
  ...useThrottleProps,
  filter: { type: String, default: "" },
  filterMethod: { type: Function }
};
var useFilterable = (rawRows, props, emit) => {
  const filteredRows = computed(() => {
    if (!rawRows.value.length) {
      return rawRows.value;
    }
    if (props.filter === "" && !props.filterMethod) {
      return rawRows.value;
    }
    return rawRows.value.filter(
      (row) => row.cells.some((cell) => {
        if (typeof props.filterMethod === "function") {
          return props.filterMethod(cell.source, cell);
        }
        const cellRegex = new RegExp(props.filter, "i");
        return cellRegex.test(cell.value);
      })
    );
  });
  const filteredRowsThrottled = useThrottleValue(filteredRows, props);
  watch(filteredRowsThrottled, () => {
    emit("filtered", {
      items: filteredRowsThrottled.value.map((row) => row.source),
      itemsIndexes: filteredRowsThrottled.value.map((row) => row.initialIndex)
    });
  });
  if (filteredRows.value.length !== rawRows.value.length) {
    emit("filtered", {
      items: filteredRows.value.map((row) => row.source),
      itemsIndexes: filteredRows.value.map((row) => row.initialIndex)
    });
  }
  return {
    filteredRows: filteredRowsThrottled
  };
};

// node_modules/vuestic-ui/dist/es/src/components/va-data-table/hooks/useSortable.js
var useSortableProps = {
  ...useThrottleProps,
  sortBy: { type: String },
  columnSorted: { type: Object },
  sortingOrder: { type: [String, null] },
  disableClientSideSorting: { type: Boolean, default: false }
};
var useSortable = (columns, filteredRows, props, emit) => {
  const sortByFallback = ref("");
  const sortBySync = computed({
    get() {
      if (props.sortBy === void 0) {
        return sortByFallback.value;
      } else {
        return props.sortBy;
      }
    },
    set(value) {
      if (props.sortBy === void 0) {
        sortByFallback.value = value;
      }
      emit("update:sortBy", value);
    }
  });
  const sortingOrderFallback = ref(null);
  const sortingOrderSync = computed({
    get() {
      if (props.sortingOrder === void 0) {
        return sortingOrderFallback.value;
      } else {
        return props.sortingOrder;
      }
    },
    set(value) {
      if (props.sortingOrder === void 0) {
        sortingOrderFallback.value = value;
      }
      emit("update:sortingOrder", value);
    }
  });
  const defaultSortingFn = (a, b) => {
    if (typeof a === "string" && typeof b === "string") {
      return a.localeCompare(b);
    }
    if (typeof a === "number" && typeof b === "number") {
      return a - b;
    }
    const aParsed = parseFloat(a);
    const bParsed = parseFloat(b);
    if (!isNaN(aParsed) && !isNaN(bParsed)) {
      return aParsed - bParsed;
    }
    if (!isNaN(aParsed)) {
      return -1;
    }
    if (!isNaN(bParsed)) {
      return 1;
    }
    return 0;
  };
  const sortedRows = computed(() => {
    if (props.disableClientSideSorting) {
      return filteredRows.value;
    }
    if (filteredRows.value.length <= 1) {
      return filteredRows.value;
    }
    const columnIndex = columns.value.findIndex(
      ({ name, sortable }) => sortBySync.value === name && sortable
    );
    const column = columns.value[columnIndex];
    if (!column) {
      return filteredRows.value;
    }
    const sortingOrderRatio = sortingOrderSync.value === "desc" ? -1 : 1;
    return [...filteredRows.value].sort((a, b) => {
      if (sortingOrderSync.value === null) {
        return a.initialIndex - b.initialIndex;
      } else {
        const firstSource = a.cells[columnIndex].source;
        const secondSource = b.cells[columnIndex].source;
        return sortingOrderRatio * (typeof column.sortingFn === "function" ? column.sortingFn(firstSource, secondSource) : defaultSortingFn(firstSource, secondSource));
      }
    });
  });
  watch(sortedRows, () => {
    emit("sorted", {
      sortBy: sortBySync.value,
      sortingOrder: sortingOrderSync.value,
      items: sortedRows.value.map((row) => row.source),
      itemsIndexes: sortedRows.value.map((row) => row.initialIndex)
    });
  });
  const getNextSortingOptionsValue = (value, options) => {
    const index = options.findIndex((sortingValue) => sortingValue === value);
    return index !== -1 ? options[(index + 1) % options.length] : options[0];
  };
  function toggleSorting(column) {
    let value;
    if (column.name === sortBySync.value) {
      value = getNextSortingOptionsValue(sortingOrderSync.value, column.sortingOptions);
    } else {
      sortBySync.value = column.name;
      value = column.sortingOptions[0];
    }
    sortingOrderSync.value = value;
    emit("columnSorted", { columnName: column.name, value, column });
  }
  const toggleSortingThrottled = useThrottleFunction(toggleSorting, props);
  const sortingOrderIconName = computed(() => {
    return sortingOrderSync.value === "asc" ? "va-sort-asc" : sortingOrderSync.value === "desc" ? "va-sort-desc" : "va-unsorted";
  });
  return {
    sortBySync,
    sortingOrderSync,
    toggleSorting: toggleSortingThrottled,
    sortedRows,
    sortingOrderIconName
  };
};

// node_modules/vuestic-ui/dist/es/src/composables/useElementRef.js
var unrefElement = (el) => {
  const e = unref(el);
  return unwrapEl(e);
};
var useElementRef = () => {
  const el = shallowRef();
  return computed({
    get() {
      return unrefElement(el);
    },
    set(node) {
      el.value = node;
    }
  });
};

// node_modules/vuestic-ui/dist/es/src/components/va-data-table/hooks/useTableScroll.js
var useTableScrollProps = {
  scrollTopMargin: { type: [Number, String], default: 0 },
  scrollBottomMargin: { type: [Number, String], default: 0 }
};
var useTableScrollEmits = ["scroll:top", "scroll:bottom"];
var useTableScroll = (props, emit) => {
  var _a2;
  const vNodeProps = (_a2 = getCurrentInstance()) == null ? void 0 : _a2.vnode.props;
  const doRenderTopTrigger = (vNodeProps == null ? void 0 : vNodeProps["onScroll:top"]) !== void 0;
  const doRenderBottomTrigger = (vNodeProps == null ? void 0 : vNodeProps["onScroll:bottom"]) !== void 0;
  const scrollContainer = useElementRef();
  const topTrigger = useElementRef();
  const bottomTrigger = useElementRef();
  const scrollTopMarginComputed = useNumericProp("scrollTopMargin");
  const scrollBottomMarginComputed = useNumericProp("scrollBottomMargin");
  const isObservable = computed(() => !!scrollContainer.value);
  const intersectionHandler = (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target === topTrigger.value ? emit("scroll:top") : emit("scroll:bottom");
      }
    });
  };
  const targets = computed(() => {
    const list = [];
    if (isObservable.value) {
      topTrigger.value && list.push(topTrigger.value);
      bottomTrigger.value && list.push(bottomTrigger.value);
    }
    return list;
  });
  const options = computed(() => ({
    root: scrollContainer.value,
    rootMargin: `${scrollTopMarginComputed.value ?? 0}px 0px ${scrollBottomMarginComputed.value ?? 0}px 0px`
  }));
  useIntersectionObserver(intersectionHandler, options, targets);
  return {
    scrollContainer,
    topTrigger,
    bottomTrigger,
    doRenderTopTrigger,
    doRenderBottomTrigger
  };
};

// node_modules/vuestic-ui/dist/es/src/components/va-data-table/components/VaDataTableThRow.vue_vue_type_script_setup_true_lang.js
import "D:/Github/DONGTIAN/ui/node_modules/vuestic-ui/dist/es/VaDataTableThRow.css";
var _hoisted_125 = { class: "va-data-table__table-tr" };
var _hoisted_211 = {
  key: 0,
  scope: "col",
  class: "va-data-table__table-th va-data-table__table-cell-select"
};
var _hoisted_37 = ["title", "onClick", "onKeydown"];
var _hoisted_46 = { class: "va-data-table__table-th-wrapper" };
var _hoisted_55 = { key: 0 };
var _sfc_main48 = defineComponent({
  ...{
    name: "VaDataTableThRow"
  },
  __name: "VaDataTableThRow",
  props: {
    ...useStylableProps,
    selectMode: { type: String, default: "multiple" },
    allRowsSelected: { type: Boolean, default: false },
    severalRowsSelected: { type: Boolean, default: false },
    columns: { type: Array, required: true },
    isFooter: { type: Boolean, default: false },
    sortBySync: { type: String, required: true },
    sortingOrderIconName: { type: String, required: true },
    sortingOrderSync: { type: String, default: null },
    ariaSelectAllRowsLabel: useTranslationProp("$t:selectAllRows"),
    ariaSortColumnByLabel: useTranslationProp("$t:sortColumnBy")
  },
  emits: [
    "toggleBulkSelection",
    "toggleSorting"
  ],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const { t, tp } = useTranslation();
    const {
      getFooterCSSVariables,
      getHeaderCSSVariables,
      getClass: getClass2,
      getStyle: getStyle2
    } = useStylable(props);
    const getAriaAttributes = (column) => {
      const ariaSort = props.sortingOrderSync && props.sortBySync === column.name ? props.sortingOrderSync === "asc" ? "ascending" : "descending" : "none";
      const ariaLabel = column.sortable ? tp(props.ariaSortColumnByLabel, { name: column.label }) : void 0;
      return {
        "aria-sort": ariaSort,
        "aria-label": ariaLabel
      };
    };
    const sortByColumn = (column) => {
      if (props.isFooter && !props.allowFooterSorting || !column.sortable) {
        return;
      }
      emit("toggleSorting", column);
    };
    const toggleBulkSelection = () => emit("toggleBulkSelection");
    const getColumnStyles = (column) => {
      return [
        column.width ? { minWidth: column.width, maxWidth: column.width } : {},
        props.isFooter ? getFooterCSSVariables(column) : getHeaderCSSVariables(column),
        getStyle2(column.thStyle)
      ];
    };
    const slotNameComputed = computed(() => props.isFooter ? "footer" : "header");
    const multiplySelectAvailable = computed(() => props.selectMode === "multiple");
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("tr", _hoisted_125, [
        _ctx.$props.selectable ? (openBlock(), createElementBlock("th", _hoisted_211, [
          multiplySelectAvailable.value ? (openBlock(), createBlock(unref(VaCheckbox), {
            key: 0,
            class: "va-data-table__table-cell-checkbox",
            "model-value": _ctx.$props.severalRowsSelected ? "idl" : _ctx.$props.allRowsSelected,
            "aria-label": unref(tp)(_ctx.$props.ariaSelectAllRowsLabel),
            "true-value": true,
            "false-value": false,
            color: _ctx.$props.selectedColor,
            "indeterminate-value": "idl",
            indeterminate: "",
            "onUpdate:modelValue": toggleBulkSelection
          }, null, 8, ["model-value", "aria-label", "color"])) : createCommentVNode("", true)
        ])) : createCommentVNode("", true),
        (openBlock(true), createElementBlock(Fragment, null, renderList(__props.columns, (column) => {
          return openBlock(), createElementBlock("th", mergeProps({
            key: column.name,
            scope: "col",
            class: ["va-data-table__table-th", unref(getClass2)(column.thClass)],
            title: column.thTitle,
            style: getColumnStyles(column)
          }, getAriaAttributes(column), {
            onClick: withModifiers(($event) => sortByColumn(column), ["exact"]),
            onKeydown: withKeys(withModifiers(($event) => sortByColumn(column), ["stop"]), ["enter"])
          }), [
            createBaseVNode("div", _hoisted_46, [
              `${slotNameComputed.value}(${column.name})` in _ctx.$slots ? (openBlock(), createElementBlock("span", _hoisted_55, [
                renderSlot(_ctx.$slots, `${slotNameComputed.value}(${column.name})`, normalizeProps(guardReactiveProps({ label: column.label, key: column.key })))
              ])) : renderSlot(_ctx.$slots, slotNameComputed.value, normalizeProps(mergeProps({ key: 1 }, { label: column.label, key: column.key })), () => [
                createBaseVNode("span", null, toDisplayString(column.label), 1)
              ]),
              column.sortable ? (openBlock(), createBlock(unref(VaIcon), {
                key: 2,
                class: normalizeClass(["va-data-table__table-th-sorting-icon", { active: __props.sortBySync === column.name && __props.sortingOrderSync !== null }]),
                size: "small",
                role: column.sortable ? "button" : void 0,
                tabindex: column.sortable ? 0 : -1,
                name: __props.sortingOrderIconName,
                onSelectstart: withModifiers(() => {
                }, ["prevent"])
              }, null, 8, ["class", "role", "tabindex", "name"])) : createCommentVNode("", true)
            ])
          ], 16, _hoisted_37);
        }), 128))
      ]);
    };
  }
});

// node_modules/vuestic-ui/dist/es/src/components/va-data-table/components/index.js
var VaDataTableThRow = withConfigTransport$1(_sfc_main48);

// node_modules/vuestic-ui/dist/es/src/components/va-virtual-scroller/useVirtualScrollerSizes.js
var { isParsablePositiveMeasure, parseSizeValue: parseSizeValue2 } = useParsableMeasure();
var validateSizeProp = (v, propName) => {
  const isProperValue = isParsablePositiveMeasure(v);
  !isProperValue && warn(`[va-virtual-scroller] ${propName} should be number or parsable int greater or equal to 0. Provided: ${v}.`);
  return isProperValue;
};
var useVirtualScrollerSizesProps = {
  horizontal: { type: Boolean, default: false },
  itemSize: {
    type: [Number, String],
    default: 0,
    validator: (v) => {
      return validateSizeProp(v, "itemSize");
    }
  },
  wrapperSize: {
    type: [Number, String],
    default: 100,
    validator: (v) => {
      return v === "auto" || validateSizeProp(v, "wrapperSize");
    }
  }
};
var useVirtualScrollerSizes = (props, scrollPosition) => {
  const list = shallowRef();
  const wrapper = shallowRef();
  const clientSizeMeasure = computed(() => props.horizontal ? "clientWidth" : "clientHeight");
  const wrapperSize = computed(() => {
    var _a2;
    if (props.wrapperSize === "auto") {
      return ((_a2 = wrapper.value) == null ? void 0 : _a2[clientSizeMeasure.value]) || 0;
    }
    return parseSizeValue2(props.wrapperSize, pageFontSize);
  });
  const pageFontSize = ref(16);
  const handleWindowResize = () => {
    pageFontSize.value = parseFloat(getComputedStyle(document.documentElement).fontSize);
    calcAverageItemsSize();
  };
  useEvent("resize", handleWindowResize, true);
  const itemSizeCalculated = ref(0);
  const calcAverageItemsSize = () => {
    if (!list.value) {
      return;
    }
    const sizes = [];
    const itemsList = list.value.children;
    const itemsAmount = itemsList.length;
    for (let i = 0; i < itemsAmount; i++) {
      const currentChild = list.value.children.item(i);
      currentChild && sizes.push(currentChild[clientSizeMeasure.value]);
    }
    itemSizeCalculated.value = itemsAmount ? Math.trunc(sizes.reduce((acc, el) => acc + el, 0) / (itemsAmount - 1)) : 0;
  };
  const instance = getCurrentInstance();
  onMounted(() => {
    var _a2, _b;
    if (!list.value) {
      list.value = (_b = (_a2 = instance == null ? void 0 : instance.parent) == null ? void 0 : _a2.refs) == null ? void 0 : _b.list;
    }
    calcAverageItemsSize();
  });
  watch(scrollPosition, calcAverageItemsSize);
  watch(wrapperSize, calcAverageItemsSize);
  let oldItemSize = 0;
  const itemSize = computed(() => {
    const sizeParsed = parseSizeValue2(props.itemSize, pageFontSize);
    const result = Math.max(sizeParsed, itemSizeCalculated.value, 1);
    const diff = Math.abs(oldItemSize / result * 100 - 100);
    if (diff > 5 || oldItemSize === 0) {
      oldItemSize = result;
      return result;
    }
    return oldItemSize;
  });
  return { list, wrapper, itemSize, wrapperSize };
};

// node_modules/vuestic-ui/dist/es/src/composables/useTrackBy.js
var useTrackByProps = {
  trackBy: {
    type: [String, Number, Function],
    default: ""
  }
};
var useTrackBy = (props) => {
  const getKey = (item, index, defaultValue) => {
    if (props.trackBy && item && typeof item === "object" && !isFunction(props.trackBy)) {
      const isArrayItem = Array.isArray(item);
      let key;
      if (isArrayItem && !isNaN(+props.trackBy)) {
        key = item[+props.trackBy];
      }
      if (!isArrayItem) {
        key = item[props.trackBy];
      }
      if (key || key === 0) {
        return key;
      }
      warn(`${isArrayItem ? "Index" : "Key"} '${props.trackBy}' wasn't found in provided ${isArrayItem ? "array" : "object"}: `, item);
    }
    if (isFunction(props.trackBy)) {
      return props.trackBy(item);
    }
    return defaultValue;
  };
  return { getKey };
};

// node_modules/vuestic-ui/dist/es/src/components/va-virtual-scroller/VaVirtualScroller.vue_vue_type_script_setup_true_lang.js
import "D:/Github/DONGTIAN/ui/node_modules/vuestic-ui/dist/es/VaVirtualScroller.css";
var _sfc_main49 = defineComponent({
  ...{
    name: "VaVirtualScroller"
  },
  __name: "VaVirtualScroller",
  props: {
    ...useTrackByProps,
    ...useVirtualScrollerSizesProps,
    items: { type: Array, default: () => [] },
    bench: { type: [Number, String], default: 10, validator: (v) => Number(v) >= 0 },
    disabled: { type: Boolean, default: false },
    table: { type: Boolean, default: false }
  },
  emits: ["scroll:bottom"],
  setup(__props, { expose: __expose, emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const listScrollPosition = ref(0);
    const benchComputed = useNumericProp("bench");
    const scrollDirection = computed(() => props.horizontal ? "scrollLeft" : "scrollTop");
    const handleScroll = () => {
      if (!wrapper.value) {
        return;
      }
      listScrollPosition.value = wrapper.value[scrollDirection.value];
    };
    if (!props.disabled) {
      useEvent("scroll", handleScroll, true);
    }
    const { list, wrapper, itemSize, wrapperSize } = useVirtualScrollerSizes(props, listScrollPosition);
    const { getKey } = useTrackBy(props);
    const uniqueKey = (item, index, defaultValue) => getKey(item, index, defaultValue);
    watch(listScrollPosition, (newValue) => {
      if (newValue + wrapperSize.value === containerSize.value) {
        emit("scroll:bottom");
      }
    });
    const renderStartIndex = computed(() => {
      return Math.max(0, Math.floor(listScrollPosition.value / itemSize.value) - benchComputed.value);
    });
    const renderItemsAmount = computed(() => {
      var _a2;
      if (!((_a2 = props.items) == null ? void 0 : _a2.length)) {
        return 0;
      }
      return props.disabled ? props.items.length : Math.min(props.items.length - renderStartIndex.value, Math.ceil(wrapperSize.value / itemSize.value) + benchComputed.value * 2);
    });
    const renderEndIndex = computed(() => renderStartIndex.value + renderItemsAmount.value);
    const renderBuffer = computed(() => {
      var _a2;
      if (!((_a2 = props.items) == null ? void 0 : _a2.length)) {
        return [];
      }
      return props.items.slice(renderStartIndex.value, renderEndIndex.value);
    });
    const sizeAttribute = computed(() => props.horizontal ? "width" : "height");
    const isDisabledVirtualTable = computed(() => props.table && props.disabled);
    const wrapperStyleComputed = computed(() => ({
      [sizeAttribute.value]: isDisabledVirtualTable.value || !wrapperSize.value ? void 0 : `${wrapperSize.value}px`
    }));
    const wrapperClassComputed = useBem("va-virtual-scroller", () => ({
      ...pick(props, ["horizontal"])
    }));
    const containerSize = computed(() => {
      var _a2;
      return (((_a2 = props.items) == null ? void 0 : _a2.length) ?? 0) * itemSize.value;
    });
    const containerStyleComputed = computed(() => ({
      [sizeAttribute.value]: isDisabledVirtualTable.value ? void 0 : `${containerSize.value}px`
    }));
    const currentListOffset = computed(() => renderStartIndex.value * itemSize.value);
    const listStyleComputed = computed(() => ({
      transform: `translate${props.horizontal ? "X" : "Y"}(${currentListOffset.value}px)`
    }));
    const scrollToAttribute = computed(() => props.horizontal ? "left" : "top");
    const virtualScrollTo = (index) => {
      var _a2;
      if (!index && index !== 0) {
        return;
      }
      (_a2 = wrapper.value) == null ? void 0 : _a2.scrollTo({ [scrollToAttribute.value]: index * itemSize.value });
    };
    __expose({
      scrollToAttribute,
      virtualScrollTo
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        ref_key: "wrapper",
        ref: wrapper,
        class: normalizeClass(["va-virtual-scroller", unref(wrapperClassComputed)]),
        style: normalizeStyle(wrapperStyleComputed.value)
      }, [
        renderSlot(_ctx.$slots, "content", normalizeProps(guardReactiveProps({ containerStyleComputed: containerStyleComputed.value, listStyleComputed: listStyleComputed.value, renderBuffer: renderBuffer.value, uniqueKey, currentListOffset: currentListOffset.value })), () => [
          createBaseVNode("div", {
            class: "va-virtual-scroller__container",
            style: normalizeStyle(containerStyleComputed.value)
          }, [
            createBaseVNode("div", {
              ref_key: "list",
              ref: list,
              role: "list",
              class: "va-virtual-scroller__list",
              style: normalizeStyle(listStyleComputed.value)
            }, [
              (openBlock(true), createElementBlock(Fragment, null, renderList(renderBuffer.value, (item, index) => {
                return renderSlot(_ctx.$slots, "default", normalizeProps(mergeProps({
                  key: uniqueKey(item, index)
                }, { item, index: renderStartIndex.value + index })));
              }), 128))
            ], 4)
          ], 4)
        ])
      ], 6);
    };
  }
});

// node_modules/vuestic-ui/dist/es/src/components/va-virtual-scroller/index.js
var VaVirtualScroller = withConfigTransport$1(_sfc_main49);

// node_modules/vuestic-ui/dist/es/src/components/va-inner-loading/VaInnerLoading.vue_vue_type_script_setup_true_lang.js
import "D:/Github/DONGTIAN/ui/node_modules/vuestic-ui/dist/es/VaInnerLoading.css";
var _hoisted_126 = {
  key: 0,
  class: "va-inner-loading__overlay",
  "aria-hidden": "true"
};
var _sfc_main50 = defineComponent({
  ...{
    name: "VaInnerLoading"
  },
  __name: "VaInnerLoading",
  props: {
    ...useLoadingProps,
    ...useComponentPresetProp,
    color: { type: String },
    icon: { type: String, default: "va-loading" },
    size: { type: [Number, String], default: 30 }
  },
  setup(__props) {
    const props = __props;
    const { getColor } = useColors();
    const colorComputed = computed(() => getColor(props.color));
    const computedClass = computed(() => ({
      "va-inner-loading--active": props.loading
    }));
    const ariaAttributesComputed = computed(() => ({
      "aria-busy": props.loading
    }));
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", mergeProps({
        class: ["va-inner-loading", computedClass.value],
        "aria-live": "polite"
      }, ariaAttributesComputed.value), [
        renderSlot(_ctx.$slots, "default"),
        _ctx.$props.loading ? (openBlock(), createElementBlock("div", _hoisted_126, [
          renderSlot(_ctx.$slots, "loading", {}, () => [
            createVNode(unref(VaIcon), {
              class: "va-inner-loading__spinner",
              spin: "counter-clockwise",
              color: colorComputed.value,
              size: _ctx.$props.size,
              name: _ctx.$props.icon
            }, null, 8, ["color", "size", "name"])
          ])
        ])) : createCommentVNode("", true)
      ], 16);
    };
  }
});

// node_modules/vuestic-ui/dist/es/src/components/va-inner-loading/index.js
var VaInnerLoading = withConfigTransport$1(_sfc_main50);

// node_modules/vuestic-ui/dist/es/src/components/va-data-table/VaDataTable.vue_vue_type_script_setup_true_lang.js
import "D:/Github/DONGTIAN/ui/node_modules/vuestic-ui/dist/es/VaDataTable.css";
var _hoisted_127 = { key: 0 };
var _hoisted_212 = {
  ref: "list",
  class: "va-data-table__table-tbody"
};
var _hoisted_38 = {
  key: "showNoDataHtml",
  class: "va-data-table__table-tr"
};
var _hoisted_47 = {
  class: "va-data-table__table-td no-data",
  colspan: "99999"
};
var _hoisted_56 = ["innerHTML"];
var _hoisted_65 = {
  key: "showNoDataFilteredHtml",
  class: "va-data-table__table-tr"
};
var _hoisted_73 = {
  class: "va-data-table__table-td no-data",
  colspan: "99999"
};
var _hoisted_8 = ["innerHTML"];
var _hoisted_9 = ["onClick", "onDblclick", "onContextmenu"];
var _hoisted_10 = {
  key: 0,
  class: "va-data-table__grid-column-header"
};
var _hoisted_11 = {
  key: 0,
  class: "va-data-table__table-tr"
};
var VaVirtualScrollerProps = extractComponentProps(VaVirtualScroller, ["items", "trackBy", "horizontal", "disabled", "table"]);
var VaDataTableThRowProps = extractComponentProps(VaDataTableThRow);
var _sfc_main51 = defineComponent({
  ...{
    name: "VaDataTable",
    inheritAttrs: false
  },
  __name: "VaDataTable",
  props: {
    ...useComponentPresetProp,
    ...VaVirtualScrollerProps,
    ...useAnimationNameProps,
    ...useBindingProps,
    ...useTableScrollProps,
    ...useSortableProps,
    ...useStylableProps,
    ...useColumnsProps,
    ...useFilterableProps,
    ...usePaginatedRowsProps,
    ...createRowsProps(),
    ...useSelectableProps2,
    ...useThrottleProps,
    ...pick(VaDataTableThRowProps, ["ariaSelectAllRowsLabel", "ariaSortColumnByLabel"]),
    hoverable: { type: Boolean, default: false },
    clickable: { type: Boolean, default: false },
    loading: { type: Boolean, default: false },
    loadingColor: { type: String, default: "primary" },
    noDataHtml: { type: String, default: "No items" },
    noDataFilteredHtml: { type: String, default: "No items match the provided filtering condition" },
    hideDefaultHeader: { type: Boolean, default: false },
    footerClone: { type: Boolean, default: false },
    striped: { type: Boolean, default: false },
    virtualScroller: { type: Boolean, default: false },
    virtualTrackBy: { type: [String, Number], default: "initialIndex" },
    grid: { type: Boolean, default: false },
    gridColumns: { type: [Number, String], default: 0 },
    wrapperSize: { type: [Number, String], default: "auto" },
    ariaSelectRowLabel: useTranslationProp("$t:selectRowByIndex")
  },
  emits: [
    "update:modelValue",
    // `modelValue` is selectedItems
    "update:sortBy",
    "update:sortingOrder",
    "filtered",
    "sorted",
    "selectionChange",
    "row:click",
    "row:dblclick",
    "row:contextmenu",
    "columnSorted",
    ...useTableScrollEmits
  ],
  setup(__props, { emit: __emit }) {
    const { tp } = useTranslation();
    const props = __props;
    const emit = __emit;
    const { columnsComputed } = useColumns(props);
    const { rowsComputed } = useRows(columnsComputed, props);
    const { filteredRows } = useFilterable(rowsComputed, props, emit);
    const {
      sortBySync,
      sortingOrderSync,
      toggleSorting,
      sortedRows,
      sortingOrderIconName
    } = useSortable(columnsComputed, filteredRows, props, emit);
    const { paginatedRows } = usePaginatedRows(sortedRows, props);
    const {
      ctrlSelectRow,
      shiftSelectRows,
      toggleBulkSelection,
      isRowSelected,
      severalRowsSelected,
      allRowsSelected,
      toggleRowSelection
    } = useSelectableRow(paginatedRows, props, emit);
    const {
      CSSVariables,
      getCellCSSVariables,
      getClass: getClass2,
      getStyle: getStyle2
    } = useStylable(props);
    const { getRowBind, getCellBind } = useBinding(props);
    const animationName = useAnimationName(props, paginatedRows);
    const showNoDataHtml = computed(() => props.items.length === 0);
    const showNoDataFilteredHtml = computed(() => paginatedRows.value.length === 0);
    const onRowClickHandler = (name, event, row) => {
      emit(name, {
        event,
        item: row.source,
        itemIndex: row.initialIndex,
        row
      });
      if (props.selectable && props.grid) {
        toggleRowSelection(row);
      }
    };
    const computedTableAttributes = computed(() => ({
      ...omit(attrs, ["class", "style"]),
      class: pick(props, ["striped", "selectable", "hoverable", "clickable"])
    }));
    const filteredVirtualScrollerProps = filterComponentProps(VaVirtualScrollerProps);
    const virtualScrollerPropsComputed = computed(() => ({
      ...filteredVirtualScrollerProps.value,
      items: paginatedRows.value,
      trackBy: props.virtualTrackBy,
      disabled: !props.virtualScroller,
      table: true
    }));
    const attrs = useAttrs();
    const computedAttributes = computed(() => ({
      class: [
        { "va-data-table--sticky": props.stickyHeader || props.stickyFooter },
        { "va-data-table--scroll": !!props.height },
        { "va-data-table--virtual-scroller": isVirtualScroll.value },
        { "va-data-table--grid": props.grid },
        attrs.class
      ],
      style: [attrs.style],
      ...virtualScrollerPropsComputed.value
    }));
    const filteredThProps = filterComponentProps(VaDataTableThRowProps);
    const thAttributesComputed = computed(() => ({
      ...filteredThProps.value,
      columns: columnsComputed.value,
      sortingOrderIconName: sortingOrderIconName.value,
      severalRowsSelected: severalRowsSelected.value,
      sortingOrderSync: sortingOrderSync.value,
      allRowsSelected: allRowsSelected.value,
      sortBySync: sortBySync.value
    }));
    const {
      scrollContainer,
      topTrigger,
      bottomTrigger,
      doRenderTopTrigger,
      doRenderBottomTrigger
    } = useTableScroll(props, emit);
    const isVirtualScroll = computed(() => props.virtualScroller && !props.grid);
    const gridColumnsCount = computed(() => props.gridColumns || "var(--va-data-table-grid-tbody-columns)");
    const cellData = (cellData2, internalColumnData) => internalColumnData.displayFormatFn ? internalColumnData.displayFormatFn(cellData2.value) : cellData2.value;
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(VaVirtualScroller), mergeProps({ class: "va-data-table" }, computedAttributes.value, {
        ref_key: "scrollContainer",
        ref: scrollContainer,
        style: `--va-css-variables-selected-color: ${String(unref(CSSVariables).selectedColor)};--va-css-variables-hover-color: ${String(unref(CSSVariables).hoverColor)};--va-css-variables-table-height: ${String(unref(CSSVariables).tableHeight)};--va-css-variables-thead-bg: ${String(unref(CSSVariables).theadBg)};--va-css-variables-tfoot-bg: ${String(unref(CSSVariables).tfootBg)};--va-grid-columns-count: ${String(gridColumnsCount.value)}`
      }), {
        content: withCtx(({
          uniqueKey,
          renderBuffer,
          currentListOffset,
          listStyleComputed,
          containerStyleComputed
        }) => [
          createVNode(unref(VaInnerLoading), {
            "aria-live": "polite",
            style: normalizeStyle(containerStyleComputed),
            loading: __props.loading,
            color: __props.loadingColor
          }, {
            default: withCtx(() => [
              unref(doRenderTopTrigger) ? (openBlock(), createElementBlock("div", {
                key: 0,
                ref_key: "topTrigger",
                ref: topTrigger,
                class: "va-data-table__scroll-trigger"
              }, null, 512)) : createCommentVNode("", true),
              createBaseVNode("table", mergeProps({
                class: "va-data-table__table",
                style: listStyleComputed
              }, computedTableAttributes.value), [
                "colgroup" in _ctx.$slots ? (openBlock(), createElementBlock("colgroup", _hoisted_127, [
                  renderSlot(_ctx.$slots, "colgroup", normalizeProps(guardReactiveProps(unref(columnsComputed))))
                ])) : createCommentVNode("", true),
                createBaseVNode("thead", {
                  class: normalizeClass(["va-data-table__table-thead", { "va-data-table__table-thead--sticky": _ctx.$props.stickyHeader }]),
                  style: normalizeStyle({ top: isVirtualScroll.value && _ctx.$props.stickyHeader ? `-${currentListOffset}px` : void 0 })
                }, [
                  renderSlot(_ctx.$slots, "headerPrepend"),
                  renderSlot(_ctx.$slots, "header", {}, () => [
                    !__props.hideDefaultHeader ? (openBlock(), createBlock(unref(VaDataTableThRow), mergeProps({ key: 0 }, thAttributesComputed.value, {
                      onToggleBulkSelection: unref(toggleBulkSelection),
                      onToggleSorting: unref(toggleSorting)
                    }), createSlots({ _: 2 }, [
                      renderList(_ctx.$slots, (_, slot) => {
                        return {
                          name: slot,
                          fn: withCtx((scope) => [
                            renderSlot(_ctx.$slots, slot, normalizeProps(guardReactiveProps(scope)))
                          ])
                        };
                      })
                    ]), 1040, ["onToggleBulkSelection", "onToggleSorting"])) : createCommentVNode("", true)
                  ]),
                  renderSlot(_ctx.$slots, "headerAppend")
                ], 6),
                createBaseVNode("tbody", _hoisted_212, [
                  renderSlot(_ctx.$slots, "bodyPrepend"),
                  createVNode(TransitionGroup, {
                    name: isVirtualScroll.value ? "" : unref(animationName),
                    css: !_ctx.$props.virtualScroller,
                    appear: !_ctx.$props.virtualScroller
                  }, {
                    default: withCtx(() => [
                      showNoDataHtml.value ? (openBlock(), createElementBlock("tr", _hoisted_38, [
                        createBaseVNode("td", _hoisted_47, [
                          renderSlot(_ctx.$slots, "no-data", {}, () => [
                            createBaseVNode("div", { innerHTML: __props.noDataHtml }, null, 8, _hoisted_56)
                          ])
                        ])
                      ])) : showNoDataFilteredHtml.value ? (openBlock(), createElementBlock("tr", _hoisted_65, [
                        createBaseVNode("td", _hoisted_73, [
                          renderSlot(_ctx.$slots, "no-filtered-data", {}, () => [
                            renderSlot(_ctx.$slots, "no-data", {}, () => [
                              createBaseVNode("div", { innerHTML: __props.noDataFilteredHtml }, null, 8, _hoisted_8)
                            ])
                          ])
                        ])
                      ])) : createCommentVNode("", true),
                      (openBlock(true), createElementBlock(Fragment, null, renderList(renderBuffer, (row, index) => {
                        return openBlock(), createElementBlock(Fragment, {
                          key: `table-row_${uniqueKey(row, index)}`
                        }, [
                          createBaseVNode("tr", mergeProps({
                            class: ["va-data-table__table-tr", [{ selected: unref(isRowSelected)(row), "va-data-table__table-tr--expanded": row.isExpandableRowVisible }]]
                          }, unref(getRowBind)(row), {
                            onClick: ($event) => onRowClickHandler("row:click", $event, row),
                            onDblclick: ($event) => onRowClickHandler("row:dblclick", $event, row),
                            onContextmenu: ($event) => onRowClickHandler("row:contextmenu", $event, row)
                          }), [
                            _ctx.selectable && !_ctx.$props.grid ? (openBlock(), createElementBlock("td", {
                              class: "va-data-table__table-td va-data-table__table-cell-select",
                              key: `selectable_${uniqueKey(row, index)}`,
                              onSelectstart: _cache[0] || (_cache[0] = withModifiers(() => {
                              }, ["prevent"]))
                            }, [
                              createVNode(unref(VaCheckbox), {
                                class: "va-data-table__table-cell-checkbox",
                                "model-value": unref(isRowSelected)(row),
                                color: _ctx.selectedColor,
                                "aria-label": unref(tp)(_ctx.$props.ariaSelectRowLabel, { index: row.initialIndex }),
                                onClick: [
                                  withModifiers(($event) => unref(shiftSelectRows)(row), ["shift", "exact", "stop"]),
                                  withModifiers(($event) => unref(ctrlSelectRow)(row), ["ctrl", "exact", "stop"]),
                                  withModifiers(($event) => unref(ctrlSelectRow)(row), ["exact", "stop"])
                                ]
                              }, null, 8, ["model-value", "color", "aria-label", "onClick"])
                            ], 32)) : createCommentVNode("", true),
                            (openBlock(true), createElementBlock(Fragment, null, renderList(row.cells, (cell, cellIndex) => {
                              return openBlock(), createElementBlock("td", mergeProps({
                                key: `table-cell_${cell.column.name + cell.rowIndex}`,
                                class: ["va-data-table__table-td", unref(getClass2)(cell.column.tdClass)],
                                style: [
                                  cell.column.width ? { minWidth: cell.column.width, maxWidth: cell.column.width } : {},
                                  unref(getCellCSSVariables)(cell),
                                  unref(getStyle2)(cell.column.tdStyle)
                                ]
                              }, unref(getCellBind)(cell, row)), [
                                `cell(${cell.column.name})` in _ctx.$slots ? renderSlot(_ctx.$slots, `cell(${cell.column.name})`, normalizeProps(mergeProps({ key: 0 }, { ...cell, row, isExpanded: row.isExpandableRowVisible }))) : renderSlot(_ctx.$slots, "cell", normalizeProps(mergeProps({ key: 1 }, { cell, row })), () => [
                                  _ctx.$props.grid ? (openBlock(), createElementBlock("span", _hoisted_10, toDisplayString(unref(columnsComputed)[cellIndex].label), 1)) : createCommentVNode("", true),
                                  createTextVNode(" " + toDisplayString(cellData(cell, unref(columnsComputed)[cellIndex])), 1)
                                ])
                              ], 16);
                            }), 128))
                          ], 16, _hoisted_9),
                          row.isExpandableRowVisible ? (openBlock(), createElementBlock("tr", _hoisted_11, [
                            (openBlock(), createElementBlock("td", {
                              class: "va-data-table__table-expanded-content",
                              colspan: "99999",
                              key: uniqueKey(row, index)
                            }, [
                              renderSlot(_ctx.$slots, "expandableRow", normalizeProps(guardReactiveProps(row)))
                            ]))
                          ])) : createCommentVNode("", true)
                        ], 64);
                      }), 128))
                    ]),
                    _: 2
                  }, 1032, ["name", "css", "appear"]),
                  renderSlot(_ctx.$slots, "bodyAppend")
                ], 512),
                ["footer", "footerPrepend", "footerAppend"].some((field) => _ctx.$slots[field]) || __props.footerClone && !_ctx.$props.grid ? (openBlock(), createElementBlock("tfoot", {
                  key: 1,
                  class: normalizeClass(["va-data-table__table-tfoot", { "va-data-table__table-tfoot--sticky": _ctx.$props.stickyFooter }]),
                  style: normalizeStyle({ bottom: isVirtualScroll.value && _ctx.$props.stickyFooter ? `${currentListOffset}px` : void 0 })
                }, [
                  renderSlot(_ctx.$slots, "footerPrepend"),
                  renderSlot(_ctx.$slots, "footer", {}, () => [
                    !__props.hideDefaultHeader ? (openBlock(), createBlock(unref(VaDataTableThRow), mergeProps({ key: 0 }, thAttributesComputed.value, {
                      "is-footer": "",
                      onToggleBulkSelection: unref(toggleBulkSelection),
                      onToggleSorting: unref(toggleSorting)
                    }), createSlots({ _: 2 }, [
                      renderList(_ctx.$slots, (_, slot) => {
                        return {
                          name: slot,
                          fn: withCtx((scope) => [
                            renderSlot(_ctx.$slots, slot, normalizeProps(guardReactiveProps(scope)))
                          ])
                        };
                      })
                    ]), 1040, ["onToggleBulkSelection", "onToggleSorting"])) : createCommentVNode("", true)
                  ]),
                  renderSlot(_ctx.$slots, "footerAppend")
                ], 6)) : createCommentVNode("", true)
              ], 16),
              unref(doRenderBottomTrigger) ? (openBlock(), createElementBlock("div", {
                key: 1,
                ref_key: "bottomTrigger",
                ref: bottomTrigger,
                class: "va-data-table__scroll-trigger"
              }, null, 512)) : createCommentVNode("", true)
            ]),
            _: 2
          }, 1032, ["style", "loading", "color"])
        ]),
        _: 3
      }, 16, ["style"]);
    };
  }
});

// node_modules/vuestic-ui/dist/es/src/components/va-data-table/index.js
var VaDataTable = withConfigTransport$1(_sfc_main51);

// node_modules/vuestic-ui/dist/es/src/components/va-date-input/hooks/model-value-parser.js
var isRange = (date) => {
  if (date === null) {
    return false;
  }
  return typeof date === "object" && ("start" in date || "end" in date);
};

// node_modules/vuestic-ui/dist/es/src/components/va-date-input/hooks/range-model-value-guard.js
var useRangeModelValueGuard = (modelValue, disabled) => {
  const bufferValue = ref(modelValue.value);
  const valueComputed = computed({
    get: () => bufferValue.value,
    set: (value) => {
      if (disabled.value) {
        modelValue.value = value;
      }
      if (!value) {
        modelValue.value = value;
        return;
      }
      if (isRange(value)) {
        if (value.end !== null) {
          modelValue.value = value;
        }
      } else {
        modelValue.value = value;
      }
      bufferValue.value = value;
    }
  });
  watch(modelValue, (newValue) => {
    bufferValue.value = newValue;
  });
  const reset = () => {
    if (bufferValue.value && isRange(bufferValue.value)) {
      bufferValue.value = modelValue.value;
    }
  };
  return {
    valueComputed,
    reset
  };
};

// node_modules/vuestic-ui/dist/es/src/utils/is-date.js
var isDate = (value) => Object.prototype.toString.call(value) === "[object Date]";

// node_modules/vuestic-ui/dist/es/src/components/va-date-input/hooks/input-text-parser.js
var defaultParseDateFunction = (text) => new Date(Date.parse(text));
var isValidDate = (d) => isDate(d) && !isNaN(d.getTime());
var useDateParser = (props) => {
  const isMultipleDates = (text) => {
    const dates = text.split(props.delimiter);
    if (dates.length < 2) {
      return false;
    }
    return dates.every((date) => {
      const parsedDate = (props.parseDate || defaultParseDateFunction)(date);
      return isValidDate(parsedDate);
    });
  };
  const isRange4 = (text) => text.includes(props.rangeDelimiter);
  const isValid = ref(true);
  const parseDate = (text) => {
    const splitDate = text.split(".");
    const valueToParse = (splitDate == null ? void 0 : splitDate.length) === 3 ? splitDate.reverse().join("-") : text;
    const date = (props.parseDate || defaultParseDateFunction)(valueToParse);
    isValid.value = isValidDate(date);
    return date;
  };
  const parseDateInputValue = (text) => {
    isValid.value = true;
    if (props.parse) {
      return props.parse(text, isValid);
    }
    if (isMultipleDates(text)) {
      return text.split(props.delimiter).map(parseDate);
    }
    if (isRange4(text)) {
      const [start, end] = text.split(props.rangeDelimiter).map(parseDate);
      return { start, end };
    }
    return parseDate(text);
  };
  return {
    parseDateInputValue,
    isValid
  };
};

// node_modules/vuestic-ui/dist/es/src/components/va-date-input/utils/parse-date.js
var isISO8601 = (date) => {
  const isoDate = Date.parse(date);
  return !isNaN(isoDate) && !date.includes(" ");
};
var isRFC1123GTM = (date) => {
  return date.endsWith("GMT");
};
var isRFC1123 = (date) => {
  const rfcDate = new Date(date);
  return !isNaN(rfcDate.getTime());
};
var formatDateToTheSameStandardFormat = (date, formattedString) => {
  if (isRFC1123GTM(formattedString)) {
    return date.toUTCString();
  }
  if (isISO8601(formattedString)) {
    return date.toISOString();
  }
  if (isRFC1123(formattedString)) {
    return date.toString();
  }
  return null;
};

// node_modules/vuestic-ui/dist/es/src/components/va-date-input/hooks/model-value.js
var isRange2 = (date) => {
  if (date === null) {
    return false;
  }
  return typeof date === "object" && ("start" in date || "end" in date);
};
var isMultiple = (date) => {
  if (date === null) {
    return false;
  }
  return Array.isArray(date);
};
var isSingleDate = (date) => {
  if (date === null) {
    return false;
  }
  return typeof date === "string" || typeof date === "number" || date instanceof Date;
};
var useDateInputModelValue = (modelValue, mode, parseModelValue, formatModelValue, formatModelValueSingleDate) => {
  const syncFormat = (original, target) => {
    if (formatModelValueSingleDate) {
      return formatModelValueSingleDate(target);
    }
    if (typeof original === "string") {
      const standardFormat = formatDateToTheSameStandardFormat(target, original);
      if (standardFormat) {
        return standardFormat;
      }
      return formatModelValue(target);
    }
    if (typeof original === "number") {
      return target.getTime();
    }
    return target;
  };
  const normalizeSingleDate = (value) => {
    if (value instanceof Date) {
      return value;
    }
    return new Date(value);
  };
  const dateValue = computed(() => {
    if (modelValue.value === null || modelValue.value === void 0) {
      return null;
    }
    if (typeof modelValue.value === "string") {
      return parseModelValue(modelValue.value);
    }
    if (typeof modelValue.value === "number") {
      return new Date(modelValue.value);
    }
    return modelValue.value;
  });
  const normalized = computed({
    get: () => {
      if (dateValue.value === null || dateValue.value === void 0) {
        return null;
      }
      if (isMultiple(dateValue.value)) {
        return dateValue.value.map(normalizeSingleDate);
      }
      if (isRange2(dateValue.value)) {
        const { start, end } = dateValue.value;
        return {
          start: start ? normalizeSingleDate(start) : null,
          end: end ? normalizeSingleDate(end) : null
        };
      }
      return normalizeSingleDate(dateValue.value);
    },
    set(newValue) {
      var _a2, _b;
      if (newValue === null || newValue === void 0) {
        modelValue.value = newValue;
        return;
      }
      if (isMultiple(newValue) && (isMultiple(modelValue.value) || isNil(modelValue.value))) {
        const originalValue = modelValue.value;
        modelValue.value = newValue.map((v, index) => syncFormat((originalValue == null ? void 0 : originalValue[index]) || (originalValue == null ? void 0 : originalValue[0]), v));
        return;
      }
      if (isRange2(newValue) && (isRange2(modelValue.value) || isNil(modelValue.value))) {
        const { start, end } = newValue;
        modelValue.value = {
          start: start ? syncFormat((_a2 = modelValue.value) == null ? void 0 : _a2.start, start) : null,
          // Sync end date only if start date is specified
          end: end ? syncFormat((_b = modelValue.value) == null ? void 0 : _b.start, end) : null
        };
        return;
      }
      if (isSingleDate(newValue) && (isSingleDate(modelValue.value) || isNil(modelValue.value))) {
        modelValue.value = syncFormat(modelValue.value, newValue);
        return;
      }
      throw new Error("Input date is not the same as date from props");
    }
  });
  const text = computed({
    get: () => {
      if (normalized.value === null || normalized.value === void 0) {
        return "";
      }
      return formatModelValue(normalized.value);
    },
    set: (value) => {
      modelValue.value = parseModelValue(value);
    }
  });
  return {
    text,
    normalized
  };
};

// node_modules/vuestic-ui/dist/es/src/components/va-date-picker/utils/date-utils.js
var isDatesDayEqual = (date1, date2) => (date1 == null ? void 0 : date1.toDateString()) === (date2 == null ? void 0 : date2.toDateString());
var isDatesYearEqual = (date1, date2) => {
  return (date1 == null ? void 0 : date1.getFullYear()) === (date2 == null ? void 0 : date2.getFullYear());
};
var isDatesMonthEqual = (date1, date2) => {
  return isDatesYearEqual(date1, date2) && (date1 == null ? void 0 : date1.getMonth()) === (date2 == null ? void 0 : date2.getMonth());
};
var createYearDate = (year) => {
  const date = /* @__PURE__ */ new Date();
  date.setFullYear(year);
  return date;
};
var isRange3 = (value) => {
  if (value === null) {
    return false;
  }
  return typeof value === "object" && ("start" in value || "end" in value);
};
var isSingleDate2 = (value) => isDate(value);
var isDates = (value) => Array.isArray(value);

// node_modules/vuestic-ui/dist/es/src/components/va-date-picker/hooks/view.js
var JANUARY_MONTH_INDEX = 0;
var DECEMBER_MONTH_INDEX = 11;
var addMonth = (view) => {
  if (view.month === DECEMBER_MONTH_INDEX) {
    return { ...view, year: view.year + 1, month: JANUARY_MONTH_INDEX };
  } else {
    return { ...view, month: view.month + 1 };
  }
};
var subMonth = (view) => {
  if (view.month === JANUARY_MONTH_INDEX) {
    return { ...view, year: view.year - 1, month: DECEMBER_MONTH_INDEX };
  } else {
    return { ...view, month: view.month - 1 };
  }
};
var getDefaultDate = (modelValue) => {
  if (isDate(modelValue)) {
    return modelValue;
  }
  if (isDate(modelValue == null ? void 0 : modelValue.start)) {
    return modelValue.start;
  }
  if (Array.isArray(modelValue) && isDate(modelValue[0])) {
    return modelValue[0];
  }
  return /* @__PURE__ */ new Date();
};
var useView = (props, emit, defaultOverride) => {
  const defaultDate = getDefaultDate(props.modelValue);
  const defaultView = {
    type: "day",
    year: defaultDate.getFullYear(),
    month: defaultDate.getMonth(),
    ...defaultOverride
  };
  const statefulView = ref(defaultView);
  const syncView = computed({
    get() {
      return { ...statefulView.value, ...props.view };
    },
    set(view) {
      statefulView.value = view;
      emit("update:view", view);
    }
  });
  const next = () => {
    if (syncView.value.type === "day") {
      syncView.value = addMonth(syncView.value);
    } else if (syncView.value.type === "month") {
      syncView.value = { ...syncView.value, year: syncView.value.year + 1 };
    }
  };
  const prev = () => {
    if (syncView.value.type === "day") {
      syncView.value = subMonth(syncView.value);
    } else if (syncView.value.type === "month") {
      syncView.value = { ...syncView.value, year: syncView.value.year - 1 };
    }
  };
  return {
    syncView,
    next,
    prev
  };
};

// node_modules/vuestic-ui/dist/es/src/components/va-date-picker/components/VaDatePickerCell.vue_vue_type_script_setup_true_lang.js
import "D:/Github/DONGTIAN/ui/node_modules/vuestic-ui/dist/es/VaDatePickerCell.css";
var _hoisted_128 = ["onKeypress"];
var _sfc_main52 = defineComponent({
  ...{
    name: "VaDatePickerCell"
  },
  __name: "VaDatePickerCell",
  props: {
    otherMonth: { type: Boolean, default: false },
    today: { type: Boolean, default: false },
    inRange: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
    selected: { type: Boolean, default: false },
    weekend: { type: Boolean, default: false },
    hidden: { type: Boolean, default: false },
    focused: { type: Boolean, default: false },
    highlightWeekend: { type: Boolean, default: false },
    highlightToday: { type: Boolean, default: false },
    readonly: { type: Boolean, default: false },
    color: { type: String, default: "primary" }
  },
  emits: ["click"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const onClick = () => {
      if (!props.disabled) {
        emit("click");
      }
    };
    const { getColor } = useColors();
    const bg = computed(() => getColor(props.color));
    const { textColorComputed } = useTextColor(bg);
    return (_ctx, _cache) => {
      return __props.hidden ? (openBlock(), createElementBlock("div", {
        key: 0,
        class: "va-date-picker-cell va-date-picker-cell_clear",
        style: normalizeStyle(`--va-bg: ${String(bg.value)};--va-text-color-computed: ${String(unref(textColorComputed))}`)
      }, null, 4)) : (openBlock(), createElementBlock("div", {
        key: 1,
        class: normalizeClass(["va-date-picker-cell", {
          "va-date-picker-cell_other-month": __props.otherMonth,
          "va-date-picker-cell_today": __props.highlightToday && __props.today,
          "va-date-picker-cell_in-range": __props.inRange,
          "va-date-picker-cell_disabled": __props.disabled,
          "va-date-picker-cell_highlighted-weekend": __props.highlightWeekend && __props.weekend,
          "va-date-picker-cell_selected": __props.selected,
          "va-date-picker-cell_focused": __props.focused,
          "va-date-picker-cell_readonly": __props.readonly
        }]),
        onClick,
        onKeypress: withKeys(withModifiers(onClick, ["prevent", "stop"]), ["space", "enter"]),
        style: normalizeStyle(`--va-bg: ${String(bg.value)};--va-text-color-computed: ${String(unref(textColorComputed))}`)
      }, [
        renderSlot(_ctx.$slots, "default")
      ], 46, _hoisted_128));
    };
  }
});

// node_modules/vuestic-ui/dist/es/src/components/va-date-picker/hooks/grid-keyboard-navigation.js
function isUndefined(t) {
  return t === void 0;
}
var useGridKeyboardNavigation = ({
  rowSize,
  start,
  end,
  onSelected,
  onFocusIndex
}) => {
  const focusedCellIndex = ref(-1);
  let previouslyClicked2 = false;
  const onMousedown = () => {
    previouslyClicked2 = true;
  };
  const onFocus = () => {
    if (previouslyClicked2) {
      return;
    }
    previouslyClicked2 = false;
    const index = onFocusIndex === void 0 ? unref(start) || 0 : unref(onFocusIndex);
    focusedCellIndex.value = index;
  };
  const onBlur = () => {
    previouslyClicked2 = false;
    focusedCellIndex.value = -1;
  };
  const onKeydown = (e) => {
    if (["ArrowRight", "ArrowLeft", "ArrowDown", "ArrowUp", "Enter", "Space"].includes(e.key)) {
      e.preventDefault();
      e.stopPropagation();
    }
    if (e.key === "Enter" || e.key === "Space") {
      if (onSelected === void 0) {
        return;
      }
      onSelected(focusedCellIndex.value);
      return;
    }
    if (e.key === "ArrowRight") {
      focusedCellIndex.value += 1;
    }
    if (e.key === "ArrowLeft") {
      focusedCellIndex.value -= 1;
    }
    if (e.key === "ArrowDown") {
      focusedCellIndex.value += rowSize;
    }
    if (e.key === "ArrowUp") {
      focusedCellIndex.value -= rowSize;
    }
    if (!isUndefined(start) && focusedCellIndex.value < unref(start)) {
      focusedCellIndex.value = unref(start);
    }
    if (!isUndefined(end) && focusedCellIndex.value > unref(end) - 1) {
      focusedCellIndex.value = unref(end) - 1;
    }
  };
  const containerAttributes = {
    onFocus,
    onKeydown,
    onBlur,
    onMousedown,
    tabindex: 0
  };
  return {
    focusedCellIndex,
    containerAttributes
  };
};

// node_modules/vuestic-ui/dist/es/src/components/va-date-picker/hooks/model-value-helper.js
var modeInitialValue = (date, mode) => {
  if (mode === "single") {
    return date;
  } else if (mode === "range") {
    return { start: date, end: null };
  } else if (mode === "multiple") {
    return [date];
  } else if (mode === "auto") {
    return date;
  }
  throw new Error("Unknown mode");
};
var throwIncorrectModelValueError = (modelValue, mode) => {
  throw Error(`Incorrect modelValue for mode ${mode}. Got ${JSON.stringify(modelValue)}`);
};
var modeFromModelValue = (modelValue) => {
  if (isSingleDate2(modelValue)) {
    return "single";
  } else if (isRange3(modelValue)) {
    return "range";
  } else if (isDates(modelValue)) {
    return "multiple";
  }
  return throwIncorrectModelValueError(modelValue, "auto");
};
var sortRange = (modelValue) => {
  if (modelValue.start && modelValue.end) {
    if (modelValue.start > modelValue.end) {
      return { start: modelValue.end, end: modelValue.start };
    }
  }
  return modelValue;
};
var useDatePickerModelValue = (props, emit, dateEqual) => {
  const updateModelValue = (date) => {
    if (!props.modelValue) {
      emit("update:modelValue", modeInitialValue(date, props.mode));
      return;
    }
    const mode = props.mode === "auto" ? modeFromModelValue(props.modelValue) : props.mode;
    if (mode === "single") {
      if (!isSingleDate2(props.modelValue)) {
        return throwIncorrectModelValueError(props.modelValue, mode);
      }
      emit("update:modelValue", date);
    } else if (mode === "range") {
      if (!isRange3(props.modelValue)) {
        return throwIncorrectModelValueError(props.modelValue, mode);
      }
      if (props.modelValue.end && dateEqual(props.modelValue.end, date)) {
        return emit("update:modelValue", { start: props.modelValue.start, end: null });
      }
      if (props.modelValue.start && dateEqual(props.modelValue.start, date)) {
        return emit("update:modelValue", { start: null, end: props.modelValue.end });
      }
      if (props.modelValue.end === null) {
        return emit("update:modelValue", sortRange({ start: props.modelValue.start, end: date }));
      }
      if (props.modelValue.start === null) {
        return emit("update:modelValue", sortRange({ end: props.modelValue.end, start: date }));
      }
      emit("update:modelValue", { start: date, end: null });
    } else if (mode === "multiple") {
      if (!isDates(props.modelValue)) {
        return throwIncorrectModelValueError(props.modelValue, mode);
      }
      const isDatesIncludesDate = !!props.modelValue.find((d) => dateEqual(d, date));
      if (isDatesIncludesDate) {
        emit("update:modelValue", props.modelValue.filter((d) => !dateEqual(d, date)));
      } else {
        emit("update:modelValue", [...props.modelValue, date].sort((a, b) => a.getTime() - b.getTime()));
      }
    }
  };
  return {
    updateModelValue
  };
};

// node_modules/vuestic-ui/dist/es/src/components/va-date-picker/hooks/use-picker.js
var getDateEqualFunction = (type) => {
  return {
    month: isDatesMonthEqual,
    day: isDatesDayEqual,
    year: isDatesYearEqual
  }[type];
};
var useDatePicker = (type, dates, props, emit) => {
  const datesEqual = getDateEqualFunction(type);
  const isAllowedDate = props.allowedDays || props.allowedMonths || props.allowedYears;
  const isDateDisabled = (date) => isAllowedDate === void 0 ? false : !isAllowedDate(date);
  const hoveredIndex = ref(-1);
  const hoveredValue = computed(() => dates.value[hoveredIndex.value]);
  const { updateModelValue } = useDatePickerModelValue(
    props,
    emit,
    datesEqual
  );
  const onClick = (date) => {
    if (props.readonly || isDateDisabled(date)) {
      return;
    }
    updateModelValue(date);
    emit(`click:${type}`, date);
  };
  const isToday = (date) => {
    const today = /* @__PURE__ */ new Date();
    return datesEqual(today, date);
  };
  const isSelected = (date) => {
    if (!props.modelValue) {
      return false;
    }
    if (isSingleDate2(props.modelValue)) {
      return datesEqual(props.modelValue, date);
    } else if (isDates(props.modelValue)) {
      return !!props.modelValue.find((d) => datesEqual(d, date));
    } else if (isRange3(props.modelValue)) {
      return datesEqual(props.modelValue.start, date) || datesEqual(props.modelValue.end, date);
    }
    return false;
  };
  const isInRange = (date) => {
    if (!props.modelValue) {
      return false;
    }
    if (!isRange3(props.modelValue)) {
      return false;
    }
    if (props.modelValue.start && props.modelValue.end) {
      return props.modelValue.start < date && props.modelValue.end > date;
    }
    const selectedDate = props.modelValue.start || props.modelValue.end;
    if (selectedDate) {
      if (!hoveredValue.value) {
        return false;
      }
      return selectedDate < date ? hoveredValue.value >= date : hoveredValue.value <= date;
    }
    return false;
  };
  watch(hoveredValue, (date) => {
    emit(`hover:${type}`, date);
  });
  return {
    hoveredIndex,
    hoveredValue,
    onClick,
    isToday,
    isSelected,
    isInRange
  };
};

// node_modules/vuestic-ui/dist/es/src/components/va-date-picker/components/VaDayPicker/va-date-picker-calendar-hook.js
var getMonthDaysCount = (year, month) => new Date(year, month + 1, 0).getDate();
var getMonthStartWeekday = (year, month) => new Date(year, month, 1).getDay();
var getNumbersArray = (length) => Array.from(Array(length).keys()).map((k) => k + 1);
var useVaDatePickerCalendar = (view, options) => {
  const CALENDAR_ROWS_COUNT = 6;
  const localizeWeekday = (weekdayNumber) => {
    var _a2;
    if (!options || !((_a2 = options.firstWeekday) == null ? void 0 : _a2.value)) {
      return weekdayNumber;
    }
    if (options.firstWeekday.value.toLowerCase() === "monday") {
      return weekdayNumber === 0 ? 6 : weekdayNumber - 1;
    }
    return weekdayNumber;
  };
  const currentMonthStartWeekday = computed(() => localizeWeekday(getMonthStartWeekday(view.value.year, view.value.month)));
  const getPreviousDates = () => {
    if (currentMonthStartWeekday.value === 0) {
      return [];
    }
    const prevMonthDaysCount = getMonthDaysCount(view.value.year, view.value.month - 1);
    const prevMonthDays = getNumbersArray(prevMonthDaysCount);
    return prevMonthDays.slice(-currentMonthStartWeekday.value).map((d) => new Date(view.value.year, view.value.month - 1, d));
  };
  const getCurrentDates = () => {
    const currentMonthDays = getNumbersArray(getMonthDaysCount(view.value.year, view.value.month));
    return currentMonthDays.map((d) => new Date(view.value.year, view.value.month, d));
  };
  const prevAndCurrentDays = computed(() => [...getPreviousDates(), ...getCurrentDates()]);
  const currentMonthEndIndex = computed(() => prevAndCurrentDays.value.length);
  const calendarDates = computed(() => {
    const days = prevAndCurrentDays.value;
    const daysRemaining = 7 * CALENDAR_ROWS_COUNT - days.length;
    const nextMonthDaysCount = getMonthDaysCount(view.value.year, view.value.month + 1);
    const nextMonthDays = getNumbersArray(nextMonthDaysCount);
    return [
      ...days,
      ...nextMonthDays.slice(0, daysRemaining).map((d) => new Date(view.value.year, view.value.month + 1, d))
    ];
  });
  return { calendarDates, currentMonthStartIndex: currentMonthStartWeekday, currentMonthEndIndex };
};

// node_modules/vuestic-ui/dist/es/src/components/va-date-picker/components/VaDayPicker/VaDayPicker.vue_vue_type_script_setup_true_lang.js
import "D:/Github/DONGTIAN/ui/node_modules/vuestic-ui/dist/es/VaDayPicker.css";
var _hoisted_129 = ["onMouseenter"];
var _hoisted_213 = { class: "va-date-picker-cell__day" };
var _sfc_main53 = defineComponent({
  ...{
    name: "VaDayPicker"
  },
  __name: "VaDayPicker",
  props: {
    monthNames: { type: Array, required: true },
    weekdayNames: { type: Array, required: true },
    firstWeekday: { type: String, default: "Sunday" },
    hideWeekDays: { type: Boolean, default: false },
    view: { type: Object, default: () => ({ type: "day" }) },
    modelValue: { type: [Date, Array, Object] },
    mode: { type: String, default: "auto" },
    showOtherMonths: { type: Boolean, default: false },
    allowedDays: { type: Function },
    weekends: { type: Function },
    highlightWeekend: { type: Boolean, default: false },
    highlightToday: { type: Boolean, default: false },
    readonly: { type: Boolean, default: false },
    color: { type: String, default: "primary" }
  },
  emits: ["update:modelValue", "hover:day", "click:day"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const { firstWeekday, weekdayNames, view } = toRefs(props);
    const { calendarDates, currentMonthStartIndex, currentMonthEndIndex } = useVaDatePickerCalendar(view, { firstWeekday });
    const weekdayNamesComputed = computed(() => {
      return firstWeekday.value.toLowerCase() === "sunday" ? weekdayNames.value : [...weekdayNames.value.slice(1), weekdayNames.value[0]];
    });
    const {
      hoveredIndex,
      onClick,
      isToday,
      isSelected,
      isInRange
    } = useDatePicker("day", calendarDates, props, emit);
    const gridStartIndex = computed(() => props.showOtherMonths ? 0 : currentMonthStartIndex.value);
    const gridEndIndex = computed(() => props.showOtherMonths ? calendarDates.value.length : currentMonthEndIndex.value);
    const {
      focusedCellIndex,
      containerAttributes
    } = useGridKeyboardNavigation({
      rowSize: 7,
      start: gridStartIndex,
      end: gridEndIndex,
      onSelected: (selectedValue) => onClick(calendarDates.value[selectedValue])
    });
    watch(focusedCellIndex, (index) => {
      hoveredIndex.value = index;
    });
    watch(hoveredIndex, (index) => {
      focusedCellIndex.value = index;
    });
    const isOtherMonth = (date) => props.view.month !== date.getMonth();
    const isDateDisabled = (date) => props.allowedDays === void 0 ? false : !props.allowedDays(date);
    const isDateWeekend = (date) => {
      if (props.weekends === void 0) {
        return date.getDay() === 6 || date.getDay() === 0;
      }
      return props.weekends(date);
    };
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", mergeProps({ class: "va-day-picker" }, unref(containerAttributes)), [
        !__props.hideWeekDays ? (openBlock(true), createElementBlock(Fragment, { key: 0 }, renderList(weekdayNamesComputed.value, (weekday) => {
          return openBlock(), createElementBlock("div", {
            key: weekday,
            class: "va-day-picker__weekday"
          }, [
            renderSlot(_ctx.$slots, "weekday", {}, () => [
              createTextVNode(toDisplayString(weekday), 1)
            ])
          ]);
        }), 128)) : createCommentVNode("", true),
        (openBlock(true), createElementBlock(Fragment, null, renderList(unref(calendarDates), (date, index) => {
          return openBlock(), createElementBlock("div", {
            class: "va-day-picker__calendar__day-wrapper",
            key: index,
            onMouseenter: ($event) => hoveredIndex.value = index,
            onMouseleave: _cache[0] || (_cache[0] = ($event) => hoveredIndex.value = -1)
          }, [
            createVNode(_sfc_main52, {
              hidden: isOtherMonth(date) && !__props.showOtherMonths,
              today: unref(isToday)(date),
              selected: unref(isSelected)(date),
              "in-range": unref(isInRange)(date),
              "other-month": isOtherMonth(date),
              weekend: isDateWeekend(date),
              disabled: isDateDisabled(date),
              focused: unref(hoveredIndex) === index,
              "highlight-today": __props.highlightToday,
              "highlight-weekend": __props.highlightWeekend,
              readonly: _ctx.$props.readonly,
              color: __props.color,
              onClick: ($event) => {
                unref(onClick)(date);
                focusedCellIndex.value = index;
              }
            }, {
              default: withCtx(() => [
                createBaseVNode("span", _hoisted_213, [
                  renderSlot(_ctx.$slots, "day", normalizeProps(guardReactiveProps({ date })), () => [
                    createTextVNode(toDisplayString(date.getDate()), 1)
                  ])
                ])
              ]),
              _: 2
            }, 1032, ["hidden", "today", "selected", "in-range", "other-month", "weekend", "disabled", "focused", "highlight-today", "highlight-weekend", "readonly", "color", "onClick"])
          ], 40, _hoisted_129);
        }), 128))
      ], 16);
    };
  }
});

// node_modules/vuestic-ui/dist/es/src/components/va-date-picker/components/VaDatePickerHeader/VaDatePickerHeader.vue_vue_type_script_setup_true_lang.js
import "D:/Github/DONGTIAN/ui/node_modules/vuestic-ui/dist/es/VaDatePickerHeader.css";
var _hoisted_130 = {
  key: 0,
  class: "va-date-picker-header va-date-picker__header"
};
var _hoisted_214 = { class: "va-date-picker__header__text" };
var _hoisted_39 = { class: "va-date-picker__header__month" };
var _sfc_main54 = defineComponent({
  ...{
    name: "VaDatePickerHeader"
  },
  __name: "VaDatePickerHeader",
  props: {
    monthNames: { type: Array, required: true },
    view: { type: Object },
    color: { type: String },
    disabled: { type: Boolean, default: false },
    ariaNextPeriodLabel: useTranslationProp("$t:nextPeriod"),
    ariaPreviousPeriodLabel: useTranslationProp("$t:previousPeriod"),
    ariaSwitchViewLabel: useTranslationProp("$t:switchView")
  },
  emits: ["update:view"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const { syncView, prev, next } = useView(props, emit);
    const switchView = () => {
      if (syncView.value.type === "day") {
        syncView.value = { ...syncView.value, type: "month" };
      } else if (syncView.value.type === "month") {
        syncView.value = { ...syncView.value, type: "year" };
      }
    };
    const changeView = (view) => {
      syncView.value = view;
    };
    const currentColor = useElementTextColor(useElementBackground(useCurrentElement()));
    const { tp } = useTranslation();
    return (_ctx, _cache) => {
      return unref(syncView).type !== "year" ? (openBlock(), createElementBlock("div", _hoisted_130, [
        renderSlot(_ctx.$slots, "buttonPrev", normalizeProps(guardReactiveProps({ onClick: unref(prev) })), () => [
          createVNode(unref(VaButton), {
            "va-child": "prevButton",
            disabled: _ctx.$props.disabled,
            icon: "va-arrow-left",
            preset: "plain",
            size: "small",
            color: __props.color,
            textColor: unref(currentColor),
            "aria-label": unref(tp)(_ctx.$props.ariaPreviousPeriodLabel),
            round: "",
            onClick: unref(prev)
          }, null, 8, ["disabled", "color", "textColor", "aria-label", "onClick"])
        ]),
        createBaseVNode("div", _hoisted_214, [
          renderSlot(_ctx.$slots, "header", normalizeProps(guardReactiveProps({ year: unref(syncView).year, month: unref(syncView).month, monthNames: __props.monthNames, view: unref(syncView), changeView, switchView })), () => [
            createVNode(unref(VaButton), {
              "va-child": "middleButton",
              disabled: _ctx.$props.disabled,
              preset: "plain",
              size: "small",
              color: __props.color,
              textColor: unref(currentColor),
              "aria-label": unref(tp)(_ctx.$props.ariaSwitchViewLabel),
              onClick: switchView
            }, {
              default: withCtx(() => [
                renderSlot(_ctx.$slots, "year", normalizeProps(guardReactiveProps({ year: unref(syncView).year })), () => [
                  createTextVNode(toDisplayString(unref(syncView).year), 1)
                ]),
                unref(syncView).type === "day" ? renderSlot(_ctx.$slots, "month", normalizeProps(mergeProps({ key: 0 }, { month: unref(syncView).month })), () => [
                  createBaseVNode("span", _hoisted_39, toDisplayString(__props.monthNames[unref(syncView).month]), 1)
                ]) : createCommentVNode("", true)
              ]),
              _: 3
            }, 8, ["disabled", "color", "textColor", "aria-label"])
          ])
        ]),
        renderSlot(_ctx.$slots, "buttonNext", normalizeProps(guardReactiveProps({ onClick: unref(next) })), () => [
          createVNode(unref(VaButton), {
            "va-child": "nextButton",
            disabled: _ctx.$props.disabled,
            icon: "va-arrow-right",
            preset: "plain",
            size: "small",
            color: __props.color,
            textColor: unref(currentColor),
            "aria-label": unref(tp)(_ctx.$props.ariaNextPeriodLabel),
            onClick: unref(next),
            round: ""
          }, null, 8, ["disabled", "color", "textColor", "aria-label", "onClick"])
        ])
      ])) : createCommentVNode("", true);
    };
  }
});

// node_modules/vuestic-ui/dist/es/src/components/va-date-picker/components/VaMonthPicker/VaMonthPicker.vue_vue_type_script_setup_true_lang.js
import "D:/Github/DONGTIAN/ui/node_modules/vuestic-ui/dist/es/VaMonthPicker.css";
var _hoisted_131 = ["onMouseenter"];
var _sfc_main55 = defineComponent({
  ...{
    name: "VaMonthPicker"
  },
  __name: "VaMonthPicker",
  props: {
    modelValue: { type: [Date, Array, Object] },
    monthNames: { type: Array, required: true },
    view: { type: Object, default: () => ({ type: "month" }) },
    allowedMonths: { type: Function, default: void 0 },
    highlightToday: { type: Boolean, default: true },
    mode: { type: String, default: "auto" },
    readonly: { type: Boolean, default: false },
    color: { type: String, default: "primary" }
  },
  emits: ["update:modelValue", "hover:month", "click:month"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const { view } = toRefs(props);
    const months = computed(() => Array.from(Array(12).keys()).map((month) => new Date(view.value.year, month)));
    const {
      hoveredIndex,
      onClick,
      isToday,
      isSelected,
      isInRange
    } = useDatePicker("month", months, props, emit);
    const isDisabled = (date) => props.allowedMonths === void 0 ? false : !props.allowedMonths(date);
    const {
      focusedCellIndex,
      containerAttributes
    } = useGridKeyboardNavigation({
      rowSize: 3,
      start: 0,
      end: months.value.length,
      onSelected: (selectedIndex) => onClick(months.value[selectedIndex])
    });
    watch(focusedCellIndex, (index) => {
      hoveredIndex.value = index;
    });
    watch(hoveredIndex, (index) => {
      focusedCellIndex.value = index;
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", mergeProps({ class: "va-month-picker" }, unref(containerAttributes)), [
        (openBlock(true), createElementBlock(Fragment, null, renderList(months.value, (month, monthIndex) => {
          return openBlock(), createElementBlock("div", {
            key: monthIndex,
            class: "va-month-picker__month-wrapper",
            onMouseenter: ($event) => hoveredIndex.value = monthIndex,
            onMouseleave: _cache[0] || (_cache[0] = ($event) => hoveredIndex.value = -1)
          }, [
            createVNode(_sfc_main52, {
              "in-range": !!unref(isInRange)(month),
              selected: !!unref(isSelected)(month),
              disabled: !!isDisabled(month),
              today: !!unref(isToday)(month),
              focused: unref(hoveredIndex) === monthIndex,
              "highlight-today": __props.highlightToday,
              readonly: _ctx.$props.readonly,
              color: __props.color,
              onClick: ($event) => {
                unref(onClick)(month);
                focusedCellIndex.value = monthIndex;
              }
            }, {
              default: withCtx(() => [
                renderSlot(_ctx.$slots, "month", normalizeProps(guardReactiveProps({ monthIndex, month: __props.monthNames[monthIndex] })), () => [
                  createTextVNode(toDisplayString(__props.monthNames[monthIndex]), 1)
                ])
              ]),
              _: 2
            }, 1032, ["in-range", "selected", "disabled", "today", "focused", "highlight-today", "readonly", "color", "onClick"])
          ], 40, _hoisted_131);
        }), 128))
      ], 16);
    };
  }
});

// node_modules/vuestic-ui/dist/es/src/components/va-date-picker/components/VaYearPicker/VaYearPicker.vue_vue_type_script_setup_true_lang.js
import "D:/Github/DONGTIAN/ui/node_modules/vuestic-ui/dist/es/VaYearPicker.css";
var _sfc_main56 = defineComponent({
  ...{
    name: "VaYearPicker"
  },
  __name: "VaYearPicker",
  props: {
    modelValue: { type: [Date, Array, Object] },
    allowedYears: { type: Function, default: void 0 },
    highlightToday: { type: Boolean, default: true },
    startYear: { type: [Number, String], default: 1970 },
    mode: { type: String, default: "auto" },
    view: { type: Object, default: () => ({ type: "year" }) },
    endYear: { type: [Number, String], default: () => (/* @__PURE__ */ new Date()).getFullYear() + 50 },
    readonly: { type: Boolean, default: false },
    color: { type: String, default: "primary" }
  },
  emits: ["update:modelValue", "hover:year", "click:year"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const rootNode = shallowRef();
    const { view } = toRefs(props);
    const generateYearsArray = (start, end) => {
      const yearsCount = end - start + 1;
      return Array.from(Array(yearsCount).keys()).map((i) => createYearDate(start + i));
    };
    const startYearComputed = useNumericProp("startYear");
    const endYearComputed = useNumericProp("endYear");
    const years = computed(() => generateYearsArray(startYearComputed.value, endYearComputed.value));
    const scrollIntoYearIndex = (index) => {
      if (!rootNode.value) {
        return;
      }
      const scrollHeight = rootNode.value.scrollHeight;
      const rootNodeHeight = rootNode.value.offsetHeight;
      const currentYearOffset = scrollHeight / years.value.length * index;
      const cellSize = scrollHeight / years.value.length;
      const relativeScrollPosition = currentYearOffset - rootNode.value.scrollTop;
      if (relativeScrollPosition < 0) {
        rootNode.value.scrollTo({ top: currentYearOffset });
      } else if (relativeScrollPosition > rootNodeHeight) {
        rootNode.value.scrollTo({ top: currentYearOffset - rootNodeHeight + cellSize });
      }
    };
    const scrollIntoYearIndexCenter = (index) => {
      if (!rootNode.value) {
        return;
      }
      const scrollHeight = rootNode.value.scrollHeight;
      const rootNodeHeight = rootNode.value.offsetHeight;
      const currentYearOffset = scrollHeight / years.value.length * index;
      rootNode.value.scrollTo({ top: currentYearOffset - rootNodeHeight / 2 });
    };
    onMounted(() => {
      const currentYearIndex = years.value.findIndex((date) => date.getFullYear() === view.value.year);
      scrollIntoYearIndexCenter(currentYearIndex);
    });
    const {
      hoveredIndex,
      onClick,
      isToday,
      isSelected,
      isInRange
    } = useDatePicker("year", years, props, emit);
    const isYearDisabled = (year) => props.allowedYears === void 0 ? false : !props.allowedYears(year);
    const {
      focusedCellIndex,
      containerAttributes
    } = useGridKeyboardNavigation({
      rowSize: 1,
      start: 0,
      end: years.value.length,
      onFocusIndex: computed(() => years.value.findIndex((date) => date.getFullYear() === view.value.year)),
      onSelected: (selectedIndex) => onClick(years.value[selectedIndex])
    });
    watch(focusedCellIndex, (index) => index !== -1 && scrollIntoYearIndex(index));
    watch(focusedCellIndex, (index) => {
      hoveredIndex.value = index;
    });
    watch(hoveredIndex, (index) => {
      focusedCellIndex.value = index;
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", mergeProps({
        ref_key: "rootNode",
        ref: rootNode,
        class: "va-year-picker"
      }, unref(containerAttributes), {
        onKeydown: _cache[1] || (_cache[1] = withKeys(withModifiers(() => {
        }, ["prevent"]), ["space"]))
      }), [
        (openBlock(true), createElementBlock(Fragment, null, renderList(years.value, (year, index) => {
          return openBlock(), createBlock(_sfc_main52, {
            key: year.toString(),
            "in-range": unref(isInRange)(year),
            selected: unref(isSelected)(year),
            disabled: isYearDisabled(year),
            today: unref(isToday)(year),
            focused: unref(focusedCellIndex) === index,
            "highlight-today": __props.highlightToday,
            readonly: _ctx.$props.readonly,
            color: __props.color,
            onClick: ($event) => {
              unref(onClick)(year);
              focusedCellIndex.value = index;
            },
            onMouseenter: ($event) => hoveredIndex.value = index,
            onMouseleave: _cache[0] || (_cache[0] = ($event) => hoveredIndex.value = -1)
          }, {
            default: withCtx(() => [
              createTextVNode(toDisplayString(year.getFullYear()), 1)
            ]),
            _: 2
          }, 1032, ["in-range", "selected", "disabled", "today", "focused", "highlight-today", "readonly", "color", "onClick", "onMouseenter"]);
        }), 128))
      ], 16);
    };
  }
});

// node_modules/vuestic-ui/dist/es/src/components/va-date-picker/VaDatePicker.vue_vue_type_script_setup_true_lang.js
import "D:/Github/DONGTIAN/ui/node_modules/vuestic-ui/dist/es/VaDatePicker.css";
var _hoisted_132 = { class: "va-date-picker__picker-wrapper" };
var DEFAULT_MONTH_NAMES = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
var DEFAULT_WEEKDAY_NAMES = ["SU", "MO", "TU", "WE", "TH", "FR", "SA"];
var _sfc_main57 = defineComponent({
  ...{
    name: "VaDatePicker"
  },
  __name: "VaDatePicker",
  props: {
    ...defineChildProps({
      prevButton: VaButton,
      nextButton: VaButton,
      middleButton: VaButton
    }),
    ...useStatefulProps,
    ...useComponentPresetProp,
    ...extractComponentProps(_sfc_main54),
    ...extractComponentProps(_sfc_main53),
    ...extractComponentProps(_sfc_main55),
    ...extractComponentProps(_sfc_main56),
    modelValue: { type: [Date, Array, Object] },
    monthNames: { type: Array, default: DEFAULT_MONTH_NAMES },
    weekdayNames: { type: Array, default: DEFAULT_WEEKDAY_NAMES },
    view: { type: Object },
    type: { type: String, default: "day" },
    readonly: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
    // Colors
    color: { type: String, default: void 0 },
    weekendsColor: { type: String, default: void 0 }
  },
  emits: [
    ...useStatefulEmits,
    ...extractComponentEmits(_sfc_main54),
    ...extractComponentEmits(_sfc_main56),
    ...extractComponentEmits(_sfc_main53),
    ...extractComponentEmits(_sfc_main55)
  ],
  setup(__props, { expose: __expose, emit: __emit }) {
    const props = __props;
    useChildComponents(props);
    const emit = __emit;
    const currentPicker = ref();
    const { valueComputed } = useStateful(props, emit);
    const { syncView } = useView(props, emit, { type: props.type });
    const classComputed = computed(() => ({
      "va-date-picker_without-week-days": props.hideWeekDays,
      "va-date-picker_disabled": props.disabled
    }));
    const onDayModelValueUpdate = (modelValue) => {
      if (props.readonly) {
        return;
      }
      if (props.type === "day") {
        valueComputed.value = modelValue;
      }
    };
    const onMonthClick = (date) => {
      emit("click:month", date);
      const year = date.getFullYear();
      const month = date.getMonth();
      if (props.type !== "month") {
        syncView.value = { type: "day", year, month };
      }
    };
    const onMonthModelValueUpdate = (modelValue) => {
      if (props.type === "month") {
        valueComputed.value = modelValue;
      }
    };
    const onYearClick = (date) => {
      emit("click:year", date);
      const year = date.getFullYear();
      if (props.type !== "year") {
        syncView.value = { type: "month", year, month: syncView.value.month };
      }
    };
    const onYearModelValueUpdate = (modelValue) => {
      if (props.type === "year") {
        valueComputed.value = modelValue;
      }
    };
    const { colorsToCSSVariable } = useColors();
    const styleComputed = computed(() => ({
      ...colorsToCSSVariable({
        color: props.color,
        "weekends-color": props.weekendsColor
      }, "va-date-picker")
    }));
    const focusCurrentPicker = () => {
      var _a2;
      return (_a2 = currentPicker.value) == null ? void 0 : _a2.$el.focus();
    };
    watch(syncView, (newValue, prevValue) => {
      if (newValue.type === prevValue.type) {
        return;
      }
      nextTick(focusCurrentPicker);
    });
    const isPickerReadonly = (pickerName) => {
      return props.readonly && props.type === pickerName;
    };
    const dayPickerProps = filterComponentProps(extractComponentProps(_sfc_main53));
    const headerProps = filterComponentProps(extractComponentProps(_sfc_main54));
    const monthPickerProps = filterComponentProps(extractComponentProps(_sfc_main55));
    const yearPickerProps = filterComponentProps(extractComponentProps(_sfc_main56));
    __expose({
      focus: focusCurrentPicker,
      focusCurrentPicker
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: normalizeClass(["va-date-picker", classComputed.value]),
        style: normalizeStyle(styleComputed.value)
      }, [
        createVNode(_sfc_main54, mergeProps(unref(headerProps), {
          view: unref(syncView),
          "onUpdate:view": _cache[0] || (_cache[0] = ($event) => isRef(syncView) ? syncView.value = $event : null)
        }), createSlots({ _: 2 }, [
          renderList(_ctx.$slots, (_, name) => {
            return {
              name,
              fn: withCtx((bind) => [
                renderSlot(_ctx.$slots, name, normalizeProps(guardReactiveProps(bind)))
              ])
            };
          })
        ]), 1040, ["view"]),
        createBaseVNode("div", _hoisted_132, [
          unref(syncView).type === "day" ? (openBlock(), createBlock(_sfc_main53, mergeProps({
            key: 0,
            ref_key: "currentPicker",
            ref: currentPicker
          }, unref(dayPickerProps), {
            "model-value": unref(valueComputed),
            view: unref(syncView),
            readonly: _ctx.$props.disabled || isPickerReadonly("day"),
            "onUpdate:modelValue": onDayModelValueUpdate,
            "onHover:day": _cache[1] || (_cache[1] = (value) => _ctx.$emit("hover:day", value)),
            "onClick:day": _cache[2] || (_cache[2] = (value) => _ctx.$emit("click:day", value))
          }), createSlots({ _: 2 }, [
            renderList(_ctx.$slots, (_, name) => {
              return {
                name,
                fn: withCtx((bind) => [
                  renderSlot(_ctx.$slots, name, normalizeProps(guardReactiveProps(bind)))
                ])
              };
            })
          ]), 1040, ["model-value", "view", "readonly"])) : createCommentVNode("", true),
          unref(syncView).type === "month" ? (openBlock(), createBlock(_sfc_main55, mergeProps({
            key: 1,
            ref_key: "currentPicker",
            ref: currentPicker
          }, unref(monthPickerProps), {
            view: unref(syncView),
            "model-value": unref(valueComputed),
            readonly: _ctx.$props.disabled || isPickerReadonly("month"),
            "onUpdate:modelValue": onMonthModelValueUpdate,
            "onHover:month": _cache[3] || (_cache[3] = (value) => _ctx.$emit("hover:month", value)),
            "onClick:month": onMonthClick
          }), createSlots({ _: 2 }, [
            renderList(_ctx.$slots, (_, name) => {
              return {
                name,
                fn: withCtx((bind) => [
                  renderSlot(_ctx.$slots, name, normalizeProps(guardReactiveProps(bind)))
                ])
              };
            })
          ]), 1040, ["view", "model-value", "readonly"])) : createCommentVNode("", true),
          unref(syncView).type === "year" ? (openBlock(), createBlock(_sfc_main56, mergeProps({
            key: 2,
            ref_key: "currentPicker",
            ref: currentPicker
          }, unref(yearPickerProps), {
            view: unref(syncView),
            "model-value": unref(valueComputed),
            readonly: _ctx.$props.disabled || isPickerReadonly("year"),
            "onHover:year": _cache[4] || (_cache[4] = (value) => _ctx.$emit("hover:year", value)),
            "onUpdate:modelValue": onYearModelValueUpdate,
            "onClick:year": onYearClick
          }), createSlots({ _: 2 }, [
            renderList(_ctx.$slots, (_, name) => {
              return {
                name,
                fn: withCtx((bind) => [
                  renderSlot(_ctx.$slots, name, normalizeProps(guardReactiveProps(bind)))
                ])
              };
            })
          ]), 1040, ["view", "model-value", "readonly"])) : createCommentVNode("", true)
        ])
      ], 6);
    };
  }
});

// node_modules/vuestic-ui/dist/es/src/composables/useDropdownable.js
var VaDropdownProps2 = extractComponentProps(
  VaDropdown,
  ["innerAnchorSelector", "stateful", "keyboardNavigation", "modelValue"]
);
var useDropdownableProps = {
  ...VaDropdownProps2,
  modelValue: {},
  /**
   * Close dropdown on value updated.
   * @default null - behavior controlled by component
   */
  closeOnChange: { type: Boolean, default: null },
  isOpen: { type: Boolean, default: void 0 }
};
var useDropdownableEmits = ["update:isOpen"];
var useDropdownable = function(props, emit, options = {}) {
  const [isOpenSync] = useSyncProp("isOpen", props, emit, false);
  const doWatch = computed(() => props.closeOnChange !== null ? props.closeOnChange : unref(options.defaultCloseOnValueUpdate || false));
  watch(() => props.modelValue, () => {
    if (doWatch.value) {
      isOpenSync.value = false;
    }
  });
  return {
    dropdownProps: filterComponentProps(VaDropdownProps2),
    isOpenSync
  };
};

// node_modules/vuestic-ui/dist/es/src/components/va-date-input/VaDateInput.vue_vue_type_script_setup_true_lang.js
import "D:/Github/DONGTIAN/ui/node_modules/vuestic-ui/dist/es/VaDateInput.css";
var VaInputWrapperPropsDeclaration = extractComponentProps(VaInputWrapper, ["focused", "maxLength", "counterValue"]);
var VaDatePickerPropsDeclaration = extractComponentProps(_sfc_main57);
var _sfc_main58 = defineComponent({
  ...{
    name: "VaDateInput"
  },
  __name: "VaDateInput",
  props: {
    ...useDropdownableProps,
    ...useClearableProps,
    ...VaInputWrapperPropsDeclaration,
    ...VaDatePickerPropsDeclaration,
    ...useValidationProps,
    ...useComponentPresetProp,
    clearValue: { type: void 0, default: void 0 },
    modelValue: { type: [Date, Array, Object, String, Number] },
    resetOnClose: { type: Boolean, default: true },
    closeOnContentClick: { type: Boolean, default: false },
    offset: { ...useDropdownableProps.offset, default: () => [2, 0] },
    format: { type: Function },
    formatDate: { type: Function, default: (d) => d.toLocaleDateString() },
    /** Force model value to string instead of date */
    formatValue: { type: Function },
    parse: { type: Function },
    parseDate: { type: Function },
    delimiter: { type: String, default: ", " },
    rangeDelimiter: { type: String, default: " ~ " },
    manualInput: { type: Boolean, default: false },
    color: { type: String, default: "primary" },
    leftIcon: { type: Boolean, default: false },
    icon: { type: String, default: "va-calendar" },
    ariaToggleDropdownLabel: useTranslationProp("$t:toggleDropdown"),
    ariaResetLabel: useTranslationProp("$t:resetDate"),
    ariaSelectedDateLabel: useTranslationProp("$t:selectedDate")
  },
  emits: [
    ...useFocusEmits,
    ...extractComponentEmits(_sfc_main57),
    ...useClearableEmits,
    ...useValidationEmits,
    ...useStatefulEmits,
    ...useDropdownableEmits,
    "update:text"
  ],
  setup(__props, { expose: __expose, emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const input = shallowRef();
    const datePicker = ref();
    const { resetOnClose } = toRefs(props);
    const { trapFocusIn, freeFocus } = useTrapFocus();
    const trapFocus = () => {
      const el = unwrapEl(datePicker.value);
      if (!el) {
        freeFocus();
        return;
      }
      trapFocusIn(el);
    };
    watch([datePicker], () => {
      trapFocus();
    });
    const { valueComputed: statefulValue } = useStateful(props, emit);
    const { isOpenSync, dropdownProps } = useDropdownable(props, emit, {
      defaultCloseOnValueUpdate: computed(() => {
        if (Array.isArray(valueComputed.value)) {
          return false;
        }
        if (isRange3(valueComputed.value) && valueComputed.value.end === null) {
          return false;
        }
        return true;
      })
    });
    const isRangeModelValueGuardDisabled = computed(() => !resetOnClose.value);
    const {
      valueComputed,
      reset: resetInvalidRange
    } = useRangeModelValueGuard(statefulValue, isRangeModelValueGuardDisabled);
    watch(isOpenSync, (isOpened) => {
      if (!isOpened && !isRangeModelValueGuardDisabled.value) {
        resetInvalidRange();
      }
    });
    const { isFocused: isInputFocused, focus, blur, onFocus: focusListener, onBlur: blurListener } = useFocus(input);
    const isPickerFocused = useFocusDeep(datePicker);
    const dateOrNothing = (date) => date ? props.formatDate(date) : "...";
    const { parseDateInputValue, isValid } = useDateParser(props);
    watch(valueComputed, () => {
      isValid.value = true;
    });
    const modelValueToString = (value) => {
      if (props.format) {
        return props.format(valueComputed.value);
      }
      if (isDates(value)) {
        return value.map((d) => props.formatDate(d)).join(props.delimiter);
      }
      if (isSingleDate2(value)) {
        return props.formatDate(value);
      }
      if (isRange3(value)) {
        return dateOrNothing(value.start) + props.rangeDelimiter + dateOrNothing(value.end);
      }
      if (value === null || value === void 0) {
        return "";
      }
      return "";
    };
    const {
      text,
      normalized: valueWithoutText
    } = useDateInputModelValue(valueComputed, toRef(props, "mode"), parseDateInputValue, modelValueToString, props.formatValue);
    const valueText = computed(() => {
      if (!isValid.value) {
        return "";
      }
      if (!valueComputed.value) {
        if (!props.clearValue) {
          return "";
        }
        return modelValueToString(props.clearValue);
      }
      return text.value;
    });
    const onInputTextChanged = ({ target }) => {
      if (props.disabled) {
        return;
      }
      const inputValue = target.value;
      if (isValid.value) {
        valueComputed.value = inputValue === "" ? props.clearValue : parseDateInputValue(inputValue);
      }
    };
    const reset = () => withoutValidation(() => {
      statefulValue.value = props.clearValue;
      emit("clear");
      resetValidation();
    });
    const hideAndFocus = () => {
      isOpenSync.value = false;
      focus();
    };
    const focusDatePicker = () => {
      nextTick(() => {
        var _a2;
        return (_a2 = datePicker.value) == null ? void 0 : _a2.focusCurrentPicker();
      });
    };
    const focusInputOrPicker = () => {
      isOpenSync.value ? focusDatePicker() : focus();
    };
    const checkProhibitedDropdownOpening = (e) => {
      if (isOpenSync.value) {
        return false;
      }
      if (props.disabled || props.readonly) {
        return true;
      }
      if (e === void 0) {
        return false;
      }
      return props.manualInput && (e == null ? void 0 : e.code) !== "Space";
    };
    const toggleDropdown = (event) => {
      if (checkProhibitedDropdownOpening(event instanceof KeyboardEvent ? event : void 0)) {
        return;
      }
      isOpenSync.value = !isOpenSync.value;
      nextTick(focusInputOrPicker);
    };
    const showDropdown = () => {
      if (props.disabled || props.readonly) {
        return;
      }
      isOpenSync.value = true;
      nextTick(focusDatePicker);
    };
    const {
      isDirty,
      isTouched,
      computedError,
      computedErrorMessages,
      listeners,
      validationAriaAttributes,
      validate,
      withoutValidation,
      resetValidation
    } = useValidation(props, emit, { reset, focus, value: valueComputed });
    watch(isOpenSync, (isOpen) => {
      if (!isOpen) {
        isTouched.value = true;
      }
    });
    const hasError = computed(() => !isValid.value && valueComputed.value !== props.clearValue || computedError.value);
    const slots = useSlots();
    const filterSlots = computed(() => {
      const slotsWithIcons = [
        props.leftIcon && "prependInner",
        (!props.leftIcon || props.clearable) && "icon"
      ];
      return Object.keys(slots).filter((slot) => !slotsWithIcons.includes(slot));
    });
    const {
      canBeCleared,
      clearIconProps,
      onFocus,
      onBlur
    } = useClearable(props, valueComputed);
    const cursorStyleComputed = computed(() => {
      if (props.disabled) {
        return {};
      }
      if (props.manualInput) {
        return { cursor: "text" };
      }
      return { cursor: "pointer" };
    });
    const iconTabindexComputed = computed(() => {
      if (!props.manualInput) {
        return -1;
      }
      return props.disabled || props.readonly ? -1 : 0;
    });
    const iconProps = computed(() => ({
      role: iconTabindexComputed.value === 0 ? "button" : "none",
      ariaHidden: iconTabindexComputed.value === -1,
      name: props.icon,
      color: "secondary",
      tabindex: iconTabindexComputed.value
    }));
    const filteredWrapperProps = filterComponentProps(VaInputWrapperPropsDeclaration);
    const computedInputWrapperProps = computed(() => ({
      ...filteredWrapperProps.value,
      focused: isInputFocused.value || isPickerFocused.value,
      error: hasError.value,
      errorMessages: computedErrorMessages.value,
      readonly: props.readonly || !props.manualInput
    }));
    const computedInputListeners = computed(() => ({
      focus: () => {
        if (props.disabled) {
          return;
        }
        focusListener();
        if (props.readonly) {
          return;
        }
        onFocus();
      },
      blur: () => {
        if (props.disabled) {
          return;
        }
        blurListener();
        if (props.readonly) {
          return;
        }
        onBlur();
        listeners.onBlur();
      }
    }));
    const { tp } = useTranslation();
    const attrs = useAttrs();
    const inputAttributesComputed = computed(() => ({
      readonly: props.readonly || !props.manualInput,
      disabled: props.disabled,
      tabindex: props.disabled ? -1 : 0,
      placeholder: props.placeholder,
      value: valueText.value,
      ariaLabel: props.label || tp(props.ariaSelectedDateLabel),
      ariaRequired: props.requiredMark,
      ariaDisabled: props.disabled,
      ariaReadOnly: props.readonly,
      ...validationAriaAttributes.value,
      ...omit(attrs, ["class", "style"])
    }));
    const dropdownPropsComputed = computed(() => ({
      ...dropdownProps.value,
      stateful: false,
      innerAnchorSelector: ".va-input-wrapper__field",
      trigger: ["click", "right-click", "enter", "space"]
    }));
    const inputWrapperProps = computedInputWrapperProps;
    const inputListeners = computedInputListeners;
    const datePickerProps = filterComponentProps(VaDatePickerPropsDeclaration);
    __expose({
      valueText,
      valueWithoutText,
      valueDate: valueWithoutText,
      focus,
      blur,
      reset,
      validate,
      showDropdown,
      hideAndFocus,
      toggleDropdown,
      focusDatePicker,
      isDirty,
      isTouched
    });
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(VaDropdown), mergeProps({
        modelValue: unref(isOpenSync),
        "onUpdate:modelValue": _cache[9] || (_cache[9] = ($event) => isRef(isOpenSync) ? isOpenSync.value = $event : null),
        class: ["va-date-input", _ctx.$attrs.class],
        style: _ctx.$attrs.style
      }, dropdownPropsComputed.value, {
        onOpen: focusDatePicker,
        role: "none"
      }), {
        anchor: withCtx(() => [
          renderSlot(_ctx.$slots, "input", normalizeProps(guardReactiveProps({ valueText: valueText.value, inputAttributes: inputAttributesComputed.value, inputWrapperProps: unref(inputWrapperProps), inputListeners: unref(inputListeners) })), () => [
            createVNode(unref(VaInputWrapper), mergeProps({
              class: "va-date-input__anchor",
              style: cursorStyleComputed.value
            }, unref(inputWrapperProps), toHandlers(unref(inputListeners)), {
              "model-value": valueText.value,
              onChange: onInputTextChanged
            }), createSlots({
              icon: withCtx(() => [
                unref(canBeCleared) ? (openBlock(), createBlock(unref(VaIcon), mergeProps({
                  key: 0,
                  "aria-label": unref(tp)(_ctx.$props.ariaResetLabel)
                }, { ...iconProps.value, ...unref(clearIconProps) }, {
                  onClick: withModifiers(reset, ["stop"]),
                  onKeydown: [
                    withKeys(withModifiers(reset, ["stop"]), ["enter"]),
                    withKeys(withModifiers(reset, ["stop"]), ["space"])
                  ]
                }), null, 16, ["aria-label", "onKeydown"])) : createCommentVNode("", true),
                !_ctx.$props.leftIcon && _ctx.$props.icon ? (openBlock(), createBlock(unref(VaIcon), mergeProps({
                  key: 1,
                  "aria-label": unref(tp)(_ctx.$props.ariaToggleDropdownLabel)
                }, iconProps.value), null, 16, ["aria-label"])) : createCommentVNode("", true)
              ]),
              _: 2
            }, [
              renderList(filterSlots.value, (name) => {
                return {
                  name,
                  fn: withCtx((slotScope) => [
                    renderSlot(_ctx.$slots, name, normalizeProps(guardReactiveProps(slotScope)))
                  ])
                };
              }),
              _ctx.$slots.prependInner || _ctx.$props.leftIcon ? {
                name: "prependInner",
                fn: withCtx((slotScope) => [
                  renderSlot(_ctx.$slots, "prependInner", normalizeProps(guardReactiveProps(slotScope))),
                  _ctx.$props.leftIcon ? (openBlock(), createBlock(unref(VaIcon), mergeProps({
                    key: 0,
                    "aria-label": unref(tp)(_ctx.$props.ariaToggleDropdownLabel)
                  }, iconProps.value), null, 16, ["aria-label"])) : createCommentVNode("", true)
                ]),
                key: "0"
              } : void 0
            ]), 1040, ["style", "model-value"])
          ])
        ]),
        default: withCtx(() => [
          createVNode(unref(VaDropdownContent), {
            class: "va-date-input__dropdown-content",
            onKeydown: _cache[8] || (_cache[8] = withKeys(($event) => unref(focus)(), ["esc"])),
            role: "dialog"
          }, {
            default: withCtx(() => [
              createVNode(_sfc_main57, mergeProps({
                ref_key: "datePicker",
                ref: datePicker
              }, unref(datePickerProps), {
                modelValue: unref(valueWithoutText),
                "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => isRef(valueWithoutText) ? valueWithoutText.value = $event : null),
                "onClick:day": _cache[1] || (_cache[1] = ($event) => _ctx.$emit("click:day", $event)),
                "onClick:month": _cache[2] || (_cache[2] = ($event) => _ctx.$emit("click:month", $event)),
                "onClick:year": _cache[3] || (_cache[3] = ($event) => _ctx.$emit("click:year", $event)),
                "onHover:day": _cache[4] || (_cache[4] = ($event) => _ctx.$emit("hover:day", $event)),
                "onHover:month": _cache[5] || (_cache[5] = ($event) => _ctx.$emit("hover:month", $event)),
                "onHover:year": _cache[6] || (_cache[6] = ($event) => _ctx.$emit("hover:year", $event)),
                "onUpdate:view": _cache[7] || (_cache[7] = ($event) => {
                  _ctx.$nextTick(() => trapFocus());
                  _ctx.$emit("update:view", $event);
                })
              }), createSlots({ _: 2 }, [
                renderList(_ctx.$slots, (_, name) => {
                  return {
                    name,
                    fn: withCtx((bind) => [
                      renderSlot(_ctx.$slots, name, normalizeProps(guardReactiveProps(bind)))
                    ])
                  };
                })
              ]), 1040, ["modelValue"])
            ]),
            _: 3
          })
        ]),
        _: 3
      }, 16, ["modelValue", "class", "style"]);
    };
  }
});

// node_modules/vuestic-ui/dist/es/src/components/va-date-input/index.js
var VaDateInput = withConfigTransport$1(_sfc_main58);

// node_modules/vuestic-ui/dist/es/src/components/va-date-picker/index.js
var VaDatePicker = withConfigTransport$1(_sfc_main57);

// node_modules/vuestic-ui/dist/es/src/components/va-divider/VaDivider.vue_vue_type_script_setup_true_lang.js
import "D:/Github/DONGTIAN/ui/node_modules/vuestic-ui/dist/es/VaDivider.css";
var _hoisted_133 = ["aria-orientation"];
var _hoisted_215 = {
  key: 0,
  class: "va-divider__text"
};
var prefixClass = "va-divider";
var _sfc_main59 = defineComponent({
  ...{
    name: "VaDivider"
  },
  __name: "VaDivider",
  props: {
    ...useComponentPresetProp,
    vertical: { type: Boolean, default: false },
    dashed: { type: Boolean, default: false },
    inset: { type: Boolean, default: false },
    orientation: {
      type: String,
      default: "center",
      validator: (value) => ["left", "right", "center"].includes(value)
    },
    color: { type: String, default: "backgroundBorder" }
  },
  setup(__props) {
    const props = __props;
    const { getColor } = useColors();
    const colorComputed = computed(() => getColor(props.color));
    const slots = useSlots();
    const hasSlot = computed(() => !!slots.default);
    const classComputed = computed(() => ({
      [`${prefixClass}--vertical`]: props.vertical,
      [`${prefixClass}--inset`]: props.inset,
      [`${prefixClass}--${props.orientation}`]: props.orientation && !props.vertical,
      [`${prefixClass}--dashed`]: props.dashed
    }));
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        role: "separator",
        class: normalizeClass(["va-divider", classComputed.value]),
        "aria-orientation": __props.vertical ? "vertical" : "horizontal",
        "aria-hidden": true,
        style: normalizeStyle(`--va-color-computed: ${String(colorComputed.value)}`)
      }, [
        hasSlot.value && !__props.vertical ? (openBlock(), createElementBlock("div", _hoisted_215, [
          renderSlot(_ctx.$slots, "default")
        ])) : createCommentVNode("", true)
      ], 14, _hoisted_133);
    };
  }
});

// node_modules/vuestic-ui/dist/es/src/components/va-divider/index.js
var VaDivider = withConfigTransport$1(_sfc_main59);

// node_modules/vuestic-ui/dist/es/src/components/va-file-upload/types.js
var VaFileUploadKey = Symbol("VaFileUpload");

// node_modules/vuestic-ui/dist/es/src/components/va-list/VaList.vue_vue_type_script_setup_true_lang.js
import "D:/Github/DONGTIAN/ui/node_modules/vuestic-ui/dist/es/VaList.css";
var _sfc_main60 = defineComponent({
  ...{
    name: "VaList"
  },
  __name: "VaList",
  props: {
    ...useComponentPresetProp,
    fit: { type: Boolean, default: false }
  },
  setup(__props) {
    const props = __props;
    const computedClass = computed(() => ({ "va-list--fit": props.fit }));
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: normalizeClass(["va-list", computedClass.value]),
        role: "list"
      }, [
        renderSlot(_ctx.$slots, "default")
      ], 2);
    };
  }
});

// node_modules/vuestic-ui/dist/es/src/components/va-list/VaListItem.vue_vue_type_script_setup_true_lang.js
import "D:/Github/DONGTIAN/ui/node_modules/vuestic-ui/dist/es/VaListItem.css";
var _sfc_main61 = defineComponent({
  ...{
    name: "VaListItem"
  },
  __name: "VaListItem",
  props: {
    ...useRouterLinkProps,
    ...useComponentPresetProp,
    tag: { type: String, default: "div" },
    disabled: { type: Boolean, default: false }
  },
  emits: ["focus", "click"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const tabIndexComputed = computed(() => props.disabled ? -1 : 0);
    const computedClass = useBem("va-list-item", () => ({
      ...pick(props, ["disabled"])
    }));
    const {
      tagComputed,
      hrefComputed
    } = useRouterLink(props);
    return (_ctx, _cache) => {
      return openBlock(), createBlock(resolveDynamicComponent(unref(tagComputed)), {
        class: normalizeClass(["va-list-item", unref(computedClass)]),
        role: "listitem",
        href: unref(hrefComputed),
        target: _ctx.target,
        to: _ctx.to,
        replace: _ctx.replace,
        exact: _ctx.exact,
        "active-class": _ctx.activeClass,
        "exact-active-class": _ctx.exactActiveClass,
        tabindex: tabIndexComputed.value
      }, {
        default: withCtx(() => [
          createBaseVNode("div", {
            class: "va-list-item__inner",
            onClick: _cache[0] || (_cache[0] = ($event) => _ctx.$emit("click")),
            onFocus: _cache[1] || (_cache[1] = ($event) => _ctx.$emit("focus"))
          }, [
            renderSlot(_ctx.$slots, "default")
          ], 32)
        ]),
        _: 3
      }, 8, ["href", "target", "to", "replace", "exact", "active-class", "exact-active-class", "class", "tabindex"]);
    };
  }
});

// node_modules/vuestic-ui/dist/es/src/components/va-list/VaListLabel.vue_vue_type_script_setup_true_lang.js
import "D:/Github/DONGTIAN/ui/node_modules/vuestic-ui/dist/es/VaListLabel.css";
var _sfc_main62 = defineComponent({
  ...{
    name: "VaListLabel"
  },
  __name: "VaListLabel",
  props: {
    ...useComponentPresetProp,
    color: { type: String, default: "primary" }
  },
  setup(__props) {
    const props = __props;
    const { getColor } = useColors();
    const computedStyle = computed(() => ({
      color: getColor(props.color)
    }));
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: "va-list-label",
        style: normalizeStyle(computedStyle.value)
      }, [
        renderSlot(_ctx.$slots, "default")
      ], 4);
    };
  }
});

// node_modules/vuestic-ui/dist/es/src/components/va-list/VaListItemLabel.vue_vue_type_script_setup_true_lang.js
import "D:/Github/DONGTIAN/ui/node_modules/vuestic-ui/dist/es/VaListItemLabel.css";
var _sfc_main63 = defineComponent({
  ...{
    name: "VaListItemLabel"
  },
  __name: "VaListItemLabel",
  props: {
    ...useComponentPresetProp,
    caption: { type: Boolean, default: false },
    lines: { type: [Number, String], default: 1 }
  },
  setup(__props) {
    const props = __props;
    const linesComputed = useNumericProp("lines");
    const computedClass = computed(() => ({ "va-list-item-label--caption": props.caption }));
    const computedStyle = computed(() => ({ "-webkit-line-clamp": linesComputed.value }));
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: normalizeClass(["va-list-item-label", computedClass.value]),
        style: normalizeStyle(computedStyle.value)
      }, [
        renderSlot(_ctx.$slots, "default")
      ], 6);
    };
  }
});

// node_modules/vuestic-ui/dist/es/src/components/va-list/VaListItemSection.vue_vue_type_script_setup_true_lang.js
import "D:/Github/DONGTIAN/ui/node_modules/vuestic-ui/dist/es/VaListItemSection.css";
var _sfc_main64 = defineComponent({
  ...{
    name: "VaListItemSection"
  },
  __name: "VaListItemSection",
  props: {
    ...useComponentPresetProp,
    icon: { type: Boolean, default: false },
    avatar: { type: Boolean, default: false }
  },
  setup(__props) {
    const props = __props;
    const computedClass = computed(() => ({
      "va-list-item-section--main": !props.icon && !props.avatar,
      "va-list-item-section--icon": props.icon,
      "va-list-item-section--avatar": props.avatar
    }));
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: normalizeClass(["va-list-item-section", computedClass.value])
      }, [
        renderSlot(_ctx.$slots, "default")
      ], 2);
    };
  }
});

// node_modules/vuestic-ui/dist/es/src/components/va-list/VaListSeparator.vue_vue_type_script_setup_true_lang.js
import "D:/Github/DONGTIAN/ui/node_modules/vuestic-ui/dist/es/VaListSeparator.css";
var _sfc_main65 = defineComponent({
  ...{
    name: "VaListSeparator"
  },
  __name: "VaListSeparator",
  props: {
    ...useComponentPresetProp,
    fit: { type: Boolean, default: false },
    spaced: { type: Boolean, default: false }
  },
  setup(__props) {
    const props = __props;
    const computedClass = computed(() => ({
      "va-list-separator--offset": !props.fit,
      "va-list-separator--spaced": props.spaced
    }));
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        "aria-hidden": "true",
        class: normalizeClass(["va-list-separator", computedClass.value])
      }, null, 2);
    };
  }
});

// node_modules/vuestic-ui/dist/es/src/components/va-list/index.js
var VaListItem = withConfigTransport$1(_sfc_main61);
var VaListLabel = withConfigTransport$1(_sfc_main62);
var VaListItemLabel = withConfigTransport$1(_sfc_main63);
var VaListItemSection = withConfigTransport$1(_sfc_main64);
var VaListSeparator = withConfigTransport$1(_sfc_main65);
var VaList = withConfigTransport$1(_sfc_main60);

// node_modules/vuestic-ui/dist/es/src/components/va-progress-bar/VaProgressBar.vue_vue_type_script_setup_true_lang.js
import "D:/Github/DONGTIAN/ui/node_modules/vuestic-ui/dist/es/VaProgressBar.css";
var _hoisted_134 = {
  key: 0,
  class: "va-progress-bar__info"
};
var _sfc_main66 = defineComponent({
  ...{
    name: "VaProgressBar"
  },
  __name: "VaProgressBar",
  props: {
    ...useComponentPresetProp,
    modelValue: { type: [Number, String], default: 0 },
    indeterminate: { type: Boolean, default: false },
    color: { type: String, default: "primary" },
    size: {
      type: [Number, String],
      default: "medium"
    },
    buffer: { type: [Number, String], default: 100 },
    rounded: { type: Boolean, default: true },
    reverse: { type: Boolean, default: false },
    contentInside: { type: Boolean, default: false },
    showPercent: { type: Boolean, default: false },
    max: { type: [Number, String], default: 100 },
    ariaLabel: useTranslationProp("$t:progressState")
  },
  setup(__props) {
    const props = __props;
    const { getColor, getHoverColor: getHoverColor2 } = useColors();
    const colorComputed = computed(() => getColor(props.color));
    const { textColorComputed } = useTextColor(colorComputed);
    const isTextSize = computed(() => typeof props.size === "string" && ["small", "medium", "large"].includes(props.size));
    const getCSSHeight = () => {
      if (typeof props.size === "number") {
        return `${props.size}px`;
      }
      if (isTextSize.value) {
        return;
      }
      return props.size;
    };
    const { tp } = useTranslation();
    const progressBarValue = computed(() => 100 / Number(props.max) * Number(props.modelValue));
    const rootClass = computed(() => ({
      "va-progress-bar--square": !props.rounded,
      [`va-progress-bar--${props.size}`]: isTextSize.value
    }));
    const rooStyle = computed(() => ({
      "--va-progress-bar-color": colorComputed.value,
      "--va-progress-bar-background-color": getHoverColor2(colorComputed.value)
    }));
    const wrapperStyle = computed(() => ({
      height: getCSSHeight()
    }));
    const bufferStyle = computed(() => ({
      width: `${props.indeterminate ? 100 : clamp(Number(props.buffer), 0, 100)}%`,
      color: textColorComputed.value,
      [props.reverse ? "right" : "left"]: 0
    }));
    const progressStyle = computed(() => ({
      marginLeft: props.reverse ? "auto" : void 0,
      width: `${clamp(progressBarValue.value, 0, 100)}%`
    }));
    const intermediateStyle = computed(() => ({
      animationDirection: props.reverse ? "reverse" : "normal"
    }));
    const ariaAttributesComputed = computed(() => ({
      role: "progressbar",
      "aria-label": tp(props.ariaLabel),
      "aria-valuenow": !props.indeterminate ? props.modelValue : void 0
    }));
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", mergeProps({
        class: ["va-progress-bar", rootClass.value],
        style: rooStyle.value
      }, ariaAttributesComputed.value), [
        !_ctx.$props.contentInside ? (openBlock(), createElementBlock("div", _hoisted_134, [
          renderSlot(_ctx.$slots, "default", normalizeProps(guardReactiveProps({ value: _ctx.$props.modelValue })), () => [
            _ctx.$props.showPercent ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
              createTextVNode(toDisplayString(_ctx.$props.modelValue) + "% ", 1)
            ], 64)) : createCommentVNode("", true)
          ])
        ])) : createCommentVNode("", true),
        createBaseVNode("div", {
          class: "va-progress-bar__wrapper",
          style: normalizeStyle(wrapperStyle.value)
        }, [
          createBaseVNode("div", {
            class: "va-progress-bar__buffer",
            style: normalizeStyle(bufferStyle.value)
          }, [
            _ctx.$props.contentInside ? renderSlot(_ctx.$slots, "default", normalizeProps(mergeProps({ key: 0 }, { value: _ctx.$props.modelValue })), () => [
              _ctx.$props.showPercent ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
                createTextVNode(toDisplayString(_ctx.$props.modelValue) + "% ", 1)
              ], 64)) : createCommentVNode("", true)
            ]) : createCommentVNode("", true)
          ], 4),
          __props.indeterminate ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
            createBaseVNode("div", {
              class: "va-progress-bar__progress--indeterminate-start",
              style: normalizeStyle(intermediateStyle.value)
            }, null, 4),
            createBaseVNode("div", {
              class: "va-progress-bar__progress--indeterminate-end",
              style: normalizeStyle(intermediateStyle.value)
            }, null, 4)
          ], 64)) : (openBlock(), createElementBlock("div", {
            key: 1,
            class: "va-progress-bar__progress",
            style: normalizeStyle(progressStyle.value)
          }, null, 4))
        ], 4)
      ], 16);
    };
  }
});

// node_modules/vuestic-ui/dist/es/src/components/va-progress-bar/index.js
var VaProgressBar = withConfigTransport$1(_sfc_main66);

// node_modules/vuestic-ui/dist/es/src/composables/useStrictInject.js
var useStrictInject = (injectionSymbol, errorMessage) => {
  const strictInjection = inject(injectionSymbol);
  if (!strictInjection) {
    throw new Error(errorMessage);
  }
  return strictInjection;
};

// node_modules/vuestic-ui/dist/es/src/components/va-file-upload/VaFileUploadUndo/VaFileUploadUndo.vue_vue_type_script_setup_true_lang.js
import "D:/Github/DONGTIAN/ui/node_modules/vuestic-ui/dist/es/VaFileUploadUndo.css";
var _hoisted_135 = { class: "va-file-upload-undo__text" };
var INJECTION_ERROR_MESSAGE = "The VaFileUploadUndo component should be used in the context of VaFileUpload component";
var _sfc_main67 = defineComponent({
  ...{
    name: "VaFileUploadUndo"
  },
  __name: "VaFileUploadUndo",
  props: {
    vertical: { type: Boolean, default: false }
  },
  emits: ["recover"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const progress = ref(100);
    const {
      undoDuration,
      undoButtonText,
      deletedFileMessage
    } = useStrictInject(VaFileUploadKey, INJECTION_ERROR_MESSAGE);
    const computedClasses = useBem("va-file-upload-undo", () => ({
      vertical: props.vertical
    }));
    const undoDurationStyle = computed(() => `${undoDuration.value ?? 0}ms`);
    onMounted(() => {
      const timer = setTimeout(() => {
        progress.value = 0;
        clearTimeout(timer);
      }, 0);
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock(Fragment, null, [
        createVNode(unref(VaProgressBar), {
          "model-value": progress.value,
          rounded: false,
          class: "va-file-upload-undo-progress-bar",
          style: normalizeStyle(`--va-undo-duration-style: ${String(undoDurationStyle.value)}`)
        }, null, 8, ["model-value", "style"]),
        createBaseVNode("div", {
          class: normalizeClass(["va-file-upload-undo", unref(computedClasses)]),
          style: normalizeStyle(`--va-undo-duration-style: ${String(undoDurationStyle.value)}`)
        }, [
          createBaseVNode("span", _hoisted_135, toDisplayString(unref(deletedFileMessage)), 1),
          createVNode(unref(VaButton), {
            class: "va-file-upload-undo__button",
            "aria-label": unref(undoButtonText),
            size: "small",
            outline: "",
            onClick: _cache[0] || (_cache[0] = ($event) => _ctx.$emit("recover"))
          }, {
            default: withCtx(() => [
              createTextVNode(toDisplayString(unref(undoButtonText)), 1)
            ]),
            _: 1
          }, 8, ["aria-label"])
        ], 6)
      ], 64);
    };
  }
});

// node_modules/vuestic-ui/dist/es/src/components/va-file-upload/VaFileUploadUndo/index.js
var VaFileUploadUndo = withConfigTransport$1(_sfc_main67);

// node_modules/vuestic-ui/dist/es/src/components/va-file-upload/VaFileUploadListItem/VaFileUploadListItem.vue_vue_type_script_setup_true_lang.js
import "D:/Github/DONGTIAN/ui/node_modules/vuestic-ui/dist/es/VaFileUploadListItem.css";
var _hoisted_136 = { class: "va-file-upload-list-item__content" };
var _hoisted_216 = {
  key: 0,
  class: "va-file-upload-list-item__name"
};
var _hoisted_310 = { class: "va-file-upload-list-item__size" };
var INJECTION_ERROR_MESSAGE2 = "The VaFileUploadListItem component should be used in the context of VaFileUpload component";
var _sfc_main68 = defineComponent({
  ...{
    name: "VaFileUploadListItem"
  },
  __name: "VaFileUploadListItem",
  props: {
    file: { type: Object, default: null },
    color: { type: String, default: "success" },
    ariaRemoveFileLabel: useTranslationProp("$t:removeFile")
  },
  emits: ["remove"],
  setup(__props, { emit: __emit }) {
    const { tp } = useTranslation();
    const emit = __emit;
    const {
      undo,
      disabled,
      undoDuration
    } = useStrictInject(VaFileUploadKey, INJECTION_ERROR_MESSAGE2);
    const { onFocus, onBlur } = useFocus();
    const removed = ref(false);
    const removeFile = () => {
      if (undo.value) {
        removed.value = true;
        setTimeout(() => {
          if (removed.value) {
            emit("remove");
            removed.value = false;
          }
        }, undoDuration.value ?? 0);
      } else {
        emit("remove");
        removed.value = false;
      }
    };
    const recoverFile = () => {
      removed.value = false;
    };
    const computedClasses = useBem("va-file-upload-list-item", () => ({
      undo: removed.value
    }));
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(VaListItem), {
        class: normalizeClass(["va-file-upload-list-item", unref(computedClasses)]),
        tabindex: "-1",
        disabled: unref(disabled),
        "aria-disabled": unref(disabled)
      }, {
        default: withCtx(() => [
          removed.value && unref(undo) ? (openBlock(), createBlock(unref(VaListItemSection), { key: 0 }, {
            default: withCtx(() => [
              createVNode(unref(VaFileUploadUndo), { onRecover: recoverFile })
            ]),
            _: 1
          })) : (openBlock(), createBlock(unref(VaListItemSection), { key: 1 }, {
            default: withCtx(() => [
              createBaseVNode("div", _hoisted_136, [
                __props.file && __props.file.name ? (openBlock(), createElementBlock("div", _hoisted_216, toDisplayString(__props.file && __props.file.name), 1)) : createCommentVNode("", true),
                createBaseVNode("div", _hoisted_310, toDisplayString(__props.file && __props.file.size), 1),
                !unref(disabled) ? (openBlock(), createBlock(unref(VaButton), {
                  key: 1,
                  flat: "",
                  color: "danger",
                  icon: "clear",
                  class: "va-file-upload-list-item__delete",
                  "aria-label": unref(tp)(_ctx.$props.ariaRemoveFileLabel),
                  onClick: withModifiers(removeFile, ["stop"]),
                  onKeydown: [
                    withKeys(withModifiers(removeFile, ["stop"]), ["enter"]),
                    withKeys(withModifiers(removeFile, ["stop"]), ["space"])
                  ],
                  onFocus: unref(onFocus),
                  onBlur: unref(onBlur)
                }, null, 8, ["aria-label", "onKeydown", "onFocus", "onBlur"])) : createCommentVNode("", true)
              ])
            ]),
            _: 1
          }))
        ]),
        _: 1
      }, 8, ["class", "disabled", "aria-disabled"]);
    };
  }
});

// node_modules/vuestic-ui/dist/es/src/components/va-file-upload/VaFileUploadListItem/index.js
var VaFileUploadListItem = withConfigTransport$1(_sfc_main68);

// node_modules/vuestic-ui/dist/es/src/components/va-file-upload/VaFileUploadGalleryItem/VaFileUploadGalleryItem.vue_vue_type_script_setup_true_lang.js
import "D:/Github/DONGTIAN/ui/node_modules/vuestic-ui/dist/es/VaFileUploadGalleryItem.css";
var _hoisted_137 = ["src", "alt"];
var _hoisted_217 = { class: "va-file-upload-gallery-item__overlay" };
var _hoisted_311 = ["title"];
var INJECTION_ERROR_MESSAGE3 = "The VaFileUploadGalleryItem component should be used in the context of VaFileUpload component";
var _sfc_main69 = defineComponent({
  ...{
    name: "VaFileUploadGalleryItem"
  },
  __name: "VaFileUploadGalleryItem",
  props: {
    file: { type: Object, default: null },
    color: { type: String, default: "success" },
    ariaRemoveFileLabel: useTranslationProp("$t:removeFile")
  },
  emits: ["remove"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const {
      undo,
      disabled,
      undoDuration
    } = useStrictInject(VaFileUploadKey, INJECTION_ERROR_MESSAGE3);
    const { isFocused, onFocus, onBlur } = useFocus();
    const previewImage = ref("");
    const removed = ref(false);
    const overlayStylesComputed = computed(() => ({
      backgroundColor: colorToRgba(props.color, 0.7)
    }));
    const classesComputed = useBem("va-file-upload-gallery-item", () => ({
      notImage: !previewImage.value,
      focused: isFocused.value,
      undo: removed.value
    }));
    const removeImage = () => {
      if (undo.value) {
        removed.value = true;
        setTimeout(() => {
          if (!removed.value) {
            return;
          }
          emit("remove");
          removed.value = false;
        }, undoDuration.value ?? 0);
      } else {
        emit("remove");
        removed.value = false;
      }
    };
    const recoverImage = () => {
      removed.value = false;
    };
    const convertToImg = () => {
      if (!props.file.name || !props.file.image) {
        return;
      }
      if (props.file.image.url) {
        previewImage.value = props.file.image.url;
      } else if (props.file.image instanceof File) {
        const reader = new FileReader();
        reader.readAsDataURL(props.file.image);
        reader.onload = (e) => {
          var _a2, _b;
          if (((_a2 = e.target) == null ? void 0 : _a2.result).includes("image")) {
            previewImage.value = (_b = e.target) == null ? void 0 : _b.result;
          }
        };
      }
    };
    onMounted(convertToImg);
    watch(() => props.file, convertToImg);
    const { t, tp } = useTranslation();
    const { textColorComputed } = useTextColor(toRef(props, "color"));
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(VaListItem), {
        class: normalizeClass(["va-file-upload-gallery-item", unref(classesComputed)]),
        tabindex: "-1",
        disabled: unref(disabled),
        "aria-disabled": unref(disabled),
        onFocus: unref(onFocus),
        onBlur: unref(onBlur)
      }, {
        default: withCtx(() => [
          removed.value && unref(undo) ? (openBlock(), createBlock(unref(VaListItemSection), { key: 0 }, {
            default: withCtx(() => [
              createVNode(unref(VaFileUploadUndo), {
                vertical: "",
                onRecover: recoverImage
              })
            ]),
            _: 1
          })) : (openBlock(), createBlock(unref(VaListItemSection), { key: 1 }, {
            default: withCtx(() => [
              previewImage.value ? (openBlock(), createElementBlock("img", {
                key: 0,
                src: previewImage.value,
                alt: __props.file.name || "",
                class: "va-file-upload-gallery-item__image"
              }, null, 8, _hoisted_137)) : createCommentVNode("", true),
              createBaseVNode("div", _hoisted_217, [
                createBaseVNode("div", {
                  class: "va-file-upload-gallery-item__overlay-background",
                  style: normalizeStyle(overlayStylesComputed.value)
                }, null, 4),
                __props.file && __props.file.name ? (openBlock(), createElementBlock("div", {
                  key: 0,
                  class: "va-file-upload-gallery-item__name",
                  title: __props.file.name,
                  style: normalizeStyle({ color: unref(textColorComputed) })
                }, toDisplayString(__props.file.name), 13, _hoisted_311)) : createCommentVNode("", true),
                !unref(disabled) ? (openBlock(), createBlock(unref(VaButton), {
                  key: 1,
                  flat: "",
                  color: "danger",
                  icon: "va-delete",
                  class: "va-file-upload-gallery-item__delete",
                  "aria-label": unref(tp)(_ctx.$props.ariaRemoveFileLabel),
                  onClick: removeImage,
                  onFocus: unref(onFocus),
                  onBlur: unref(onBlur)
                }, null, 8, ["aria-label", "onFocus", "onBlur"])) : createCommentVNode("", true)
              ])
            ]),
            _: 1
          }))
        ]),
        _: 1
      }, 8, ["class", "disabled", "aria-disabled", "onFocus", "onBlur"]);
    };
  }
});

// node_modules/vuestic-ui/dist/es/src/components/va-file-upload/VaFileUploadGalleryItem/index.js
var VaFileUploadGalleryItem = withConfigTransport$1(_sfc_main69);

// node_modules/vuestic-ui/dist/es/src/components/va-file-upload/VaFileUploadSingleItem/VaFileUploadSingleItem.vue_vue_type_script_setup_true_lang.js
import "D:/Github/DONGTIAN/ui/node_modules/vuestic-ui/dist/es/VaFileUploadSingleItem.css";
var _hoisted_138 = { class: "va-file-upload-single-item__name" };
var INJECTION_ERROR_MESSAGE4 = "The VaFileUploadSingleItem component should be used in the context of VaFileUpload component";
var _sfc_main70 = defineComponent({
  ...{
    name: "VaFileUploadSingleItem"
  },
  __name: "VaFileUploadSingleItem",
  props: {
    file: { type: Object, default: null },
    ariaRemoveFileLabel: useTranslationProp("$t:removeFile")
  },
  emits: ["remove"],
  setup(__props, { emit: __emit }) {
    const { t, tp } = useTranslation();
    const { disabled } = useStrictInject(VaFileUploadKey, INJECTION_ERROR_MESSAGE4);
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(VaListItem), {
        disabled: unref(disabled),
        "aria-disabled": unref(disabled),
        class: "va-file-upload-single-item",
        tabindex: "-1"
      }, {
        default: withCtx(() => [
          createVNode(unref(VaListItemSection), { class: "va-file-upload-single-item__content" }, {
            default: withCtx(() => [
              createBaseVNode("div", _hoisted_138, toDisplayString(__props.file && __props.file.name), 1),
              !unref(disabled) ? (openBlock(), createBlock(unref(VaButton), {
                key: 0,
                class: "va-file-upload-single-item__button",
                "aria-label": unref(tp)(_ctx.$props.ariaRemoveFileLabel),
                size: "small",
                color: "danger",
                preset: "secondary",
                onClick: _cache[0] || (_cache[0] = ($event) => _ctx.$emit("remove"))
              }, {
                default: withCtx(() => [
                  createTextVNode(" Delete ")
                ]),
                _: 1
              }, 8, ["aria-label"])) : createCommentVNode("", true)
            ]),
            _: 1
          })
        ]),
        _: 1
      }, 8, ["disabled", "aria-disabled"]);
    };
  }
});

// node_modules/vuestic-ui/dist/es/src/components/va-file-upload/VaFileUploadSingleItem/index.js
var VaFileUploadSingleItem = withConfigTransport$1(_sfc_main70);

// node_modules/vuestic-ui/dist/es/src/components/va-file-upload/VaFileUploadList/VaFileUploadList.vue_vue_type_script_setup_true_lang.js
import "D:/Github/DONGTIAN/ui/node_modules/vuestic-ui/dist/es/VaFileUploadList.css";
var VaFileUploadGalleryItemProps = extractComponentProps(VaFileUploadGalleryItem);
var VaFileUploadListItemProps = extractComponentProps(VaFileUploadListItem);
var VaFileUploadSingleItemProps = extractComponentProps(VaFileUploadSingleItem);
var _sfc_main71 = defineComponent({
  ...{
    name: "VaFileUploadList"
  },
  __name: "VaFileUploadList",
  props: {
    type: { type: String, default: "" },
    files: { type: Array, default: null },
    ...VaFileUploadGalleryItemProps,
    ...VaFileUploadListItemProps,
    ...VaFileUploadSingleItemProps
  },
  emits: ["remove", "removeSingle"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const filesList = computed(() => props.files.map(convertFile));
    const convertFile = (file) => ({
      name: file.name || file.url || "",
      size: formatSize(file.size),
      date: formatDate(/* @__PURE__ */ new Date()),
      image: file
    });
    const formatSize = (bytes) => {
      if (bytes === 0) {
        return "0 Bytes";
      }
      if (!bytes) {
        return "";
      }
      const k = 1024;
      const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
      const i = Math.floor(Math.log(bytes) / Math.log(k));
      return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
    };
    const formatDate = (date = /* @__PURE__ */ new Date()) => {
      return date.toLocaleDateString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        month: "short",
        day: "numeric",
        year: "numeric"
      });
    };
    const galleryItemProps = filterComponentProps(VaFileUploadGalleryItemProps);
    const itemProps = filterComponentProps(VaFileUploadListItemProps);
    const singleItemProps = filterComponentProps(VaFileUploadSingleItemProps);
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(VaList), {
        class: normalizeClass(["va-file-upload-list", `va-file-upload-list--${__props.type}`]),
        role: __props.type !== "single" ? "list" : void 0
      }, {
        default: withCtx(() => [
          __props.type === "list" ? (openBlock(true), createElementBlock(Fragment, { key: 0 }, renderList(filesList.value, (file, index) => {
            return openBlock(), createBlock(unref(VaFileUploadListItem), mergeProps({
              key: file.name
            }, unref(itemProps), {
              file,
              role: "listitem",
              onRemove: ($event) => _ctx.$emit("remove", index)
            }), null, 16, ["file", "onRemove"]);
          }), 128)) : createCommentVNode("", true),
          __props.type === "gallery" ? (openBlock(true), createElementBlock(Fragment, { key: 1 }, renderList(filesList.value, (file, index) => {
            return openBlock(), createBlock(unref(VaFileUploadGalleryItem), mergeProps(unref(galleryItemProps), {
              key: file.name,
              file,
              role: "listitem",
              onRemove: ($event) => _ctx.$emit("remove", index)
            }), null, 16, ["file", "onRemove"]);
          }), 128)) : createCommentVNode("", true),
          __props.type === "single" && filesList.value.length ? (openBlock(), createBlock(unref(VaFileUploadSingleItem), mergeProps({ key: 2 }, unref(singleItemProps), {
            file: filesList.value[filesList.value.length - 1],
            onRemove: _cache[0] || (_cache[0] = ($event) => _ctx.$emit("removeSingle"))
          }), null, 16, ["file"])) : createCommentVNode("", true)
        ]),
        _: 1
      }, 8, ["role", "class"]);
    };
  }
});

// node_modules/vuestic-ui/dist/es/src/components/va-file-upload/VaFileUploadList/index.js
var VaFileUploadList = withConfigTransport$1(_sfc_main71);

// node_modules/vuestic-ui/dist/es/src/components/va-file-upload/VaFileUpload.vue_vue_type_script_setup_true_lang.js
import "D:/Github/DONGTIAN/ui/node_modules/vuestic-ui/dist/es/VaFileUpload.css";
var _hoisted_139 = { class: "va-file-upload__field" };
var _hoisted_218 = {
  key: 0,
  class: "va-file-upload__field__text"
};
var _hoisted_312 = ["accept", "multiple", "disabled"];
var VaFileUploadListProps = extractComponentProps(VaFileUploadList);
var _sfc_main72 = defineComponent({
  ...{
    name: "VaFileUpload"
  },
  __name: "VaFileUpload",
  props: {
    ...useComponentPresetProp,
    ...VaFileUploadListProps,
    fileTypes: { type: String, default: "" },
    dropzone: { type: Boolean, default: false },
    hideFileList: { type: Boolean, default: false },
    color: { type: String, default: "primary" },
    disabled: { type: Boolean, default: false },
    undo: { type: Boolean, default: false },
    undoDuration: { type: [Number, String], default: 3e3 },
    undoButtonText: useTranslationProp("$t:undo"),
    dropZoneText: useTranslationProp("$t:dropzone"),
    uploadButtonText: useTranslationProp("$t:uploadFile"),
    deletedFileMessage: useTranslationProp("$t:fileDeleted"),
    fileIncorrectMessage: useTranslationProp("$t:fileTypeIncorrect"),
    modelValue: {
      type: [Object, Array],
      default: () => []
    },
    type: {
      type: String,
      default: "list",
      validator: (value) => ["list", "gallery", "single"].includes(value)
    }
  },
  emits: ["update:modelValue", "file-removed", "file-added"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const fileInputRef = shallowRef();
    const modal = ref(false);
    const dropzoneHighlight = ref(false);
    const { getColor, shiftHSLAColor: shiftHSLAColor2 } = useColors();
    const colorComputed = computed(() => getColor(props.color));
    const computedStyle = computed(() => ({
      backgroundColor: props.dropzone ? shiftHSLAColor2(colorComputed.value, { a: dropzoneHighlight.value ? -0.82 : -0.92 }) : "transparent"
    }));
    const computedClasses = useBem("va-file-upload", () => ({
      dropzone: props.dropzone,
      disabled: props.disabled
    }));
    const files = computed({
      get() {
        return Array.isArray(props.modelValue) ? props.modelValue : [props.modelValue];
      },
      set(files2) {
        if (props.type === "single") {
          emit("update:modelValue", files2[0]);
        } else {
          emit("update:modelValue", files2);
        }
      }
    });
    const filterInvalidFiles = (files2) => files2.filter((file) => {
      const fileName = file.name || file.url;
      if (!fileName) {
        return false;
      }
      if (file.url) {
        return true;
      }
      const MIMETypes = ["audio/*", "video/*", "image/*"];
      const isContainedMIMEType = MIMETypes.find((t) => props.fileTypes.includes(t));
      if (isContainedMIMEType) {
        return true;
      }
      const extension = fileName.substring(fileName.lastIndexOf(".") + 1).toLowerCase();
      const isCorrectExt = props.fileTypes.includes(extension);
      if (!isCorrectExt) {
        modal.value = true;
      }
      return isCorrectExt;
    });
    const uploadFile = (e) => {
      var _a2, _b;
      const f = ((_a2 = e.target) == null ? void 0 : _a2.files) || ((_b = e.dataTransfer) == null ? void 0 : _b.files);
      if (!f) {
        return;
      }
      const validatedFiles = props.fileTypes ? filterInvalidFiles(Array.from(f)) : f;
      files.value = props.type === "single" ? validatedFiles : [...files.value, ...validatedFiles];
      emit("file-added", validatedFiles);
    };
    const changeFieldValue = (e) => {
      uploadFile(e);
      if (fileInputRef.value) {
        fileInputRef.value.value = "";
      }
    };
    const removeFile = (index) => {
      if (index in files.value) {
        const removedFile = files.value[index];
        files.value = files.value.filter((item, idx) => idx !== index);
        emit("file-removed", removedFile);
      }
    };
    const removeSingleFile = () => {
      if (files.value.length > 0) {
        const removedFile = files.value[0];
        files.value = [];
        emit("file-removed", removedFile);
      }
    };
    const callFileDialogue = () => {
      if (fileInputRef.value) {
        fileInputRef.value.click();
      }
    };
    onMounted(() => {
      if (Array.isArray(files.value)) {
        const filteredFiles = filterInvalidFiles(files.value);
        if (filteredFiles.length !== files.value.length) {
          files.value = filteredFiles;
        }
      }
    });
    const { tp } = useTranslation();
    provide(VaFileUploadKey, {
      undo: toRef(props, "undo"),
      disabled: toRef(props, "disabled"),
      undoDuration: useNumericProp("undoDuration"),
      undoButtonText: computed(() => tp(props.undoButtonText)),
      deletedFileMessage: computed(() => tp(props.deletedFileMessage))
    });
    const fileUploadListProps = filterComponentProps(VaFileUploadListProps);
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: normalizeClass(["va-file-upload", unref(computedClasses)]),
        style: normalizeStyle(computedStyle.value)
      }, [
        renderSlot(_ctx.$slots, "default", {}, () => [
          createBaseVNode("div", _hoisted_139, [
            __props.dropzone ? (openBlock(), createElementBlock("div", _hoisted_218, toDisplayString(unref(tp)(__props.dropZoneText)), 1)) : createCommentVNode("", true),
            createVNode(unref(VaButton), {
              class: "va-file-upload__field__button",
              disabled: __props.disabled,
              "aria-disabled": __props.disabled,
              color: colorComputed.value,
              style: normalizeStyle({ "pointer-events": dropzoneHighlight.value ? "none" : void 0 }),
              onChange: changeFieldValue,
              onClick: callFileDialogue
            }, {
              default: withCtx(() => [
                createTextVNode(toDisplayString(unref(tp)(__props.uploadButtonText)), 1)
              ]),
              _: 1
            }, 8, ["disabled", "aria-disabled", "color", "style"])
          ])
        ]),
        createBaseVNode("input", {
          ref_key: "fileInputRef",
          ref: fileInputRef,
          type: "file",
          class: "va-file-upload__field__input",
          tabindex: -1,
          "aria-hidden": "true",
          accept: __props.fileTypes,
          multiple: __props.type !== "single",
          disabled: __props.disabled,
          onChange: changeFieldValue,
          onDragenter: _cache[0] || (_cache[0] = ($event) => dropzoneHighlight.value = true),
          onDragleave: _cache[1] || (_cache[1] = ($event) => dropzoneHighlight.value = false)
        }, null, 40, _hoisted_312),
        files.value.length && !_ctx.$props.hideFileList ? (openBlock(), createBlock(unref(VaFileUploadList), mergeProps({ key: 0 }, unref(fileUploadListProps), {
          type: __props.type,
          files: files.value,
          color: colorComputed.value,
          onRemove: removeFile,
          onRemoveSingle: removeSingleFile
        }), null, 16, ["type", "files", "color"])) : createCommentVNode("", true),
        createVNode(unref(VaModal), {
          modelValue: modal.value,
          "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => modal.value = $event),
          "hide-default-actions": "",
          message: unref(tp)("$t:fileTypeIncorrect")
        }, null, 8, ["modelValue", "message"])
      ], 6);
    };
  }
});

// node_modules/vuestic-ui/dist/es/src/components/va-file-upload/index.js
var VaFileUpload = withConfigTransport$1(_sfc_main72);

// node_modules/vuestic-ui/dist/es/src/composables/useForm/formContext.js
var createFormContext = (options) => {
  const fields = ref(/* @__PURE__ */ new Map());
  return {
    // Vue unwrap ref automatically, but types are not for some reason
    immediate: computed(() => options.immediate),
    fields: computed(() => [...fields.value.values()]),
    forceHideErrors: computed(() => options.hideErrors),
    forceHideErrorMessages: computed(() => options.hideErrorMessages),
    forceHideLoading: computed(() => options.hideLoading),
    forceDirty: ref(false),
    registerField: (uid, field) => {
      fields.value.set(uid, field);
    },
    unregisterField: (uid) => {
      fields.value.delete(uid);
    }
  };
};

// node_modules/vuestic-ui/dist/es/src/composables/useForm/useFormParent.js
var useFormParent = (options) => {
  const formContext = createFormContext(options);
  provide(FormServiceKey, formContext);
  const { fields, forceDirty } = formContext;
  const fieldNames = computed(() => fields.value.map((field) => unref(field.name)).filter(Boolean));
  const fieldsNamed = computed(() => fields.value.reduce((acc, field) => {
    if (unref(field.name)) {
      acc[unref(field.name)] = field;
    }
    return acc;
  }, {}));
  const formData = computed(() => fields.value.reduce((acc, field) => {
    if (unref(field.name)) {
      acc[unref(field.name)] = field.value;
    }
    return acc;
  }, {}));
  const isValid = computed(() => fields.value.every((field) => unref(field.isValid)));
  const isLoading = computed(() => fields.value.some((field) => unref(field.isLoading)));
  const errorMessages = computed(() => fields.value.map((field) => unref(field.errorMessages)).flat());
  const errorMessagesNamed = computed(() => fields.value.reduce((acc, field) => {
    if (unref(field.name)) {
      acc[unref(field.name)] = unref(field.errorMessages);
    }
    return acc;
  }, {}));
  const isDirty = computed({
    get() {
      return fields.value.some((field) => unref(field.isDirty)) || forceDirty.value;
    },
    set(v) {
      forceDirty.value = v;
      fields.value.forEach((field) => {
        field.isDirty = v;
      });
    }
  });
  const isTouched = computed({
    get() {
      return fields.value.some((field) => field.isTouched);
    },
    set(v) {
      fields.value.forEach((field) => {
        field.isTouched = v;
      });
    }
  });
  const validate = () => {
    isDirty.value = true;
    return fields.value.reduce((acc, field) => {
      return field.validate() && acc;
    }, true);
  };
  const validateAsync = () => {
    isDirty.value = true;
    return Promise.all(fields.value.map((field) => field.validateAsync())).then((results) => {
      return results.every(Boolean);
    });
  };
  const reset = () => {
    isDirty.value = false;
    fields.value.forEach((field) => field.reset());
  };
  const resetValidation = () => {
    isDirty.value = false;
    fields.value.forEach((field) => field.resetValidation());
  };
  const focus = () => {
    var _a2;
    (_a2 = fields.value[0]) == null ? void 0 : _a2.focus();
  };
  const focusInvalidField = () => {
    const invalidField = fields.value.find((field) => !field.isValid);
    invalidField == null ? void 0 : invalidField.focus();
  };
  useFormChild({
    name: toRef(options, "name"),
    isValid,
    isLoading,
    isDirty,
    isTouched,
    validate,
    validateAsync,
    reset,
    resetValidation,
    focus,
    errorMessages
  });
  return {
    immediate: computed(() => options.immediate),
    isDirty,
    isTouched,
    formData,
    fields,
    fieldsNamed,
    fieldNames,
    isValid,
    isLoading,
    errorMessages,
    errorMessagesNamed,
    validate,
    validateAsync,
    reset,
    resetValidation,
    focus,
    focusInvalidField
  };
};

// node_modules/vuestic-ui/dist/es/src/components/va-form/VaForm.vue_vue_type_script_setup_true_lang.js
import "D:/Github/DONGTIAN/ui/node_modules/vuestic-ui/dist/es/VaForm.css";
var statefulProps = { stateful: true };
var statefulConfig = {
  VaInput: statefulProps,
  VaSelect: statefulProps,
  VaCheckbox: statefulProps,
  VaRadio: statefulProps,
  VaDatePicker: statefulProps,
  VaTimePicker: statefulProps,
  VaColorPicker: statefulProps,
  VaSlider: statefulProps,
  VaSwitch: statefulProps,
  VaFileUpload: statefulProps,
  VaRating: statefulProps,
  VaDateInput: statefulProps,
  VaTimeInput: statefulProps
};
var _sfc_main73 = defineComponent({
  ...{
    name: "VaForm"
  },
  __name: "VaForm",
  props: {
    ...useComponentPresetProp,
    autofocus: { type: Boolean, default: false },
    immediate: { type: Boolean, default: false },
    tag: { type: String, default: "form" },
    trigger: { type: String, default: "blur" },
    modelValue: { type: Boolean, default: true },
    hideErrors: { type: Boolean, default: false },
    hideErrorMessages: { type: Boolean, default: false },
    hideLoading: { type: Boolean, default: false },
    stateful: { type: Boolean, default: false },
    name: { type: String, default: void 0 }
  },
  emits: ["update:modelValue"],
  setup(__props, { expose: __expose, emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const context = useFormParent(props);
    watch(context.isValid, (value) => {
      emit("update:modelValue", value);
    });
    watch(() => props.autofocus, (value) => {
      if (value) {
        context.focus();
      }
    });
    onMounted(() => {
      if (props.autofocus) {
        context.focus();
      }
    });
    watch(context.fields, (newVal) => {
      if (newVal.length && props.immediate) {
        context.validate();
      }
    }, { immediate: true });
    useLocalConfigProvider(computed(() => {
      if (!props.stateful) {
        return {};
      }
      return statefulConfig;
    }));
    const {
      immediate: immediateComputed,
      isDirty,
      isTouched,
      formData,
      fields,
      fieldsNamed,
      fieldNames,
      isValid,
      isLoading,
      errorMessages,
      errorMessagesNamed,
      validate,
      validateAsync,
      reset,
      resetValidation,
      focus,
      focusInvalidField
    } = context;
    __expose({
      immediate: immediateComputed,
      isDirty,
      formData,
      fields,
      fieldsNamed,
      fieldNames,
      isValid,
      isTouched,
      isLoading,
      errorMessages,
      errorMessagesNamed,
      validate,
      validateAsync,
      reset,
      resetValidation,
      focus,
      focusInvalidField
    });
    return (_ctx, _cache) => {
      return openBlock(), createBlock(resolveDynamicComponent(__props.tag), mergeProps({
        class: "va-form",
        onSubmit: _cache[0] || (_cache[0] = (e) => _ctx.$attrs.action === void 0 && e.preventDefault())
      }, _ctx.$attrs), {
        default: withCtx(() => [
          renderSlot(_ctx.$slots, "default", normalizeProps(guardReactiveProps({
            isValid: unref(isValid),
            isDirty: unref(isDirty),
            isTouched: unref(isTouched),
            isLoading: unref(isLoading),
            errorMessages: unref(errorMessages),
            errorMessagesNamed: unref(errorMessagesNamed),
            formData: unref(formData),
            fields: unref(fields),
            fieldsNamed: unref(fieldsNamed),
            fieldNames: unref(fieldNames),
            validate: unref(validate),
            validateAsync: unref(validateAsync),
            reset: unref(reset),
            resetValidation: unref(resetValidation),
            focus: unref(focus),
            focusInvalidField: unref(focusInvalidField)
          })))
        ]),
        _: 3
      }, 16);
    };
  }
});

// node_modules/vuestic-ui/dist/es/src/components/va-form/index.js
var VaForm = withConfigTransport$1(_sfc_main73);

// node_modules/vuestic-ui/dist/es/src/utils/sleep.js
var sleep = (ms = 0) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

// node_modules/vuestic-ui/dist/es/src/components/va-infinite-scroll/hooks/useScroll.js
var useScroll = (props, element, handler) => {
  const addScrollListener = () => {
    var _a2;
    (_a2 = element.value) == null ? void 0 : _a2.addEventListener(
      "scroll",
      handler.value,
      { passive: true }
    );
  };
  const removeScrollListener = () => {
    var _a2;
    (_a2 = element.value) == null ? void 0 : _a2.removeEventListener(
      "scroll",
      handler.value
    );
  };
  onMounted(() => {
    if (!element.value) {
      return;
    }
    element.value.style.overflowY = "scroll";
    if (props.reverse) {
      element.value.scrollTop = element.value.scrollHeight;
    }
    addScrollListener();
  });
  onBeforeUnmount(removeScrollListener);
  return {
    addScrollListener,
    removeScrollListener
  };
};

// node_modules/vuestic-ui/dist/es/src/components/va-infinite-scroll/VaInfiniteScroll.vue_vue_type_script_setup_true_lang.js
import "D:/Github/DONGTIAN/ui/node_modules/vuestic-ui/dist/es/VaInfiniteScroll.css";
var _hoisted_140 = { class: "va-infinite-scroll__spinner__default" };
var _sfc_main74 = defineComponent({
  ...{
    name: "VaInfiniteScroll"
  },
  __name: "VaInfiniteScroll",
  props: {
    ...useComponentPresetProp,
    load: { type: Function, required: true },
    offset: { type: [Number, String], default: 500 },
    reverse: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
    scrollTarget: { type: [String, Object], default: null },
    debounce: { type: [Number, String], default: 100 },
    tag: { type: String, default: "div" }
  },
  emits: ["onload", "onerror"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const element = shallowRef();
    const spinnerSlotContainer = shallowRef();
    const fetching = ref(false);
    const error = ref(false);
    const forcedScrolling = ref(false);
    const debouncedLoad = ref();
    const notScrolledContentBeforeLoad = ref(0);
    const prevScrollTop = ref(0);
    const scrollTargetElement = computed(() => {
      var _a2;
      let target;
      if (typeof props.scrollTarget === "string") {
        target = document.querySelector(props.scrollTarget);
      } else {
        target = props.scrollTarget || ((_a2 = element.value) == null ? void 0 : _a2.parentElement);
      }
      return target || document.body;
    });
    const {
      addScrollListener,
      removeScrollListener
    } = useScroll(props, scrollTargetElement, debouncedLoad);
    const offsetComputed = useNumericProp("offset");
    const debounceComputed = useNumericProp("debounce");
    const { getColor } = useColors();
    const spinnerColor = computed(() => {
      return error.value ? getColor("danger") : getColor("primary");
    });
    const spinnerHeight = computed(() => {
      var _a2;
      return ((_a2 = spinnerSlotContainer.value) == null ? void 0 : _a2.offsetHeight) || 0;
    });
    const computedOffset = computed(() => {
      return offsetComputed.value + spinnerHeight.value;
    });
    const stop = () => {
      if (props.disabled) {
        return;
      }
      fetching.value = false;
      removeScrollListener();
    };
    const resume = () => {
      if (props.disabled) {
        return;
      }
      addScrollListener();
    };
    const onLoad = () => {
      const { scrollTop, scrollHeight, clientHeight } = scrollTargetElement.value;
      notScrolledContentBeforeLoad.value = scrollHeight - scrollTop;
      const scrollDelta = scrollTop - prevScrollTop.value;
      prevScrollTop.value = scrollTop;
      if (props.disabled || error.value || fetching.value) {
        return;
      }
      if (forcedScrolling.value) {
        forcedScrolling.value = false;
        return;
      }
      const isReverseScrollDirection = props.reverse && scrollDelta > 0 || !props.reverse && scrollDelta < 0;
      if (isReverseScrollDirection) {
        return;
      }
      const offset3 = props.reverse ? scrollTop : scrollHeight - scrollTop - clientHeight;
      if (offset3 > computedOffset.value) {
        return;
      }
      fetching.value = true;
      props.load().then(finishLoading).catch(onError);
    };
    const forceSetScrollTopToTarget = (value) => {
      forcedScrolling.value = true;
      scrollTargetElement.value.scrollTop = value;
    };
    const updateTargetElementScrollTop = () => {
      const { scrollTop, scrollHeight, clientHeight } = scrollTargetElement.value;
      if (props.reverse) {
        const isScrolledUp = scrollHeight - scrollTop < notScrolledContentBeforeLoad.value;
        const isSpinnerHidden = scrollTop >= spinnerHeight.value;
        if (isScrolledUp && isSpinnerHidden) {
          return;
        }
        scrollHeight - notScrolledContentBeforeLoad.value > spinnerHeight.value ? forceSetScrollTopToTarget(scrollHeight - notScrolledContentBeforeLoad.value) : forceSetScrollTopToTarget(spinnerHeight.value);
      }
      if (!props.reverse) {
        const isSpinnerHidden = scrollHeight - scrollTop - clientHeight >= spinnerHeight.value;
        !isSpinnerHidden && forceSetScrollTopToTarget(scrollHeight - clientHeight - spinnerHeight.value);
      }
    };
    const finishLoading = () => {
      updateTargetElementScrollTop();
      fetching.value = false;
      emit("onload");
    };
    const stopErrorDisplay = () => {
      updateTargetElementScrollTop();
      forcedScrolling.value = false;
      error.value = false;
      fetching.value = false;
      emit("onerror");
    };
    const onError = () => {
      stop();
      error.value = true;
      sleep(1200).then(stopErrorDisplay).then(resume);
    };
    watch(() => debounceComputed.value, (value) => {
      debouncedLoad.value = debounce(onLoad, value);
    }, { immediate: true });
    watch(() => props.disabled, (value) => {
      value ? stop() : resume();
    });
    return (_ctx, _cache) => {
      return openBlock(), createBlock(resolveDynamicComponent(_ctx.$props.tag), {
        ref_key: "element",
        ref: element,
        role: "feed",
        class: normalizeClass(["va-infinite-scroll", { "va-infinite-scroll--reversed": _ctx.$props.reverse }]),
        "aria-busy": fetching.value
      }, {
        default: withCtx(() => [
          renderSlot(_ctx.$slots, "default"),
          createBaseVNode("div", {
            ref_key: "spinnerSlotContainer",
            ref: spinnerSlotContainer,
            class: normalizeClass(["va-infinite-scroll__spinner", { "va-infinite-scroll__spinner--invisible": !fetching.value }])
          }, [
            !_ctx.$props.disabled ? renderSlot(_ctx.$slots, "loading", { key: 0 }, () => [
              createBaseVNode("div", _hoisted_140, [
                createVNode(unref(VaProgressCircle), {
                  size: "small",
                  thickness: 0.15,
                  color: spinnerColor.value,
                  indeterminate: ""
                }, null, 8, ["color"])
              ])
            ]) : createCommentVNode("", true)
          ], 2)
        ]),
        _: 3
      }, 8, ["class", "aria-busy"]);
    };
  }
});

// node_modules/vuestic-ui/dist/es/src/components/va-infinite-scroll/index.js
var VaInfiniteScroll = withConfigTransport$1(_sfc_main74);

// node_modules/vuestic-ui/dist/es/src/components/va-layout/hooks/useGridTemplateArea.js
var areaIndexes = {
  top: [0, 1, 2],
  left: [0, 3, 6],
  right: [2, 5, 8],
  bottom: [6, 7, 8]
};
var areaElements = ["left", "right", "top", "bottom"];
var useGridTemplateArea = (props) => {
  const sort = () => {
    return [...areaElements].sort((a, b) => {
      return (props[a].order ?? 0) - (props[b].order ?? 0);
    });
  };
  const applyTemplate = (template, areaIndexes2, areaName) => {
    areaIndexes2.forEach((index) => {
      template[index] = areaName;
    });
  };
  return computed(() => {
    const sorted = sort();
    const template = [
      ".",
      ".",
      ".",
      ".",
      ".",
      ".",
      ".",
      ".",
      "."
    ].map(() => "content");
    sorted.forEach((areaName) => {
      applyTemplate(template, areaIndexes[areaName], areaName);
    });
    return [
      '"' + template.slice(0, 3).join(" ") + '"',
      '"' + template.slice(3, 6).join(" ") + '"',
      '"' + template.slice(6, 9).join(" ") + '"'
    ].join(" ");
  });
};

// node_modules/vuestic-ui/dist/es/src/components/va-layout/hooks/useLayout.js
var useLayoutProps = {
  top: {
    type: Object,
    default: () => ({ order: 2 })
  },
  right: {
    type: Object,
    default: () => ({ order: 1 })
  },
  left: {
    type: Object,
    default: () => ({ order: 1 })
  },
  bottom: {
    type: Object,
    default: () => ({ order: 2 })
  }
};
var VaLayoutKey = "VaLayout";
var useLayout = (props) => {
  const items2 = ref({
    top: null,
    right: null,
    bottom: null,
    left: null
  });
  const paddings = computed(() => {
    const { top, right, bottom, left } = items2.value;
    const { top: topConfig, right: rightConfig, bottom: bottomConfig, left: leftConfig } = props;
    return {
      top: top && !topConfig.absolute ? top.sizes.height : 0,
      right: right && !rightConfig.absolute ? right.sizes.width : 0,
      bottom: bottom && !bottomConfig.absolute ? bottom.sizes.height : 0,
      left: left && !leftConfig.absolute ? left.sizes.width : 0
    };
  });
  const orders = computed(() => ({
    top: props.top.order || 0,
    right: props.right.order || 0,
    bottom: props.bottom.order || 0,
    left: props.left.order || 0
  }));
  provide(VaLayoutKey, {
    items: items2,
    paddings,
    orders
  });
  return {
    paddings,
    orders,
    items: items2
  };
};
var useFixedLayoutChild = (area, sizes) => {
  const layout = inject(VaLayoutKey, null);
  if (!layout) {
    throw new Error("VaLayoutChild must be used inside VaLayout");
  }
  watchEffect(() => {
    if (sizes.value) {
      layout.items.value[area] = {
        sizes: sizes.value
      };
    } else {
      layout.items.value[area] = null;
    }
  });
  onBeforeUnmount(() => {
    layout.items.value[area] = null;
  });
  return {
    paddings: computed(() => {
      return Object.keys(layout.paddings.value).reduce((acc, key) => {
        if (layout.orders.value[key] > layout.orders.value[area]) {
          acc[key] = layout.paddings.value[key];
        }
        return acc;
      }, {});
    })
  };
};

// node_modules/vuestic-ui/dist/es/src/components/va-layout/components/VaLayoutAbsoluteWrapper.js
import "D:/Github/DONGTIAN/ui/node_modules/vuestic-ui/dist/es/VaLayoutAbsoluteWrapper.css";
var _sfc_main75 = {};
var _hoisted_141 = { class: "va-layout__absolute-area-wrapper" };
function _sfc_render3(_ctx, _cache) {
  return openBlock(), createElementBlock("div", _hoisted_141, [
    renderSlot(_ctx.$slots, "default")
  ]);
}
var VaLayoutAbsoluteWrapper = _export_sfc(_sfc_main75, [["render", _sfc_render3]]);

// node_modules/vuestic-ui/dist/es/src/components/va-layout/components/VaResizeObserver.vue_vue_type_script_setup_true_lang.js
var _sfc_main76 = defineComponent({
  ...{
    name: "VaLayoutSizeKeeper"
  },
  __name: "VaResizeObserver",
  emits: {
    resize: (size3) => true
  },
  setup(__props, { emit: __emit }) {
    const emit = __emit;
    const el = ref();
    let observer = null;
    watch(el, (newEl) => {
      if (observer) {
        observer.disconnect();
      }
      observer = new ResizeObserver(([el2]) => {
        emit("resize", el2.contentRect);
      });
      observer.observe(newEl);
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: "va-resize-observer",
        ref_key: "el",
        ref: el
      }, [
        renderSlot(_ctx.$slots, "default")
      ], 512);
    };
  }
});

// node_modules/vuestic-ui/dist/es/src/components/va-layout/components/VaLayoutFixedWrapper.vue_vue_type_script_setup_true_lang.js
import "D:/Github/DONGTIAN/ui/node_modules/vuestic-ui/dist/es/VaLayoutFixedWrapper.css";
var _sfc_main77 = defineComponent({
  ...{
    name: "VaLayoutFixedWrapper"
  },
  __name: "VaLayoutFixedWrapper",
  props: {
    area: { type: String, required: true }
  },
  setup(__props) {
    const props = __props;
    const size3 = ref(null);
    const direction = computed(() => {
      if (props.area === "top" || props.area === "bottom") {
        return "vertical";
      } else {
        return "horizontal";
      }
    });
    const getPxOrZero = (value) => {
      if (!value) {
        return "0px";
      }
      return value + "px";
    };
    const styles = computed(() => {
      if (direction.value === "vertical") {
        return { width: `calc(100% - ${getPxOrZero(paddings.value.left)} - ${getPxOrZero(paddings.value.right)})`, [props.area]: 0 };
      } else {
        return { height: `calc(100% - ${getPxOrZero(paddings.value.top)} - ${getPxOrZero(paddings.value.bottom)})`, [props.area]: 0 };
      }
    });
    const { paddings } = useFixedLayoutChild(props.area, size3);
    computed(() => {
      return Object.keys(paddings.value).reduce((acc, key) => {
        if (key === props.area) {
          return acc;
        }
        return {
          ...acc,
          [key]: `${paddings.value[key]}px`
        };
      }, {});
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: "va-layout-fixed-wrapper",
        style: normalizeStyle([[{
          height: size3.value && direction.value === "vertical" ? size3.value.height + "px" : "auto",
          width: size3.value && direction.value === "horizontal" ? size3.value.width + "px" : "auto"
        }], `--va-styles-width: ${String(styles.value.width)};--va-styles-height: ${String(styles.value.height)}`])
      }, [
        createVNode(_sfc_main76, {
          class: normalizeClass(["va-layout-fixed-wrapper__content", `va-layout-fixed-wrapper__content--${__props.area}`]),
          style: normalizeStyle(!size3.value ? { position: "relative" } : {}),
          onResize: _cache[0] || (_cache[0] = ($event) => size3.value = $event)
        }, {
          default: withCtx(() => [
            renderSlot(_ctx.$slots, "default")
          ]),
          _: 3
        }, 8, ["class", "style"])
      ], 4);
    };
  }
});

// node_modules/vuestic-ui/dist/es/src/components/va-layout/components/VaLayoutArea.vue_vue_type_script_setup_true_lang.js
import "D:/Github/DONGTIAN/ui/node_modules/vuestic-ui/dist/es/VaLayoutArea.css";
var _sfc_main78 = defineComponent({
  ...{
    name: "VaLayoutArea"
  },
  __name: "VaLayoutArea",
  props: {
    area: { type: String, required: true },
    config: { type: Object, required: true }
  },
  emits: ["overlay-click"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const absolute = computed(() => props.config.absolute || false);
    const fixed = computed(() => props.config.fixed || false);
    const overlay = computed(() => props.config.overlay || false);
    const zIndex = computed(() => (props.config.order || 0) + 1);
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock(Fragment, null, [
        absolute.value ? (openBlock(), createBlock(VaLayoutAbsoluteWrapper, {
          key: 0,
          style: normalizeStyle(`--va-props-area: ${String(_ctx.$props.area)};--va-z-index: ${String(zIndex.value)};--va-z-index-1: ${String(zIndex.value - 1)}`)
        }, {
          default: withCtx(() => [
            createBaseVNode("div", {
              class: normalizeClass(`va-layout-area va-layout__area va-layout__area--${__props.area}`)
            }, [
              fixed.value ? (openBlock(), createBlock(_sfc_main77, {
                key: 0,
                area: __props.area
              }, {
                default: withCtx(() => [
                  renderSlot(_ctx.$slots, "default")
                ]),
                _: 3
              }, 8, ["area"])) : renderSlot(_ctx.$slots, "default", { key: 1 })
            ], 2)
          ]),
          _: 3
        }, 8, ["style"])) : (openBlock(), createElementBlock("div", {
          key: 1,
          class: normalizeClass(`va-layout-area va-layout__area va-layout__area--${__props.area}`),
          style: normalizeStyle(`--va-props-area: ${String(_ctx.$props.area)};--va-z-index: ${String(zIndex.value)};--va-z-index-1: ${String(zIndex.value - 1)}`)
        }, [
          fixed.value ? (openBlock(), createBlock(_sfc_main77, {
            key: 0,
            area: __props.area
          }, {
            default: withCtx(() => [
              renderSlot(_ctx.$slots, "default")
            ]),
            _: 3
          }, 8, ["area"])) : renderSlot(_ctx.$slots, "default", { key: 1 })
        ], 6)),
        createVNode(Transition, {
          style: normalizeStyle(`--va-props-area: ${String(_ctx.$props.area)};--va-z-index: ${String(zIndex.value)};--va-z-index-1: ${String(zIndex.value - 1)}`)
        }, {
          default: withCtx(() => [
            overlay.value ? (openBlock(), createElementBlock("div", {
              key: 0,
              class: normalizeClass(["va-layout-area__overlay", { "va-layout-area__overlay--fixed": fixed.value }]),
              onClick: _cache[0] || (_cache[0] = ($event) => _ctx.$emit("overlay-click"))
            }, null, 2)) : createCommentVNode("", true)
          ]),
          _: 1
        }, 8, ["style"])
      ], 64);
    };
  }
});

// node_modules/vuestic-ui/dist/es/src/components/va-layout/VaLayout.vue_vue_type_script_setup_true_lang.js
import "D:/Github/DONGTIAN/ui/node_modules/vuestic-ui/dist/es/VaLayout.css";
var _hoisted_142 = { class: "va-layout__area va-layout__area--content" };
var areaNames = [
  "top",
  "left",
  "right",
  "bottom"
];
var _sfc_main79 = defineComponent({
  ...{
    name: "VaLayout"
  },
  __name: "VaLayout",
  props: {
    ...useLayoutProps,
    allowBodyScrollOnOverlay: { type: Boolean, default: false }
  },
  emits: [
    "top-overlay-click",
    "left-overlay-click",
    "right-overlay-click",
    "bottom-overlay-click"
  ],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const { paddings } = useLayout(props);
    const doDisableScroll = computed(() => {
      return !props.allowBodyScrollOnOverlay && areaNames.some((area) => {
        var _a2;
        return (_a2 = props[area]) == null ? void 0 : _a2.overlay;
      });
    });
    const document2 = useDocument();
    watchEffect(() => {
      var _a2;
      const overflowParent = (_a2 = document2.value) == null ? void 0 : _a2.body;
      if (!overflowParent) {
        return;
      }
      if (doDisableScroll.value) {
        overflowParent.style.overflow = "hidden";
      } else {
        overflowParent.style.overflow = "";
      }
    });
    const templateArea = useGridTemplateArea(props);
    const slots = useSlots();
    const verticalTemplate = computed(() => {
      return [
        slots.top ? "min-content" : "0fr",
        "1fr",
        slots.bottom ? "min-content" : "0fr"
      ].filter(Boolean).join(" ");
    });
    const horizontalTemplate = computed(() => {
      return [
        slots.left ? "min-content" : "0fr",
        "1fr",
        slots.right ? "min-content" : "0fr"
      ].filter(Boolean).join(" ");
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: "va-layout",
        style: normalizeStyle(`--va-horizontal-template: ${String(horizontalTemplate.value)};--va-vertical-template: ${String(verticalTemplate.value)};--va-template-area: ${String(unref(templateArea))};--va-paddings-top-px: ${String(unref(paddings).top + "px")};--va-paddings-bottom-px: ${String(unref(paddings).bottom + "px")};--va-paddings-left-px: ${String(unref(paddings).left + "px")};--va-paddings-right-px: ${String(unref(paddings).right + "px")}`)
      }, [
        (openBlock(), createElementBlock(Fragment, null, renderList(areaNames, (area) => {
          return createVNode(_sfc_main78, {
            key: area,
            area,
            config: _ctx.$props[area] || {},
            onOverlayClick: ($event) => _ctx.$emit(`${area}-overlay-click`)
          }, {
            default: withCtx(() => [
              renderSlot(_ctx.$slots, area)
            ]),
            _: 2
          }, 1032, ["area", "config", "onOverlayClick"]);
        }), 64)),
        createBaseVNode("div", _hoisted_142, [
          renderSlot(_ctx.$slots, "default", {}, () => [
            renderSlot(_ctx.$slots, "content")
          ])
        ])
      ], 4);
    };
  }
});

// node_modules/vuestic-ui/dist/es/src/components/va-layout/index.js
var VaLayout = withConfigTransport(_sfc_main79);

// node_modules/vuestic-ui/dist/es/src/components/va-navbar/VaNavbar.vue_vue_type_script_setup_true_lang.js
import "D:/Github/DONGTIAN/ui/node_modules/vuestic-ui/dist/es/VaNavbar.css";
var _hoisted_143 = { class: "va-navbar__left" };
var _hoisted_219 = { class: "va-navbar__center" };
var _hoisted_313 = { class: "va-navbar__right" };
var _sfc_main80 = defineComponent({
  ...{
    name: "VaNavbar"
  },
  __name: "VaNavbar",
  props: {
    ...useFixedBarProps,
    ...useComponentPresetProp,
    color: { type: String, default: "background-secondary" },
    textColor: { type: String },
    shape: { type: Boolean, default: false },
    shadowed: { type: Boolean, default: false },
    bordered: { type: Boolean, default: false }
  },
  setup(__props) {
    const props = __props;
    const { scrollRoot, isScrolledDown } = setupScroll(props.fixed);
    const { fixedBarStyleComputed } = useFixedBar(props, isScrolledDown);
    const { getColor, shiftHSLAColor: shiftHSLAColor2 } = useColors();
    const color = computed(() => getColor(props.color));
    const { textColorComputed } = useTextColor(color);
    const shapeStyleComputed = computed(() => ({
      borderTopColor: shiftHSLAColor2(color.value, { h: -1, s: -11, l: 10 })
    }));
    const computedStyle = computed(() => ({
      ...fixedBarStyleComputed.value,
      backgroundColor: color.value,
      color: textColorComputed.value,
      fill: textColorComputed.value
    }));
    const bemClasses = useBem("va-navbar", () => ({
      shadowed: props.shadowed,
      bordered: props.bordered
    }));
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("header", {
        ref_key: "scrollRoot",
        ref: scrollRoot,
        class: normalizeClass(["va-navbar", unref(bemClasses)]),
        style: normalizeStyle(computedStyle.value)
      }, [
        renderSlot(_ctx.$slots, "default", {}, () => [
          createBaseVNode("div", _hoisted_143, [
            renderSlot(_ctx.$slots, "left")
          ]),
          createBaseVNode("div", _hoisted_219, [
            renderSlot(_ctx.$slots, "center")
          ]),
          createBaseVNode("div", _hoisted_313, [
            renderSlot(_ctx.$slots, "right")
          ])
        ]),
        __props.shape ? (openBlock(), createElementBlock("div", {
          key: 0,
          class: "va-navbar__background-shape",
          style: normalizeStyle(shapeStyleComputed.value)
        }, null, 4)) : createCommentVNode("", true)
      ], 6);
    };
  }
});

// node_modules/vuestic-ui/dist/es/src/components/va-navbar/VaNavbarItem/VaNavbarItem.js
import "D:/Github/DONGTIAN/ui/node_modules/vuestic-ui/dist/es/VaNavbarItem.css";
var _sfc_main81 = defineComponent({
  name: "VaNavbarItem",
  props: {}
  // TODO: In web components build props are required (it's a vue bug)
});
var _hoisted_144 = { class: "va-navbar__item" };
function _sfc_render4(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", _hoisted_144, [
    renderSlot(_ctx.$slots, "default")
  ]);
}
var _VaNavbarItem = _export_sfc(_sfc_main81, [["render", _sfc_render4]]);

// node_modules/vuestic-ui/dist/es/src/components/va-navbar/index.js
var VaNavbar = withConfigTransport$1(_sfc_main80);
var VaNavbarItem = withConfigTransport$1(_VaNavbarItem);

// node_modules/vuestic-ui/dist/es/src/components/va-radio/VaRadio.vue_vue_type_script_setup_true_lang.js
import "D:/Github/DONGTIAN/ui/node_modules/vuestic-ui/dist/es/VaRadio.css";
var _hoisted_145 = ["role"];
var _hoisted_220 = ["value", "checked", "aria-checked", "onChange"];
var _hoisted_314 = createBaseVNode("span", {
  "aria-hidden": "true",
  class: "va-radio__icon"
}, [
  createBaseVNode("span", { class: "va-radio__icon__background" }),
  createBaseVNode("span", { class: "va-radio__icon__dot" })
], -1);
var _sfc_main82 = defineComponent({
  ...{
    name: "VaRadio"
  },
  __name: "VaRadio",
  props: {
    ...useSelectableProps,
    ...useComponentPresetProp,
    ...useSelectableListProps,
    modelValue: {
      type: [Boolean, Array, String, Object, Number],
      default: null
    },
    options: {
      type: Array,
      default: () => []
    },
    name: { type: String, default: "" },
    label: { type: String, default: void 0 },
    leftLabel: { type: Boolean, default: false },
    color: { type: String, default: "primary" },
    option: {
      type: [Object, String, Number],
      default: void 0
    },
    vertical: { type: Boolean, default: false }
  },
  emits: useSelectableEmits,
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const { getColor } = useColors();
    const elements = {
      container: shallowRef(),
      input: shallowRef(),
      label: shallowRef()
    };
    const {
      computedError,
      computedErrorMessages,
      validationAriaAttributes,
      onBlur,
      onFocus
    } = useSelectable(props, emit, elements);
    const { getText: originalGetText, getDisabled: originalGetDisabled, getValue } = useSelectableList(props);
    const getText = (option) => {
      if (props.options.length > 0) {
        return originalGetText(option);
      }
      return props.label ?? originalGetText(option);
    };
    const getDisabled = (option) => originalGetDisabled(option) || props.disabled;
    const isNoOption = computed(() => props.options.length === 0 && !props.option);
    const isChecked = (option) => {
      if (isNoOption.value) {
        return props.modelValue;
      }
      return props.modelValue === getValue(option);
    };
    const computedOptions = computed(() => {
      if (isNoOption.value) {
        return [{}];
      }
      if (props.option) {
        return [props.option];
      } else {
        return props.options;
      }
    });
    const radioClass = (option) => ({
      "va-radio--left-label": props.leftLabel,
      "va-radio--selected": isChecked(option),
      "va-radio--readonly": props.readonly,
      "va-radio--disabled": props.disabled,
      "va-radio--indeterminate": props.indeterminate,
      "va-radio--error": computedError.value,
      "va-radio--single-option": isNoOption.value
    });
    const selectOption = (option, event) => {
      var _a2;
      if (isNoOption.value) {
        emit("update:modelValue", ((_a2 = event == null ? void 0 : event.target) == null ? void 0 : _a2.checked) || false);
        return;
      }
      emit("update:modelValue", option);
    };
    const labelStyle = computed(() => {
      return {
        color: computedError.value ? getColor("danger") : ""
      };
    });
    computed(() => {
      const style = {
        background: getColor(props.color),
        borderColor: getColor(props.color)
      };
      if (computedError.value) {
        style.borderColor = getColor("danger");
      }
      return style;
    });
    const iconBackgroundComputedStyles = computed(() => ({
      backgroundColor: getColor(props.color)
    }));
    const iconDotComputedStyles = computed(() => {
      return {
        borderColor: computedError.value ? getColor("danger") : getColor(props.color),
        backgroundColor: getColor(props.color)
      };
    });
    const iconComputedStyles = computed(() => {
      return { borderColor: computedError.value ? getColor("danger") : getColor(props.color) };
    });
    const componentId = useComponentUuid();
    const computedName = computed(() => props.name || componentId);
    const inputAttributesComputed = (option) => {
      const disabled = getDisabled(option);
      return {
        name: computedName.value,
        disabled,
        readonly: props.readonly,
        tabindex: disabled ? -1 : 0
      };
    };
    const flexDirection = computed(() => props.vertical ? "column" : "row");
    const roleComputed = computed(() => {
      var _a2;
      return ((_a2 = props.options) == null ? void 0 : _a2.length) > 0 ? "radiogroup" : "";
    });
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(_sfc_main3), {
        disabled: _ctx.disabled,
        success: _ctx.success,
        messages: _ctx.messages,
        error: unref(computedError),
        "error-messages": unref(computedErrorMessages),
        "error-count": _ctx.errorCount,
        onBlur: unref(onBlur),
        style: normalizeStyle(`--va-flex-direction: ${String(flexDirection.value)};--va-label-style-color: ${String(labelStyle.value.color)};--va-icon-computed-styles-border-color: ${String(iconComputedStyles.value.borderColor)};--va-icon-dot-computed-styles-border-color: ${String(iconDotComputedStyles.value.borderColor)};--va-icon-dot-computed-styles-background-color: ${String(iconDotComputedStyles.value.backgroundColor)};--va-icon-background-computed-styles-background-color: ${String(iconBackgroundComputedStyles.value.backgroundColor)}`)
      }, {
        default: withCtx(({ ariaAttributes }) => [
          createBaseVNode("div", mergeProps({
            ref: "container",
            class: "va-radio",
            role: roleComputed.value
          }, ariaAttributes), [
            (openBlock(true), createElementBlock(Fragment, null, renderList(computedOptions.value, (option, index) => {
              return openBlock(), createElementBlock("label", {
                key: index,
                class: normalizeClass([radioClass(option), "va-radio__square"])
              }, [
                createBaseVNode("input", mergeProps({
                  ref_for: true,
                  ref: "input",
                  class: "va-radio__input",
                  type: "radio",
                  role: "radio",
                  value: isChecked(option),
                  checked: isChecked(option),
                  "aria-checked": isChecked(option)
                }, { ...inputAttributesComputed(option), ...ariaAttributes }, {
                  onChange: ($event) => selectOption(unref(getValue)(option), $event),
                  onFocus: _cache[0] || (_cache[0] = //@ts-ignore
                  (...args) => unref(onFocus) && unref(onFocus)(...args)),
                  onBlur: _cache[1] || (_cache[1] = //@ts-ignore
                  (...args) => unref(onBlur) && unref(onBlur)(...args))
                }), null, 16, _hoisted_220),
                renderSlot(_ctx.$slots, "icon", normalizeProps(guardReactiveProps({
                  value: isChecked(option),
                  text: getText(option),
                  disabled: getDisabled(option),
                  index
                })), () => [
                  _hoisted_314
                ]),
                getText(option) || _ctx.$slots.default ? (openBlock(), createElementBlock("div", {
                  key: 0,
                  ref_for: true,
                  ref: "label",
                  class: "va-radio__text"
                }, [
                  renderSlot(_ctx.$slots, "default", normalizeProps(guardReactiveProps({
                    value: isChecked(option),
                    text: getText(option),
                    disabled: getDisabled(option),
                    index
                  })), () => [
                    createTextVNode(toDisplayString(getText(option)), 1)
                  ])
                ], 512)) : createCommentVNode("", true)
              ], 2);
            }), 128))
          ], 16, _hoisted_145)
        ]),
        _: 3
      }, 8, ["disabled", "success", "messages", "error", "error-messages", "error-count", "onBlur", "style"]);
    };
  }
});

// node_modules/vuestic-ui/dist/es/src/components/va-radio/index.js
var VaRadio = withConfigTransport$1(_sfc_main82);

// node_modules/vuestic-ui/dist/es/src/components/va-switch/VaSwitch.vue_vue_type_script_setup_true_lang.js
import "D:/Github/DONGTIAN/ui/node_modules/vuestic-ui/dist/es/VaSwitch.css";
var _hoisted_146 = { class: "va-switch__inner" };
var _hoisted_221 = { class: "va-switch__checker-wrapper" };
var _hoisted_315 = { class: "va-switch__checker" };
var _hoisted_48 = { class: "va-switch__checker-circle" };
var _hoisted_57 = ["id"];
var _sfc_main83 = defineComponent({
  ...{
    name: "VaSwitch"
  },
  __name: "VaSwitch",
  props: {
    ...useSelectableProps,
    ...useComponentPresetProp,
    id: { type: String, default: "" },
    name: { type: String, default: "" },
    modelValue: {
      type: [Number, Boolean, Array, String, Object],
      default: false
    },
    trueLabel: { type: String, default: null },
    falseLabel: { type: String, default: null },
    trueInnerLabel: { type: String, default: null },
    falseInnerLabel: { type: String, default: null },
    ariaLabel: useTranslationProp("$t:switch"),
    color: { type: String, default: "primary" },
    offColor: { type: String, default: "background-element" },
    size: {
      type: String,
      default: "medium",
      validator: (value) => ["medium", "small", "large"].includes(value)
    }
  },
  emits: [
    ...useSelectableEmits,
    "focus",
    "blur",
    "update:modelValue"
  ],
  setup(__props, { expose: __expose, emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const elements = {
      container: shallowRef(),
      input: shallowRef(),
      label: shallowRef()
    };
    const { getColor } = useColors();
    const { hasKeyboardFocus, keyboardFocusListeners } = useKeyboardOnlyFocus();
    const {
      isChecked,
      computedError,
      isIndeterminate,
      computedErrorMessages,
      validationAriaAttributes,
      toggleSelection,
      onBlur,
      onFocus,
      reset,
      focus,
      isDirty,
      isTouched,
      isLoading,
      isError
    } = useSelectable(props, emit, elements);
    const computedBackground = computed(() => getColor(isChecked.value ? props.color : props.offColor));
    const { textColorComputed } = useTextColor(computedBackground);
    const computedInnerLabel = computed(() => {
      if (props.trueInnerLabel && isChecked.value) {
        return props.trueInnerLabel;
      }
      if (props.falseInnerLabel && !isChecked.value) {
        return props.falseInnerLabel;
      }
      return "";
    });
    const computedLabel = computed(() => {
      if (props.trueLabel && isChecked.value) {
        return props.trueLabel;
      }
      if (props.falseLabel && !isChecked.value) {
        return props.falseLabel;
      }
      return props.label;
    });
    const computedClass = useBem("va-switch", () => ({
      ...pick(props, ["readonly", "disabled", "leftLabel"]),
      checked: isChecked.value,
      indeterminate: isIndeterminate.value,
      small: props.size === "small",
      large: props.size === "large",
      error: computedError.value,
      keyboardFocus: hasKeyboardFocus.value
    }));
    const styleComputed = computed(() => ({
      lineHeight: computedErrorMessages.value.length ? 1 : 0
    }));
    const progressCircleSize = computed(() => {
      const size3 = { small: "15px", medium: "20px", large: "25px" };
      return size3[props.size];
    });
    const trackStyle = computed(() => ({
      borderColor: computedError.value ? getColor("danger") : "",
      backgroundColor: computedBackground.value
    }));
    const labelStyle = computed(() => ({
      color: computedError.value ? getColor("danger") : ""
    }));
    const trackLabelStyle = computed(() => ({
      color: textColorComputed.value,
      "text-align": isChecked.value ? "left" : "right"
    }));
    const slots = useSlots();
    const componentId = useComponentUuid();
    const ariaLabelIdComputed = computed(() => `aria-label-id-${componentId}`);
    const inputAttributesComputed = computed(() => ({
      id: props.id || void 0,
      name: props.name || void 0,
      disabled: props.disabled,
      readonly: props.readonly,
      "aria-disabled": props.disabled,
      "aria-readonly": props.readonly,
      "aria-checked": !!props.modelValue,
      "aria-label": !slots.default ? props.ariaLabel : void 0,
      "aria-labelledby": computedLabel.value || slots.default ? ariaLabelIdComputed.value : void 0,
      tabindex: props.disabled ? -1 : 0,
      checked: isChecked.value,
      ...validationAriaAttributes.value
    }));
    const onEnterKeyPress = () => {
      var _a2;
      (_a2 = elements.input.value) == null ? void 0 : _a2.click();
    };
    const input = elements.input;
    __expose({
      focus,
      reset,
      isDirty,
      isTouched,
      isLoading,
      isError
    });
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(_sfc_main3), {
        class: normalizeClass(["va-switch", unref(computedClass)]),
        style: normalizeStyle(styleComputed.value),
        disabled: _ctx.$props.disabled,
        success: _ctx.$props.success,
        messages: _ctx.$props.messages,
        error: unref(computedError),
        "error-messages": unref(computedErrorMessages),
        "error-count": _ctx.$props.errorCount
      }, {
        default: withCtx(() => [
          createBaseVNode("div", {
            ref: "container",
            class: "va-switch__container",
            tabindex: "-1",
            onBlur: _cache[5] || (_cache[5] = //@ts-ignore
            (...args) => unref(onBlur) && unref(onBlur)(...args)),
            onClick: _cache[6] || (_cache[6] = //@ts-ignore
            (...args) => unref(toggleSelection) && unref(toggleSelection)(...args))
          }, [
            createBaseVNode("div", _hoisted_146, [
              createBaseVNode("input", mergeProps({
                ref_key: "input",
                ref: input,
                type: "checkbox",
                class: "va-switch__input",
                role: "switch"
              }, inputAttributesComputed.value, toHandlers(unref(keyboardFocusListeners), true), {
                onFocus: _cache[0] || (_cache[0] = //@ts-ignore
                (...args) => unref(onFocus) && unref(onFocus)(...args)),
                onBlur: _cache[1] || (_cache[1] = //@ts-ignore
                (...args) => unref(onBlur) && unref(onBlur)(...args)),
                onKeypress: withKeys(onEnterKeyPress, ["enter"])
              }), null, 16),
              createBaseVNode("div", {
                class: "va-switch__track",
                "aria-hidden": "true",
                style: normalizeStyle(trackStyle.value)
              }, [
                computedInnerLabel.value || _ctx.$slots.innerLabel ? (openBlock(), createElementBlock("div", {
                  key: 0,
                  class: "va-switch__track-label",
                  style: normalizeStyle(trackLabelStyle.value)
                }, [
                  renderSlot(_ctx.$slots, "innerLabel", {}, () => [
                    createTextVNode(toDisplayString(computedInnerLabel.value), 1)
                  ])
                ], 4)) : createCommentVNode("", true),
                createBaseVNode("div", _hoisted_221, [
                  createBaseVNode("div", _hoisted_315, [
                    renderSlot(_ctx.$slots, "checker", normalizeProps(guardReactiveProps({ value: unref(isChecked) })), () => [
                      createBaseVNode("div", _hoisted_48, [
                        _ctx.$props.loading ? (openBlock(), createBlock(unref(VaProgressCircle), {
                          key: 0,
                          indeterminate: "",
                          size: progressCircleSize.value,
                          color: trackStyle.value.backgroundColor
                        }, null, 8, ["size", "color"])) : createCommentVNode("", true)
                      ])
                    ])
                  ])
                ])
              ], 4)
            ]),
            computedLabel.value || _ctx.$slots.default ? (openBlock(), createElementBlock("div", {
              key: 0,
              ref: "label",
              class: "va-switch__label",
              style: normalizeStyle(labelStyle.value),
              id: ariaLabelIdComputed.value,
              onBlur: _cache[2] || (_cache[2] = //@ts-ignore
              (...args) => unref(onBlur) && unref(onBlur)(...args)),
              onClick: _cache[3] || (_cache[3] = //@ts-ignore
              (...args) => unref(toggleSelection) && unref(toggleSelection)(...args)),
              onKeydown: _cache[4] || (_cache[4] = withKeys(withModifiers(
                //@ts-ignore
                (...args) => unref(toggleSelection) && unref(toggleSelection)(...args),
                ["stop"]
              ), ["enter"]))
            }, [
              renderSlot(_ctx.$slots, "default", {}, () => [
                createTextVNode(toDisplayString(computedLabel.value), 1)
              ])
            ], 44, _hoisted_57)) : createCommentVNode("", true)
          ], 544)
        ]),
        _: 3
      }, 8, ["class", "style", "disabled", "success", "messages", "error", "error-messages", "error-count"]);
    };
  }
});

// node_modules/vuestic-ui/dist/es/src/components/va-switch/index.js
var VaSwitch = withConfigTransport$1(_sfc_main83);

// node_modules/vuestic-ui/dist/es/src/composables/useArrayRefs.js
var useArrayRefs = () => {
  const itemRefs = shallowRef([]);
  const setItemRef = (el) => {
    if (!el) {
      return;
    }
    itemRefs.value.push(el);
  };
  const setItemRefByIndex = (index) => (el) => {
    if (!el) {
      return;
    }
    itemRefs.value[index] = el;
  };
  onBeforeUpdate(() => {
    itemRefs.value = [];
  });
  return {
    itemRefs,
    setItemRef,
    setItemRefByIndex
  };
};

// node_modules/vuestic-ui/dist/es/src/components/va-option-list/VaOptionList.vue_vue_type_script_setup_true_lang.js
import "D:/Github/DONGTIAN/ui/node_modules/vuestic-ui/dist/es/VaOptionList.css";
var _hoisted_147 = { class: "va-option-list__list" };
var _sfc_main84 = defineComponent({
  ...{
    name: "VaOptionList"
  },
  __name: "VaOptionList",
  props: {
    ...useComponentPresetProp,
    ...useSelectableListProps,
    ...useValidationProps,
    ...useStatefulProps,
    type: {
      type: String,
      default: "checkbox",
      validator: (type) => ["radio", "checkbox", "switch"].includes(type)
    },
    disabled: { type: Boolean, default: false },
    readonly: { type: Boolean, default: false },
    defaultValue: { type: [String, Number, Boolean, Object, Array] },
    name: { type: String, default: "" },
    color: { type: String, default: "primary" },
    leftLabel: { type: Boolean, default: false },
    modelValue: { type: [String, Number, Boolean, Object, Array] }
  },
  emits: [...useStatefulEmits, ...useValidationEmits, "clear"],
  setup(__props, { expose: __expose, emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const { valueComputed } = useStateful(props, emit, "modelValue", { defaultValue: props.defaultValue });
    const { getValue, getText, getTrackBy, getDisabled } = useSelectableList(props);
    const { itemRefs, setItemRef } = useArrayRefs();
    const isRadio = computed(() => props.type === "radio");
    const selectedValue = computed({
      get() {
        const value = isRadio.value ? null : [];
        return valueComputed.value || value;
      },
      set(value) {
        if (props.readonly) {
          return;
        }
        if (isRadio.value && !Array.isArray(value)) {
          valueComputed.value = value ? getValue(value) : value;
        } else {
          valueComputed.value = Array.isArray(value) ? value.map(getValue) : [value ? getValue(value) : value];
        }
      }
    });
    const isDisabled = (option) => props.disabled || getDisabled(option);
    const reset = () => withoutValidation(() => {
      valueComputed.value = null;
      emit("clear");
      resetValidation();
    });
    const focus = () => {
      const firstActiveEl = Array.isArray(itemRefs.value) && itemRefs.value.find((el) => !el.disabled);
      if (firstActiveEl && typeof firstActiveEl.focus === "function") {
        firstActiveEl.focus();
      }
    };
    const {
      computedError,
      computedErrorMessages,
      withoutValidation,
      resetValidation
    } = useValidation(props, emit, { reset, focus, value: valueComputed });
    const computedProps = computed(() => pick(props, ["name", "color", "readonly", "leftLabel"]));
    onMounted(() => {
      if (isDev && props.type !== "radio" && !Array.isArray(props.modelValue)) {
        console.warn(`Prop 'modelValue = ${props.modelValue}' has not a proper type!
 For component property 'type = ${props.type}' it must be of type 'array'.`);
      }
    });
    __expose({
      focus,
      reset
    });
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(_sfc_main3), {
        error: unref(computedError),
        "error-messages": unref(computedErrorMessages),
        "error-count": _ctx.$props.errorCount
      }, {
        default: withCtx(() => [
          createBaseVNode("ul", _hoisted_147, [
            (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.$props.options, (option) => {
              return openBlock(), createElementBlock("li", {
                key: unref(getTrackBy)(option)
              }, [
                renderSlot(_ctx.$slots, "default", normalizeProps(guardReactiveProps({ option, selectedValue: selectedValue.value, isDisabled, getText: unref(getText), getValue: unref(getValue) })), () => [
                  _ctx.$props.type === "radio" ? (openBlock(), createBlock(unref(VaRadio), mergeProps({
                    key: 0,
                    ref_for: true,
                    ref: unref(setItemRef),
                    modelValue: selectedValue.value,
                    "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => selectedValue.value = $event),
                    label: unref(getText)(option),
                    disabled: isDisabled(option),
                    option: unref(getValue)(option)
                  }, computedProps.value), null, 16, ["modelValue", "label", "disabled", "option"])) : _ctx.$props.type === "checkbox" ? (openBlock(), createBlock(unref(VaCheckbox), mergeProps({
                    key: 1,
                    ref_for: true,
                    ref: unref(setItemRef),
                    modelValue: selectedValue.value,
                    "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => selectedValue.value = $event),
                    label: unref(getText)(option),
                    disabled: isDisabled(option),
                    "array-value": unref(getValue)(option)
                  }, computedProps.value), null, 16, ["modelValue", "label", "disabled", "array-value"])) : (openBlock(), createBlock(unref(VaSwitch), mergeProps({
                    key: 2,
                    ref_for: true,
                    ref: unref(setItemRef),
                    modelValue: selectedValue.value,
                    "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => selectedValue.value = $event),
                    label: unref(getText)(option),
                    disabled: isDisabled(option),
                    "array-value": unref(getValue)(option)
                  }, computedProps.value), null, 16, ["modelValue", "label", "disabled", "array-value"]))
                ])
              ]);
            }), 128))
          ])
        ]),
        _: 3
      }, 8, ["error", "error-messages", "error-count"]);
    };
  }
});

// node_modules/vuestic-ui/dist/es/src/components/va-option-list/index.js
var VaOptionList = withConfigTransport$1(_sfc_main84);

// node_modules/vuestic-ui/dist/es/src/components/va-pagination/setPaginationRange.js
var setPaginationRange = (currentPage = 1, visiblePages, pages, includeBoundary = false) => {
  let start = 0;
  if (pages === 0) {
    pages = 1;
  }
  if (visiblePages > pages) {
    visiblePages = pages;
  }
  if (visiblePages === 0) {
    start = 1;
    visiblePages = pages > 10 ? 10 : pages;
  } else {
    const paginationMiddlePage = visiblePages / 2;
    if (currentPage - paginationMiddlePage <= 0 || currentPage > pages) {
      start = 1;
    } else {
      start = currentPage + paginationMiddlePage > pages ? pages - visiblePages + 1 : Math.ceil(currentPage - paginationMiddlePage);
    }
  }
  const range = [];
  for (let i = 0; i < visiblePages; i++) {
    range.push(start + i);
  }
  if (includeBoundary && visiblePages < 7) {
    pages >= 7 && warn(
      "[va-pagination] To work in a proper way, the `boundaryNumbers` prop needs at least 7 visible pages to be set via the `visiblePages` prop (first, last, 2 boundaries, current, previous, next)."
    );
  } else if (includeBoundary) {
    start !== 1 && range.splice(0, 2, 1, "...");
    range[range.length - 1] !== pages && range.splice(-2, 2, "...", pages);
  }
  return range;
};

// node_modules/vuestic-ui/dist/es/src/components/va-pagination/VaPagination.vue_vue_type_script_setup_true_lang.js
import "D:/Github/DONGTIAN/ui/node_modules/vuestic-ui/dist/es/VaPagination.css";
var _hoisted_148 = ["aria-label", "onKeydown"];
var _hoisted_222 = ["aria-label"];
var _sfc_main85 = defineComponent({
  ...{
    name: "VaPagination"
  },
  __name: "VaPagination",
  props: {
    ...useStatefulProps,
    ...useComponentPresetProp,
    modelValue: { type: Number, default: 1 },
    visiblePages: { type: [Number, String], default: 0 },
    pages: { type: [Number, String], default: 0 },
    disabled: { type: Boolean, default: false },
    color: { type: String, default: "primary" },
    size: {
      type: String,
      default: "medium",
      validator: (v) => ["small", "medium", "large"].includes(v)
    },
    boundaryLinks: { type: Boolean, default: true },
    boundaryNumbers: { type: Boolean, default: false },
    directionLinks: { type: Boolean, default: true },
    input: { type: Boolean, default: false },
    hideOnSinglePage: { type: Boolean, default: false },
    total: { type: [Number, String], default: null },
    pageSize: { type: [Number, String], default: null },
    boundaryIconLeft: { type: String, default: "va-arrow-first" },
    boundaryIconRight: { type: String, default: "va-arrow-last" },
    directionIconLeft: { type: String, default: "va-arrow-left" },
    directionIconRight: { type: String, default: "va-arrow-right" },
    gapped: { type: Boolean, default: false },
    borderColor: { type: String, default: "" },
    rounded: { type: Boolean, default: false },
    /** @deprecated Use activeButtonProps="{ color: 'myColor' }" */
    activePageColor: { type: String, default: "" },
    activeButtonProps: { type: Object, default: () => ({}) },
    buttonProps: { type: Object, default: () => ({}) },
    buttonsPreset: { type: String, default: "primary" },
    ariaLabel: useTranslationProp("$t:pagination"),
    ariaGoToTheFirstPageLabel: useTranslationProp("$t:goToTheFirstPage"),
    ariaGoToPreviousPageLabel: useTranslationProp("$t:goToPreviousPage"),
    ariaGoToSpecificPageLabel: useTranslationProp("$t:goToSpecificPage"),
    ariaGoToSpecificPageInputLabel: useTranslationProp("$t:goToSpecificPageInput"),
    ariaGoToNextPageLabel: useTranslationProp("$t:goNextPage"),
    ariaGoToLastPageLabel: useTranslationProp("$t:goLastPage")
  },
  emits: [...useStatefulEmits],
  setup(__props, { expose: __expose, emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const htmlInput = shallowRef();
    const inputValue = ref("");
    const usesTotal = computed(() => !!((totalComputed.value || totalComputed.value === 0) && pageSizeComputed.value));
    const { valueComputed } = useStateful(props, emit);
    const currentValue = computed({
      get: () => usesTotal.value ? Math.ceil(valueComputed.value / pageSizeComputed.value) || 1 : valueComputed.value,
      set: (value) => {
        valueComputed.value = value;
      }
    });
    const visiblePagesComputed = useNumericProp("visiblePages");
    const pagesComputed = useNumericProp("pages");
    const totalComputed = useNumericProp("total");
    const pageSizeComputed = useNumericProp("pageSize");
    const paginationRange = computed(() => {
      const { boundaryNumbers } = props;
      const value = currentValue.value || 1;
      const totalPages = usesTotal.value ? Math.ceil(totalComputed.value / pageSizeComputed.value) : pagesComputed.value;
      return setPaginationRange(value, visiblePagesComputed.value, totalPages, boundaryNumbers);
    });
    const lastPage = computed(() => usesTotal.value ? Math.ceil(totalComputed.value / pageSizeComputed.value) || 1 : +pagesComputed.value);
    const isLastPageNotVisible = computed(() => !!visiblePagesComputed.value && lastPage.value > visiblePagesComputed.value || props.input);
    const showBoundaryLinks = computed(() => {
      const { boundaryLinks, boundaryNumbers } = props;
      return isLastPageNotVisible.value && boundaryLinks && !boundaryNumbers;
    });
    const showDirectionLinks = computed(() => isLastPageNotVisible.value && props.directionLinks);
    const showPagination = computed(() => lastPage.value > 1 || !props.hideOnSinglePage && lastPage.value <= 1);
    const focusInput = () => {
      inputValue.value = String(currentValue.value);
      nextTick(() => {
        var _a2;
        return (_a2 = htmlInput.value) == null ? void 0 : _a2.setSelectionRange(0, htmlInput.value.value.length);
      });
    };
    const { setItemRefByIndex, itemRefs } = useArrayRefs();
    const onUserInput = (pageNum) => {
      var _a2;
      if (pageNum === "..." || pageNum === currentValue.value) {
        return;
      }
      const limitedPageNum = clamp(pageNum, 1, lastPage.value);
      currentValue.value = usesTotal.value ? (limitedPageNum - 1) * pageSizeComputed.value + 1 : limitedPageNum;
      (_a2 = itemRefs.value[pageNum - 1]) == null ? void 0 : _a2.focus();
    };
    const resetInput = () => {
      var _a2;
      inputValue.value = "";
      (_a2 = htmlInput.value) == null ? void 0 : _a2.blur();
    };
    const changeValue = () => {
      if (+inputValue.value === currentValue.value) {
        resetInput();
      }
      if (!inputValue.value.length) {
        return;
      }
      let pageNum = Number.parseInt(inputValue.value);
      switch (true) {
        case pageNum < 1:
          pageNum = 1;
          break;
        case pageNum > lastPage.value:
          pageNum = lastPage.value;
          break;
        case isNaN(pageNum):
          pageNum = currentValue.value;
          break;
      }
      onUserInput(pageNum);
      resetInput();
    };
    const { getColor, colorToRgba: colorToRgba2 } = useColors();
    const inputBorderColorComputed = computed(() => {
      const { color, buttonsPreset } = toRefs(props);
      if (!color.value) {
        return "transparent";
      }
      switch (buttonsPreset.value) {
        case "default":
          return getColor(color.value);
        case void 0:
        case "primary":
          return colorToRgba2(getColor(color.value), 0.1);
        default:
          return "transparent";
      }
    });
    const inputStyleComputed = computed(() => ({
      cursor: "default",
      color: getColor(props.color),
      opacity: props.disabled ? 0.4 : 1,
      borderColor: inputBorderColorComputed.value
    }));
    watch([usesTotal, () => pagesComputed.value], () => {
      if (isDev && usesTotal.value && pagesComputed.value) {
        throw new Error("Please, use either `total` and `page-size` props, or `pages`.");
      }
    });
    const inputAttributesComputed = computed(() => ({
      disabled: props.disabled,
      placeholder: `${currentValue.value}/${lastPage.value}`
    }));
    const buttonPropsComputed = computed(() => ({
      size: props.size,
      preset: props.buttonsPreset,
      color: props.color,
      borderColor: props.borderColor,
      round: props.rounded,
      ...props.buttonProps
    }));
    const currentPageButtonProps = computed(() => ({
      preset: props.buttonsPreset === "default" ? "primary" : "default",
      color: props.activePageColor || props.color,
      ...props.activeButtonProps
    }));
    const getPageButtonProps = (n) => {
      if (!isNaN(+n) && n === currentValue.value) {
        return Object.assign({}, buttonPropsComputed.value, currentPageButtonProps.value);
      }
      return buttonPropsComputed.value;
    };
    const isStandAloneInput = computed(() => props.input && !props.boundaryLinks && !props.directionLinks);
    const inputClassComputed = useBem("va-pagination__input", () => ({
      sm: props.size === "small" && isStandAloneInput.value,
      md: props.size === "medium" && isStandAloneInput.value,
      lg: props.size === "large" && isStandAloneInput.value,
      auto: !isStandAloneInput.value
    }));
    const classComputed = useBem("va-pagination", () => ({
      ...pick(props, ["gapped", "rounded", "disabled"]),
      bordered: !!props.borderColor
    }));
    const goNextPage = () => onUserInput(currentValue.value + 1);
    const goPrevPage = () => onUserInput(currentValue.value - 1);
    const { tp } = useTranslation();
    __expose({
      goNextPage,
      goPrevPage
    });
    return (_ctx, _cache) => {
      return showPagination.value ? (openBlock(), createElementBlock("nav", {
        key: 0,
        class: normalizeClass(["va-pagination", unref(classComputed)]),
        "aria-label": unref(tp)(_ctx.$props.ariaLabel),
        onKeydown: [
          withKeys(withModifiers(goPrevPage, ["stop"]), ["left"]),
          withKeys(withModifiers(goNextPage, ["stop"]), ["right"]),
          withKeys(withModifiers(goPrevPage, ["stop"]), ["up"]),
          withKeys(withModifiers(goNextPage, ["stop"]), ["down"])
        ]
      }, [
        showBoundaryLinks.value ? renderSlot(_ctx.$slots, "firstPageLink", normalizeProps(mergeProps({ key: 0 }, { onClick: () => onUserInput(1), disabled: _ctx.$props.disabled || currentValue.value === 1 })), () => [
          showBoundaryLinks.value ? (openBlock(), createBlock(unref(VaButton), mergeProps({
            key: 0,
            "aria-label": unref(tp)(_ctx.$props.ariaGoToTheFirstPageLabel),
            disabled: _ctx.$props.disabled || currentValue.value === 1,
            icon: _ctx.$props.boundaryIconLeft
          }, buttonPropsComputed.value, {
            onClick: _cache[0] || (_cache[0] = ($event) => onUserInput(1))
          }), null, 16, ["aria-label", "disabled", "icon"])) : createCommentVNode("", true)
        ]) : createCommentVNode("", true),
        showDirectionLinks.value ? renderSlot(_ctx.$slots, "prevPageLink", normalizeProps(mergeProps({ key: 1 }, { onClick: goPrevPage, disabled: _ctx.$props.disabled || currentValue.value === 1 })), () => [
          showDirectionLinks.value ? (openBlock(), createBlock(unref(VaButton), mergeProps({
            key: 0,
            "aria-label": unref(tp)(_ctx.$props.ariaGoToPreviousPageLabel),
            disabled: _ctx.$props.disabled || currentValue.value === 1,
            icon: _ctx.$props.directionIconLeft
          }, buttonPropsComputed.value, { onClick: goPrevPage }), null, 16, ["aria-label", "disabled", "icon"])) : createCommentVNode("", true)
        ]) : createCommentVNode("", true),
        !_ctx.$props.input ? renderSlot(_ctx.$slots, "default", { key: 2 }, () => [
          (openBlock(true), createElementBlock(Fragment, null, renderList(paginationRange.value, (n, i) => {
            return openBlock(), createBlock(unref(VaButton), mergeProps({
              key: i,
              ref_for: true,
              ref: unref(setItemRefByIndex)(i),
              class: { "va-button--ellipsis": n === "...", "va-button--current": n === currentValue.value },
              "aria-label": unref(tp)(_ctx.$props.ariaGoToSpecificPageLabel, { page: n }),
              "aria-current": n === currentValue.value,
              disabled: _ctx.$props.disabled || n === "..."
            }, getPageButtonProps(n), {
              onClick: ($event) => onUserInput(n)
            }), {
              default: withCtx(() => [
                createTextVNode(toDisplayString(n), 1)
              ]),
              _: 2
            }, 1040, ["class", "aria-label", "aria-current", "disabled", "onClick"]);
          }), 128))
        ]) : withDirectives((openBlock(), createElementBlock("input", mergeProps({
          key: 3,
          "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => inputValue.value = $event),
          ref_key: "htmlInput",
          ref: htmlInput,
          class: ["va-pagination__input va-button", unref(inputClassComputed)],
          "aria-label": unref(tp)(_ctx.$props.ariaGoToSpecificPageInputLabel),
          style: inputStyleComputed.value
        }, inputAttributesComputed.value, {
          onKeydown: withKeys(changeValue, ["enter"]),
          onFocus: focusInput,
          onBlur: changeValue
        }), null, 16, _hoisted_222)), [
          [vModelDynamic, inputValue.value]
        ]),
        showDirectionLinks.value ? renderSlot(_ctx.$slots, "nextPageLink", normalizeProps(mergeProps({ key: 4 }, { onClick: goNextPage, disabled: _ctx.$props.disabled || currentValue.value === lastPage.value })), () => [
          showDirectionLinks.value ? (openBlock(), createBlock(unref(VaButton), mergeProps({
            key: 0,
            "aria-label": unref(tp)(_ctx.$props.ariaGoToNextPageLabel),
            disabled: _ctx.$props.disabled || currentValue.value === lastPage.value,
            icon: _ctx.$props.directionIconRight
          }, buttonPropsComputed.value, { onClick: goNextPage }), null, 16, ["aria-label", "disabled", "icon"])) : createCommentVNode("", true)
        ]) : createCommentVNode("", true),
        showBoundaryLinks.value ? renderSlot(_ctx.$slots, "lastPageLink", normalizeProps(mergeProps({ key: 5 }, { onClick: () => onUserInput(lastPage.value), disabled: _ctx.$props.disabled || currentValue.value === lastPage.value })), () => [
          showBoundaryLinks.value ? (openBlock(), createBlock(unref(VaButton), mergeProps({
            key: 0,
            "aria-label": unref(tp)(_ctx.$props.ariaGoToLastPageLabel),
            disabled: _ctx.$props.disabled || currentValue.value === lastPage.value,
            icon: _ctx.$props.boundaryIconRight
          }, buttonPropsComputed.value, {
            onClick: _cache[2] || (_cache[2] = ($event) => onUserInput(lastPage.value))
          }), null, 16, ["aria-label", "disabled", "icon"])) : createCommentVNode("", true)
        ]) : createCommentVNode("", true)
      ], 42, _hoisted_148)) : createCommentVNode("", true);
    };
  }
});

// node_modules/vuestic-ui/dist/es/src/components/va-pagination/index.js
var VaPagination = withConfigTransport$1(_sfc_main85);

// node_modules/vuestic-ui/dist/es/src/composables/useScrollParent.js
var useScrollParent = () => {
  const window2 = useWindow();
  const fakeWindow = new Proxy(window2.value || {}, {
    get: (target, key, rec) => {
      var _a2, _b;
      if (key === "scrollTop") {
        return (_a2 = window2.value) == null ? void 0 : _a2.scrollY;
      }
      if (key === "scrollLeft") {
        return (_b = window2.value) == null ? void 0 : _b.scrollX;
      }
      const value = Reflect.get(target, key, rec);
      if (typeof value === "function") {
        return value.bind(target);
      }
      return value;
    }
  });
  const getScrollableParent = (element) => {
    if (!element) {
      return fakeWindow;
    }
    if (element.scrollHeight > element.clientHeight) {
      return element;
    }
    return getScrollableParent(element.parentElement);
  };
  return { getScrollableParent };
};

// node_modules/vuestic-ui/dist/es/src/components/va-parallax/VaParallax.vue_vue_type_script_setup_true_lang.js
import "D:/Github/DONGTIAN/ui/node_modules/vuestic-ui/dist/es/VaParallax.css";
var _hoisted_149 = { class: "va-parallax__image-container" };
var _hoisted_223 = ["src", "alt"];
var _hoisted_316 = { class: "va-parallax__item-container" };
var _sfc_main86 = defineComponent({
  ...{
    name: "VaParallax"
  },
  __name: "VaParallax",
  props: {
    ...useComponentPresetProp,
    target: { type: [Object, String] },
    src: { type: String, default: "", required: true },
    alt: { type: String, default: "parallax" },
    height: { type: [Number, String], default: 400 },
    reversed: { type: Boolean, default: false },
    speed: {
      type: [Number, String],
      default: 0.5,
      validator: (value) => {
        const num = Number(value);
        return num >= 0 && num <= 1;
      }
    }
  },
  setup(__props) {
    const props = __props;
    const rootElement = shallowRef();
    const img = shallowRef();
    const elOffsetTop = ref(0);
    const parallax = ref(0);
    const parallaxDist = ref(0);
    const percentScrolled = ref(0);
    const scrollTop = ref(0);
    const windowHeight = ref(0);
    const windowBottom = ref(0);
    const isLoaded = ref(false);
    const computedWrapperStyles = computed(() => ({ height: heightComputed.value + "px" }));
    const computedImgStyles = computed(() => ({
      display: "block",
      transform: `translate(-50%, ${parallax.value}px)`,
      opacity: isLoaded.value ? 1 : 0,
      top: props.reversed ? 0 : "auto"
    }));
    const { getScrollableParent } = useScrollParent();
    const targetElement = computed(() => {
      var _a2;
      if (!props.target) {
        return getScrollableParent((_a2 = rootElement.value) == null ? void 0 : _a2.parentElement);
      }
      if (props.target instanceof HTMLElement) {
        return props.target;
      }
      const element = document.querySelector(props.target);
      if (element) {
        return element;
      }
      warn("VaParallax target prop got wrong selector. Target is null");
      return null;
    });
    const imgHeight = computed(() => {
      var _a2;
      return ((_a2 = img.value) == null ? void 0 : _a2.naturalHeight) || 0;
    });
    const heightComputed = useNumericProp("height");
    const speedComputed = useNumericProp("speed");
    const calcDimensions = () => {
      var _a2, _b;
      const offset3 = ((_a2 = rootElement.value) == null ? void 0 : _a2.getBoundingClientRect()) || { top: 0 };
      scrollTop.value = ((_b = targetElement.value) == null ? void 0 : _b.scrollTop) || 0;
      parallaxDist.value = imgHeight.value - heightComputed.value;
      elOffsetTop.value = offset3.top + scrollTop.value;
      windowHeight.value = window.innerHeight;
      windowBottom.value = scrollTop.value + windowHeight.value;
    };
    const translate = () => {
      calcDimensions();
      percentScrolled.value = (windowBottom.value - elOffsetTop.value) / (heightComputed.value + windowHeight.value);
      parallax.value = Math.round(parallaxDist.value * percentScrolled.value) * speedComputed.value;
      if (props.reversed) {
        parallax.value = -parallax.value;
      }
    };
    const addEventListeners = () => {
      var _a2, _b;
      (_a2 = targetElement.value) == null ? void 0 : _a2.addEventListener("scroll", translate);
      (_b = targetElement.value) == null ? void 0 : _b.addEventListener("resize", translate);
    };
    const removeEventListeners = () => {
      var _a2, _b;
      (_a2 = targetElement.value) == null ? void 0 : _a2.removeEventListener("scroll", translate);
      (_b = targetElement.value) == null ? void 0 : _b.removeEventListener("resize", translate);
    };
    const initImage = () => {
      var _a2, _b;
      if ((_a2 = img.value) == null ? void 0 : _a2.complete) {
        translate();
        addEventListeners();
      } else {
        (_b = img.value) == null ? void 0 : _b.addEventListener("load", () => {
          translate();
          addEventListeners();
        }, false);
      }
      isLoaded.value = true;
    };
    onMounted(initImage);
    onBeforeUnmount(removeEventListeners);
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        ref_key: "rootElement",
        ref: rootElement,
        class: "va-parallax",
        style: normalizeStyle(computedWrapperStyles.value)
      }, [
        createBaseVNode("div", _hoisted_149, [
          createBaseVNode("img", {
            ref_key: "img",
            ref: img,
            class: "va-parallax__image",
            src: _ctx.$props.src,
            alt: _ctx.$props.alt,
            style: normalizeStyle(computedImgStyles.value)
          }, null, 12, _hoisted_223)
        ]),
        createBaseVNode("div", _hoisted_316, [
          renderSlot(_ctx.$slots, "default")
        ])
      ], 4);
    };
  }
});

// node_modules/vuestic-ui/dist/es/src/components/va-parallax/index.js
var VaParallax = withConfigTransport$1(_sfc_main86);

// node_modules/vuestic-ui/dist/es/src/components/va-popover/VaPopover.vue_vue_type_script_setup_true_lang.js
import "D:/Github/DONGTIAN/ui/node_modules/vuestic-ui/dist/es/VaPopover.css";
var _hoisted_150 = {
  key: 0,
  "aria-hidden": "true",
  class: "va-popover__icon"
};
var _hoisted_224 = { key: 1 };
var _hoisted_317 = {
  key: 0,
  class: "va-popover__title"
};
var _hoisted_49 = {
  key: 1,
  class: "va-popover__body"
};
var VaDropdownProps3 = extractComponentProps(VaDropdown, ["closeOnClickOutside"]);
var _sfc_main87 = defineComponent({
  ...{
    name: "VaPopover"
  },
  __name: "VaPopover",
  props: {
    ...VaDropdownProps3,
    ...useComponentPresetProp,
    trigger: { ...VaDropdownProps3.trigger, default: ["hover", "enter", "space", "arrow-down", "arrow-up"] },
    color: { type: String, default: "#1b1a1f" },
    // TODO: Make sure add this color to pallete
    textColor: { type: String },
    icon: { type: String, default: "" },
    title: { type: String, default: "" },
    message: { type: String, default: "" },
    autoHide: { type: Boolean, default: true },
    offset: { type: [Array, Number], default: 4 },
    contentClass: { type: String, default: "" }
  },
  setup(__props) {
    const props = __props;
    const VaDropdownPropValues = filterComponentProps(VaDropdownProps3);
    const { getColor, getBoxShadowColor: getBoxShadowColor2 } = useColors();
    const slots = useSlots();
    const { textColorComputed } = useTextColor(computed(() => getColor(props.color)));
    const showIconComputed = computed(() => props.icon || slots.icon);
    const showTitleComputed = computed(() => props.title || slots.title);
    const showBodyComputed = computed(() => props.message || slots.body);
    const showPopoverContentComputed = computed(
      () => showTitleComputed.value || showBodyComputed.value
    );
    const computedPopoverStyle = computed(() => ({
      boxShadow: `var(--va-popover-content-box-shadow) ${getBoxShadowColor2(getColor(props.color))}`,
      backgroundColor: getColor(props.color),
      color: textColorComputed.value
    }));
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(VaDropdown), mergeProps(unref(VaDropdownPropValues), {
        "model-value": _ctx.modelValue,
        "close-on-click-outside": __props.autoHide,
        offset: _ctx.$props.offset,
        "content-class": _ctx.$props.contentClass,
        class: "va-popover"
      }), {
        default: withCtx(() => [
          createBaseVNode("div", {
            style: normalizeStyle(computedPopoverStyle.value),
            class: "va-popover__content",
            role: "tooltip"
          }, [
            showIconComputed.value ? (openBlock(), createElementBlock("div", _hoisted_150, [
              renderSlot(_ctx.$slots, "icon", {}, () => [
                createVNode(unref(VaIcon), {
                  name: _ctx.$props.icon,
                  color: unref(textColorComputed)
                }, null, 8, ["name", "color"])
              ])
            ])) : createCommentVNode("", true),
            showPopoverContentComputed.value ? (openBlock(), createElementBlock("div", _hoisted_224, [
              showTitleComputed.value ? (openBlock(), createElementBlock("div", _hoisted_317, [
                renderSlot(_ctx.$slots, "title", {}, () => [
                  createTextVNode(toDisplayString(_ctx.$props.title), 1)
                ])
              ])) : createCommentVNode("", true),
              showBodyComputed.value ? (openBlock(), createElementBlock("div", _hoisted_49, [
                renderSlot(_ctx.$slots, "body", {}, () => [
                  createTextVNode(toDisplayString(_ctx.$props.message), 1)
                ])
              ])) : createCommentVNode("", true)
            ])) : createCommentVNode("", true)
          ], 4)
        ]),
        anchor: withCtx(() => [
          renderSlot(_ctx.$slots, "default")
        ]),
        _: 3
      }, 16, ["model-value", "close-on-click-outside", "offset", "content-class"]);
    };
  }
});

// node_modules/vuestic-ui/dist/es/src/components/va-popover/index.js
var VaPopover = withConfigTransport$1(_sfc_main87);

// node_modules/vuestic-ui/dist/es/src/components/va-rating/types.js
var RatingValue = ((RatingValue2) => {
  RatingValue2[RatingValue2["EMPTY"] = 0] = "EMPTY";
  RatingValue2[RatingValue2["HALF"] = 0.5] = "HALF";
  RatingValue2[RatingValue2["FULL"] = 1] = "FULL";
  return RatingValue2;
})(RatingValue || {});

// node_modules/vuestic-ui/dist/es/src/components/va-rating/hooks/useRating.js
var getContext = () => {
  const instance = getCurrentInstance();
  if (!instance) {
    throw new Error("useRating hooks must be used on top of setup function");
  }
  return {
    props: instance.props,
    emit: instance.emit
  };
};
var useRatingProps = {
  ...useStatefulProps,
  modelValue: { type: Number, default: 0 },
  clearable: { type: Boolean, default: false },
  hover: { type: Boolean, default: false }
};
var useRating = (props) => {
  const { emit } = getContext();
  const { isHovered, onMouseEnter, onMouseLeave } = useHover();
  const { valueComputed: modelValue } = useStateful(props, emit);
  const hoveredValue = ref(0);
  const visibleValue = computed(() => !props.disabled && !props.readonly && props.hover && isHovered.value ? hoveredValue.value : modelValue.value);
  const onItemValueUpdate = (itemIndex, newValue) => {
    const newModelValue = itemIndex + newValue;
    if (props.clearable) {
      if (modelValue.value === newModelValue) {
        modelValue.value = 0;
        return;
      }
    }
    modelValue.value = newModelValue;
  };
  const onItemHoveredValueUpdate = (itemIndex, newValue) => {
    if (!props.hover) {
      return;
    }
    hoveredValue.value = itemIndex + newValue;
  };
  const getItemValue = (itemIndex) => {
    const itemValue = visibleValue.value - itemIndex;
    return clamp(itemValue, RatingValue.EMPTY, RatingValue.FULL);
  };
  return {
    visibleValue,
    modelValue,
    hoveredValue,
    isHovered,
    onMouseEnter,
    onMouseLeave,
    onItemValueUpdate,
    onItemHoveredValueUpdate,
    getItemValue
  };
};

// node_modules/vuestic-ui/dist/es/src/components/va-rating/hooks/useVaRatingColors.js
var useVaRatingColorsProps = {
  unselectedColor: { type: String },
  color: { type: String, default: "primary" },
  modelValue: { type: Number }
};
var useVaRatingColors = (props) => {
  const { getColor, getFocusColor: getFocusColor2, getTextColor } = useColors();
  const computedColor = computed(() => getColor(props.color));
  const backgroundColor = computed(() => {
    if (props.unselectedColor) {
      return getColor(props.unselectedColor);
    }
    return getFocusColor2(getColor(props.color));
  });
  const backgroundComputed = computed(() => {
    if (props.modelValue === RatingValue.HALF) {
      return `linear-gradient(90deg, ${computedColor.value} 50%, ${backgroundColor.value} 50%`;
    }
    if (props.modelValue === RatingValue.EMPTY) {
      return backgroundColor.value;
    }
    return computedColor.value;
  });
  const textColorComputed = computed(() => {
    if (props.modelValue === RatingValue.FULL) {
      return getColor(getTextColor(computedColor.value));
    }
    return getColor(getTextColor(backgroundColor.value));
  });
  return {
    computedColor,
    backgroundComputed,
    textColorComputed
  };
};

// node_modules/vuestic-ui/dist/es/src/components/va-rating/components/VaRatingItem/VaRatingItem.vue_vue_type_script_setup_true_lang.js
import "D:/Github/DONGTIAN/ui/node_modules/vuestic-ui/dist/es/VaRatingItem.css";
var _hoisted_151 = ["tabindex", "onKeydown"];
var _sfc_main88 = defineComponent({
  ...{
    name: "VaRatingItem"
  },
  __name: "VaRatingItem",
  props: {
    modelValue: { type: Number, default: 0 },
    icon: { type: String, default: "star" },
    halfIcon: { type: String, default: "star_half" },
    emptyIcon: { type: String, default: "star_outline" },
    halves: { type: Boolean, default: false },
    hover: { type: Boolean, default: false },
    tabindex: { type: [String, Number], default: 0 },
    disabled: { type: Boolean, default: false },
    readonly: { type: Boolean, default: false },
    size: { type: [String, Number], default: "medium" },
    unselectedColor: { type: String },
    color: { type: String, default: "primary" }
  },
  emits: ["update:modelValue", "click", "hover"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const rootEl = shallowRef();
    const [modelValue] = useSyncProp("modelValue", props, emit, RatingValue.EMPTY);
    const hoveredValue = ref(null);
    const visibleValue = computed(() => {
      if (props.hover && !props.disabled && !props.readonly) {
        return hoveredValue.value || modelValue.value;
      }
      return modelValue.value;
    });
    const { getColor } = useColors();
    const computedColor = computed(() => getColor(
      props.unselectedColor && visibleValue.value === RatingValue.EMPTY ? props.unselectedColor : props.color
    ));
    const onMouseMove = (ev) => {
      if (!rootEl.value) {
        return;
      }
      const { offsetX } = ev;
      const iconWidth = rootEl.value.clientWidth;
      if (props.halves) {
        hoveredValue.value = offsetX / iconWidth <= RatingValue.HALF ? RatingValue.HALF : RatingValue.FULL;
      } else {
        hoveredValue.value = RatingValue.FULL;
      }
    };
    const onMouseLeave = () => {
      hoveredValue.value = null;
    };
    const onClick = () => {
      modelValue.value = hoveredValue.value || RatingValue.FULL;
      emit("click", hoveredValue.value || RatingValue.FULL);
    };
    watch(hoveredValue, () => emit("hover", hoveredValue.value || RatingValue.EMPTY));
    const computedIconName = computed(() => {
      if (props.halves && visibleValue.value === RatingValue.HALF) {
        return props.halfIcon;
      }
      if (visibleValue.value === RatingValue.EMPTY) {
        return props.emptyIcon;
      }
      return props.icon;
    });
    const tabIndexComputed = computed(() => props.disabled ? -1 : props.tabindex);
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        ref_key: "rootEl",
        ref: rootEl,
        role: "button",
        class: "va-rating-item",
        tabindex: tabIndexComputed.value,
        onKeydown: [
          withKeys(onClick, ["enter"]),
          withKeys(withModifiers(onClick, ["prevent"]), ["space"])
        ],
        onMousemove: onMouseMove,
        onMouseleave: onMouseLeave,
        onClick
      }, [
        renderSlot(_ctx.$slots, "default", normalizeProps(guardReactiveProps({ value: visibleValue.value, onClick })), () => [
          createVNode(unref(VaIcon), {
            class: "va-rating-item__wrapper",
            tabindex: "-1",
            tag: "button",
            name: computedIconName.value,
            size: _ctx.$props.size,
            color: computedColor.value
          }, null, 8, ["name", "size", "color"])
        ])
      ], 40, _hoisted_151);
    };
  }
});

// node_modules/vuestic-ui/dist/es/src/components/va-rating/components/VaRatingItemNumberButton.vue_vue_type_script_setup_true_lang.js
var _sfc_main89 = defineComponent({
  ...{
    name: "VaRatingItemNumberButton"
  },
  __name: "VaRatingItemNumberButton",
  props: {
    ...useVaRatingColorsProps,
    ...useSizeProps,
    itemNumber: { type: Number, required: true },
    modelValue: { type: Number, required: true }
  },
  setup(__props) {
    const props = __props;
    const {
      textColorComputed,
      backgroundComputed
    } = useVaRatingColors(props);
    const {
      sizeComputed,
      fontSizeComputed,
      fontSizeInRem
    } = useSize(props, "VaRating");
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("button", {
        class: "va-rating__number-item",
        tabindex: "-1",
        "aria-hidden": "true",
        style: normalizeStyle({
          background: unref(backgroundComputed),
          color: unref(textColorComputed),
          width: unref(sizeComputed),
          height: unref(sizeComputed),
          fontSize: unref(fontSizeComputed),
          borderRadius: `${parseInt(unref(fontSizeComputed)) * 0.125}rem`
        })
      }, toDisplayString(__props.itemNumber), 5);
    };
  }
});

// node_modules/vuestic-ui/dist/es/src/components/va-rating/VaRating.vue_vue_type_script_setup_true_lang.js
import "D:/Github/DONGTIAN/ui/node_modules/vuestic-ui/dist/es/VaRating.css";
var _hoisted_152 = ["aria-label"];
var VaRatingItemPropsDeclarations = extractComponentProps(_sfc_main88, ["modelValue", "itemNumber"]);
var VaRatingItemNumberButtonPropsDeclarations = extractComponentProps(_sfc_main89, ["modelValue", "itemNumber"]);
var _sfc_main90 = defineComponent({
  ...{
    name: "VaRating"
  },
  __name: "VaRating",
  props: {
    ...VaRatingItemNumberButtonPropsDeclarations,
    ...useRatingProps,
    ...useVaRatingColorsProps,
    ...useFormFieldProps,
    ...VaRatingItemPropsDeclarations,
    ...useComponentPresetProp,
    modelValue: { type: Number, default: 0 },
    numbers: { type: Boolean, default: false },
    halves: { type: Boolean, default: false },
    max: { type: [Number, String], default: 5 },
    texts: { type: Array, default: () => [] },
    ariaLabel: useTranslationProp("$t:currentRating"),
    ariaItemLabel: useTranslationProp("$t:voteRating")
  },
  emits: ["update:modelValue"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const { computedClasses: rootClass } = useFormField("va-rating", props);
    const {
      visibleValue,
      modelValue: vModel,
      hoveredValue,
      isHovered,
      onMouseEnter,
      onMouseLeave,
      onItemValueUpdate,
      onItemHoveredValueUpdate,
      getItemValue
    } = useRating(props);
    const isInteractionsEnabled = computed(() => !props.disabled && !props.readonly);
    const onArrowKeyPress = (direction) => {
      const max2 = Number(props.max);
      const step = props.halves ? RatingValue.HALF : RatingValue.FULL;
      const nextStep = visibleValue.value + step * direction;
      const min2 = props.clearable ? 0 : step;
      if (nextStep >= min2 && nextStep <= max2) {
        onItemValueUpdate(visibleValue.value, step * direction);
      } else if (nextStep < min2) {
        onItemValueUpdate(min2, 0);
      } else {
        onItemValueUpdate(max2, direction === -1 ? step * direction : 0);
      }
    };
    const { tp, t } = useTranslation();
    const {
      computedColor,
      backgroundComputed,
      textColorComputed
    } = useVaRatingColors(props);
    const tabIndexComputed = computed(() => isInteractionsEnabled.value ? 0 : void 0);
    const VaRatingItemProps = filterComponentProps(VaRatingItemPropsDeclarations);
    const VaRatingItemNumberButtonProps = filterComponentProps(VaRatingItemNumberButtonPropsDeclarations);
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: normalizeClass(["va-rating", unref(rootClass)]),
        "aria-label": unref(tp)(_ctx.$props.ariaLabel, { max: _ctx.$props.max, value: _ctx.$props.modelValue })
      }, [
        createBaseVNode("div", {
          class: "va-rating__item-wrapper",
          onKeyup: [
            _cache[0] || (_cache[0] = withKeys(($event) => onArrowKeyPress(-1), ["left"])),
            _cache[1] || (_cache[1] = withKeys(($event) => onArrowKeyPress(1), ["right"]))
          ],
          onMouseenter: _cache[2] || (_cache[2] = //@ts-ignore
          (...args) => unref(onMouseEnter) && unref(onMouseEnter)(...args)),
          onMouseleave: _cache[3] || (_cache[3] = //@ts-ignore
          (...args) => unref(onMouseLeave) && unref(onMouseLeave)(...args))
        }, [
          (openBlock(true), createElementBlock(Fragment, null, renderList(Number(_ctx.$props.max), (itemNumber) => {
            return openBlock(), createBlock(_sfc_main88, mergeProps({
              key: itemNumber,
              class: "va-rating__item"
            }, unref(VaRatingItemProps), {
              "aria-label": unref(tp)(_ctx.$props.ariaItemLabel, { max: _ctx.$props.max, value: itemNumber }),
              "model-value": unref(getItemValue)(itemNumber - 1),
              tabindex: tabIndexComputed.value,
              disabled: _ctx.$props.disabled,
              readonly: _ctx.$props.readonly,
              onHover: ($event) => isInteractionsEnabled.value && unref(onItemHoveredValueUpdate)(itemNumber - 1, $event),
              "onUpdate:modelValue": ($event) => isInteractionsEnabled.value && unref(onItemValueUpdate)(itemNumber - 1, $event)
            }), {
              default: withCtx(({ value, onClick }) => [
                renderSlot(_ctx.$slots, "item", normalizeProps(guardReactiveProps({ value, onClick, index: itemNumber })), () => [
                  _ctx.$props.numbers ? (openBlock(), createBlock(_sfc_main89, mergeProps({ key: 0 }, unref(VaRatingItemNumberButtonProps), {
                    "model-value": value,
                    "item-number": itemNumber
                  }), null, 16, ["model-value", "item-number"])) : createCommentVNode("", true)
                ])
              ]),
              _: 2
            }, 1040, ["aria-label", "model-value", "tabindex", "disabled", "readonly", "onHover", "onUpdate:modelValue"]);
          }), 128))
        ], 32),
        _ctx.$props.texts && _ctx.$props.texts.length === _ctx.$props.max ? (openBlock(), createElementBlock("span", {
          key: 0,
          class: "va-rating__text-wrapper",
          style: normalizeStyle({ color: unref(computedColor) })
        }, toDisplayString(_ctx.$props.texts[Math.round(unref(visibleValue)) - 1]), 5)) : createCommentVNode("", true)
      ], 10, _hoisted_152);
    };
  }
});

// node_modules/vuestic-ui/dist/es/src/components/va-rating/index.js
var VaRating = withConfigTransport$1(_sfc_main90);

// node_modules/vuestic-ui/dist/es/src/utils/scroll-to-element.js
var getTopCoordinate = (element) => element.offsetTop;
var getBottomCoordinate = (element) => element.offsetTop + element.offsetHeight;
var getCenterCoordinate = (element) => element.offsetTop + element.offsetHeight / 2;
var getScrollTop = (element, scrollTarget, verticalAlignment) => {
  const viewHeight = scrollTarget.offsetHeight;
  const currentPosition = scrollTarget.scrollTop;
  const top = getTopCoordinate(element) - scrollTarget.offsetTop;
  const center = getCenterCoordinate(element) - scrollTarget.offsetTop;
  const bottom = getBottomCoordinate(element) - scrollTarget.offsetTop;
  if (verticalAlignment === "start") {
    return top;
  }
  if (verticalAlignment === "end") {
    return bottom - viewHeight;
  }
  if (verticalAlignment === "center") {
    return center - viewHeight / 2;
  }
  if (verticalAlignment === "any") {
    if (top - currentPosition < 0) {
      return top;
    }
    if (bottom - currentPosition > viewHeight) {
      return bottom - viewHeight;
    }
  }
};
var scrollToElement = (element, options = {
  scrollTarget: element.parentElement,
  verticalAlignment: "any",
  smooth: false
}) => {
  const scrollTarget = options.scrollTarget || element.parentElement;
  const top = getScrollTop(element, scrollTarget, options.verticalAlignment);
  if (top === void 0) {
    return;
  }
  scrollTarget.scroll({
    top,
    behavior: options.smooth ? "smooth" : "auto"
  });
};

// node_modules/vuestic-ui/dist/es/src/components/va-select/components/VaSelectOption/VaSelectOption.vue_vue_type_script_setup_true_lang.js
import "D:/Github/DONGTIAN/ui/node_modules/vuestic-ui/dist/es/VaSelectOption.css";
var _hoisted_153 = ["aria-selected"];
var _hoisted_225 = {
  key: 1,
  class: "va-select-option__highlighted"
};
var _sfc_main91 = defineComponent({
  ...{
    name: "VaSelectOption"
  },
  __name: "VaSelectOption",
  props: {
    ...useColorProps,
    disabled: { type: Boolean, default: false },
    option: { type: [Number, String, Boolean, Object], default: () => ({}) },
    getText: { type: Function, required: true },
    getTrackBy: { type: Function, required: true },
    currentOption: { type: [String, Number, Boolean, Object], default: null },
    getSelectedState: { type: Function, required: true },
    search: { type: String, default: "" },
    highlightMatchedText: { type: Boolean, default: true },
    inputFocused: { type: Boolean, default: false },
    minSearchChars: { type: [Number, String], default: 0 }
  },
  setup(__props, { expose: __expose }) {
    const props = __props;
    const { getColor, getHoverColor: getHoverColor2 } = useColors();
    const minSearchCharsComputed = useNumericProp("minSearchChars");
    const optionIcon = computed(() => isObject(props.option) ? props.option.icon : void 0);
    const optionIconColor = computed(() => getColor(props.color));
    const optionText = computed(() => props.getText(props.option));
    const optionTextSplitted = computed(() => {
      const defaultSplit = { start: optionText.value, searchedSubString: "", end: "" };
      if (!optionText.value || !props.search || !props.highlightMatchedText || props.search.length < minSearchCharsComputed.value) {
        return defaultSplit;
      }
      const substringStartIndex = optionText.value.toLowerCase().indexOf(props.search.toLowerCase());
      if (substringStartIndex < 0) {
        return defaultSplit;
      }
      const start = optionText.value.slice(0, substringStartIndex);
      const searchedSubString = optionText.value.slice(substringStartIndex, substringStartIndex + props.search.length);
      const end = optionText.value.slice(substringStartIndex + props.search.length);
      return { start, searchedSubString, end };
    });
    const isSelected = computed(() => props.getSelectedState(props.option));
    const isFocused = computed(() => {
      if (typeof props.option === "string") {
        return props.option === props.currentOption;
      }
      return props.getTrackBy(props.currentOption) === props.getTrackBy(props.option);
    });
    const optionClass = useBem("va-select-option", () => ({
      selected: isSelected.value
    }));
    const optionStyle = computed(() => ({
      color: isSelected.value ? getColor(props.color) : "inherit",
      backgroundColor: isFocused.value ? getHoverColor2(getColor(props.color)) : "transparent",
      cursor: props.disabled ? "default" : void 0,
      opacity: props.disabled ? "var(--va-select-option-list-option-disabled-opacity)" : void 0
    }));
    __expose({
      isFocused,
      isSelected
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        role: "option",
        class: normalizeClass(["va-select-option", unref(optionClass)]),
        style: normalizeStyle(optionStyle.value),
        "aria-selected": isSelected.value
      }, [
        renderSlot(_ctx.$slots, "option-content", {}, () => [
          optionIcon.value ? (openBlock(), createBlock(unref(VaIcon), {
            key: 0,
            size: "small",
            class: "va-select-option__icon",
            name: optionIcon.value
          }, null, 8, ["name"])) : createCommentVNode("", true),
          createTextVNode(" " + toDisplayString(optionTextSplitted.value.start) + " ", 1),
          optionTextSplitted.value.searchedSubString ? (openBlock(), createElementBlock("span", _hoisted_225, toDisplayString(optionTextSplitted.value.searchedSubString), 1)) : createCommentVNode("", true),
          createTextVNode(" " + toDisplayString(optionTextSplitted.value.end), 1)
        ]),
        isSelected.value ? (openBlock(), createBlock(unref(VaIcon), {
          key: 0,
          class: "va-select-option__selected-icon",
          size: "small",
          name: "va-check",
          color: optionIconColor.value
        }, null, 8, ["color"])) : createCommentVNode("", true)
      ], 14, _hoisted_153);
    };
  }
});

// node_modules/vuestic-ui/dist/es/src/components/va-select/components/VaSelectOption/index.js
var VaSelectOption = withConfigTransport$1(_sfc_main91);

// node_modules/vuestic-ui/dist/es/src/composables/useObjectRefs.js
var useObjectRefs = () => {
  const itemRefs = shallowRef({});
  const setItemRef = (key) => (el) => {
    if (!el) {
      return;
    }
    itemRefs.value[key] = el;
    return String(key);
  };
  onBeforeUpdate(() => {
    itemRefs.value = {};
  });
  return { itemRefs, setItemRef };
};

// node_modules/vuestic-ui/dist/es/src/components/va-select/components/VaSelectOptionList/VaSelectOptionList.vue_vue_type_script_setup_true_lang.js
import "D:/Github/DONGTIAN/ui/node_modules/vuestic-ui/dist/es/VaSelectOptionList.css";
var _hoisted_154 = ["tabindex", "onKeydown", "aria-multiselectable"];
var _hoisted_226 = {
  key: 0,
  class: "va-select-option-list__group-name",
  role: "presentation"
};
var _hoisted_318 = {
  key: 0,
  class: "va-select-option-list--empty"
};
var _sfc_main92 = defineComponent({
  ...{
    name: "VaSelectOptionList"
  },
  __name: "VaSelectOptionList",
  props: {
    ...useColorProps,
    ...useComponentPresetProp,
    ...useSelectableListProps,
    ...useThrottleProps,
    noOptionsText: { type: String, default: "Items not found" },
    getSelectedState: { type: Function, required: true },
    multiple: { type: Boolean, default: false },
    search: { type: String, default: "" },
    tabindex: { type: [String, Number], default: 0 },
    hoveredOption: { type: [String, Number, Boolean, Object], default: null },
    virtualScroller: { type: Boolean, default: true },
    highlightMatchedText: { type: Boolean, default: true },
    minSearchChars: { type: [Number, String], default: 0 },
    autoSelectFirstOption: { type: Boolean, default: false },
    selectedTopShown: { type: Boolean, default: false },
    doShowAllOptions: { type: Boolean, default: false }
  },
  emits: [
    "select-option",
    "update:hoveredOption",
    "no-previous-option-to-hover",
    "scroll-bottom"
  ],
  setup(__props, { expose: __expose, emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const root = shallowRef();
    const focus = () => {
      var _a2;
      (_a2 = root.value) == null ? void 0 : _a2.focus({ preventScroll: true });
    };
    const rootHeight = computed(() => {
      var _a2;
      return ((_a2 = root.value) == null ? void 0 : _a2.clientHeight) ?? 200;
    });
    const handleScrollToBottom = () => emit("scroll-bottom");
    const onScroll = (event) => {
      const target = event.target;
      if (!target) {
        return;
      }
      if (target.scrollTop + target.clientHeight === target.scrollHeight) {
        handleScrollToBottom();
      }
    };
    const lastInteractionSource = ref("");
    const currentOptionComputed = computed(() => props.hoveredOption ?? null);
    const updateCurrentOption = (option, source) => {
      emit("update:hoveredOption", option);
      lastInteractionSource.value = source;
    };
    const { getText, getGroupBy, getTrackBy, getDisabled } = useSelectableList(props);
    const minSearchCharsComputed = useNumericProp("minSearchChars");
    const currentSelectedOptionText = computed(() => {
      var _a2;
      const getSelectedState = props.getSelectedState;
      const selected = (_a2 = props.options) == null ? void 0 : _a2.find((option) => getSelectedState(option));
      return selected ? getText(selected) : "";
    });
    const isSearchedOptionSelected = computed(() => {
      var _a2;
      return currentSelectedOptionText.value.toLowerCase() === ((_a2 = props.search) == null ? void 0 : _a2.toLowerCase());
    });
    const filteredOptions = computed(() => {
      if (props.doShowAllOptions && isSearchedOptionSelected.value) {
        return props.options;
      }
      if (!props.search || props.search.length < minSearchCharsComputed.value) {
        return props.options;
      }
      const search = props.search.toUpperCase().trim();
      return props.options.filter((option) => {
        const optionText = getText(option).toUpperCase();
        return optionText.includes(search);
      });
    });
    const optionGroups = computed(() => {
      if (!props.groupBy) {
        return { _noGroup: filteredOptions.value };
      }
      return filteredOptions.value.reduce((groups, option) => {
        const groupBy = getGroupBy(option);
        if (!groupBy) {
          groups._noGroup.push(option);
        } else {
          if (!groups[groupBy]) {
            groups[groupBy] = [];
          }
          groups[groupBy].push(option);
        }
        return groups;
      }, { _noGroup: [] });
    });
    const optionGroupsThrottled = useThrottleValue(optionGroups, props);
    const isValueExists = (value) => !isNilValue(value);
    const updateHoveredOption = (option) => {
      if (option === currentOptionComputed.value || isValueExists(option) && getDisabled(option)) {
        return;
      }
      updateCurrentOption(option ?? null, "mouse");
    };
    const updateFocusedOption = (option) => {
      updateCurrentOption(option ?? null, "keyboard");
    };
    const selectHoveredOption = () => {
      const previousOption = previousOptionComputed.value && typeof previousOptionComputed.value === "object" ? { ...previousOptionComputed.value } : previousOptionComputed.value;
      emit("select-option");
      if (props.selectedTopShown) {
        updateHoveredOption(previousOption);
      }
    };
    const groupedOptions = computed(() => Object.values(optionGroupsThrottled.value).flat());
    const currentOptions = computed(() => filteredOptions.value.some((el) => getGroupBy(el)) ? groupedOptions.value : filteredOptions.value);
    const currentOptionIndex = computed(() => currentOptions.value.findIndex((option) => {
      return isValueExists(currentOptionComputed.value) && getTrackBy(option) === getTrackBy(currentOptionComputed.value);
    }));
    const selectOptionProps = computed(() => ({
      ...pick(props, ["getSelectedState", "color", "search", "highlightMatchedText"]),
      minSearchChars: minSearchCharsComputed.value,
      getText,
      getTrackBy
    }));
    const findNextActiveOption = (startSearchIndex, reversedSearch = false) => {
      const searchBase = [...currentOptions.value || []];
      const searchBaseOrdered = reversedSearch ? searchBase.reverse() : searchBase;
      const startIndex = reversedSearch ? startSearchIndex * -1 - 1 : startSearchIndex;
      return searchBaseOrdered.slice(startIndex).find((option) => !getDisabled(option));
    };
    const previousOptionComputed = computed(() => {
      const previousOptionIndex = currentOptionIndex.value - 1;
      const previousOption = currentOptions.value[previousOptionIndex];
      const previousOptionCheck = isValueExists(previousOption) && !(previousOptionIndex === 0 && getDisabled(previousOption));
      if (previousOptionCheck) {
        return findNextActiveOption(currentOptionIndex.value - 1, true);
      }
      return void 0;
    });
    const selectOption = (option) => {
      updateHoveredOption(option);
      emit("select-option");
    };
    const handleMouseMove = (option) => {
      if (!props.selectedTopShown) {
        updateHoveredOption(option);
      }
    };
    const handleMouseEnter = (option) => {
      if (props.selectedTopShown) {
        updateHoveredOption(option);
      }
    };
    const focusPreviousOption = () => {
      if (!isValueExists(currentOptionComputed.value)) {
        updateFocusedOption(findNextActiveOption(0, true));
        return;
      }
      if (isValueExists(previousOptionComputed.value)) {
        updateFocusedOption(previousOptionComputed.value);
      } else {
        emit("no-previous-option-to-hover");
      }
    };
    const focusNextOption = () => {
      if (!isValueExists(currentOptionComputed.value)) {
        focusFirstOption();
        return;
      }
      const nextOptionIndex = currentOptionIndex.value + 1;
      const nextOption = currentOptions.value[nextOptionIndex];
      const nextOptionCheck = isValueExists(nextOption) && !(nextOptionIndex === currentOptions.value.length - 1 && getDisabled(nextOption));
      if (nextOptionCheck) {
        updateFocusedOption(findNextActiveOption(currentOptionIndex.value + 1));
      }
    };
    const focusFirstOption = () => updateFocusedOption(findNextActiveOption(0));
    const { itemRefs, setItemRef } = useObjectRefs();
    const virtualScrollerRef = shallowRef();
    const scrollToOption = (option) => {
      var _a2;
      if (!isValueExists(option)) {
        return;
      }
      const element = unwrapEl(itemRefs.value[getTrackBy(option)]);
      if (element) {
        scrollToElement(element);
      }
      const virtualScroller = (_a2 = virtualScrollerRef.value) == null ? void 0 : _a2[0];
      if (props.virtualScroller) {
        virtualScroller.virtualScrollTo(currentOptionIndex.value);
      }
    };
    watch(() => props.hoveredOption, (newOption) => {
      (!lastInteractionSource.value || lastInteractionSource.value === "keyboard") && isValueExists(newOption) && scrollToOption(newOption);
    });
    watch(filteredOptions, () => {
      if (!props.autoSelectFirstOption) {
        return;
      }
      focusFirstOption();
    }, { immediate: true });
    __expose({
      focusPreviousOption,
      focusNextOption,
      focusFirstOption,
      scrollToOption,
      focus
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        ref_key: "root",
        ref: root,
        class: "va-select-option-list",
        tabindex: __props.tabindex,
        onKeydown: [
          withKeys(withModifiers(focusPreviousOption, ["stop", "prevent"]), ["up"]),
          withKeys(withModifiers(focusPreviousOption, ["stop", "prevent"]), ["left"]),
          withKeys(withModifiers(focusNextOption, ["stop", "prevent"]), ["down"]),
          withKeys(withModifiers(focusNextOption, ["stop", "prevent"]), ["right"]),
          withKeys(withModifiers(selectHoveredOption, ["stop", "prevent"]), ["enter"]),
          withKeys(withModifiers(selectHoveredOption, ["stop", "prevent"]), ["space"])
        ],
        onScrollPassive: onScroll,
        role: "listbox",
        "aria-multiselectable": _ctx.$props.multiple
      }, [
        (openBlock(true), createElementBlock(Fragment, null, renderList(unref(optionGroupsThrottled), (options, groupName) => {
          return openBlock(), createElementBlock(Fragment, { key: groupName }, [
            groupName !== "_noGroup" ? (openBlock(), createElementBlock("span", _hoisted_226, toDisplayString(groupName), 1)) : createCommentVNode("", true),
            _ctx.$props.virtualScroller ? (openBlock(), createBlock(unref(VaVirtualScroller), {
              key: 1,
              ref_for: true,
              ref_key: "virtualScrollerRef",
              ref: virtualScrollerRef,
              items: options,
              "track-by": unref(getTrackBy),
              "wrapper-size": rootHeight.value,
              "onScroll:bottom": handleScrollToBottom
            }, {
              default: withCtx(({ item: option, index }) => [
                renderSlot(_ctx.$slots, "default", normalizeProps(guardReactiveProps({ option, index, selectOption: (o = option) => selectOption(o) })), () => [
                  createVNode(unref(VaSelectOption), mergeProps({
                    option,
                    "current-option": currentOptionComputed.value,
                    disabled: unref(getDisabled)(option)
                  }, selectOptionProps.value, {
                    onClick: withModifiers(selectHoveredOption, ["stop"]),
                    onMouseenter: ($event) => handleMouseEnter(option),
                    onMousemove: ($event) => handleMouseMove(option)
                  }), null, 16, ["option", "current-option", "disabled", "onMouseenter", "onMousemove"])
                ])
              ]),
              _: 2
            }, 1032, ["items", "track-by", "wrapper-size"])) : (openBlock(true), createElementBlock(Fragment, { key: 2 }, renderList(options, (option, index) => {
              return renderSlot(_ctx.$slots, "default", normalizeProps(mergeProps({
                key: unref(getTrackBy)(option)
              }, { option, index, selectOption })), () => [
                createVNode(unref(VaSelectOption), mergeProps({
                  ref_for: true,
                  ref: unref(setItemRef)(unref(getTrackBy)(option)),
                  "current-option": currentOptionComputed.value,
                  option,
                  disabled: unref(getDisabled)(option)
                }, selectOptionProps.value, {
                  onClick: withModifiers(selectHoveredOption, ["stop"]),
                  onMouseenter: ($event) => handleMouseEnter(option),
                  onMousemove: ($event) => handleMouseMove(option)
                }), {
                  "option-content": withCtx(() => [
                    renderSlot(_ctx.$slots, "option-content", normalizeProps(guardReactiveProps({ option, index })))
                  ]),
                  _: 2
                }, 1040, ["current-option", "option", "disabled", "onMouseenter", "onMousemove"])
              ]);
            }), 128))
          ], 64);
        }), 128)),
        !filteredOptions.value.length ? (openBlock(), createElementBlock("div", _hoisted_318, toDisplayString(__props.noOptionsText), 1)) : createCommentVNode("", true)
      ], 40, _hoisted_154);
    };
  }
});

// node_modules/vuestic-ui/dist/es/src/components/va-select/components/VaSelectOptionList/index.js
var VaSelectOptionList = withConfigTransport$1(_sfc_main92);

// node_modules/vuestic-ui/dist/es/src/components/va-select/components/VaSelectContent/VaSelectContent.vue_vue_type_script_setup_true_lang.js
import "D:/Github/DONGTIAN/ui/node_modules/vuestic-ui/dist/es/VaSelectContent.css";
var _hoisted_155 = {
  key: 0,
  class: "va-select-content__placeholder"
};
var _hoisted_227 = ["placeholder"];
var _hoisted_319 = {
  key: 0,
  class: "va-select-content__option"
};
var _hoisted_410 = {
  key: 1,
  class: "va-select-content__separator"
};
var _hoisted_58 = ["placeholder", "disabled", "readonly"];
var _sfc_main93 = defineComponent({
  ...{
    name: "VaSelectContent"
  },
  __name: "VaSelectContent",
  props: {
    ...useFormFieldProps,
    ariaAttributes: { type: Object },
    value: { type: Array, required: true },
    valueString: { type: String },
    separator: { type: String, default: ", " },
    placeholder: { type: String, default: "" },
    tabindex: { type: [String, Number], default: 0 },
    hiddenSelectedOptionsAmount: { type: [Number, String], default: 0 },
    isAllOptionsShown: { type: Boolean, default: false },
    autocomplete: { type: Boolean, default: false },
    focused: { type: Boolean, default: false },
    multiple: { type: Boolean, default: false },
    getText: { type: Function, required: true },
    autocompleteInputValue: { type: String, default: "" }
  },
  emits: ["toggle-hidden", "autocomplete-input", "focus-prev", "focus-next", "select-option", "delete-last-selected"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const autocompleteInput = ref();
    const isPlaceholder = computed(() => props.placeholder && !props.valueString);
    const toggleHiddenOptionsState = () => emit("toggle-hidden");
    const { value, focused } = toRefs(props);
    const autocompleteInputValueComputed = computed({
      get: () => props.autocompleteInputValue,
      set: (v) => emit("autocomplete-input", v)
    });
    const hiddenSelectedOptionsAmountComputed = useNumericProp("hiddenSelectedOptionsAmount");
    onMounted(() => {
      if (props.multiple) {
        return;
      }
      if (!props.autocomplete) {
        return;
      }
      autocompleteInputValueComputed.value = props.valueString;
    });
    watch(focused, (newValue) => {
      var _a2, _b;
      if (!props.autocomplete || !newValue) {
        return;
      }
      if (autocompleteInputValueComputed.value) {
        (_a2 = autocompleteInput.value) == null ? void 0 : _a2.setSelectionRange(0, autocompleteInputValueComputed.value.length);
      } else {
        (_b = autocompleteInput.value) == null ? void 0 : _b.focus();
      }
    });
    const handleBackspace = (e) => {
      if (props.multiple && value.value.length && e.key === "Backspace" && !autocompleteInputValueComputed.value) {
        emit("delete-last-selected");
      }
    };
    const handleClick = (e) => {
      var _a2;
      if (props.autocomplete) {
        (_a2 = autocompleteInput.value) == null ? void 0 : _a2.focus();
        e.stopPropagation();
      }
    };
    const getIcon = (option) => isObject(option) ? option.icon : void 0;
    const slotValue = computed(() => {
      if (props.multiple) {
        return value.value;
      }
      return value.value[0];
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: "va-select-content",
        onClick: handleClick
      }, [
        isPlaceholder.value && !_ctx.$props.autocomplete ? (openBlock(), createElementBlock("span", _hoisted_155, [
          createBaseVNode("input", mergeProps(__props.ariaAttributes, {
            placeholder: _ctx.$props.placeholder,
            readonly: ""
          }), null, 16, _hoisted_227)
        ])) : !(props.autocomplete && !props.multiple) ? renderSlot(_ctx.$slots, "content", normalizeProps(mergeProps({ key: 1 }, {
          value: slotValue.value,
          valueString: _ctx.$props.valueString,
          valueArray: _ctx.$props.value,
          tabindex: _ctx.$props.tabindex,
          ariaAttributes: __props.ariaAttributes
        })), () => [
          (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.$props.value, (option, index) => {
            return openBlock(), createElementBlock(Fragment, { key: index }, [
              option !== "" ? (openBlock(), createElementBlock("span", _hoisted_319, [
                renderSlot(_ctx.$slots, "option-content", normalizeProps(guardReactiveProps({ option, index, selectOption: () => void 0 })), () => [
                  getIcon(option) ? (openBlock(), createBlock(unref(VaIcon), {
                    key: 0,
                    size: "small",
                    class: "va-select-option__icon",
                    name: getIcon(option)
                  }, null, 8, ["name"])) : createCommentVNode("", true),
                  createTextVNode(" " + toDisplayString(__props.getText(option)), 1)
                ])
              ])) : createCommentVNode("", true),
              index < _ctx.$props.value.length - 1 ? (openBlock(), createElementBlock("span", _hoisted_410, toDisplayString(_ctx.$props.separator), 1)) : createCommentVNode("", true)
            ], 64);
          }), 128))
        ]) : createCommentVNode("", true),
        _ctx.$props.autocomplete ? withDirectives((openBlock(), createElementBlock("input", mergeProps({ key: 2 }, __props.ariaAttributes, {
          "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => autocompleteInputValueComputed.value = $event),
          class: "va-select-content__autocomplete",
          ref_key: "autocompleteInput",
          ref: autocompleteInput,
          autocomplete: "off",
          "aria-autocomplete": "list",
          placeholder: _ctx.$props.placeholder,
          disabled: _ctx.$props.disabled,
          readonly: _ctx.$props.readonly,
          onKeydown: [
            _cache[1] || (_cache[1] = withKeys(withModifiers(($event) => _ctx.$emit("focus-prev"), ["stop", "prevent"]), ["up"])),
            _cache[2] || (_cache[2] = withKeys(withModifiers(($event) => _ctx.$emit("focus-next"), ["stop", "prevent"]), ["down"])),
            _cache[3] || (_cache[3] = withKeys(withModifiers(($event) => _ctx.$emit("select-option"), ["stop", "prevent"]), ["enter"])),
            handleBackspace
          ]
        }), null, 16, _hoisted_58)), [
          [vModelDynamic, autocompleteInputValueComputed.value]
        ]) : createCommentVNode("", true),
        renderSlot(_ctx.$slots, "hiddenOptionsBadge", normalizeProps(guardReactiveProps({
          amount: __props.hiddenSelectedOptionsAmount,
          isShown: _ctx.$props.isAllOptionsShown,
          toggle: toggleHiddenOptionsState
        })), () => [
          unref(hiddenSelectedOptionsAmountComputed) && !_ctx.$props.isAllOptionsShown ? (openBlock(), createBlock(unref(VaBadge), {
            key: 0,
            class: "va-select-content__state-icon",
            color: "info",
            text: `+${unref(hiddenSelectedOptionsAmountComputed)}`,
            tabindex: _ctx.$props.tabindex,
            onClick: withModifiers(toggleHiddenOptionsState, ["stop"])
          }, null, 8, ["text", "tabindex"])) : createCommentVNode("", true)
        ]),
        renderSlot(_ctx.$slots, "hideOptionsButton", normalizeProps(guardReactiveProps({
          isShown: _ctx.$props.isAllOptionsShown,
          toggle: toggleHiddenOptionsState
        })), () => [
          _ctx.$props.isAllOptionsShown ? (openBlock(), createBlock(unref(VaIcon), {
            key: 0,
            role: "button",
            class: "va-select-content__state-icon",
            size: "small",
            name: "reply",
            tabindex: _ctx.$props.tabindex,
            onClick: withModifiers(toggleHiddenOptionsState, ["stop"])
          }, null, 8, ["tabindex"])) : createCommentVNode("", true)
        ])
      ]);
    };
  }
});

// node_modules/vuestic-ui/dist/es/src/components/va-select/components/VaSelectContent/index.js
var VaSelectContent = withConfigTransport$1(_sfc_main93);

// node_modules/vuestic-ui/dist/es/src/components/va-select/hooks/useMaxVisibleOptions.js
var useMaxVisibleOptionsProps = {
  maxVisibleOptions: { type: Number || String, default: 0 }
};
var useMaxVisibleOptions = (props, getOptionByValue) => {
  const modelValue = toRef(props, "modelValue");
  const isAllOptionsShown = ref(false);
  const belowLimitSelectedOptions = ref([]);
  const hiddenSelectedOptions = ref([]);
  const hiddenSelectedOptionsAmount = computed(() => hiddenSelectedOptions.value.length);
  const allSelectedOptions = computed(() => [...belowLimitSelectedOptions.value, ...hiddenSelectedOptions.value]);
  const visibleSelectedOptions = computed(() => {
    if (!props.maxVisibleOptions || isAllOptionsShown.value) {
      return allSelectedOptions.value;
    }
    return belowLimitSelectedOptions.value;
  });
  watch(modelValue, () => {
    if (!Array.isArray(modelValue.value)) {
      belowLimitSelectedOptions.value = [getOptionByValue(modelValue.value)];
      hiddenSelectedOptions.value = [];
      return;
    }
    const value = modelValue.value.filter((v) => !isNilValue(v)).map(getOptionByValue);
    if (props.maxVisibleOptions) {
      belowLimitSelectedOptions.value = value.slice(0, props.maxVisibleOptions);
      hiddenSelectedOptions.value = value.slice(props.maxVisibleOptions);
    } else {
      belowLimitSelectedOptions.value = [...value];
      hiddenSelectedOptions.value = [];
    }
  }, { immediate: true });
  const toggleHiddenOptionsState = () => isAllOptionsShown.value = !isAllOptionsShown.value;
  return {
    toggleHiddenOptionsState,
    isAllOptionsShown,
    visibleSelectedOptions,
    hiddenSelectedOptionsAmount,
    allSelectedOptions
  };
};

// node_modules/vuestic-ui/dist/es/src/components/va-select/hooks/useToggleIcon.js
var useToggleIconProps = {
  dropdownIcon: {
    type: [String, Object],
    default: () => ({
      open: "va-arrow-down",
      close: "va-arrow-up"
    }),
    validator: (value) => {
      if (typeof value === "string") {
        return true;
      }
      return Object.entries(value).every(([prop, propValue]) => ["open", "close"].includes(prop) && typeof propValue === "string");
    }
  }
};
var useToggleIcon = (props, showDropdownContent) => {
  const toggleIcon = computed(() => {
    if (!props.dropdownIcon) {
      return "";
    }
    if (typeof props.dropdownIcon === "string") {
      return props.dropdownIcon;
    }
    return showDropdownContent.value ? props.dropdownIcon.close : props.dropdownIcon.open;
  });
  const { getHoverColor: getHoverColor2, getColor } = useColors();
  const colorComputed = computed(() => getColor("secondary"));
  const toggleIconColor = computed(() => props.readonly ? getHoverColor2(colorComputed.value) : colorComputed.value);
  return { toggleIcon, toggleIconColor };
};

// node_modules/vuestic-ui/dist/es/src/components/va-select/hooks/useStringValue.js
var useStringValueProps = {
  separator: { type: String, default: ", " }
};
var useStringValue = (props, visibleSelectedOptions, getText) => {
  return computed(() => {
    var _a2;
    if (!((_a2 = visibleSelectedOptions.value) == null ? void 0 : _a2.length)) {
      return props.clearValue;
    }
    return visibleSelectedOptions.value.map(getText).join(props.separator) || props.clearValue;
  });
};

// node_modules/vuestic-ui/dist/es/src/components/va-select/hooks/useAutocomplete.js
var useAutocompleteProps = {
  autocomplete: { type: Boolean, default: false }
};
var useAutocomplete = (autocompleteValue, props, value, dropdownShown, getText) => {
  const getLastOptionText = (v) => (v == null ? void 0 : v.length) ? getText(v.at(-1)) : "";
  if (props.autocomplete && !props.multiple) {
    autocompleteValue.value = getLastOptionText(value.value);
  }
  watch(value, (newValue, oldValue) => {
    if (!props.autocomplete) {
      return;
    }
    const newValueStringConverted = getLastOptionText(newValue);
    const oldValueStringConverted = getLastOptionText(oldValue);
    if (newValueStringConverted !== oldValueStringConverted) {
      autocompleteValue.value = props.multiple ? "" : newValueStringConverted;
      if (!props.multiple) {
        dropdownShown.value = false;
      }
    }
  });
  watch(autocompleteValue, (newValue) => {
    if (!props.autocomplete) {
      return;
    }
    if (newValue && newValue !== getLastOptionText(value.value)) {
      dropdownShown.value = true;
    }
  });
  const onDropdownClosed = () => {
    autocompleteValue.value = props.multiple ? "" : getLastOptionText(value.value);
  };
  watch(dropdownShown, (newValue, oldValue) => {
    if (!props.autocomplete) {
      return;
    }
    if (!newValue || oldValue) {
      onDropdownClosed();
    }
  });
  return autocompleteValue;
};

// node_modules/vuestic-ui/dist/es/src/components/va-select/hooks/useSelectAria.js
var useSelectAria = () => {
  const id = useComponentUuid();
  const popupId = `combobox-controls-${id}`;
  return {
    popupId
  };
};

// node_modules/vuestic-ui/dist/es/src/composables/useMaxSelections.js
var useMaxSelectionsProps = {
  maxSelections: {
    type: [Number, String],
    default: void 0
  }
};
function useMaxSelections(selections, maxSelections) {
  const exceedsMaxSelections = () => {
    if (maxSelections.value === void 0 || isNaN(+maxSelections.value)) {
      return false;
    }
    return selections.value.length >= Number(maxSelections.value);
  };
  const addOption = (optionToAdd) => {
    return [...selections.value, optionToAdd];
  };
  return {
    exceedsMaxSelections,
    addOption
  };
}

// node_modules/vuestic-ui/dist/es/src/components/va-select/VaSelect.vue_vue_type_script_setup_true_lang.js
import "D:/Github/DONGTIAN/ui/node_modules/vuestic-ui/dist/es/VaSelect.css";
var VaInputWrapperProps3 = extractComponentProps(VaInputWrapper);
var _sfc_main94 = defineComponent({
  ...{
    name: "VaSelect"
  },
  __name: "VaSelect",
  props: {
    ...VaInputWrapperProps3,
    ...useComponentPresetProp,
    ...useSelectableListProps,
    ...useValidationProps,
    ...useLoadingProps,
    ...useMaxSelectionsProps,
    ...useClearableProps,
    ...useFormFieldProps,
    ...useMaxVisibleOptionsProps,
    ...useToggleIconProps,
    ...useThrottleProps,
    ...useStringValueProps,
    ...useAutocompleteProps,
    ...useDropdownableProps,
    modelValue: {
      type: [String, Number, Array, Object, Boolean],
      default: void 0
    },
    // Dropdown placement
    placement: { ...useDropdownableProps.placement, default: "bottom" },
    keepAnchorWidth: { ...useDropdownableProps.keepAnchorWidth, default: true },
    offset: { ...useDropdownableProps.offset, default: [1, 0] },
    closeOnContentClick: { ...useDropdownableProps.closeOnContentClick, default: false },
    trigger: { ...useDropdownableProps.trigger, default: () => ["click", "right-click", "space", "enter"] },
    // Select options
    allowCreate: {
      type: [Boolean, String],
      default: false,
      validator: (mode) => [true, false, "unique"].includes(mode)
    },
    color: { type: String, default: "primary" },
    multiple: { type: Boolean, default: false },
    searchable: { type: Boolean, default: false },
    width: { type: String, default: "100%" },
    maxHeight: { type: String, default: "256px" },
    noOptionsText: useTranslationProp("$t:noOptions"),
    hideSelected: { type: Boolean, default: false },
    tabindex: { type: [String, Number], default: 0 },
    virtualScroller: { type: Boolean, default: false },
    selectedTopShown: { type: Boolean, default: false },
    highlightMatchedText: { type: Boolean, default: true },
    minSearchChars: { type: [Number, String], default: 0 },
    autoSelectFirstOption: { type: Boolean, default: false },
    // Input style
    placeholder: { type: String, default: "" },
    searchPlaceholderText: useTranslationProp("$t:search"),
    ariaLabel: useTranslationProp("$t:select"),
    ariaSearchLabel: useTranslationProp("$t:optionsFilter"),
    ariaClearLabel: useTranslationProp("$t:reset"),
    search: { type: String, default: void 0 }
  },
  emits: [
    "update:modelValue",
    "update-search",
    "create-new",
    "scroll-bottom",
    "update:search",
    ...useDropdownableEmits,
    ...useValidationEmits,
    ...useClearableEmits
  ],
  setup(__props, { expose: __expose, emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const { tp, t } = useTranslation();
    const optionList = shallowRef();
    const input = shallowRef();
    const searchBar = shallowRef();
    const isInputFocused = useFocusDeep(input);
    const { getValue, getText, getTrackBy, tryResolveByValue } = useSelectableList(props);
    const getValueText = (option) => getText(tryResolveByValue(option));
    const onScrollBottom = () => emit("scroll-bottom");
    const [searchVModel] = useSyncProp("search", props, emit, "");
    const showSearchInput = computed(() => props.searchable || props.allowCreate && !props.autocomplete);
    watch(searchVModel, (value) => {
      emit("update-search", value);
      if (!props.autocomplete) {
        hoveredOption.value = null;
      }
    });
    const getOptionByValue = (value) => {
      if (isNilValue(value) || typeof value === "object") {
        return value;
      }
      const optionByValue = props.options.find((option) => value === getValue(option));
      if (optionByValue === void 0) {
        warn(`[VaSelect]: can not find option in options list (${JSON.stringify(props.options)}) by provided value (${JSON.stringify(value)})!`);
        return value;
      }
      return optionByValue;
    };
    const {
      toggleHiddenOptionsState,
      isAllOptionsShown,
      visibleSelectedOptions,
      hiddenSelectedOptionsAmount,
      allSelectedOptions
    } = useMaxVisibleOptions(props, getOptionByValue);
    const valueComputed = computed({
      get() {
        if (props.multiple) {
          return allSelectedOptions.value;
        }
        const value = getOptionByValue(props.modelValue);
        if (Array.isArray(value)) {
          warn("Model value should be a string, number, boolean or an object for a single Select.");
          if (value.length) {
            return value.at(-1);
          }
        }
        return value;
      },
      set(option) {
        if (Array.isArray(option)) {
          emit("update:modelValue", option.map(getValue));
        } else {
          emit("update:modelValue", getValue(option));
        }
      }
    });
    const valueString = useStringValue(props, visibleSelectedOptions, getValueText);
    const {
      canBeCleared,
      clearIconProps,
      onFocus,
      onBlur
    } = useClearable(props, valueComputed);
    const showClearIcon = computed(() => {
      if (!canBeCleared.value) {
        return false;
      }
      if (props.multiple && Array.isArray(valueComputed.value)) {
        return !!valueComputed.value.length;
      }
      return true;
    });
    const filteredOptions = computed(() => {
      if (!props.options) {
        return [];
      }
      if (props.selectedTopShown) {
        return props.options.slice().sort((a, b) => {
          const isASelected = checkIsOptionSelected(a);
          const isBSelected = checkIsOptionSelected(b);
          if (isASelected && isBSelected) {
            return 0;
          }
          if (isASelected && !isBSelected) {
            return -1;
          }
          return 1;
        });
      }
      if (props.hideSelected) {
        return props.options.filter((option) => !checkIsOptionSelected(option));
      }
      return props.options;
    });
    const normalizedOptionValue = computed(() => {
      if (Array.isArray(valueComputed.value)) {
        return valueComputed.value.map((value) => tryResolveByValue(value));
      }
      return tryResolveByValue(valueComputed.value);
    });
    const checkIsOptionSelected = (option) => {
      if (Array.isArray(normalizedOptionValue.value)) {
        return !isNilValue(normalizedOptionValue.value.find((valueItem) => compareOptions(valueItem, option)));
      }
      return compareOptions(normalizedOptionValue.value, option);
    };
    const compareOptions = (option1, option2) => {
      const one = getValue(option1);
      const two = getValue(option2);
      if (one === two) {
        return true;
      }
      if (typeof one === "string" && typeof two === "string") {
        return one === two;
      }
      if (one === null || two === null) {
        return false;
      }
      if (typeof one === "object" && typeof two === "object") {
        return getTrackBy(one) === getTrackBy(two);
      }
      return false;
    };
    const isValueComputedArray = (v) => Array.isArray(v.value);
    const selectOption = (option) => {
      if (hoveredOption.value === null) {
        hideAndFocus();
        return;
      }
      if (showSearchInput.value) {
        searchVModel.value = "";
      }
      if (props.multiple && isValueComputedArray(valueComputed)) {
        const { exceedsMaxSelections, addOption } = useMaxSelections(valueComputed, ref(props.maxSelections));
        const isSelected = checkIsOptionSelected(option);
        if (isSelected) {
          valueComputed.value = valueComputed.value.filter((optionSelected) => !compareOptions(option, optionSelected));
        } else {
          if (exceedsMaxSelections()) {
            return;
          }
          valueComputed.value = addOption(option);
        }
      } else {
        valueComputed.value = option;
        hideAndFocus();
      }
      focusAutocompleteInput();
    };
    const addNewOption = () => {
      var _a2;
      const hasAddedOption = (_a2 = props.options) == null ? void 0 : _a2.some((option) => [searchVModel.value, autocompleteValue.value].includes(getText(option)));
      const allowedToCreateCheck = !((props.allowCreate === "unique" || props.autocomplete) && hasAddedOption);
      if (allowedToCreateCheck) {
        emit("create-new", searchVModel.value || autocompleteValue.value);
        searchVModel.value = "";
        autocompleteValue.value = "";
      }
    };
    const hoveredOption = ref(null);
    const selectHoveredOption = () => {
      if (!isOpenSync.value) {
        handleDropdownOpen();
        return;
      }
      selectOption(hoveredOption.value);
    };
    const selectOrAddOption = () => {
      const allowedToCreate = !!props.allowCreate && (searchVModel.value || autocompleteValue.value);
      if (hoveredOption.value !== null) {
        selectHoveredOption();
      } else if (allowedToCreate) {
        addNewOption();
      }
    };
    const focusPreviousOption = () => {
      var _a2;
      return (_a2 = optionList.value) == null ? void 0 : _a2.focusPreviousOption();
    };
    const focusNextOption = () => {
      var _a2;
      return (_a2 = optionList.value) == null ? void 0 : _a2.focusNextOption();
    };
    const { isOpenSync, dropdownProps } = useDropdownable(props, emit, {
      defaultCloseOnValueUpdate: computed(() => !props.multiple)
    });
    const dropdownPropsComputed = computed(() => ({
      ...dropdownProps.value,
      stateful: false,
      innerAnchorSelector: ".va-input-wrapper__field"
    }));
    const showDropdownContentComputed = computed({
      get: () => isOpenSync.value,
      set: (show) => {
        show ? handleDropdownOpen() : handleDropdownClose();
      }
    });
    const handleDropdownOpen = () => {
      if (props.disabled || props.readonly) {
        return;
      }
      isOpenSync.value = true;
      scrollToSelected();
      focusSearchOrOptions();
    };
    const handleDropdownClose = () => {
      isOpenSync.value = false;
      if (!props.autocomplete) {
        searchVModel.value = "";
      }
      nextTick(() => {
        validate();
        isInputFocused.focusIfNothingIfFocused();
      });
    };
    const hideAndFocus = () => {
      handleDropdownClose();
      isInputFocused.value = true;
    };
    const focusSearchBar = () => {
      var _a2;
      (_a2 = searchBar.value) == null ? void 0 : _a2.focus();
    };
    const focusOptionList = () => {
      var _a2, _b;
      (_a2 = optionList.value) == null ? void 0 : _a2.focus();
      !props.modelValue && ((_b = optionList.value) == null ? void 0 : _b.focusFirstOption());
    };
    const focusSearchOrOptions = async () => {
      await nextTick();
      if (showSearchInput.value) {
        focusSearchBar();
      } else {
        focusOptionList();
      }
    };
    const onInputBlur = () => {
      if (showDropdownContentComputed.value) {
        return;
      }
      onBlur();
      validationListeners.onBlur();
      isInputFocused.value ? isInputFocused.value = false : validate();
    };
    const tabIndexComputed = computed(() => props.disabled ? -1 : props.tabindex);
    const openSelectButtonTabIndexComputed = computed(() => props.disabled || props.autocomplete ? -1 : 0);
    const scrollToSelected = () => {
      const selected = valueComputed.value;
      const nothingSelected = typeof selected !== "object" && Array.isArray(selected) && !selected.length;
      if (nothingSelected) {
        return;
      }
      const scrollTo = Array.isArray(selected) ? selected[selected.length - 1] : selected;
      hoveredOption.value = scrollTo;
      nextTick(() => {
        var _a2;
        return (_a2 = optionList.value) == null ? void 0 : _a2.scrollToOption(scrollTo);
      });
    };
    let hintedSearchQuery = "";
    let hintedSearchQueryTimeoutIndex;
    const navigationKeys = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "Enter", " "];
    const onHintedSearch = (event) => {
      if (navigationKeys.some((key) => key === event.key)) {
        return;
      }
      const isLetter = event.key.length === 1;
      const isDeleteKey = event.key === "Backspace" || event.key === "Delete";
      clearTimeout(hintedSearchQueryTimeoutIndex);
      if (isDeleteKey) {
        hintedSearchQuery = hintedSearchQuery ? hintedSearchQuery.slice(0, -1) : "";
      } else if (isLetter) {
        hintedSearchQuery += event.key;
      }
      if (showSearchInput.value) {
        searchVModel.value = hintedSearchQuery;
        return;
      }
      if (hintedSearchQuery) {
        const appropriateOption = props.options.find((option) => getText(option).toLowerCase().startsWith(hintedSearchQuery.toLowerCase()));
        if (appropriateOption) {
          hoveredOption.value = appropriateOption;
        }
      }
      hintedSearchQueryTimeoutIndex = setTimeout(() => {
        hintedSearchQuery = "";
      }, 1e3);
    };
    const minSearchCharsComputed = useNumericProp("minSearchChars");
    const optionsListPropsComputed = computed(() => ({
      ...pick(props, ["textBy", "trackBy", "groupBy", "valueBy", "disabledBy", "color", "virtualScroller", "highlightMatchedText", "delay", "selectedTopShown"]),
      autoSelectFirstOption: props.autoSelectFirstOption || props.autocomplete,
      search: searchVModel.value || autocompleteValue.value,
      tabindex: tabIndexComputed.value,
      selectedValue: valueComputed.value,
      options: filteredOptions.value,
      getSelectedState: checkIsOptionSelected,
      noOptionsText: tp(props.noOptionsText),
      doShowAllOptions: doShowAllOptions.value,
      minSearchChars: minSearchCharsComputed.value
    }));
    const { toggleIcon, toggleIconColor } = useToggleIcon(props, isOpenSync);
    const isFocused = computed(() => isInputFocused.value || isOpenSync.value);
    const slots = useSlots();
    const inputWrapperClassComputed = useBem("va-select-anchor", () => ({
      nowrap: !!(props.maxVisibleOptions && !slots.content)
    }));
    const vaInputWrapperProps = filterComponentProps(VaInputWrapperProps3);
    const inputWrapperPropsComputed = computed(() => ({
      ...vaInputWrapperProps.value,
      error: computedError.value,
      errorMessages: computedErrorMessages.value,
      focused: isFocused.value,
      "aria-label": props.ariaLabel || (props.modelValue ? `${t("selectedOption")}: ${props.modelValue}` : t("noSelectedOption"))
    }));
    const selectContentPropsComputed = computed(() => ({
      ...pick(props, ["placeholder", "autocomplete", "multiple", "disabled", "readonly"]),
      tabindex: tabIndexComputed.value,
      value: visibleSelectedOptions.value,
      valueString: valueString.value,
      hiddenSelectedOptionsAmount: hiddenSelectedOptionsAmount.value,
      isAllOptionsShown: isAllOptionsShown.value,
      focused: isInputFocused.value,
      autocompleteInputValue: autocompleteValue.value,
      getText: getValueText
    }));
    const autocompleteValue = useAutocomplete(searchVModel, props, visibleSelectedOptions, isOpenSync, getText);
    const setAutocompleteValue = (v) => autocompleteValue.value = v;
    const doShowAllOptions = ref(true);
    watch(showDropdownContentComputed, () => {
      doShowAllOptions.value = true;
    });
    watch(searchVModel, () => {
      doShowAllOptions.value = false;
    });
    const focus = () => {
      if (props.disabled) {
        return;
      }
      focusElement(unwrapEl(input.value));
    };
    const blur = () => {
      if (showDropdownContentComputed.value) {
        showDropdownContentComputed.value = false;
      }
      nextTick(() => {
        if (props.disabled) {
          return;
        }
        blurElement(unwrapEl(input.value));
      });
    };
    const reset = () => withoutValidation(() => {
      if (props.multiple) {
        valueComputed.value = Array.isArray(props.clearValue) ? props.clearValue : [];
      } else {
        valueComputed.value = props.clearValue;
      }
      searchVModel.value = "";
      emit("clear");
      resetValidation();
      nextTick(() => {
        isInputFocused.value = true;
      });
    });
    const focusAutocompleteInput = (e) => {
      if (props.autocomplete && !props.disabled && !props.readonly) {
        e == null ? void 0 : e.stopImmediatePropagation();
        isInputFocused.value = true;
        isOpenSync.value = true;
      }
    };
    const toggleDropdown = (e) => {
      if (props.disabled || props.readonly) {
        return;
      }
      const isInInput = e.target && "tagName" in e.target && e.target.tagName === "INPUT";
      if (e.code === "Space" && isInInput) {
        return;
      }
      e.preventDefault();
      showDropdownContentComputed.value = !showDropdownContentComputed.value;
    };
    const deleteLastSelected = () => {
      if (!Array.isArray(valueComputed.value)) {
        return;
      }
      valueComputed.value = valueComputed.value.slice(0, -1);
    };
    const {
      validate,
      computedError,
      computedErrorMessages,
      withoutValidation,
      resetValidation,
      validationAriaAttributes,
      listeners: validationListeners,
      isTouched
    } = useValidation(props, emit, { reset, focus, value: valueComputed });
    watch(isOpenSync, (isOpen) => {
      if (!isOpen) {
        isTouched.value = true;
      }
    });
    const { popupId } = useSelectAria();
    const searchInput = searchVModel;
    const onInputFocus = onFocus;
    __expose({
      focus,
      blur,
      reset
    });
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(VaDropdown), mergeProps({
        ref: "dropdown",
        modelValue: showDropdownContentComputed.value,
        "onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => showDropdownContentComputed.value = $event),
        class: "va-select va-select__dropdown va-select-dropdown"
      }, dropdownPropsComputed.value, {
        role: "combobox",
        "inner-anchor-selector": ".va-input-wrapper__field",
        "keyboard-navigation": false
      }), {
        anchor: withCtx(() => [
          createVNode(unref(VaInputWrapper), mergeProps(inputWrapperPropsComputed.value, {
            ref_key: "input",
            ref: input,
            class: ["va-select__anchor va-select-anchor__input", unref(inputWrapperClassComputed)],
            "aria-haspopup": "listbox",
            "model-value": unref(valueString),
            readonly: true,
            "aria-label": _ctx.$props.ariaLabel,
            "aria-controls": unref(popupId),
            "aria-owns": unref(popupId),
            onFocus: unref(onInputFocus),
            onBlur: onInputBlur
          }), createSlots({
            icon: withCtx(() => [
              showClearIcon.value ? (openBlock(), createBlock(unref(VaIcon), mergeProps({
                key: 0,
                role: "button",
                "aria-label": unref(tp)(_ctx.$props.ariaClearLabel)
              }, unref(clearIconProps), {
                onClick: withModifiers(reset, ["stop"]),
                onKeydown: [
                  withKeys(withModifiers(reset, ["stop"]), ["enter"]),
                  withKeys(withModifiers(reset, ["stop"]), ["space"])
                ]
              }), null, 16, ["aria-label", "onKeydown"])) : createCommentVNode("", true)
            ]),
            appendInner: withCtx(() => [
              createVNode(unref(VaIcon), {
                color: unref(toggleIconColor),
                name: unref(toggleIcon),
                class: "va-select__toggle-icon",
                role: "button",
                tabindex: openSelectButtonTabIndexComputed.value,
                "aria-expanded": showDropdownContentComputed.value,
                onKeydown: withKeys(toggleDropdown, ["enter"])
              }, null, 8, ["color", "name", "tabindex", "aria-expanded"])
            ]),
            default: withCtx(({ ariaAttributes }) => [
              createVNode(unref(VaSelectContent), mergeProps(selectContentPropsComputed.value, {
                ariaAttributes,
                separator: _ctx.$props.separator,
                onToggleHidden: unref(toggleHiddenOptionsState),
                onAutocompleteInput: setAutocompleteValue,
                onFocusPrev: focusPreviousOption,
                onFocusNext: focusNextOption,
                onSelectOption: selectOrAddOption,
                onDeleteLastSelected: deleteLastSelected
              }), createSlots({ _: 2 }, [
                renderList(_ctx.$slots, (_, name) => {
                  return {
                    name,
                    fn: withCtx((slotScope) => [
                      renderSlot(_ctx.$slots, name, normalizeProps(guardReactiveProps(slotScope)))
                    ])
                  };
                })
              ]), 1040, ["ariaAttributes", "separator", "onToggleHidden"])
            ]),
            _: 2
          }, [
            renderList(_ctx.$slots, (_, name) => {
              return {
                name,
                fn: withCtx((slotScope) => [
                  renderSlot(_ctx.$slots, name, normalizeProps(guardReactiveProps(slotScope)))
                ])
              };
            })
          ]), 1040, ["class", "model-value", "aria-label", "aria-controls", "aria-owns", "onFocus"])
        ]),
        default: withCtx(() => [
          createVNode(unref(VaDropdownContent), {
            class: "va-select-dropdown__content",
            style: normalizeStyle({ width: _ctx.$props.width }),
            onKeydown: withKeys(hideAndFocus, ["esc"]),
            role: "dialog"
          }, {
            default: withCtx(() => [
              showSearchInput.value ? (openBlock(), createBlock(unref(VaInputWrapper), {
                key: 0,
                ref_key: "searchBar",
                ref: searchBar,
                class: "va-select-dropdown__content-search-input",
                modelValue: unref(searchInput),
                "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => isRef(searchInput) ? searchInput.value = $event : null),
                "aria-label": unref(tp)(_ctx.$props.ariaSearchLabel),
                tabindex: tabIndexComputed.value,
                placeholder: unref(tp)(_ctx.$props.searchPlaceholderText),
                preset: "bordered",
                onKeydown: [
                  withKeys(withModifiers(focusPreviousOption, ["stop", "prevent"]), ["up"]),
                  withKeys(withModifiers(focusPreviousOption, ["stop", "prevent"]), ["left"]),
                  withKeys(withModifiers(focusNextOption, ["stop", "prevent"]), ["down"]),
                  withKeys(withModifiers(focusNextOption, ["stop", "prevent"]), ["right"]),
                  withKeys(withModifiers(selectOrAddOption, ["prevent"]), ["enter"])
                ],
                onFocus: _cache[1] || (_cache[1] = ($event) => hoveredOption.value = null)
              }, null, 8, ["modelValue", "aria-label", "tabindex", "placeholder", "onKeydown"])) : createCommentVNode("", true),
              createVNode(unref(VaSelectOptionList), mergeProps({
                ref_key: "optionList",
                ref: optionList,
                class: "va-select-dropdown__options-wrapper",
                hoveredOption: hoveredOption.value,
                "onUpdate:hoveredOption": _cache[2] || (_cache[2] = ($event) => hoveredOption.value = $event),
                style: { maxHeight: _ctx.$props.maxHeight },
                id: unref(popupId)
              }, optionsListPropsComputed.value, {
                onSelectOption: selectHoveredOption,
                onNoPreviousOptionToHover: focusSearchBar,
                onKeydown: [
                  _cache[3] || (_cache[3] = withKeys(withModifiers(($event) => searchBar.value && searchBar.value.focus(), ["stop", "prevent"]), ["tab"])),
                  onHintedSearch
                ],
                onScrollBottom
              }), {
                default: withCtx((slotData) => [
                  renderSlot(_ctx.$slots, "option", normalizeProps(guardReactiveProps(slotData)))
                ]),
                "option-content": withCtx((slotData) => [
                  renderSlot(_ctx.$slots, "option-content", normalizeProps(guardReactiveProps(slotData)))
                ]),
                _: 3
              }, 16, ["hoveredOption", "style", "id"])
            ]),
            _: 3
          }, 8, ["style"])
        ]),
        _: 3
      }, 16, ["modelValue"]);
    };
  }
});

// node_modules/vuestic-ui/dist/es/src/components/va-select/index.js
var VaSelect = withConfigTransport$1(_sfc_main94);

// node_modules/vuestic-ui/dist/es/src/components/va-skeleton/VaSkeleton.vue_vue_type_script_setup_true_lang.js
import "D:/Github/DONGTIAN/ui/node_modules/vuestic-ui/dist/es/VaSkeleton.css";
var _hoisted_156 = {
  key: 0,
  class: "va-skeleton__wave"
};
var _sfc_main95 = defineComponent({
  ...{
    name: "VaSkeleton"
  },
  __name: "VaSkeleton",
  props: {
    color: { type: String, default: "backgroundElement" },
    delay: { type: [Number, String], default: 100 },
    tag: { type: String, default: "div" },
    animation: { type: String, default: "pulse" },
    lines: { type: [String, Number], default: 1 },
    height: { type: [String], default: "5em" },
    width: { type: [String], default: "100%" },
    lineGap: { type: String, default: "8px" },
    lastLineWidth: { type: [String], default: "75%" },
    variant: { type: String, default: "squared" },
    ariaLabel: useTranslationProp("$t:loading")
  },
  setup(__props) {
    const props = __props;
    const doShow = ref(false);
    const delayComputed = useNumericProp("delay");
    let timeoutId;
    onMounted(() => {
      clearTimeout(timeoutId);
      setTimeout(() => {
        doShow.value = true;
      }, delayComputed.value);
    });
    onBeforeUnmount(() => {
      clearTimeout(timeoutId);
    });
    const heightComputed = computed(() => {
      if (props.variant === "text") {
        return `${props.lines}em`;
      }
      return props.height;
    });
    const widthComputed = computed(() => {
      if (props.variant === "circle") {
        return heightComputed.value;
      }
      return props.width;
    });
    const { getColor } = useColors();
    const colorComputed = computed(() => getColor(props.color));
    computed(() => `-${props.lineGap}`);
    const bem = useBem("va-skeleton", () => ({
      lines: Number(props.lines) > 1,
      text: props.variant === "text",
      circle: props.variant === "circle",
      hidden: !doShow.value,
      pulse: props.animation === "pulse",
      wave: props.animation === "wave"
    }));
    const borderRadius = computed(() => {
      if (props.variant === "circle") {
        return "50%";
      }
      if (props.variant === "rounded") {
        return `var(--va-skeleton-border-radius, calc(${heightComputed.value} / 5))`;
      }
      return "0px";
    });
    const { tp } = useTranslation();
    const attrs = useAttrs();
    const classes = computed(() => [
      ...Object.keys(bem),
      attrs.class
    ]);
    return (_ctx, _cache) => {
      return openBlock(), createBlock(resolveDynamicComponent(__props.tag), {
        class: normalizeClass(["va-skeleton", classes.value]),
        role: "status",
        "aria-live": "polite",
        "aria-label": unref(tp)(_ctx.$props.ariaLabel),
        "aria-atomic": "true",
        style: normalizeStyle(`--va-color-computed: ${String(colorComputed.value)};--va-height-computed: ${String(heightComputed.value)};--va-width-computed: ${String(widthComputed.value)};--va-border-radius: ${String(borderRadius.value)};--va-line-gap: ${String(__props.lineGap)};--va-last-line-width: ${String(__props.lastLineWidth)}`)
      }, {
        default: withCtx(() => [
          renderSlot(_ctx.$slots, "default"),
          __props.animation === "wave" ? (openBlock(), createElementBlock("div", _hoisted_156)) : createCommentVNode("", true)
        ]),
        _: 3
      }, 8, ["aria-label", "class", "style"]);
    };
  }
});

// node_modules/vuestic-ui/dist/es/src/components/va-skeleton/components/VaSkeletonGroup.vue_vue_type_script_setup_true_lang.js
import "D:/Github/DONGTIAN/ui/node_modules/vuestic-ui/dist/es/VaSkeletonGroup.css";
var _sfc_main96 = defineComponent({
  ...{
    name: "VaSkeletonGroup"
  },
  __name: "VaSkeletonGroup",
  props: {
    color: { type: String, default: "backgroundElement" },
    delay: { type: [Number, String], default: 100 },
    animation: { type: String, default: "pulse" },
    lines: { type: [Number, String], default: 1 },
    lineGap: { type: String, default: "8px" },
    lastLineWidth: { type: [String], default: "75%" }
  },
  setup(__props) {
    const props = __props;
    const doShow = ref(false);
    const delayComputed = useNumericProp("delay");
    let timeoutId;
    onMounted(() => {
      timeoutId = setTimeout(() => {
        doShow.value = true;
      }, delayComputed.value);
    });
    onBeforeMount(() => {
      clearTimeout(timeoutId);
    });
    const bem = useBem("va-skeleton-group", () => ({
      hidden: doShow.value === false
    }));
    const config = computed(() => ({ ...props, delay: 0 }));
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(_sfc_main4), {
        components: { VaSkeleton: config.value }
      }, {
        default: withCtx(() => [
          createBaseVNode("div", mergeProps({
            class: ["va-skeleton-group", unref(bem)]
          }, _ctx.$attrs), [
            renderSlot(_ctx.$slots, "default", {}, void 0, true)
          ], 16)
        ]),
        _: 3
      }, 8, ["components"]);
    };
  }
});

// node_modules/vuestic-ui/dist/es/src/components/va-skeleton/components/VaSkeletonGroup.js
import "D:/Github/DONGTIAN/ui/node_modules/vuestic-ui/dist/es/VaSkeletonGroup.css";
var _VaSkeletonGroup = _export_sfc(_sfc_main96, [["__scopeId", "data-v-597bab9a"]]);

// node_modules/vuestic-ui/dist/es/src/components/va-skeleton/index.js
var VaSkeleton = withConfigTransport$1(_sfc_main95);
var VaSkeletonGroup = withConfigTransport$1(_VaSkeletonGroup);

// node_modules/vuestic-ui/dist/es/src/components/va-sidebar/hooks/useSidebar.js
var VaSidebarKey = Symbol("VaSidebar");
var useSidebar = (props) => {
  provide(VaSidebarKey, props);
};
var useSidebarItem = () => {
  return inject(VaSidebarKey, {
    color: "background-element"
    // activeColor: 'primary',
  });
};

// node_modules/vuestic-ui/dist/es/src/composables/useElementWidth.js
var useElementWidth = (el) => {
  const width = ref(null);
  useResizeObserver([el], () => {
    var _a2;
    width.value = ((_a2 = el.value) == null ? void 0 : _a2.clientWidth) ?? null;
  });
  watchEffect(() => {
    var _a2;
    width.value = ((_a2 = el.value) == null ? void 0 : _a2.clientWidth) ?? null;
  });
  return width;
};

// node_modules/vuestic-ui/dist/es/src/components/va-sidebar/VaSidebar.vue_vue_type_script_setup_true_lang.js
import "D:/Github/DONGTIAN/ui/node_modules/vuestic-ui/dist/es/VaSidebar.css";
var _sfc_main97 = defineComponent({
  ...{
    name: "VaSidebar"
  },
  __name: "VaSidebar",
  props: {
    ...useComponentPresetProp,
    activeColor: { type: String, default: "primary" },
    hoverColor: { type: String, default: void 0 },
    hoverOpacity: {
      type: [Number, String],
      default: 0.2,
      validator: (v) => Number(v) >= 0 && Number(v) <= 1
    },
    borderColor: { type: String, default: void 0 },
    color: { type: String, default: "background-element" },
    textColor: { type: String },
    gradient: { type: Boolean, default: false },
    minimized: { type: Boolean, default: false },
    hoverable: { type: Boolean, default: false },
    width: { type: String, default: "16rem" },
    minimizedWidth: { type: String, default: "4rem" },
    modelValue: { type: Boolean, default: true },
    animated: { type: [Boolean, String], default: true },
    closeOnClickOutside: { type: Boolean, default: false }
  },
  emits: ["update:modelValue"],
  setup(__props, { expose: __expose, emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const { getColor } = useColors();
    useSidebar(props);
    const isHovered = ref(false);
    const isMinimized = computed(() => props.minimized || props.hoverable && !isHovered.value);
    const menu = ref();
    const currentMenuWidth = useElementWidth(menu);
    const doShowMenu = computed(() => {
      if (props.modelValue === true) {
        return true;
      }
      if (currentMenuWidth.value === null) {
        return true;
      }
      return currentMenuWidth.value > 0;
    });
    const sidebarWidth = ref();
    const getSidebarWidth = () => {
      if (!props.modelValue) {
        return 0;
      }
      return isMinimized.value ? props.minimizedWidth : props.width;
    };
    const menuWidth = computed(() => isMinimized.value ? props.minimizedWidth : props.width);
    watchEffect(() => {
      const width = getSidebarWidth();
      setTimeout(() => {
        sidebarWidth.value = width;
      });
    });
    const backgroundColorComputed = computed(() => getColor(props.color));
    const { textColorComputed } = useTextColor(backgroundColorComputed);
    const computedStyle = computed(() => {
      const backgroundColor = getColor(backgroundColorComputed.value);
      const color = textColorComputed.value;
      return {
        color,
        backgroundColor,
        backgroundImage: props.gradient ? getGradientBackground(backgroundColor) : void 0,
        overflowX: currentMenuWidth.value === sidebarWidth.value ? void 0 : "hidden",
        width: sidebarWidth.value,
        minWidth: sidebarWidth.value
      };
    });
    const computedClass = useBem("va-sidebar", () => ({
      minimized: isMinimized.value,
      animated: Boolean(props.animated),
      "animated-right": props.animated === "right",
      "animated-left": props.animated === "left" || props.animated === true
    }));
    const updateHoverState = (newHoverState) => {
      isHovered.value = props.hoverable && newHoverState;
    };
    const rootElement = shallowRef();
    useClickOutside([rootElement], () => {
      if (props.closeOnClickOutside && props.modelValue) {
        setTimeout(() => {
          emit("update:modelValue", false);
        }, 0);
      }
    });
    const vaSidebarItemProps = computed(() => ({
      textColor: props.textColor,
      activeColor: props.activeColor,
      hoverColor: props.hoverColor,
      borderColor: props.borderColor,
      hoverOpacity: props.hoverOpacity
    }));
    __expose({
      isMinimized,
      isHovered,
      updateHoverState,
      rootElement,
      menu,
      doShowMenu,
      menuWidth,
      sidebarWidth
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("aside", {
        ref_key: "rootElement",
        ref: rootElement,
        class: normalizeClass(["va-sidebar", unref(computedClass)]),
        style: normalizeStyle(computedStyle.value),
        onMouseenter: _cache[0] || (_cache[0] = ($event) => updateHoverState(true)),
        onMouseleave: _cache[1] || (_cache[1] = ($event) => updateHoverState(false))
      }, [
        withDirectives(createBaseVNode("div", {
          class: "va-sidebar__menu",
          ref_key: "menu",
          ref: menu,
          style: normalizeStyle({
            width: menuWidth.value,
            minWidth: menuWidth.value
          })
        }, [
          createVNode(unref(_sfc_main4), {
            components: { VaSidebarItem: vaSidebarItemProps.value }
          }, {
            default: withCtx(() => [
              renderSlot(_ctx.$slots, "default")
            ]),
            _: 3
          }, 8, ["components"])
        ], 4), [
          [vShow, doShowMenu.value]
        ])
      ], 38);
    };
  }
});

// node_modules/vuestic-ui/dist/es/src/components/va-sidebar/index.js
var VaSidebar = withConfigTransport$1(_sfc_main97);

// node_modules/vuestic-ui/dist/es/src/components/va-sidebar/VaSidebarItem/VaSidebarItem.vue_vue_type_script_setup_true_lang.js
import "D:/Github/DONGTIAN/ui/node_modules/vuestic-ui/dist/es/VaSidebarItem.css";
var _sfc_main98 = defineComponent({
  ...{
    name: "VaSidebarItem"
  },
  __name: "VaSidebarItem",
  props: {
    ...useRouterLinkProps,
    ...useComponentPresetProp,
    active: { type: Boolean, default: false },
    textColor: { type: String, default: void 0 },
    activeColor: { type: String, default: "primary" },
    hoverColor: { type: String, default: void 0 },
    hoverOpacity: { type: [Number, String], default: 0.2 },
    borderColor: { type: String, default: void 0 },
    disabled: { type: Boolean, default: false }
  },
  setup(__props) {
    const props = __props;
    const rootElement = useElementRef();
    const sidebar = useSidebarItem();
    const { isHovered } = useHover(rootElement, toRef(props, "disabled"));
    const { getColor, getHoverColor: getHoverColor2, getFocusColor: getFocusColor2 } = useColors();
    const { hasKeyboardFocus, keyboardFocusListeners } = useKeyboardOnlyFocus();
    const backgroundColorComputed = computed(() => {
      if (props.active && !isHovered.value && !hasKeyboardFocus.value) {
        return getColor(props.activeColor);
      }
      if (hasKeyboardFocus.value) {
        return getFocusColor2(getColor(props.hoverColor || props.activeColor));
      }
      return "#ffffff00";
    });
    const textBackground = computed(() => applyColors(getColor(sidebar == null ? void 0 : sidebar.color), backgroundColorComputed.value));
    const { textColorComputed } = useTextColor(textBackground);
    const computedStyle = computed(() => {
      const style = { color: textColorComputed.value };
      if (props.disabled) {
        return style;
      }
      if (isHovered.value || props.active || hasKeyboardFocus.value) {
        style.backgroundColor = backgroundColorComputed.value;
      }
      if (props.active) {
        const mergedProps = { ...sidebar, ...props };
        style.borderColor = getColor(mergedProps.borderColor || mergedProps.activeColor);
      }
      if (hasKeyboardFocus.value) {
        style.backgroundColor = getFocusColor2(getColor(props.hoverColor || props.activeColor));
      }
      if (isHovered.value) {
        style.backgroundColor = getHoverColor2(
          getColor(props.hoverColor || props.activeColor),
          Number(props.hoverOpacity)
        );
      }
      return style;
    });
    const { tagComputed, linkAttributesComputed } = useRouterLink(props);
    return (_ctx, _cache) => {
      return openBlock(), createBlock(resolveDynamicComponent(unref(tagComputed)), mergeProps({
        ref_key: "rootElement",
        ref: rootElement,
        class: ["va-sidebar__item va-sidebar-item", {
          "va-sidebar-item--active": _ctx.$props.active,
          "va-sidebar-item--disabled": _ctx.$props.disabled
        }],
        tabindex: _ctx.$props.disabled ? -1 : 0,
        style: computedStyle.value
      }, unref(linkAttributesComputed), toHandlers(unref(keyboardFocusListeners))), {
        default: withCtx(() => [
          renderSlot(_ctx.$slots, "default")
        ]),
        _: 3
      }, 16, ["tabindex", "class", "style"]);
    };
  }
});

// node_modules/vuestic-ui/dist/es/src/components/va-sidebar/VaSidebarItem/VaSidebarItemContent.vue_vue_type_script_setup_true_lang.js
import "D:/Github/DONGTIAN/ui/node_modules/vuestic-ui/dist/es/VaSidebarItemContent.css";
var _hoisted_157 = { class: "va-sidebar__item__content va-sidebar-item-content" };
var _sfc_main99 = defineComponent({
  ...{
    name: "VaSidebarItemContent"
  },
  __name: "VaSidebarItemContent",
  setup(__props) {
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_157, [
        renderSlot(_ctx.$slots, "default")
      ]);
    };
  }
});

// node_modules/vuestic-ui/dist/es/src/components/va-sidebar/VaSidebarItem/VaSidebarItemTitle.vue_vue_type_script_setup_true_lang.js
import "D:/Github/DONGTIAN/ui/node_modules/vuestic-ui/dist/es/VaSidebarItemTitle.css";
var _hoisted_158 = { class: "va-sidebar__title va-sidebar-item-title" };
var _sfc_main100 = defineComponent({
  ...{
    name: "VaSidebarItemTitle"
  },
  __name: "VaSidebarItemTitle",
  setup(__props) {
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_158, [
        renderSlot(_ctx.$slots, "default")
      ]);
    };
  }
});

// node_modules/vuestic-ui/dist/es/src/components/va-sidebar/VaSidebarItem/index.js
var VaSidebarItemContent = withConfigTransport$1(_sfc_main99);
var VaSidebarItemTitle = withConfigTransport$1(_sfc_main100);
var VaSidebarItem = withConfigTransport$1(_sfc_main98);

// node_modules/vuestic-ui/dist/es/src/components/va-slider/validateSlider.js
var validateSlider = (value, step, min2, max2, range) => {
  if (Array.isArray(value) && !range || !Array.isArray(value) && range) {
    warn(`The type "${Array.isArray(value) ? "array" : typeof value}" of prop "model-value" does not match prop "range = ${range}".`);
  }
  if (max2 < min2) {
    warn(`The maximum value (${max2}) can not be less than the minimum value (${min2}).`);
  }
  if (!isDividable(max2 - min2, step)) {
    warn(`Step ${step} is illegal. Slider is non-divisible (Min:Max ${min2}:${max2}).`);
  }
  const inRange = (v) => {
    if (v < min2) {
      warn(`The value of the slider is ${v}, the minimum value is ${min2}, the value of this slider can not be less than the minimum value`);
    } else if (v > max2) {
      warn(`The value of the slider is ${v}, the maximum value is ${max2}, the value of this slider can not be greater than the maximum value`);
    }
  };
  if (Array.isArray(value)) {
    value.map(inRange);
  } else {
    inRange(value);
  }
  return true;
};

// node_modules/vuestic-ui/dist/es/src/components/va-slider/VaSlider.vue_vue_type_script_setup_true_lang.js
import "D:/Github/DONGTIAN/ui/node_modules/vuestic-ui/dist/es/VaSlider.css";
var _hoisted_159 = {
  key: 0,
  class: "va-slider__input-wrapper",
  "aria-hidden": "true"
};
var _hoisted_228 = ["id"];
var _hoisted_320 = {
  key: 2,
  class: "va-input__label",
  "aria-hidden": "true"
};
var _hoisted_411 = ["tabindex", "onFocus"];
var _hoisted_59 = ["tabindex"];
var _hoisted_66 = {
  key: 3,
  class: "va-input__label--inverse",
  "aria-hidden": "true"
};
var _hoisted_74 = ["id"];
var _hoisted_82 = {
  key: 5,
  class: "va-slider__input-wrapper"
};
var _sfc_main101 = defineComponent({
  ...{
    name: "VaSlider"
  },
  __name: "VaSlider",
  props: {
    ...useStatefulProps,
    ...useComponentPresetProp,
    range: { type: Boolean, default: false },
    modelValue: { type: [Number, Array], default: 0 },
    trackLabel: { type: [Function, String] },
    color: { type: String, default: "primary" },
    trackColor: { type: String, default: "" },
    labelColor: { type: String, default: "" },
    trackLabelVisible: { type: Boolean, default: false },
    min: { type: [Number, String], default: 0 },
    max: { type: [Number, String], default: 100 },
    step: { type: [Number, String], default: 1 },
    label: { type: String, default: "" },
    invertLabel: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
    readonly: { type: Boolean, default: false },
    pins: { type: Boolean, default: false },
    iconPrepend: { type: String, default: "" },
    iconAppend: { type: String, default: "" },
    vertical: { type: Boolean, default: false },
    showTrack: { type: Boolean, default: true },
    ariaLabel: useTranslationProp("$t:sliderValue")
  },
  emits: ["drag-start", "drag-end", "change", "update:modelValue"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const { getColor, getHoverColor: getHoverColor2 } = useColors();
    const sliderContainer = shallowRef();
    const dot = shallowRef();
    const { setItemRefByIndex, itemRefs: dots } = useArrayRefs();
    const isFocused = ref(false);
    const flag = ref(false);
    const offset3 = ref(0);
    const size3 = ref(0);
    const defaultValue = props.range ? [0, 100] : 0;
    const { valueComputed } = useStateful(props, emit, "modelValue", { defaultValue });
    const currentSliderDotIndex = ref(0);
    const hasMouseDown = ref(false);
    const minComputed = useNumericProp("min");
    const maxComputed = useNumericProp("max");
    const stepComputed = useNumericProp("step");
    const orders = computed(() => props.vertical ? [1, 0] : [0, 1]);
    const pinPositionStyle = computed(() => props.vertical ? "bottom" : "left");
    const trackSizeStyle = computed(() => props.vertical ? "height" : "width");
    const moreToLess = computed(() => Array.isArray(val.value) && val.value[1] - stepComputed.value < val.value[0]);
    const lessToMore = computed(() => Array.isArray(val.value) && val.value[0] + stepComputed.value > val.value[1]);
    const sliderClass = useBem("va-slider", () => ({
      ...pick(props, ["disabled", "readonly", "vertical"]),
      active: isFocused.value,
      horizontal: !props.vertical,
      grabbing: hasMouseDown.value
    }));
    const dotClass = useBem("va-slider__handler", () => ({
      onFocus: !props.range && (flag.value || isFocused.value),
      inactive: !isFocused.value
    }));
    const labelStyles = computed(() => ({
      color: props.labelColor ? getColor(props.labelColor) : getColor(props.color)
    }));
    const trackStyles = computed(() => ({
      backgroundColor: props.trackColor ? getColor(props.trackColor) : getHoverColor2(getColor(props.color))
    }));
    const calculatePercentage = (value) => {
      const min2 = minComputed.value;
      const max2 = maxComputed.value;
      return (clamp3(min2, value, max2) - min2) / (max2 - min2) * 100;
    };
    const processedStyles = computed(() => {
      if (Array.isArray(val.value)) {
        const val0 = calculatePercentage(val.value[0]);
        const val1 = calculatePercentage(val.value[1]);
        return {
          [pinPositionStyle.value]: `${val0}%`,
          [trackSizeStyle.value]: `${val1 - val0}%`,
          backgroundColor: getColor(props.color),
          visibility: props.showTrack ? "visible" : "hidden"
        };
      } else {
        const val0 = calculatePercentage(val.value);
        return {
          [trackSizeStyle.value]: `${val0 > 100 ? 100 : val0}%`,
          backgroundColor: getColor(props.color),
          visibility: props.showTrack ? "visible" : "hidden"
        };
      }
    });
    const dottedStyles = computed(() => {
      if (Array.isArray(val.value)) {
        const val0 = calculatePercentage(val.value[0]);
        const val1 = calculatePercentage(val.value[1]);
        return [
          {
            [pinPositionStyle.value]: `${val0}%`,
            backgroundColor: isActiveDot(0) ? getColor(props.color) : "#ffffff",
            borderColor: getColor(props.color)
          },
          {
            [pinPositionStyle.value]: `${val1}%`,
            backgroundColor: isActiveDot(1) ? getColor(props.color) : "#ffffff",
            borderColor: getColor(props.color)
          }
        ];
      } else {
        const val0 = calculatePercentage(val.value);
        return {
          [pinPositionStyle.value]: `${val0 > 100 ? 100 : val0}%`,
          backgroundColor: isActiveDot(0) ? getColor(props.color) : "#ffffff",
          borderColor: getColor(props.color)
        };
      }
    });
    const getDottedStyles = (index) => props.range ? dottedStyles.value[index] : dottedStyles.value;
    const val = computed({
      get: () => valueComputed.value,
      set: (val2) => {
        if (!flag.value) {
          emit("change", val2);
        }
        valueComputed.value = val2;
      }
    });
    const getValueByOrder = (order) => props.range && order !== void 0 ? val.value[order] : val.value;
    const gap = computed(() => {
      const total = (maxComputed.value - minComputed.value) / stepComputed.value;
      return size3.value / total;
    });
    const multiple = computed(() => {
      const decimals = `${stepComputed.value}`.split(".")[1];
      return decimals ? Math.pow(10, decimals.length) : 1;
    });
    const pinsCol = computed(() => (maxComputed.value - minComputed.value) / stepComputed.value - 1);
    const position = computed(() => {
      return Array.isArray(val.value) ? [(val.value[0] - minComputed.value) / stepComputed.value * gap.value, (val.value[1] - minComputed.value) / stepComputed.value * gap.value] : (val.value - minComputed.value) / stepComputed.value * gap.value;
    });
    const limit = computed(() => [0, size3.value]);
    const valueLimit = computed(() => [minComputed.value, maxComputed.value]);
    const isActiveDot = (index) => {
      if (!isFocused.value && !flag.value || props.disabled || props.readonly) {
        return false;
      }
      return props.range ? currentSliderDotIndex.value === index : currentSliderDotIndex.value === 0;
    };
    const moveStart = (e, index = currentSliderDotIndex.value) => {
      var _a2, _b;
      e.preventDefault();
      if (!index) {
        if (!props.range) {
          index = 0;
        } else if (Array.isArray(position.value)) {
          const touch = "touches" in e ? e.touches[0] : e;
          const pos = getPos(touch);
          index = pos > (position.value[1] - position.value[0]) / 2 + position.value[0] ? 1 : 0;
        }
      }
      if (Array.isArray(val.value)) {
        currentSliderDotIndex.value = index;
      }
      Array.isArray(val.value) ? (_a2 = dots.value[index]) == null ? void 0 : _a2.focus() : (_b = dot.value) == null ? void 0 : _b.focus();
      flag.value = true;
      emit("drag-start");
    };
    const moving = (e) => {
      if (!hasMouseDown.value || !flag.value || props.disabled || props.readonly) {
        return;
      }
      e.preventDefault();
      if ("touches" in e) {
        setValueOnPos(getPos(e.touches[0]));
      } else {
        setValueOnPos(getPos(e));
      }
    };
    const moveEnd = () => {
      if (!props.disabled && !props.readonly) {
        if (flag.value) {
          emit("drag-end");
          emit("change", val.value);
        }
        flag.value = false;
        hasMouseDown.value = false;
      }
    };
    const clamp3 = (min2, v, max2) => Math.max(Math.min(v, max2), min2);
    const moveWithKeys = (event) => {
      var _a2, _b;
      if (![dots.value[0], dots.value[1], dot.value].includes(document.activeElement)) {
        return;
      }
      if (props.disabled || props.readonly) {
        return;
      }
      const moveDot = (where, which) => {
        if (Array.isArray(val.value)) {
          const value = val.value[which] + (where ? stepComputed.value : -stepComputed.value);
          const limitedValue = clamp3(minComputed.value, value, maxComputed.value);
          val.value = [
            which === 0 ? limitedValue : val.value[0],
            which === 1 ? limitedValue : val.value[1]
          ];
        } else {
          const value = val.value + (where ? stepComputed.value : -stepComputed.value);
          const limitedValue = clamp3(minComputed.value, value, maxComputed.value);
          val.value = limitedValue;
        }
      };
      if (["ArrowLeft", "ArrowUp", "ArrowRight", "ArrowDown"].includes(event.key)) {
        event.preventDefault();
      }
      const isActive = (el) => el === document.activeElement;
      if (props.range && Array.isArray(val.value)) {
        const isVerticalDot0More = (event2) => props.vertical && isActive(dots.value[0]) && event2.key === "ArrowUp";
        const isVerticalDot0Less = (event2) => props.vertical && isActive(dots.value[0]) && event2.key === "ArrowDown";
        const isVerticalDot1More = (event2) => props.vertical && isActive(dots.value[1]) && event2.key === "ArrowUp";
        const isVerticalDot1Less = (event2) => props.vertical && isActive(dots.value[1]) && event2.key === "ArrowDown";
        const isHorizontalDot0Less = (event2) => !props.vertical && isActive(dots.value[0]) && event2.key === "ArrowLeft";
        const isHorizontalDot0More = (event2) => !props.vertical && isActive(dots.value[0]) && event2.key === "ArrowRight";
        const isHorizontalDot1Less = (event2) => !props.vertical && isActive(dots.value[1]) && event2.key === "ArrowLeft";
        const isHorizontalDot1More = (event2) => !props.vertical && isActive(dots.value[1]) && event2.key === "ArrowRight";
        switch (true) {
          case ((isVerticalDot1Less(event) || isHorizontalDot1Less(event)) && moreToLess.value && val.value[0] !== minComputed.value):
            (_a2 = dots.value[0]) == null ? void 0 : _a2.focus();
            moveDot(0, 0);
            break;
          case ((isVerticalDot0More(event) || isHorizontalDot0More(event)) && lessToMore.value && val.value[1] !== maxComputed.value):
            (_b = dots.value[1]) == null ? void 0 : _b.focus();
            moveDot(1, 1);
            break;
          case ((isVerticalDot0Less(event) || isHorizontalDot0Less(event)) && val.value[0] !== minComputed.value):
            moveDot(0, 0);
            break;
          case ((isVerticalDot1More(event) || isHorizontalDot1More(event)) && val.value[1] !== maxComputed.value):
            moveDot(1, 1);
            break;
          case ((isVerticalDot1Less(event) || isHorizontalDot1Less(event)) && val.value[1] !== minComputed.value):
            moveDot(0, 1);
            break;
          case ((isVerticalDot0More(event) || isHorizontalDot0More(event)) && val.value[0] !== maxComputed.value):
            moveDot(1, 0);
            break;
        }
      } else {
        if (props.vertical) {
          if (event.key === "ArrowDown") {
            moveDot(0, 0);
          }
          if (event.key === "ArrowUp") {
            moveDot(1, 0);
          }
        } else {
          if (event.key === "ArrowLeft") {
            moveDot(0, 0);
          }
          if (event.key === "ArrowRight") {
            moveDot(1, 0);
          }
        }
      }
    };
    const checkActivePin = (pin) => {
      if (Array.isArray(val.value)) {
        return pin * stepComputed.value > val.value[0] && pin * stepComputed.value < val.value[1];
      } else {
        return pin * stepComputed.value < val.value;
      }
    };
    const pinPositionStep = computed(() => stepComputed.value / (maxComputed.value - minComputed.value) * 100);
    const getPinStyles = (pin) => ({
      backgroundColor: checkActivePin(pin) ? getColor(props.color) : getHoverColor2(getColor(props.color)),
      [pinPositionStyle.value]: `${pin * pinPositionStep.value}%`,
      transition: hasMouseDown.value ? "none" : "var(--va-slider-pin-transition)"
    });
    const getPos = (e) => {
      getStaticData();
      return props.vertical ? offset3.value - e.clientY : e.clientX - offset3.value;
    };
    const getStaticData = () => {
      if (sliderContainer.value) {
        size3.value = sliderContainer.value[props.vertical ? "offsetHeight" : "offsetWidth"];
        offset3.value = sliderContainer.value.getBoundingClientRect()[pinPositionStyle.value];
      }
    };
    const getValueByIndex = (index) => {
      return (stepComputed.value * multiple.value * index + minComputed.value * multiple.value) / multiple.value;
    };
    const getTrackLabel = (val2, order) => {
      if (!props.trackLabel) {
        return val2;
      }
      return typeof props.trackLabel === "function" ? props.trackLabel(val2, order) : props.trackLabel;
    };
    const setCurrentValue = (newValue) => {
      const slider = currentSliderDotIndex.value;
      if (Array.isArray(val.value)) {
        if (isDiff(val.value[slider], newValue)) {
          if (slider === 0) {
            val.value = [newValue, val.value[1]];
          } else {
            val.value = [val.value[0], newValue];
          }
        }
      } else {
        if (newValue < minComputed.value) {
          val.value = minComputed.value;
        } else if (newValue > maxComputed.value) {
          val.value = maxComputed.value;
        } else if (isDiff(val.value, newValue)) {
          val.value = newValue;
        }
      }
    };
    const setValueOnPos = (pixelPosition) => {
      const range = limit.value;
      const valueRange = valueLimit.value;
      const dotToFocus = Array.isArray(val.value) ? dots.value[currentSliderDotIndex.value] : dot.value;
      dotToFocus == null ? void 0 : dotToFocus.focus();
      if (pixelPosition >= range[0] && pixelPosition <= range[1]) {
        const v = getValueByIndex(Math.round(pixelPosition / gap.value));
        if (currentSliderDotIndex.value) {
          if (Array.isArray(position.value) && Array.isArray(val.value) && pixelPosition <= position.value[0]) {
            val.value = [v, val.value[0]];
            currentSliderDotIndex.value = 0;
          } else {
            setCurrentValue(v);
          }
        } else {
          if (Array.isArray(position.value) && Array.isArray(val.value) && pixelPosition >= position.value[1]) {
            val.value = [val.value[1], v];
            currentSliderDotIndex.value = 1;
          } else {
            setCurrentValue(v);
          }
        }
      } else if (pixelPosition < range[0]) {
        setCurrentValue(valueRange[0]);
      } else {
        setCurrentValue(valueRange[1]);
      }
    };
    const isDiff = (a, b) => JSON.stringify(a) !== JSON.stringify(b);
    const clickOnContainer = (e) => {
      if (props.disabled || props.readonly) {
        return;
      }
      const pos = "touches" in e ? getPos(e.touches[0]) : getPos(e);
      if (Array.isArray(position.value)) {
        currentSliderDotIndex.value = pos > (position.value[1] - position.value[0]) / 2 + position.value[0] ? 1 : 0;
      }
      hasMouseDown.value = true;
      setValueOnPos(pos);
      moveStart(e, currentSliderDotIndex.value);
    };
    const bindEvents = () => {
      document.addEventListener("mousemove", moving);
      document.addEventListener("touchmove", moving, { passive: false });
      document.addEventListener("mouseup", moveEnd);
      document.addEventListener("mouseleave", moveEnd);
      document.addEventListener("touchcancel", moveEnd);
      document.addEventListener("touchend", moveEnd);
      document.addEventListener("keydown", moveWithKeys);
    };
    const unbindEvents = () => {
      document.removeEventListener("mousemove", moving);
      document.removeEventListener("touchmove", moving);
      document.removeEventListener("mouseup", moveEnd);
      document.removeEventListener("mouseleave", moveEnd);
      document.removeEventListener("touchcancel", moveEnd);
      document.removeEventListener("touchend", moveEnd);
      document.removeEventListener("keydown", moveWithKeys);
    };
    const componentId = useComponentUuid();
    const ariaLabelIdComputed = computed(() => `aria-label-id-${componentId}`);
    const { tp } = useTranslation();
    const slots = useSlots();
    const ariaAttributesComputed = computed(() => ({
      role: "slider",
      "aria-valuemin": minComputed.value,
      "aria-valuemax": maxComputed.value,
      "aria-label": !slots.label && !props.label ? tp(props.ariaLabel, { value: String(val.value) }) : void 0,
      "aria-labelledby": slots.label || props.label ? ariaLabelIdComputed.value : void 0,
      "aria-orientation": props.vertical ? "vertical" : "horizontal",
      "aria-disabled": props.disabled,
      "aria-readonly": props.readonly,
      "aria-valuenow": !Array.isArray(val.value) ? val.value : void 0,
      "aria-valuetext": Array.isArray(val.value) ? String(val.value) : void 0
    }));
    onMounted(() => {
      if (validateSlider(val.value, stepComputed.value, minComputed.value, maxComputed.value, props.range)) {
        getStaticData();
        bindEvents();
      }
    });
    onBeforeUnmount(unbindEvents);
    watch([
      val,
      () => stepComputed.value,
      () => minComputed.value,
      () => maxComputed.value,
      () => props.range
    ], ([value, step, min2, max2, range]) => {
      validateSlider(value, step, min2, max2, range);
    });
    watch(hasMouseDown, (hasMouseDown2) => {
      document.documentElement.style.cursor = hasMouseDown2 ? "grabbing" : "";
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", mergeProps({
        class: ["va-slider", unref(sliderClass)]
      }, ariaAttributesComputed.value), [
        (__props.vertical ? _ctx.$slots.append : _ctx.$slots.prepend) ? (openBlock(), createElementBlock("div", _hoisted_159, [
          renderSlot(_ctx.$slots, __props.vertical ? "append" : "prepend")
        ])) : createCommentVNode("", true),
        (_ctx.$slots.label || __props.label) && !__props.invertLabel ? (openBlock(), createElementBlock("span", {
          key: 1,
          class: "va-input__label",
          id: ariaLabelIdComputed.value,
          style: normalizeStyle(labelStyles.value)
        }, [
          renderSlot(_ctx.$slots, "label", {}, () => [
            createTextVNode(toDisplayString(__props.label), 1)
          ])
        ], 12, _hoisted_228)) : createCommentVNode("", true),
        (__props.vertical ? __props.iconAppend : __props.iconPrepend) ? (openBlock(), createElementBlock("span", _hoisted_320, [
          createVNode(unref(VaIcon), {
            name: __props.vertical ? __props.iconAppend : __props.iconPrepend,
            color: unref(getColor)(_ctx.$props.color),
            size: 16
          }, null, 8, ["name", "color"])
        ])) : createCommentVNode("", true),
        createBaseVNode("div", {
          ref_key: "sliderContainer",
          ref: sliderContainer,
          class: "va-slider__container",
          onMousedown: clickOnContainer,
          onTouchstart: clickOnContainer
        }, [
          createBaseVNode("div", {
            class: "va-slider__track",
            "aria-hidden": "true",
            style: normalizeStyle(trackStyles.value)
          }, null, 4),
          __props.pins ? (openBlock(true), createElementBlock(Fragment, { key: 0 }, renderList(pinsCol.value, (pin, i) => {
            return openBlock(), createElementBlock("div", {
              key: i,
              class: normalizeClass(["va-slider__mark", { "va-slider__mark--active": checkActivePin(pin) }]),
              style: normalizeStyle(getPinStyles(pin))
            }, null, 6);
          }), 128)) : createCommentVNode("", true),
          _ctx.$props.range ? (openBlock(), createElementBlock(Fragment, { key: 1 }, [
            createBaseVNode("div", {
              ref: "process",
              class: normalizeClass(["va-slider__track va-slider__track--selected", { "va-slider__track--active": isFocused.value }]),
              "aria-hidden": "true",
              style: normalizeStyle(processedStyles.value)
            }, null, 6),
            (openBlock(true), createElementBlock(Fragment, null, renderList(orders.value, (order) => {
              return openBlock(), createElementBlock("div", {
                key: "dot" + order,
                ref_for: true,
                ref: unref(setItemRefByIndex)(order),
                class: normalizeClass(["va-slider__handler", unref(dotClass)]),
                style: normalizeStyle(getDottedStyles(order)),
                tabindex: __props.disabled || __props.readonly ? void 0 : 0,
                onFocus: ($event) => (isFocused.value = true, currentSliderDotIndex.value = order),
                onBlur: _cache[0] || (_cache[0] = ($event) => isFocused.value = false)
              }, [
                isActiveDot(order) ? (openBlock(), createElementBlock("div", {
                  key: 0,
                  style: normalizeStyle({ backgroundColor: unref(getColor)(_ctx.$props.color) }),
                  class: "va-slider__handler__dot--focus"
                }, null, 4)) : createCommentVNode("", true),
                __props.trackLabelVisible ? (openBlock(), createElementBlock("div", {
                  key: 1,
                  style: normalizeStyle(labelStyles.value),
                  class: "va-slider__handler__dot--value"
                }, [
                  renderSlot(_ctx.$slots, "trackLabel", normalizeProps(guardReactiveProps({ value: getValueByOrder(order), order })), () => [
                    createTextVNode(toDisplayString(getTrackLabel(getValueByOrder(order), order)), 1)
                  ])
                ], 4)) : createCommentVNode("", true)
              ], 46, _hoisted_411);
            }), 128))
          ], 64)) : (openBlock(), createElementBlock(Fragment, { key: 2 }, [
            createBaseVNode("div", {
              ref: "process",
              "aria-hidden": "true",
              class: normalizeClass(["va-slider__track va-slider__track--selected", { "va-slider__track--active": isFocused.value }]),
              style: normalizeStyle(processedStyles.value)
            }, null, 6),
            createBaseVNode("div", {
              ref_key: "dot",
              ref: dot,
              class: normalizeClass(["va-slider__handler", unref(dotClass)]),
              style: normalizeStyle(dottedStyles.value),
              tabindex: _ctx.$props.disabled || _ctx.$props.readonly ? void 0 : 0,
              onFocus: _cache[1] || (_cache[1] = ($event) => isFocused.value = true),
              onBlur: _cache[2] || (_cache[2] = ($event) => isFocused.value = false)
            }, [
              isActiveDot(0) ? (openBlock(), createElementBlock("div", {
                key: 0,
                class: "va-slider__handler__dot--focus",
                style: normalizeStyle({ backgroundColor: unref(getColor)(_ctx.$props.color) })
              }, null, 4)) : createCommentVNode("", true),
              __props.trackLabelVisible ? (openBlock(), createElementBlock("div", {
                key: 1,
                class: "va-slider__handler__dot--value",
                style: normalizeStyle(labelStyles.value)
              }, [
                renderSlot(_ctx.$slots, "trackLabel", normalizeProps(guardReactiveProps({ value: getValueByOrder() })), () => [
                  createTextVNode(toDisplayString(getTrackLabel(getValueByOrder())), 1)
                ])
              ], 4)) : createCommentVNode("", true)
            ], 46, _hoisted_59)
          ], 64))
        ], 544),
        (__props.vertical ? __props.iconPrepend : __props.iconAppend) ? (openBlock(), createElementBlock("span", _hoisted_66, [
          createVNode(unref(VaIcon), {
            name: __props.vertical ? __props.iconPrepend : __props.iconAppend,
            color: unref(getColor)(_ctx.$props.color),
            size: 16
          }, null, 8, ["name", "color"])
        ])) : createCommentVNode("", true),
        (_ctx.$slots.label || __props.label) && __props.invertLabel ? (openBlock(), createElementBlock("span", {
          key: 4,
          class: "va-input__label va-input__label--inverse",
          style: normalizeStyle(labelStyles.value),
          id: ariaLabelIdComputed.value
        }, [
          renderSlot(_ctx.$slots, "label", {}, () => [
            createTextVNode(toDisplayString(__props.label), 1)
          ])
        ], 12, _hoisted_74)) : createCommentVNode("", true),
        (__props.vertical ? _ctx.$slots.prepend : _ctx.$slots.append) ? (openBlock(), createElementBlock("div", _hoisted_82, [
          renderSlot(_ctx.$slots, __props.vertical ? "prepend" : "append")
        ])) : createCommentVNode("", true)
      ], 16);
    };
  }
});

// node_modules/vuestic-ui/dist/es/src/components/va-slider/index.js
var VaSlider = withConfigTransport$1(_sfc_main101);

// node_modules/vuestic-ui/dist/es/src/utils/is-number.js
var isNumber = (value) => typeof value === "number";

// node_modules/vuestic-ui/dist/es/src/components/va-split/useSplitDragger.js
var useSplitDraggerProps = {
  vertical: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false }
};
var useSplitDragger = (containerSizeComputed, splitterPositionComputed, props) => {
  const isDragging = ref(false);
  const dragStartPosition = ref(0);
  const dragStartSplitterPosition = ref(0);
  const currentSplitterPosition = ref(0);
  const getEventPosition = (e, eventName) => {
    const event = e.type === eventName ? e : e.changedTouches[0];
    return props.vertical ? event.pageY : event.pageX;
  };
  const startDragging = (e) => {
    if (props.disabled || !containerSizeComputed.value) {
      return;
    }
    isDragging.value = true;
    dragStartPosition.value = getEventPosition(e, "mousedown");
    dragStartSplitterPosition.value = splitterPositionComputed.value;
  };
  const processDragging = (e) => {
    if (!isDragging.value) {
      return;
    }
    const currentPosition = getEventPosition(e, "mousemove");
    const distance = currentPosition - dragStartPosition.value;
    currentSplitterPosition.value = dragStartSplitterPosition.value + Math.floor(distance / containerSizeComputed.value * 100);
  };
  const stopDragging = () => {
    isDragging.value = false;
  };
  useEvent(["mousemove", "touchmove"], processDragging);
  useEvent(["mouseup", "touchcancel"], stopDragging);
  return { isDragging, startDragging, currentSplitterPosition };
};

// node_modules/vuestic-ui/dist/es/src/components/va-split/VaSplit.vue_vue_type_script_setup_true_lang.js
import "D:/Github/DONGTIAN/ui/node_modules/vuestic-ui/dist/es/VaSplit.css";
var _hoisted_160 = ["aria-label"];
var _hoisted_229 = { class: "va-split__dragger" };
var _sfc_main102 = defineComponent({
  ...{
    name: "VaSplit"
  },
  __name: "VaSplit",
  props: {
    ...useComponentPresetProp,
    ...useSplitDraggerProps,
    ...useStatefulProps,
    modelValue: {
      type: Number,
      default: 50,
      validator: (v) => v <= 100
    },
    maximization: { type: Boolean, default: false },
    maximizeStart: { type: Boolean, default: false },
    limits: {
      type: Array,
      default: () => [0, 0]
    },
    snapping: {
      type: Array,
      default: void 0
    },
    snappingRange: { type: [Number, String], default: 4 },
    ariaLabel: useTranslationProp("$t:splitPanels")
  },
  emits: [...useStatefulEmits],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const splitPanelsContainer = shallowRef();
    const { valueComputed } = useStateful(props, emit);
    const containerSize = ref();
    const bodyFontSize = ref(16);
    const handleContainerResize = () => {
      var _a2;
      const { width, height } = ((_a2 = splitPanelsContainer.value) == null ? void 0 : _a2.getBoundingClientRect()) || { width: 0, height: 0 };
      containerSize.value = props.vertical ? height : width;
      bodyFontSize.value = parseFloat(getComputedStyle(document.documentElement).fontSize);
    };
    onMounted(handleContainerResize);
    useResizeObserver([splitPanelsContainer], handleContainerResize);
    const convertToPercents = (v, type) => {
      let numberValue = "";
      let measureValue = "";
      if (isNumber(v)) {
        return v;
      }
      v.split("").filter((char) => char && char !== " ").forEach((char) => {
        !isNaN(+char) ? numberValue += char : measureValue += char;
      });
      switch (measureValue) {
        case "%":
          return +numberValue;
        case "px":
          return +numberValue / containerSize.value * 100;
        case "rem":
          return +numberValue * bodyFontSize.value / containerSize.value * 100;
        case "any":
          return ["min", "snapping"].includes(type) ? 0 : 100;
        case "":
          return 100;
        default:
          warn("Invalid limits measure!");
          return 0;
      }
    };
    const getPanelMinMax = (v) => {
      if (v === "undefined" || !containerSize.value) {
        return;
      }
      let minPercents = 0;
      let maxPercents = 100;
      if (isString(v) || isNumber(v)) {
        minPercents = convertToPercents(v, "min");
      }
      if (Array.isArray(v)) {
        minPercents = convertToPercents(v[0], "min");
        maxPercents = convertToPercents(v[1], "max");
      }
      if (minPercents > maxPercents) {
        warn(`Min panels size can not be larger than max one! Passed limit: ${v}.`);
        maxPercents = minPercents;
      }
      return { min: minPercents ?? 0, max: maxPercents ?? 100 };
    };
    const startPanelMinMax = computed(() => getPanelMinMax(props.limits[0]) ?? { min: 0, max: 100 });
    const endPanelMinMax = computed(() => getPanelMinMax(props.limits[1]) ?? { min: 0, max: 100 });
    const endPanelMinChecked = computed(() => {
      const passedCheck = !(startPanelMinMax.value.min + endPanelMinMax.value.min > 100);
      if (!passedCheck) {
        warn("The sum of different panels min sizes should be lesser or equal to 100% of the container size!");
      }
      return !passedCheck ? 100 - startPanelMinMax.value.min : endPanelMinMax.value.min;
    });
    const panelsMinMax = computed(() => {
      if (Math.ceil(endPanelMinMax.value.max + startPanelMinMax.value.max) < 100) {
        warn("The sum of different panels max sizes should be equal to 100% of the container size!");
      }
      return {
        start: {
          min: startPanelMinMax.value.min,
          max: Math.min(startPanelMinMax.value.max, 100 - endPanelMinChecked.value)
        },
        end: {
          min: endPanelMinChecked.value,
          max: Math.min(endPanelMinMax.value.max, 100 - startPanelMinMax.value.min)
        }
      };
    });
    const checkSnappingLimitsCondition = (el) => el >= panelsMinMax.value.start.min && el >= panelsMinMax.value.end.min && el <= panelsMinMax.value.start.max && el <= panelsMinMax.value.end.max;
    const snappingMarksPosition = computed(() => {
      if (!Array.isArray(props.snapping) || !containerSize.value) {
        return;
      }
      let result = props.snapping.map((el) => convertToPercents(el, "snapping"));
      if (!result.every(checkSnappingLimitsCondition)) {
        const filteredMarks = result.filter(checkSnappingLimitsCondition);
        warn(`Some of the snapping marks (${result}) are not in allowed range (${Object.values(panelsMinMax.value.start).join("-")} / ${Object.values(panelsMinMax.value.end).join("-")}) and will be removed (${filteredMarks})!`);
        result = filteredMarks;
      }
      const checkSnappingRange = () => {
        return result.every((el, index, array) => {
          if (!array[index + 1]) {
            return true;
          }
          return Math.abs(el - array[index + 1]) > Number(props.snappingRange);
        });
      };
      if (!checkSnappingRange()) {
        warn("Distance between some snapping marks is lesser than snapping range!");
      }
      return result;
    });
    const snappingRangeParsed = computed(() => convertToPercents(props.snappingRange, "snapping"));
    const splitterPosition = ref(valueComputed.value);
    const splitterPositionComputed = computed(() => {
      if (snappingMarksPosition.value) {
        const nearestSnappingMark = snappingMarksPosition.value.find((el) => {
          return splitterPosition.value + snappingRangeParsed.value > el && splitterPosition.value - snappingRangeParsed.value < el;
        });
        if (nearestSnappingMark) {
          return nearestSnappingMark;
        }
      }
      return clamp(
        splitterPosition.value,
        Math.max(panelsMinMax.value.start.min, 100 - panelsMinMax.value.end.max),
        Math.min(panelsMinMax.value.start.max, 100 - panelsMinMax.value.end.min)
      );
    });
    const {
      isDragging,
      startDragging,
      currentSplitterPosition
    } = useSplitDragger(containerSize, splitterPositionComputed, props);
    const maximizePanel = () => {
      if (!props.maximization || props.disabled) {
        return;
      }
      splitterPosition.value = props.maximizeStart ? panelsMinMax.value.start.max : 100 - panelsMinMax.value.end.max;
    };
    watch(valueComputed, (v) => {
      if (v < panelsMinMax.value.start.min || v > 100 - panelsMinMax.value.end.min) {
        warn("Incorrect `modelValue`. Check current `limits` prop value.");
      }
      splitterPosition.value = v;
    }, { immediate: true });
    watch(currentSplitterPosition, (v) => {
      splitterPosition.value = v;
    });
    watch(isDragging, (v) => {
      if (!v) {
        valueComputed.value = splitterPositionComputed.value;
      }
      document.documentElement.style.cursor = v ? "var(--va-split-dragging-cursor)" : "";
    });
    const sizePropertyComputed = computed(() => props.vertical ? "height" : "width");
    const getPanelStyle = (position) => {
      let sizeValue = position === "start" ? splitterPositionComputed.value : 100 - splitterPositionComputed.value;
      if (sizeValue < 0) {
        sizeValue = 0;
      }
      if (sizeValue > 100) {
        sizeValue = 100;
      }
      return { [sizePropertyComputed.value]: `${sizeValue}%` };
    };
    const draggerStyleComputed = computed(() => {
      if (props.disabled) {
        return {};
      }
      if (isDragging.value) {
        return { cursor: "var(--va-split-dragging-cursor)" };
      }
      return { cursor: props.vertical ? "var(--va-split-vertical-dragger-cursor)" : "var(--va-split-horizontal-dragger-cursor)" };
    });
    const classComputed = useBem("va-split", () => ({
      horizontal: !props.vertical,
      vertical: props.vertical,
      dragging: isDragging.value
    }));
    const { t, tp } = useTranslation();
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("section", {
        ref_key: "splitPanelsContainer",
        ref: splitPanelsContainer,
        class: normalizeClass(["va-split", unref(classComputed)]),
        "aria-label": unref(tp)(_ctx.$props.ariaLabel)
      }, [
        createBaseVNode("div", {
          class: "va-split__panel",
          style: normalizeStyle(getPanelStyle("start"))
        }, [
          renderSlot(_ctx.$slots, "start", normalizeProps(guardReactiveProps({ containerSize: containerSize.value })))
        ], 4),
        createBaseVNode("div", _hoisted_229, [
          createBaseVNode("div", {
            class: "va-split__dragger__overlay",
            style: normalizeStyle(draggerStyleComputed.value),
            onMousedown: _cache[0] || (_cache[0] = withModifiers(
              //@ts-ignore
              (...args) => unref(startDragging) && unref(startDragging)(...args),
              ["prevent"]
            )),
            onTouchstart: _cache[1] || (_cache[1] = withModifiers(
              //@ts-ignore
              (...args) => unref(startDragging) && unref(startDragging)(...args),
              ["prevent"]
            )),
            onDblclick: withModifiers(maximizePanel, ["prevent"]),
            onContextmenu: _cache[2] || (_cache[2] = withModifiers(() => {
            }, ["prevent"])),
            onDragstart: _cache[3] || (_cache[3] = withModifiers(() => {
            }, ["prevent"]))
          }, [
            renderSlot(_ctx.$slots, "grabber", {}, () => [
              createVNode(unref(VaDivider), {
                class: "va-split__dragger__default",
                vertical: !_ctx.$props.vertical
              }, null, 8, ["vertical"])
            ])
          ], 36)
        ]),
        createBaseVNode("div", {
          class: "va-split__panel",
          style: normalizeStyle(getPanelStyle("end"))
        }, [
          renderSlot(_ctx.$slots, "end", normalizeProps(guardReactiveProps({ containerSize: containerSize.value })))
        ], 4)
      ], 10, _hoisted_160);
    };
  }
});

// node_modules/vuestic-ui/dist/es/src/components/va-split/index.js
var VaSplit = withConfigTransport$1(_sfc_main102);

// node_modules/vuestic-ui/dist/es/src/components/va-tabs/types.js
var TabsViewKey = Symbol("TabsView");

// node_modules/vuestic-ui/dist/es/src/components/va-tabs/VaTabs.vue_vue_type_script_setup_true_lang.js
import "D:/Github/DONGTIAN/ui/node_modules/vuestic-ui/dist/es/VaTabs.css";
var _hoisted_161 = ["aria-disabled"];
var _hoisted_230 = createBaseVNode("div", { class: "va-tabs__slider" }, null, -1);
var _hoisted_321 = [
  _hoisted_230
];
var _hoisted_412 = { class: "va-tabs__tabs-items" };
var _hoisted_510 = { class: "va-tabs__content" };
var getClientWidth = (element) => (element == null ? void 0 : element.clientWidth) || 0;
var _sfc_main103 = defineComponent({
  ...{
    name: "VaTabs"
  },
  __name: "VaTabs",
  props: {
    ...useStatefulProps,
    ...useComponentPresetProp,
    modelValue: { type: [String, Number], default: null },
    left: { type: Boolean, default: true },
    right: { type: Boolean, default: false },
    center: { type: Boolean, default: false },
    grow: { type: Boolean, default: false },
    hidePagination: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
    hideSlider: { type: Boolean, default: false },
    vertical: { type: Boolean, default: false },
    color: { type: String, default: "primary" },
    prevIcon: { type: String, default: "va-arrow-left" },
    nextIcon: { type: String, default: "va-arrow-right" },
    ariaMoveRightLabel: useTranslationProp("$t:movePaginationLeft"),
    ariaMoveLeftLabel: useTranslationProp("$t:movePaginationRight")
  },
  emits: ["update:modelValue", "click:next", "click:prev"],
  setup(__props, { expose: __expose, emit: __emit }) {
    const { tp } = useTranslation();
    const props = __props;
    const emit = __emit;
    const wrapper = shallowRef();
    const container = shallowRef();
    const tabs = shallowRef();
    const tabsList = ref([]);
    const sliderHeight = ref(null);
    const sliderWidth = ref(null);
    const sliderOffsetX = ref(0);
    const sliderOffsetY = ref(0);
    const showPagination = ref(false);
    const tabsContentOffset = ref(0);
    const startingXPoint = ref(0);
    const animationIncluded = ref(false);
    const { valueComputed: tabSelected } = useStateful(props, emit);
    const tabConfig = reactive({
      VaTab: {
        color: props.color
      }
    });
    const computedClass = computed(() => {
      const { left, right, center, grow, disabled } = props;
      return {
        "va-tabs__container--left": left && !right && !center && !grow,
        "va-tabs__container--right": right,
        "va-tabs__container--center": center,
        "va-tabs__container--grow": grow,
        "va-tabs__container--disabled": disabled
      };
    });
    const computedTabsClass = computed(() => ({ "va-tabs--vertical": props.vertical }));
    const { getColor } = useColors();
    const colorComputed = computed(() => getColor(props.color));
    const sliderStyles = computed(() => {
      if (props.hideSlider) {
        return { display: "none" };
      }
      return {
        backgroundColor: colorComputed.value,
        height: props.vertical ? `${sliderHeight.value}px` : "",
        width: props.vertical ? "" : `${sliderWidth.value}px`,
        transform: `translateY(-${sliderOffsetY.value}px) translateX(${sliderOffsetX.value}px)`,
        transition: animationIncluded.value ? "var(--va-tabs-slider-wrapper-transition)" : ""
      };
    });
    const paginationControlledStyles = computed(() => {
      if (props.vertical) {
        return {
          transform: "translateX(0px)"
        };
      }
      return {
        transform: `translateX(${startingXPoint.value - tabsContentOffset.value}px)`,
        transition: animationIncluded.value ? "var(--va-tabs-slider-transition)" : "",
        position: props.hidePagination ? "unset" : "absolute"
      };
    });
    const disablePaginationLeft = computed(() => tabsContentOffset.value === 0);
    const disablePaginationRight = computed(() => {
      const lastTab = tabsList.value[tabsList.value.length - 1];
      const leftSidePosition = unref(lastTab.leftSidePosition);
      const rightSidePosition = unref(lastTab.rightSidePosition);
      const containerClientWidth = getClientWidth(container.value);
      return rightSidePosition <= tabsContentOffset.value + containerClientWidth || leftSidePosition <= tabsContentOffset.value;
    });
    const resetSliderSizes = () => {
      sliderWidth.value = 0;
      sliderHeight.value = 0;
    };
    const moveToTab = (tab) => {
      const containerClientWidth = getClientWidth(container.value);
      const leftSidePosition = unref(tab.leftSidePosition);
      const rightSidePosition = unref(tab.rightSidePosition);
      if (!showPagination.value) {
        tabsContentOffset.value = 0;
        return;
      }
      if (leftSidePosition - tabsContentOffset.value >= 0 && rightSidePosition - tabsContentOffset.value <= containerClientWidth) {
        return;
      }
      if (leftSidePosition - tabsContentOffset.value < 0) {
        tabsContentOffset.value = leftSidePosition;
        return;
      }
      if (rightSidePosition - tabsContentOffset.value > containerClientWidth) {
        tabsContentOffset.value = rightSidePosition - containerClientWidth;
        return;
      }
      tabsContentOffset.value = 0;
    };
    const updateStartingXPoint = () => {
      startingXPoint.value = 0;
      if (!showPagination.value) {
        return;
      }
      const containerClientWidth = getClientWidth(container.value);
      const tabsClientWidth = getClientWidth(tabs.value);
      if (props.right) {
        startingXPoint.value = tabsClientWidth - containerClientWidth;
      } else if (props.center) {
        startingXPoint.value = Math.floor((tabsClientWidth - containerClientWidth) / 2);
      }
    };
    const updateTabsState = () => {
      resetSliderSizes();
      tabsList.value.forEach((tab) => {
        var _a2;
        tab.updateSidePositions();
        const isTabSelected = (((_a2 = tab.name) == null ? void 0 : _a2.value) || tab.id) === tabSelected.value;
        tab.isActive = tab.isActiveRouterLink || isTabSelected;
        if (tab.isActive) {
          moveToTab(tab);
          updateSlider(tab);
        }
      });
      updateStartingXPoint();
    };
    watchEffect(() => {
      updateTabsState();
    });
    const updatePagination = () => {
      const tabsClientWidth = getClientWidth(tabs.value);
      const wrapperClientWidth = getClientWidth(wrapper.value);
      requestAnimationFrame(() => {
        showPagination.value = !!(tabs.value && wrapper.value && tabsClientWidth > wrapperClientWidth);
      });
    };
    const movePaginationLeft = () => {
      var _a2, _b;
      const containerClientWidth = getClientWidth(container.value);
      let offsetToSet = tabsContentOffset.value - containerClientWidth;
      for (let i = 0; i < tabsList.value.length - 1; i++) {
        const currentTabLeftSidePosition = unref((_a2 = tabsList.value[i]) == null ? void 0 : _a2.leftSidePosition);
        const nextTabLeftSidePosition = unref((_b = tabsList.value[i + 1]) == null ? void 0 : _b.leftSidePosition);
        if (currentTabLeftSidePosition > offsetToSet && currentTabLeftSidePosition < tabsContentOffset.value || nextTabLeftSidePosition >= tabsContentOffset.value) {
          offsetToSet = currentTabLeftSidePosition;
          break;
        }
      }
      tabsContentOffset.value = Math.max(0, offsetToSet);
      emit("click:prev");
    };
    const movePaginationRight = () => {
      var _a2;
      const containerClientWidth = getClientWidth(container.value);
      const containerRightSide = tabsContentOffset.value + containerClientWidth;
      let offsetToSet = containerRightSide;
      for (let i = 0; i < tabsList.value.length - 1; i++) {
        const rightSidePosition2 = unref(tabsList.value[i].rightSidePosition);
        if (rightSidePosition2 > containerRightSide) {
          offsetToSet = unref(tabsList.value[i].leftSidePosition);
          if (tabsContentOffset.value < offsetToSet) {
            break;
          }
        }
      }
      const rightSidePosition = unref((_a2 = tabsList.value[tabsList.value.length - 1]) == null ? void 0 : _a2.rightSidePosition);
      const maxOffset = rightSidePosition - containerClientWidth;
      offsetToSet = Math.min(maxOffset, offsetToSet);
      tabsContentOffset.value = Math.max(0, offsetToSet);
      emit("click:next");
    };
    const updateSlider = (tab) => {
      var _a2;
      const tabElement = unref(tab.tabElement);
      const tabOffsetTop = (tabElement == null ? void 0 : tabElement.offsetTop) || 0;
      const tabOffsetLeft = (tabElement == null ? void 0 : tabElement.offsetLeft) || 0;
      const tabClientHeight = (tabElement == null ? void 0 : tabElement.clientHeight) || 0;
      const tabClientWidth = (tabElement == null ? void 0 : tabElement.clientWidth) || 0;
      if (props.vertical) {
        const containerClientHeight = ((_a2 = container.value) == null ? void 0 : _a2.clientHeight) || 0;
        const calculatedSliderOffsetY = containerClientHeight - tabOffsetTop - tabClientHeight;
        sliderOffsetY.value = Math.max(calculatedSliderOffsetY, 0);
        sliderHeight.value = tabClientHeight;
        sliderOffsetX.value = 0;
        sliderWidth.value = 0;
      } else {
        sliderOffsetX.value = tabOffsetLeft;
        sliderWidth.value = tabClientWidth;
        sliderOffsetY.value = 0;
        sliderHeight.value = 0;
      }
    };
    const includeAnimation = () => {
      if (!animationIncluded.value) {
        requestAnimationFrame(() => {
          animationIncluded.value = true;
        });
      }
    };
    const selectTab = (tab) => {
      var _a2;
      if (!tab) {
        return;
      }
      tabSelected.value = ((_a2 = tab.name) == null ? void 0 : _a2.value) || tab.id;
      if (props.stateful) {
        updateTabsState();
      }
    };
    const registerTab = (tab) => {
      var _a2;
      const idx = tabsList.value.push(tab) - 1;
      tab.id = ((_a2 = tab.name) == null ? void 0 : _a2.value) || idx;
    };
    const unregisterTab = (tab) => {
      tabsList.value = tabsList.value.filter((filteredTab) => filteredTab.id !== tab.id);
      tabsList.value.forEach((tabListItem, idx) => {
        var _a2;
        tabListItem.id = ((_a2 = tabListItem.name) == null ? void 0 : _a2.value) || idx;
      });
    };
    provide(TabsViewKey, {
      parentDisabled: props.disabled,
      selectTab,
      moveToTab,
      registerTab,
      unregisterTab
    });
    watch(() => props.modelValue, updateTabsState);
    useResizeObserver([wrapper], updatePagination);
    useResizeObserver([container], updateTabsState);
    onMounted(() => {
      requestAnimationFrame(() => {
        includeAnimation();
      });
    });
    __expose({
      selectTab,
      moveToTab,
      movePaginationLeft,
      movePaginationRight
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: normalizeClass(["va-tabs", computedTabsClass.value])
      }, [
        createBaseVNode("div", {
          ref_key: "wrapper",
          ref: wrapper,
          class: "va-tabs__wrapper",
          role: "tablist",
          "aria-disabled": _ctx.$props.disabled
        }, [
          showPagination.value && !_ctx.$props.hidePagination ? (openBlock(), createBlock(unref(VaButton), {
            key: 0,
            class: "va-tabs__pagination",
            "aria-label": unref(tp)(_ctx.$props.ariaMoveLeftLabel),
            size: "medium",
            disabled: disablePaginationLeft.value,
            color: __props.color,
            preset: "secondary",
            icon: _ctx.$props.prevIcon,
            onClick: movePaginationLeft
          }, null, 8, ["aria-label", "disabled", "color", "icon"])) : createCommentVNode("", true),
          createBaseVNode("div", {
            ref_key: "container",
            ref: container,
            class: normalizeClass(["va-tabs__container", computedClass.value])
          }, [
            createBaseVNode("div", {
              ref_key: "tabs",
              ref: tabs,
              class: "va-tabs__tabs",
              style: normalizeStyle(paginationControlledStyles.value)
            }, [
              createBaseVNode("div", {
                class: "va-tabs__slider-wrapper",
                "aria-hidden": "true",
                style: normalizeStyle(sliderStyles.value)
              }, _hoisted_321, 4),
              createVNode(unref(_sfc_main4), { components: tabConfig }, {
                default: withCtx(() => [
                  createBaseVNode("div", _hoisted_412, [
                    renderSlot(_ctx.$slots, "tabs")
                  ])
                ]),
                _: 3
              }, 8, ["components"])
            ], 4)
          ], 2),
          showPagination.value && !_ctx.$props.hidePagination ? (openBlock(), createBlock(unref(VaButton), {
            key: 1,
            class: "va-tabs__pagination",
            "aria-label": unref(tp)(_ctx.$props.ariaMoveRightLabel),
            size: "medium",
            color: __props.color,
            disabled: disablePaginationRight.value,
            preset: "secondary",
            icon: _ctx.$props.nextIcon,
            onClick: movePaginationRight
          }, null, 8, ["aria-label", "color", "disabled", "icon"])) : createCommentVNode("", true)
        ], 8, _hoisted_161),
        createBaseVNode("div", _hoisted_510, [
          renderSlot(_ctx.$slots, "default")
        ])
      ], 2);
    };
  }
});

// node_modules/vuestic-ui/dist/es/src/components/va-tabs/index.js
var VaTabs = withConfigTransport$1(_sfc_main103);

// node_modules/vuestic-ui/dist/es/src/components/va-tabs/components/VaTab/VaTab.vue_vue_type_script_setup_true_lang.js
import "D:/Github/DONGTIAN/ui/node_modules/vuestic-ui/dist/es/VaTab.css";
var _hoisted_162 = { class: "va-tab__content" };
var _hoisted_231 = ["textContent"];
var _sfc_main104 = defineComponent({
  ...{
    name: "VaTab"
  },
  __name: "VaTab",
  props: {
    ...useRouterLinkProps,
    ...useComponentPresetProp,
    selected: { type: Boolean, default: false },
    color: { type: String, default: "" },
    icon: { type: String, default: "" },
    label: { type: String, default: "" },
    disabled: { type: Boolean },
    name: { type: [String, Number] },
    tag: { type: String, default: "div" }
  },
  emits: ["click", "keydown-enter", "focus"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const rootElement = shallowRef();
    const tabElement = computed(() => unwrapEl(rootElement.value));
    const isActive = ref(false);
    const hoverState = ref(false);
    const rightSidePosition = ref(0);
    const leftSidePosition = ref(0);
    const { keyboardFocusListeners, hasKeyboardFocus } = useKeyboardOnlyFocus();
    const { tagComputed, isActiveRouterLink, linkAttributesComputed } = useRouterLink(props);
    const classComputed = computed(() => ({ "va-tab--disabled": props.disabled }));
    const {
      parentDisabled,
      selectTab,
      moveToTab,
      registerTab,
      unregisterTab
    } = inject(TabsViewKey, {
      parentDisabled: false,
      tabsList: [],
      selectTab: (tab) => tab,
      moveToTab: (tab) => tab,
      registerTab: (tab) => tab,
      unregisterTab: (tab) => tab
    });
    const tabIndexComputed = computed(() => props.disabled || parentDisabled ? -1 : 0);
    const { getColor } = useColors();
    const colorComputed = computed(() => getColor(props.color));
    const computedStyle = computed(() => ({
      color: hoverState.value || isActive.value ? colorComputed.value : "inherit"
    }));
    const updateHoverState = (isHover) => {
      hoverState.value = isHover;
    };
    const updateSidePositions = () => {
      var _a2, _b;
      const componentOffsetLeft = ((_a2 = tabElement.value) == null ? void 0 : _a2.offsetLeft) || 0;
      const componentOffsetWidth = ((_b = tabElement.value) == null ? void 0 : _b.offsetWidth) || 0;
      rightSidePosition.value = componentOffsetLeft + componentOffsetWidth;
      leftSidePosition.value = componentOffsetLeft;
    };
    const width = useElementWidth(rootElement);
    watch(width, () => {
      updateSidePositions();
    });
    const onTabClick = async () => {
      await nextTick();
      selectTab(tabComponent);
      emit("click");
    };
    const onTabKeydown = async () => {
      await nextTick();
      selectTab(tabComponent);
      emit("keydown-enter");
    };
    const onFocus = () => {
      if (hasKeyboardFocus.value) {
        moveToTab(tabComponent);
      }
      emit("focus");
    };
    const tabComponent = {
      name: computed(() => props.name),
      id: null,
      tabElement,
      isActive,
      tabIndexComputed,
      isActiveRouterLink,
      rightSidePosition,
      leftSidePosition,
      onTabClick,
      onTabKeydown,
      onFocus,
      updateSidePositions
    };
    onMounted(() => {
      registerTab(tabComponent);
    });
    onBeforeUnmount(() => {
      unregisterTab(tabComponent);
    });
    return (_ctx, _cache) => {
      return openBlock(), createBlock(resolveDynamicComponent(unref(tagComputed)), mergeProps({
        ref_key: "rootElement",
        ref: rootElement,
        class: ["va-tab", classComputed.value],
        role: "tab",
        "aria-selected": isActive.value,
        "aria-disabled": _ctx.$props.disabled || unref(parentDisabled),
        style: computedStyle.value,
        onMouseenter: _cache[0] || (_cache[0] = ($event) => updateHoverState(true)),
        onMouseleave: _cache[1] || (_cache[1] = ($event) => updateHoverState(false)),
        onFocus,
        onClick: onTabClick,
        onKeydown: withKeys(onTabKeydown, ["enter"]),
        tabindex: tabIndexComputed.value
      }, toHandlers(unref(keyboardFocusListeners)), unref(linkAttributesComputed)), {
        default: withCtx(() => [
          createBaseVNode("div", _hoisted_162, [
            renderSlot(_ctx.$slots, "default", {}, () => [
              __props.icon ? (openBlock(), createBlock(unref(VaIcon), {
                key: 0,
                class: "va-tab__icon",
                size: "small",
                name: __props.icon
              }, null, 8, ["name"])) : createCommentVNode("", true),
              createBaseVNode("span", {
                class: "va-tab__label",
                textContent: toDisplayString(__props.label)
              }, null, 8, _hoisted_231)
            ])
          ])
        ]),
        _: 3
      }, 16, ["aria-selected", "aria-disabled", "class", "style", "tabindex"]);
    };
  }
});

// node_modules/vuestic-ui/dist/es/src/components/va-tabs/components/VaTab/index.js
var VaTab = withConfigTransport$1(_sfc_main104);

// node_modules/vuestic-ui/dist/es/src/utils/un-function.js
var unFunction = (fn, ...args) => {
  if (isFunction(fn)) {
    return fn(...args);
  }
  return fn;
};

// node_modules/vuestic-ui/dist/es/src/components/va-stepper/VaStepperControls.vue_vue_type_script_setup_true_lang.js
import "D:/Github/DONGTIAN/ui/node_modules/vuestic-ui/dist/es/VaStepperControls.css";
var _hoisted_163 = { class: "va-stepper__default-controls" };
var _sfc_main105 = defineComponent({
  ...{
    name: "VaStepperControls"
  },
  __name: "VaStepperControls",
  props: {
    modelValue: { type: [Number, String], required: true },
    steps: {
      type: Array,
      required: true
    },
    nextDisabled: { type: Boolean, required: true },
    stepControls: { type: Object, required: true },
    finishButtonHidden: { type: Boolean, default: false }
  },
  setup(__props) {
    const props = __props;
    const { t } = useTranslation();
    const isLoading = computed(() => {
      const currentStep = props.steps[Number(props.modelValue)];
      return unFunction(currentStep.isLoading) || false;
    });
    const isLastStep = computed(() => {
      const lastEnabledStepIndex = props.steps.length - 1;
      return Number(props.modelValue) >= lastEnabledStepIndex;
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_163, [
        createVNode(unref(VaButton), {
          preset: "primary",
          disabled: Number(_ctx.$props.modelValue) <= 0,
          loading: isLoading.value,
          onClick: _cache[0] || (_cache[0] = ($event) => _ctx.$props.stepControls.prevStep())
        }, {
          default: withCtx(() => [
            createTextVNode(toDisplayString(unref(t)("back")), 1)
          ]),
          _: 1
        }, 8, ["disabled", "loading"]),
        !isLastStep.value ? (openBlock(), createBlock(unref(VaButton), {
          key: 0,
          onClick: _cache[1] || (_cache[1] = ($event) => _ctx.$props.stepControls.nextStep()),
          disabled: _ctx.$props.nextDisabled,
          loading: isLoading.value
        }, {
          default: withCtx(() => [
            createTextVNode(toDisplayString(unref(t)("next")), 1)
          ]),
          _: 1
        }, 8, ["disabled", "loading"])) : !_ctx.$props.finishButtonHidden ? (openBlock(), createBlock(unref(VaButton), {
          key: 1,
          onClick: _cache[2] || (_cache[2] = ($event) => _ctx.$props.stepControls.finish()),
          loading: isLoading.value
        }, {
          default: withCtx(() => [
            createTextVNode(toDisplayString(unref(t)("finish")), 1)
          ]),
          _: 1
        }, 8, ["loading"])) : createCommentVNode("", true)
      ]);
    };
  }
});

// node_modules/vuestic-ui/dist/es/src/components/va-stepper/step.js
var isStepHasError = (step) => {
  return unFunction(step.hasError, step) || false;
};

// node_modules/vuestic-ui/dist/es/src/components/va-stepper/VaStepperStepButton.vue_vue_type_script_setup_true_lang.js
import "D:/Github/DONGTIAN/ui/node_modules/vuestic-ui/dist/es/VaStepperStepButton.css";
var _hoisted_164 = { class: "va-stepper__step-button__icon" };
var _sfc_main106 = defineComponent({
  ...{
    name: "VaStepperStepButton"
  },
  __name: "VaStepperStepButton",
  props: {
    modelValue: { type: Number, required: true },
    step: {
      type: Object,
      required: true
    },
    color: { type: String, required: true },
    stepIndex: { type: [Number, String], required: true },
    navigationDisabled: { type: Boolean, required: true },
    nextDisabled: { type: Boolean, required: true },
    focus: { type: Object, required: true },
    stepControls: { type: Object, required: true }
  },
  emits: ["update:modelValue"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const stepElement = shallowRef();
    const hasError = computed(() => isStepHasError(props.step));
    const stepIndexComputed = useNumericProp("stepIndex");
    const displayError = computed(() => hasError.value && props.modelValue === stepIndexComputed.value);
    const isLoading = computed(() => unFunction(props.step.isLoading) || false);
    const { getColor } = useColors();
    const stepperColor = computed(() => getColor(hasError.value ? "danger" : props.color));
    const isNextStepDisabled = (index) => props.nextDisabled && index > props.modelValue;
    const { t } = useTranslation();
    const computedClass = useBem("va-stepper__step-button", () => ({
      active: props.modelValue >= stepIndexComputed.value,
      disabled: props.step.disabled || isNextStepDisabled(stepIndexComputed.value),
      "navigation-disabled": props.navigationDisabled,
      error: displayError.value
    }));
    watch(() => props.focus, () => {
      if (props.focus.trigger) {
        nextTick(() => {
          var _a2;
          return (_a2 = stepElement.value) == null ? void 0 : _a2.focus();
        });
      }
    }, { deep: true });
    const ariaAttributesComputed = computed(() => ({
      tabindex: props.focus.stepIndex === stepIndexComputed.value && !props.navigationDisabled ? 0 : void 0,
      "aria-disabled": props.step.disabled || isNextStepDisabled(stepIndexComputed.value) ? true : void 0,
      "aria-current": props.modelValue === props.stepIndex ? t("step") : void 0
    }));
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("li", mergeProps({
        ref_key: "stepElement",
        ref: stepElement,
        class: ["va-stepper__step-button", unref(computedClass)],
        onClick: _cache[0] || (_cache[0] = ($event) => !_ctx.$props.navigationDisabled && _ctx.$props.stepControls.setStep(unref(stepIndexComputed))),
        onKeyup: [
          _cache[1] || (_cache[1] = withKeys(($event) => !_ctx.$props.navigationDisabled && _ctx.$props.stepControls.setStep(unref(stepIndexComputed)), ["enter"])),
          _cache[2] || (_cache[2] = withKeys(($event) => !_ctx.$props.navigationDisabled && _ctx.$props.stepControls.setStep(unref(stepIndexComputed)), ["space"]))
        ]
      }, ariaAttributesComputed.value, {
        style: `--va-stepper-color: ${String(stepperColor.value)}`
      }), [
        createBaseVNode("div", _hoisted_164, [
          isLoading.value ? (openBlock(), createBlock(unref(VaProgressCircle), {
            key: 0,
            color: "currentColor",
            indeterminate: "",
            size: "small"
          })) : __props.step.icon ? (openBlock(), createBlock(unref(VaIcon), {
            key: 1,
            name: __props.step.icon,
            size: "1.3rem"
          }, null, 8, ["name"])) : (openBlock(), createElementBlock(Fragment, { key: 2 }, [
            createTextVNode(toDisplayString(unref(stepIndexComputed) + 1), 1)
          ], 64))
        ]),
        createTextVNode(" " + toDisplayString(__props.step.label), 1)
      ], 16);
    };
  }
});

// node_modules/vuestic-ui/dist/es/src/components/va-stepper/VaStepper.vue_vue_type_script_setup_true_lang.js
import "D:/Github/DONGTIAN/ui/node_modules/vuestic-ui/dist/es/VaStepper.css";
var _hoisted_165 = { class: "va-stepper__step-content" };
var _hoisted_232 = { class: "va-stepper__controls" };
var _sfc_main107 = defineComponent({
  ...{
    name: "VaStepper"
  },
  __name: "VaStepper",
  props: {
    ...useStatefulProps,
    modelValue: { type: Number, default: 0 },
    steps: {
      type: Array,
      default: () => [],
      required: true
    },
    color: { type: String, default: "primary" },
    vertical: { type: Boolean, default: false },
    navigationDisabled: { type: Boolean, default: false },
    controlsHidden: { type: Boolean, default: false },
    nextDisabled: { type: Boolean, default: false },
    nextDisabledOnError: { type: Boolean, default: false },
    finishButtonHidden: { type: Boolean, default: false },
    ariaLabel: useTranslationProp("$t:progress"),
    linear: { type: Boolean, default: false },
    /** Hidden step shown when all steps complete */
    finishStep: { type: Object }
  },
  emits: ["update:modelValue", "finish", "update:steps"],
  setup(__props, { expose: __expose, emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const stepperNavigation = shallowRef();
    const { valueComputed: modelValue } = useStateful(props, emit, "modelValue");
    const stepsComputed = computed(() => {
      if (!props.finishStep) {
        return props.steps;
      }
      return [...props.steps, props.finishStep];
    });
    const isFinishStep = (index) => {
      if (!props.finishStep) {
        return false;
      }
      return index === stepsComputed.value.length - 1;
    };
    const focusedStep = ref({ trigger: false, stepIndex: props.navigationDisabled ? -1 : props.modelValue });
    const { getColor } = useColors();
    const isNextStepDisabled = (index) => {
      if (props.nextDisabledOnError && isStepHasError(stepsComputed.value[index])) {
        return true;
      }
      return props.nextDisabled;
    };
    const findFirstNonDisabled = (from, direction) => {
      while (from >= 0 && from < stepsComputed.value.length) {
        from += direction;
        const step = stepsComputed.value[from];
        if (!step) {
          return;
        }
        if (!step.disabled) {
          return step;
        }
      }
    };
    const findFirstWithErrorIndex = (from, direction) => {
      while (from >= 0 && from < stepsComputed.value.length) {
        from += direction;
        const step = stepsComputed.value[from];
        if (!step) {
          return;
        }
        if (isStepHasError(step) === true) {
          return from;
        }
      }
    };
    const validateMovingToStep = async (stepIndex) => {
      var _a2;
      const newStep = stepsComputed.value[stepIndex];
      const currentStep = stepsComputed.value[modelValue.value];
      const beforeNewStep = findFirstNonDisabled(stepIndex, -1);
      if (newStep.disabled) {
        return false;
      }
      if (props.linear && stepIndex < modelValue.value) {
        return true;
      }
      const nextNonError = findFirstWithErrorIndex(modelValue.value, 1);
      if (props.linear && nextNonError !== void 0 && nextNonError < stepIndex) {
        return false;
      }
      let currentStepBeforeLeaveResult;
      try {
        currentStepBeforeLeaveResult = await ((_a2 = currentStep.beforeLeave) == null ? void 0 : _a2.call(currentStep, currentStep, newStep));
      } catch (e) {
        throw new Error(`Error in beforeLeave function: ${e}`);
      }
      if (currentStepBeforeLeaveResult === false) {
        return false;
      }
      if (currentStep.completed === void 0) {
        currentStep.completed = true;
      }
      if (props.linear && beforeNewStep && !beforeNewStep.completed) {
        return false;
      }
      if (props.linear && isStepHasError(currentStep)) {
        return false;
      }
      return true;
    };
    const setStep = async (index) => {
      if (!await validateMovingToStep(index)) {
        return;
      }
      modelValue.value = index;
    };
    const setFocus = (direction) => {
      if (props.navigationDisabled) {
        return;
      }
      if (direction === "next") {
        setFocusNextStep(1);
      } else {
        setFocusPrevStep(1);
      }
    };
    const setFocusNextStep = (idx = 1) => {
      const newValue = focusedStep.value.stepIndex + idx;
      if (isNextStepDisabled(newValue)) {
        return;
      }
      if (newValue < stepsComputed.value.length) {
        if (stepsComputed.value[newValue].disabled) {
          setFocusNextStep(idx + 1);
          return;
        }
        focusedStep.value.stepIndex = newValue;
        focusedStep.value.trigger = true;
      } else {
        for (let availableIdx = 0; availableIdx < stepsComputed.value.length; availableIdx++) {
          if (!stepsComputed.value[availableIdx].disabled) {
            focusedStep.value.stepIndex = availableIdx;
            focusedStep.value.trigger = true;
            break;
          }
        }
      }
    };
    const setFocusPrevStep = (idx = 1) => {
      const newValue = focusedStep.value.stepIndex - idx;
      if (newValue >= 0) {
        if (stepsComputed.value[newValue].disabled) {
          setFocusPrevStep(idx + 1);
          return;
        }
        focusedStep.value.stepIndex = newValue;
        focusedStep.value.trigger = true;
      } else {
        for (let availableIdx = stepsComputed.value.length - 1; availableIdx >= 0; availableIdx--) {
          if (!stepsComputed.value[availableIdx].disabled && !isNextStepDisabled(availableIdx)) {
            focusedStep.value.stepIndex = availableIdx;
            focusedStep.value.trigger = true;
            break;
          }
        }
      }
    };
    const resetFocus = () => {
      requestAnimationFrame(() => {
        var _a2;
        if (!((_a2 = stepperNavigation.value) == null ? void 0 : _a2.contains(document.activeElement))) {
          focusedStep.value.stepIndex = props.modelValue;
          focusedStep.value.trigger = false;
        }
      });
    };
    watch(() => props.modelValue, () => {
      focusedStep.value.stepIndex = props.modelValue;
      focusedStep.value.trigger = false;
    });
    const nextStep = (stepsToSkip = 0) => {
      const targetIndex = modelValue.value + 1 + stepsToSkip;
      if (!stepsComputed.value[targetIndex]) {
        return;
      }
      if (stepsComputed.value[targetIndex].disabled) {
        nextStep(stepsToSkip + 1);
      }
      setStep(targetIndex);
    };
    const prevStep = (stepsToSkip = 0) => {
      const targetIndex = modelValue.value - 1 - stepsToSkip;
      if (!stepsComputed.value[targetIndex]) {
        return;
      }
      if (stepsComputed.value[targetIndex].disabled) {
        prevStep(stepsToSkip + 1);
      }
      setStep(targetIndex);
    };
    const finish = async () => {
      if (await validateMovingToStep(props.steps.length - 1)) {
        emit("finish");
      }
    };
    const stepControls = { setStep, nextStep, prevStep, finish };
    const getIterableSlotData = (step, index) => ({
      ...stepControls,
      focus: focusedStep,
      isActive: props.modelValue === index,
      isCompleted: props.modelValue > index,
      isLastStep: stepsComputed.value.length - 1 === index,
      isNextStepDisabled: isNextStepDisabled(index),
      isPrevStepDisabled: index === 0,
      index,
      step,
      hasError: isStepHasError(step)
    });
    const { tp } = useTranslation();
    const onValueChange = () => {
      focusedStep.value.stepIndex = props.modelValue;
      focusedStep.value.trigger = true;
    };
    const ariaAttributesComputed = computed(() => ({
      role: "group",
      "aria-label": tp(props.ariaLabel),
      "aria-orientation": props.vertical ? "vertical" : "horizontal"
    }));
    function getStepperButtonColor(index) {
      return isStepHasError(stepsComputed.value[index]) ? "danger" : getColor(props.color);
    }
    const completeStep = (shouldCompleteStep) => {
      const steps = { ...stepsComputed.value };
      if (shouldCompleteStep === true) {
        steps[props.modelValue].hasError = false;
      }
      steps[props.modelValue].completed = shouldCompleteStep ?? true;
      emit("update:steps", steps);
    };
    const setError = (shouldSetError) => {
      const steps = { ...stepsComputed.value };
      steps[props.modelValue].hasError = shouldSetError ?? true;
      steps[props.modelValue].completed = !shouldSetError;
      emit("update:steps", steps);
    };
    __expose({
      modelValue,
      focusedStep,
      getIterableSlotData,
      stepControls,
      nextStep,
      prevStep,
      setStep,
      setFocus,
      completeStep,
      setError
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", mergeProps({
        class: ["va-stepper", { "va-stepper--vertical": _ctx.$props.vertical }]
      }, ariaAttributesComputed.value), [
        createBaseVNode("ol", {
          class: normalizeClass(["va-stepper__navigation", { "va-stepper__navigation--vertical": _ctx.$props.vertical }]),
          ref_key: "stepperNavigation",
          ref: stepperNavigation,
          onClick: onValueChange,
          onKeyup: [
            withKeys(onValueChange, ["enter"]),
            withKeys(onValueChange, ["space"]),
            _cache[0] || (_cache[0] = withKeys(($event) => setFocus("prev"), ["left"])),
            _cache[1] || (_cache[1] = withKeys(($event) => setFocus("next"), ["right"]))
          ],
          onFocusout: resetFocus
        }, [
          (openBlock(true), createElementBlock(Fragment, null, renderList(stepsComputed.value, (step, i) => {
            return openBlock(), createElementBlock(Fragment, {
              key: i + step.label
            }, [
              !isFinishStep(i) ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
                i > 0 ? renderSlot(_ctx.$slots, "divider", normalizeProps(mergeProps({ key: 0 }, getIterableSlotData(step, i))), () => [
                  createBaseVNode("span", {
                    class: normalizeClass(["va-stepper__divider", { "va-stepper__divider--vertical": _ctx.$props.vertical }]),
                    "aria-hidden": "true"
                  }, null, 2)
                ]) : createCommentVNode("", true),
                renderSlot(_ctx.$slots, `step-button-${i}`, normalizeProps(guardReactiveProps(getIterableSlotData(step, i))), () => [
                  createVNode(_sfc_main106, {
                    stepIndex: i,
                    color: getStepperButtonColor(i),
                    modelValue: unref(modelValue),
                    nextDisabled: __props.nextDisabled,
                    step,
                    stepControls,
                    navigationDisabled: __props.navigationDisabled,
                    focus: focusedStep.value
                  }, null, 8, ["stepIndex", "color", "modelValue", "nextDisabled", "step", "navigationDisabled", "focus"])
                ])
              ], 64)) : createCommentVNode("", true)
            ], 64);
          }), 128))
        ], 34),
        createBaseVNode("div", {
          class: normalizeClass(["va-stepper__step-content-wrapper", { "va-stepper__step-content-wrapper--vertical": _ctx.$props.vertical }])
        }, [
          createBaseVNode("div", _hoisted_165, [
            renderSlot(_ctx.$slots, `step-content-${isFinishStep(unref(modelValue)) ? "finish" : unref(modelValue)}`, normalizeProps(guardReactiveProps(getIterableSlotData(stepsComputed.value[unref(modelValue)], unref(modelValue)))))
          ]),
          createBaseVNode("div", _hoisted_232, [
            renderSlot(_ctx.$slots, "controls", normalizeProps(guardReactiveProps(getIterableSlotData(stepsComputed.value[unref(modelValue)], unref(modelValue)))), () => [
              !__props.controlsHidden ? (openBlock(), createBlock(_sfc_main105, {
                key: 0,
                modelValue: unref(modelValue),
                nextDisabled: isNextStepDisabled(unref(modelValue)),
                steps: stepsComputed.value,
                stepControls,
                finishButtonHidden: __props.finishButtonHidden
              }, null, 8, ["modelValue", "nextDisabled", "steps", "finishButtonHidden"])) : createCommentVNode("", true)
            ])
          ])
        ], 2)
      ], 16);
    };
  }
});

// node_modules/vuestic-ui/dist/es/src/components/va-stepper/index.js
var VaStepper = withConfigTransport$1(_sfc_main107);
var defineVaStepperSteps = (steps) => steps;

// node_modules/vuestic-ui/dist/es/src/components/va-time-input/hooks/time-text-parser.js
var parse = (text) => {
  const m = text.match(/[0-9]{1,2}/g);
  if (!m) {
    return [];
  }
  return m.map((s) => Number(s));
};
var parsePeriod = (text) => {
  const m = text.match(/pm|am/i);
  if (!m) {
    return null;
  }
  return Number(m[0].toLowerCase() === "pm");
};
var defaultParseDateFunction2 = (text) => {
  const d = /* @__PURE__ */ new Date();
  const [h2, m, s] = parse(text);
  const period = parsePeriod(text);
  if (!h2) {
    return null;
  }
  const is12format = period !== null && h2 <= 12;
  const isPM = is12format && !!period;
  const fh = is12format ? h2 === 12 ? 0 : h2 : h2;
  d.setHours(Math.min(fh || 0, is12format ? 12 : 24) + (isPM ? 12 : 0));
  d.setMinutes(Math.min(m || 0, 60));
  d.setSeconds(Math.min(s || 0, 60));
  return d;
};
var useTimeParser = (props) => {
  const getParseDateFn = () => props.parse || defaultParseDateFunction2;
  const isValid = ref(true);
  const parseDate = (text) => {
    const parse3 = getParseDateFn();
    const result = parse3(text);
    if (!result) {
      isValid.value = false;
    }
    return result;
  };
  const parse2 = (text) => {
    isValid.value = true;
    return parseDate(text);
  };
  return {
    parse: parse2,
    isValid
  };
};

// node_modules/vuestic-ui/dist/es/src/components/va-time-input/hooks/time-text-formatter.js
var useTimeFormatter = (props) => {
  const formatDate = (date) => {
    if (!date) {
      return "";
    }
    if (props.ampm) {
      return date.toLocaleTimeString("en-US");
    }
    return date.toLocaleTimeString("en-GB");
  };
  const sliceTime = (time, start, end) => time.split(":").slice(start, end).join(":");
  const formatWithView = (date) => {
    if (props.view === "seconds") {
      return formatDate(date);
    }
    const [time, period] = formatDate(date).split(" ");
    if (props.view === "minutes") {
      if (!period) {
        return sliceTime(time, 0, 2);
      }
      return [sliceTime(time, 0, 2), period].join(" ");
    }
    if (props.view === "hours") {
      if (!period) {
        return sliceTime(time, 0, 1);
      }
      return [sliceTime(time, 0, 1), period].join(" ");
    }
    return "";
  };
  return {
    format: (date) => props.format ? props.format(date) : formatWithView(date)
  };
};

// node_modules/vuestic-ui/dist/es/src/components/va-time-picker/hooks/useTimePicker.js
var safeModelValue = (m) => m.value ? m.value : new Date((/* @__PURE__ */ new Date()).setHours(0, 0, 0, 0));
var createNumbersArray = (length) => Array.from(Array(length).keys());
var from24to12 = (h2) => (h2 === 0 ? 12 : h2) - Number(h2 > 12) * 12;
var from12to24 = (h2, isAM = false) => (h2 === 12 ? 0 : h2) + Number(isAM) * 12;
var createHoursColumn = (props, modelValue, isPM) => {
  const computedSize = computed(() => props.ampm ? 12 : 24);
  const items2 = computed(() => {
    let array = createNumbersArray(computedSize.value);
    if (props.hoursFilter) {
      array = array.filter((i) => props.hoursFilter(props.ampm ? i + 12 * Number(isPM.value) : i));
    }
    return array.map((n) => {
      return props.ampm ? from24to12(n) : n;
    });
  });
  const activeItem = computed({
    get: () => {
      if (!modelValue.value) {
        return -1;
      }
      if (props.ampm) {
        const h22 = from24to12(modelValue.value.getHours() - 12 * Number(isPM.value));
        return items2.value.findIndex((i) => i === h22);
      }
      const h2 = modelValue.value.getHours();
      return items2.value.findIndex((i) => i === h2);
    },
    set: (newIndex) => {
      if (props.readonly) {
        return;
      }
      const hours = props.ampm ? from12to24(items2.value[newIndex], isPM.value) : items2.value[newIndex];
      modelValue.value = new Date(safeModelValue(modelValue).setHours(hours));
    }
  });
  return computed(() => ({
    items: items2.value,
    activeItem
  }));
};
var createMinutesColumn = (props, modelValue) => {
  const items2 = computed(() => {
    const array = createNumbersArray(60);
    if (!props.minutesFilter) {
      return array;
    }
    return array.filter(props.minutesFilter);
  });
  const activeItem = computed({
    get: () => {
      if (!modelValue.value) {
        return -1;
      }
      const m = modelValue.value.getMinutes();
      return items2.value.findIndex((i) => i === m);
    },
    set: (newIndex) => {
      if (props.readonly) {
        return;
      }
      const v = items2.value[newIndex];
      modelValue.value = new Date(safeModelValue(modelValue).setMinutes(v));
    }
  });
  return computed(() => ({
    items: items2.value,
    activeItem
  }));
};
var createSecondsColumn = (props, modelValue) => {
  const items2 = computed(() => {
    const array = createNumbersArray(60);
    if (!props.secondsFilter) {
      return array;
    }
    return array.filter(props.secondsFilter);
  });
  const activeItem = computed({
    get: () => {
      if (!modelValue.value) {
        return -1;
      }
      const s = modelValue.value.getSeconds();
      return items2.value.findIndex((i) => i === s);
    },
    set: (newIndex) => {
      if (props.readonly) {
        return;
      }
      const v = items2.value[newIndex];
      modelValue.value = new Date(safeModelValue(modelValue).setSeconds(v));
    }
  });
  return computed(() => ({
    items: items2.value,
    activeItem
  }));
};
var createPeriodColumn = (props, modelValue, isPM) => {
  return computed(() => ({
    items: ["AM", "PM"],
    activeItem: computed({
      get: () => {
        if (!modelValue.value) {
          return -1;
        }
        return Number(isPM.value);
      },
      set: (val) => {
        isPM.value = Boolean(val);
        const h2 = safeModelValue(modelValue).getHours();
        let h24 = isPM.value ? h2 + 12 : h2;
        if (isPM.value && h2 <= 12) {
          h24 = h2 + 12;
        }
        if (!isPM.value && h2 >= 12) {
          h24 = h2 - 12;
        }
        const isValidFilteredHour = !props.hoursFilter || props.hoursFilter(h24);
        if (props.periodUpdatesModelValue && isValidFilteredHour) {
          modelValue.value = new Date(safeModelValue(modelValue).setHours(h24));
        }
      }
    })
  }));
};
var useTimePicker = (props, modelValue) => {
  const { view } = toRefs(props);
  const isPM = ref(false);
  watch(modelValue, () => {
    isPM.value = safeModelValue(modelValue).getHours() >= 12;
  }, { immediate: true });
  const hoursColumn = createHoursColumn(props, modelValue, isPM);
  const minutesColumn = createMinutesColumn(props, modelValue);
  const secondsColumn = createSecondsColumn(props, modelValue);
  const periodColumn = createPeriodColumn(props, modelValue, isPM);
  const columns = computed(() => {
    const array = [];
    if (view.value === "hours") {
      array.push(hoursColumn.value);
    } else if (view.value === "minutes") {
      array.push(hoursColumn.value, minutesColumn.value);
    } else if (view.value === "seconds") {
      array.push(hoursColumn.value, minutesColumn.value, secondsColumn.value);
    }
    if (props.ampm && !props.hidePeriodSwitch) {
      array.push(periodColumn.value);
    }
    return array;
  });
  return {
    columns,
    isPM
  };
};

// node_modules/vuestic-ui/dist/es/src/components/va-time-picker/components/VaTimePickerColumnCell.vue_vue_type_script_setup_true_lang.js
var _sfc_main108 = defineComponent({
  ...{
    name: "VaTimePickerColumnCell"
  },
  __name: "VaTimePickerColumnCell",
  setup(__props) {
    const { isHovered, onMouseEnter, onMouseLeave } = useHover();
    const { getTextColor, getColor } = useColors();
    const styleComputed = computed(() => isHovered.value ? {
      color: getColor(getTextColor(getColor("background-secondary"))),
      background: getColor("background-secondary")
    } : void 0);
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        onMouseenter: _cache[0] || (_cache[0] = //@ts-ignore
        (...args) => unref(onMouseEnter) && unref(onMouseEnter)(...args)),
        onMouseleave: _cache[1] || (_cache[1] = //@ts-ignore
        (...args) => unref(onMouseLeave) && unref(onMouseLeave)(...args)),
        style: normalizeStyle(styleComputed.value)
      }, [
        renderSlot(_ctx.$slots, "default")
      ], 36);
    };
  }
});

// node_modules/vuestic-ui/dist/es/src/components/va-time-picker/components/VaTimePickerColumn/VaTimePickerColumn.vue_vue_type_script_setup_true_lang.js
import "D:/Github/DONGTIAN/ui/node_modules/vuestic-ui/dist/es/VaTimePickerColumn.css";
var _hoisted_166 = ["onClick"];
var _sfc_main109 = defineComponent({
  ...{
    name: "VaTimePickerColumn"
  },
  __name: "VaTimePickerColumn",
  props: {
    items: { type: Array, default: () => [] },
    activeItemIndex: { type: Number, default: 0 },
    cellHeight: { type: [Number, String], default: 30 }
  },
  emits: ["item-selected", "update:activeItemIndex", ...useFocusEmits],
  setup(__props, { expose: __expose, emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const rootElement = shallowRef();
    const { focus, blur } = useFocus(rootElement, emit);
    const [syncActiveItemIndex] = useSyncProp("activeItemIndex", props, emit);
    const cellHeightComputed = useNumericProp("cellHeight");
    watch(syncActiveItemIndex, (newVal) => {
      scrollTo(newVal);
    });
    onMounted(() => scrollTo(syncActiveItemIndex.value, false));
    const scrollTo = (index, animated = true) => {
      nextTick(() => {
        var _a2, _b;
        (_b = (_a2 = rootElement.value) == null ? void 0 : _a2.scrollTo) == null ? void 0 : _b.call(_a2, {
          behavior: animated ? "smooth" : "auto",
          top: index * cellHeightComputed.value
        });
      });
    };
    const makeActiveNext = (times) => {
      syncActiveItemIndex.value = (syncActiveItemIndex.value + (times || 1)) % props.items.length;
      nextTick(() => scrollTo(syncActiveItemIndex.value));
    };
    const makeActivePrev = (times) => {
      syncActiveItemIndex.value = (syncActiveItemIndex.value - (times || 1) + props.items.length) % props.items.length;
      nextTick(() => scrollTo(syncActiveItemIndex.value));
    };
    const onCellClick = (index) => {
      syncActiveItemIndex.value = index;
    };
    const formatCell = (n) => {
      if (!Number.isInteger(n)) {
        return n;
      }
      return Number(n) < 10 ? `0${n}` : `${n}`;
    };
    const getIndex = () => {
      const scrollTop = rootElement.value.scrollTop;
      const calculatedIndex = Math.max(
        (scrollTop - scrollTop % cellHeightComputed.value) / cellHeightComputed.value,
        scrollTop / cellHeightComputed.value
      );
      if (calculatedIndex >= props.items.length) {
        return props.items.length - 1;
      }
      if (calculatedIndex < 0) {
        return 0;
      }
      if (syncActiveItemIndex.value * cellHeightComputed.value < scrollTop) {
        return Math.ceil(calculatedIndex);
      } else if (syncActiveItemIndex.value * cellHeightComputed.value > scrollTop) {
        return Math.floor(calculatedIndex);
      } else {
        return Math.round(calculatedIndex);
      }
    };
    const onScroll = debounce(() => {
      if (rootElement.value && syncActiveItemIndex.value !== -1) {
        syncActiveItemIndex.value = getIndex();
      }
    }, 200);
    __expose({
      focus,
      blur
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        ref_key: "rootElement",
        ref: rootElement,
        tabindex: "0",
        class: "va-time-picker-column",
        onKeydown: [
          _cache[0] || (_cache[0] = withKeys(withModifiers(($event) => makeActiveNext(), ["stop", "prevent"]), ["down"])),
          _cache[1] || (_cache[1] = withKeys(withModifiers(($event) => makeActiveNext(5), ["stop", "prevent"]), ["space"])),
          _cache[2] || (_cache[2] = withKeys(withModifiers(($event) => makeActivePrev(), ["stop", "prevent"]), ["up"]))
        ]
      }, [
        (openBlock(true), createElementBlock(Fragment, null, renderList(__props.items, (item, index) => {
          return openBlock(), createBlock(_sfc_main108, {
            key: item,
            onScrollPassive: unref(onScroll),
            onTouchmovePassive: unref(onScroll),
            onMousewheelPassive: unref(onScroll)
          }, {
            default: withCtx(() => [
              createBaseVNode("div", {
                class: normalizeClass(["va-time-picker-cell", { "va-time-picker-cell--active": index === _ctx.$props.activeItemIndex }]),
                onClick: ($event) => onCellClick(index)
              }, [
                renderSlot(_ctx.$slots, "cell", normalizeProps(guardReactiveProps({ item, index, activeItemIndex: __props.activeItemIndex, items: __props.items, formattedItem: formatCell(item) })), () => [
                  createTextVNode(toDisplayString(formatCell(item)), 1)
                ])
              ], 10, _hoisted_166)
            ]),
            _: 2
          }, 1032, ["onScrollPassive", "onTouchmovePassive", "onMousewheelPassive"]);
        }), 128))
      ], 544);
    };
  }
});

// node_modules/vuestic-ui/dist/es/src/components/va-time-picker/components/VaTimePickerColumn/index.js
var VaTimePickerColumn = withConfigTransport$1(_sfc_main109);

// node_modules/vuestic-ui/dist/es/src/composables/useCSSVariables.js
var useCSSVariables = (prefix2, cb) => {
  return computed(() => Object.entries(cb()).reduce((acc, [key, value]) => {
    acc[`--${prefix2}-${camelCaseToKebabCase(key)}`] = value;
    return acc;
  }, {}));
};

// node_modules/vuestic-ui/dist/es/src/components/va-time-picker/VaTimePicker.vue_vue_type_script_setup_true_lang.js
import "D:/Github/DONGTIAN/ui/node_modules/vuestic-ui/dist/es/VaTimePicker.css";
var _sfc_main110 = defineComponent({
  ...{
    name: "VaTimePicker"
  },
  __name: "VaTimePicker",
  props: {
    ...useStatefulProps,
    ...useFormFieldProps,
    ...useComponentPresetProp,
    modelValue: { type: Date, required: false },
    ampm: { type: Boolean, default: false },
    hidePeriodSwitch: { type: Boolean, default: false },
    periodUpdatesModelValue: { type: Boolean, default: true },
    // Update model value when switching period automatically
    view: { type: String, default: "minutes" },
    hoursFilter: { type: Function },
    minutesFilter: { type: Function },
    secondsFilter: { type: Function },
    framed: { type: Boolean, default: false },
    cellHeight: { type: [Number, String], default: 30 },
    visibleCellsCount: { type: [Number, String], default: 7 }
  },
  emits: [...useStatefulEmits],
  setup(__props, { expose: __expose, emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const { valueComputed } = useStateful(props, emit);
    const { columns, isPM } = useTimePicker(props, valueComputed);
    const cellHeightComputed = useNumericProp("cellHeight");
    const visibleCellsCountComputed = useNumericProp("visibleCellsCount");
    const { setItemRef, itemRefs: pickers } = useArrayRefs();
    const activeColumnIndex = ref();
    const focus = (idx = 0) => {
      var _a2;
      (_a2 = pickers.value[idx]) == null ? void 0 : _a2.focus();
    };
    const blur = (idx) => {
      var _a2;
      idx ? (_a2 = pickers.value[idx]) == null ? void 0 : _a2.blur() : pickers.value.forEach((el) => el == null ? void 0 : el.blur());
    };
    const { computedClasses: computedFormClasses } = useFormField("va-time-picker", props);
    const focusNext = () => {
      const nextIndex = ((activeColumnIndex == null ? void 0 : activeColumnIndex.value) || 0) + 1;
      activeColumnIndex.value = nextIndex % columns.value.length;
      focus(activeColumnIndex.value);
    };
    const focusPrev = () => {
      const nextIndex = ((activeColumnIndex == null ? void 0 : activeColumnIndex.value) || 0) - 1 + columns.value.length;
      activeColumnIndex.value = nextIndex % columns.value.length;
      focus(activeColumnIndex.value);
    };
    const computedClasses = computed(() => ({
      ...computedFormClasses,
      "va-time-picker--framed": props.framed
    }));
    const computedStyles = useCSSVariables("va-time-picker", () => {
      const gapHeight = (visibleCellsCountComputed.value - 1) / 2 * cellHeightComputed.value;
      return {
        height: `${cellHeightComputed.value * visibleCellsCountComputed.value}px`,
        "cell-height": `${cellHeightComputed.value}px`,
        "column-gap-height": `${gapHeight}px`
      };
    });
    __expose({
      focus,
      blur,
      focusNext,
      focusPrev
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: normalizeClass(["va-time-picker", computedClasses.value]),
        style: normalizeStyle(unref(computedStyles))
      }, [
        (openBlock(true), createElementBlock(Fragment, null, renderList(unref(columns), (column, idx) => {
          return openBlock(), createBlock(unref(VaTimePickerColumn), {
            key: idx,
            ref_for: true,
            ref: unref(setItemRef),
            items: column.items,
            tabindex: _ctx.disabled ? -1 : 0,
            "cell-height": unref(cellHeightComputed),
            activeItemIndex: column.activeItem.value,
            "onUpdate:activeItemIndex": ($event) => column.activeItem.value = $event,
            onKeydown: [
              _cache[0] || (_cache[0] = withKeys(withModifiers(($event) => focusNext(), ["stop", "prevent"]), ["right"])),
              _cache[1] || (_cache[1] = withKeys(withModifiers(($event) => focusNext(), ["exact", "stop", "prevent"]), ["tab"])),
              _cache[2] || (_cache[2] = withKeys(withModifiers(($event) => focusPrev(), ["stop", "prevent"]), ["left"])),
              _cache[3] || (_cache[3] = withKeys(withModifiers(($event) => focusPrev(), ["shift", "stop", "prevent"]), ["tab"]))
            ],
            onFocus: ($event) => activeColumnIndex.value = idx
          }, null, 8, ["items", "tabindex", "cell-height", "activeItemIndex", "onUpdate:activeItemIndex", "onFocus"]);
        }), 128))
      ], 6);
    };
  }
});

// node_modules/vuestic-ui/dist/es/src/composables/useLongPresKey.js
function useLongPressKey(el, options) {
  let timeoutId = -1;
  let intervalId = -1;
  const handleMouseDown = (e) => {
    var _a2;
    (_a2 = options.onStart) == null ? void 0 : _a2.call(options, e);
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      intervalId = setInterval(() => {
        var _a22;
        return (_a22 = options.onUpdate) == null ? void 0 : _a22.call(options, e);
      }, options.interval || 100);
    }, unref(options.delay) || 500);
  };
  const handleMouseUp = (e) => {
    var _a2;
    clearTimeout(timeoutId);
    clearInterval(intervalId);
    (_a2 = options.onEnd) == null ? void 0 : _a2.call(options, e);
  };
  const htmlElement = useHTMLElement(el);
  useEvent(["keydown"], handleMouseDown, htmlElement);
  useEvent([
    "keyup",
    "blur"
  ], handleMouseUp, true);
}

// node_modules/vuestic-ui/dist/es/src/components/va-time-input/VaTimeInput.vue_vue_type_script_setup_true_lang.js
var VaInputWrapperProps4 = extractComponentProps(VaInputWrapper, ["focused", "maxLength", "counterValue"]);
var _sfc_main111 = defineComponent({
  ...{
    name: "VaTimeInput",
    inheritAttrs: false
  },
  __name: "VaTimeInput",
  props: {
    ...VaInputWrapperProps4,
    ...useDropdownableProps,
    ...useComponentPresetProp,
    ...useClearableProps,
    ...extractComponentProps(_sfc_main110),
    ...useValidationProps,
    ...useStatefulProps,
    closeOnContentClick: { type: Boolean, default: false },
    offset: { ...useDropdownableProps.offset, default: () => [2, 0] },
    placement: { ...useDropdownableProps.placement, default: "bottom-end" },
    modelValue: { type: Date, default: void 0 },
    clearValue: { type: Date, default: null },
    format: { type: Function },
    parse: { type: Function },
    manualInput: { type: Boolean, default: false },
    leftIcon: { type: Boolean, default: false },
    icon: { type: String, default: "schedule" },
    ariaLabel: useTranslationProp("$t:selectedTime"),
    ariaResetLabel: useTranslationProp("$t:resetTime"),
    ariaToggleDropdownLabel: useTranslationProp("$t:toggleDropdown")
  },
  emits: [
    ...useFocusEmits,
    ...useValidationEmits,
    ...useClearableEmits,
    ...useStatefulEmits,
    ...useDropdownableEmits,
    "update:modelValue"
  ],
  setup(__props, { expose: __expose, emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const input = shallowRef();
    const timePicker = shallowRef();
    const { isOpenSync, dropdownProps } = useDropdownable(props, emit, {
      defaultCloseOnValueUpdate: computed(() => Array.isArray(props.view) && props.view.length === 1)
    });
    const { valueComputed } = useStateful(props, emit);
    const { parse: parse2, isValid } = useTimeParser(props);
    const { format } = useTimeFormatter(props);
    const valueText = computed(() => format(valueComputed.value || props.clearValue));
    const doShowDropdown = computed({
      get() {
        if (props.disabled || props.readonly) {
          return false;
        }
        return isOpenSync.value;
      },
      set(v) {
        isOpenSync.value = v;
        if (v) {
          nextTick(() => {
            var _a2;
            return (_a2 = timePicker.value) == null ? void 0 : _a2.focus();
          });
        } else {
          nextTick(() => {
            var _a2;
            return (_a2 = input.value) == null ? void 0 : _a2.focus();
          });
        }
      }
    });
    const { isFocused, focus, blur, onFocus: focusListener, onBlur: blurListener } = useFocus(input);
    const onInputTextChanged = (e) => {
      var _a2;
      if (props.disabled) {
        return;
      }
      const val = (_a2 = e.target) == null ? void 0 : _a2.value;
      if (!val) {
        return reset();
      }
      const v = parse2(val);
      if (isValid.value && v) {
        valueComputed.value = v;
      } else {
        valueComputed.value = void 0;
        isValid.value = true;
      }
    };
    const reset = () => withoutValidation(() => {
      emit("update:modelValue", props.clearValue);
      emit("clear");
      resetValidation();
      hideDropdown();
    });
    const {
      computedError,
      computedErrorMessages,
      listeners,
      validationAriaAttributes,
      withoutValidation,
      resetValidation,
      isDirty,
      isTouched
    } = useValidation(props, emit, { reset, focus, value: valueComputed });
    watch(doShowDropdown, (v) => {
      if (!v) {
        isTouched.value = true;
      }
    });
    const {
      canBeCleared,
      clearIconProps,
      onFocus,
      onBlur
    } = useClearable(props, valueText);
    const canBeClearedComputed = computed(() => canBeCleared.value && valueText.value !== format(props.clearValue));
    const filteredWrapperProps = filterComponentProps(VaInputWrapperProps4);
    const computedInputWrapperProps = computed(() => ({
      ...filteredWrapperProps.value,
      focused: isFocused.value,
      error: computedError.value,
      errorMessages: computedErrorMessages.value,
      readonly: props.readonly || !props.manualInput,
      modelValue: valueText.value
    }));
    const viewToNumber = {
      seconds: 1e3,
      minutes: 1e3 * 60,
      hours: 1e3 * 60 * 60
    };
    const onKeyPress = (e) => {
      if (!("key" in e)) {
        return;
      }
      if (e.key === "ArrowDown") {
        valueComputed.value = new Date(Number(valueComputed.value) - viewToNumber[props.view]);
        e.preventDefault();
      }
      if (e.key === "ArrowUp") {
        valueComputed.value = new Date(Number(valueComputed.value) + viewToNumber[props.view]);
        e.preventDefault();
      }
    };
    useLongPressKey(input, {
      onStart: onKeyPress,
      onUpdate: onKeyPress
    });
    const computedInputListeners = {
      onFocus: () => {
        if (props.disabled) {
          return;
        }
        focusListener();
        if (props.readonly) {
          return;
        }
        onFocus();
      },
      onBlur: () => {
        if (props.disabled) {
          return;
        }
        blurListener();
        if (props.readonly) {
          return;
        }
        onBlur();
        listeners.onBlur();
      }
    };
    const slots = useSlots();
    const filteredSlots = computed(() => {
      const slotsWithIcons = [
        props.leftIcon && "prependInner",
        (!props.leftIcon || props.clearable) && "icon"
      ];
      return Object.keys(slots).filter((slot) => !slotsWithIcons.includes(slot));
    });
    const hideDropdown = () => {
      doShowDropdown.value = false;
    };
    const showDropdown = (event, cancel, prevent) => {
      doShowDropdown.value = true;
    };
    const checkProhibitedDropdownOpening = (e) => {
      if (isOpenSync.value) {
        return false;
      }
      if (props.disabled || props.readonly) {
        return true;
      }
      if (e === void 0) {
        return false;
      }
      return props.manualInput && (e == null ? void 0 : e.code) !== "Space";
    };
    const toggleDropdown = (event) => {
      if (checkProhibitedDropdownOpening(event instanceof KeyboardEvent ? event : void 0)) {
        return;
      }
      doShowDropdown.value = !doShowDropdown.value;
    };
    const cursorStyleComputed = computed(() => {
      if (props.disabled) {
        return {};
      }
      if (props.manualInput) {
        return { cursor: "text" };
      }
      return { cursor: "pointer" };
    });
    const iconTabindexComputed = computed(() => {
      if (!props.manualInput) {
        return -1;
      }
      return props.disabled || props.readonly ? -1 : 0;
    });
    const iconProps = computed(() => ({
      role: "button",
      "aria-hidden": false,
      name: props.icon,
      color: "secondary",
      tabindex: iconTabindexComputed.value
    }));
    const { tp } = useTranslation();
    useAttrs();
    const dropdownPropsComputed = computed(() => ({
      ...dropdownProps.value,
      innerAnchorSelector: ".va-input-wrapper__field",
      trigger: ["click", "right-click", "space", "enter"]
    }));
    const timePickerProps = filterComponentProps(extractComponentProps(_sfc_main110));
    __expose({
      isFocused,
      isValid,
      value: valueComputed,
      isDirty,
      isTouched,
      focus,
      blur,
      reset,
      withoutValidation,
      resetValidation,
      toggleDropdown,
      showDropdown,
      hideDropdown
    });
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(VaDropdown), mergeProps({
        modelValue: doShowDropdown.value,
        "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => doShowDropdown.value = $event),
        class: ["va-time-input", _ctx.$attrs.class],
        style: _ctx.$attrs.style
      }, dropdownPropsComputed.value), {
        anchor: withCtx(() => [
          createVNode(unref(VaInputWrapper), mergeProps({
            class: "va-time-input__anchor",
            ref_key: "input",
            ref: input,
            style: cursorStyleComputed.value
          }, { ...computedInputWrapperProps.value, ...unref(validationAriaAttributes), ...computedInputListeners }, { onChange: onInputTextChanged }), createSlots({
            icon: withCtx(() => [
              canBeClearedComputed.value ? (openBlock(), createBlock(unref(VaIcon), mergeProps({
                key: 0,
                class: "va-time-input__clear-button"
              }, { ...iconProps.value, ...unref(clearIconProps) }, {
                "aria-label": unref(tp)(_ctx.$props.ariaResetLabel),
                onClick: withModifiers(reset, ["stop"]),
                onKeydown: [
                  withKeys(withModifiers(reset, ["stop"]), ["enter"]),
                  withKeys(withModifiers(reset, ["stop"]), ["space"])
                ]
              }), null, 16, ["aria-label", "onKeydown"])) : createCommentVNode("", true),
              !_ctx.$props.leftIcon && _ctx.$props.icon ? (openBlock(), createBlock(unref(VaIcon), mergeProps({
                key: 1,
                class: "va-time-input__right-button va-time-input__side-button",
                "aria-label": unref(tp)(_ctx.$props.ariaToggleDropdownLabel)
              }, iconProps.value), null, 16, ["aria-label"])) : createCommentVNode("", true)
            ]),
            _: 2
          }, [
            renderList(filteredSlots.value, (name) => {
              return {
                name,
                fn: withCtx((slotScope) => [
                  renderSlot(_ctx.$slots, name, normalizeProps(guardReactiveProps({ ...slotScope, toggleDropdown, showDropdown, hideDropdown, isOpen: unref(isOpenSync), focus: unref(focus) })))
                ])
              };
            }),
            _ctx.$slots.prependInner || _ctx.$props.leftIcon ? {
              name: "prependInner",
              fn: withCtx((slotScope) => [
                renderSlot(_ctx.$slots, "prependInner", normalizeProps(guardReactiveProps({ ...slotScope, toggleDropdown, showDropdown, hideDropdown, isOpen: unref(isOpenSync), focus: unref(focus) }))),
                _ctx.$props.leftIcon ? (openBlock(), createBlock(unref(VaIcon), mergeProps({
                  key: 0,
                  class: "va-time-input__left-button va-time-input__side-button",
                  "aria-label": unref(tp)(_ctx.$props.ariaToggleDropdownLabel)
                }, iconProps.value), null, 16, ["aria-label"])) : createCommentVNode("", true)
              ]),
              key: "0"
            } : void 0
          ]), 1040, ["style"])
        ]),
        default: withCtx(() => [
          createVNode(unref(VaDropdownContent), {
            "no-padding": "",
            onKeydown: [
              withKeys(withModifiers(hideDropdown, ["prevent"]), ["esc"]),
              withKeys(withModifiers(hideDropdown, ["prevent"]), ["enter"])
            ]
          }, {
            default: withCtx(() => [
              createVNode(_sfc_main110, mergeProps({
                ref_key: "timePicker",
                ref: timePicker
              }, unref(timePickerProps), {
                modelValue: unref(valueComputed),
                "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => isRef(valueComputed) ? valueComputed.value = $event : null)
              }), null, 16, ["modelValue"])
            ]),
            _: 1
          }, 8, ["onKeydown"])
        ]),
        _: 3
      }, 16, ["modelValue", "class", "style"]);
    };
  }
});

// node_modules/vuestic-ui/dist/es/src/components/va-time-input/index.js
var VaTimeInput = withConfigTransport$1(_sfc_main111);

// node_modules/vuestic-ui/dist/es/src/components/va-timeline/VaTimeline.js
import "D:/Github/DONGTIAN/ui/node_modules/vuestic-ui/dist/es/VaTimeline.css";
var getPropsData = (slot) => slot == null ? void 0 : slot.props;
var getIsActive = (slot) => {
  var _a2;
  return !!((_a2 = slot == null ? void 0 : slot.props) == null ? void 0 : _a2.active) || false;
};
var isVueFragment = (slot) => slot.type === Fragment;
var isEmptyArray = (arr) => arr && arr.length === 0;
function getSlots(slots) {
  var _a2;
  const defaultSlots = (_a2 = slots.default) == null ? void 0 : _a2.call(slots);
  if (!defaultSlots || isEmptyArray(defaultSlots)) {
    return [];
  }
  if (isVueFragment(defaultSlots[0])) {
    return defaultSlots[0].children;
  }
  return defaultSlots;
}
var processSlots = (context) => {
  const slots = getSlots(context.slots);
  slots.forEach((slot, index) => {
    if (!getPropsData(slot)) {
      slot.props = {};
    }
    const propsData = getPropsData(slot);
    propsData.vertical = context.props.vertical;
    if (context.props.centered) {
      propsData.inverted = !!(index % 2);
    }
    if (index === 0) {
      propsData.isFirst = true;
    }
    if (index === slots.length - 1) {
      propsData.isLast = true;
    }
    const currentSlotActive = propsData.active;
    if (!currentSlotActive) {
      return;
    }
    if (index === 0) {
      propsData.activePrevious = currentSlotActive;
    }
    if (index === slots.length - 1) {
      propsData.activeNext = currentSlotActive;
    }
    const previousSlotActive = getIsActive(slots[index - 1]);
    if (previousSlotActive) {
      propsData.activePrevious = true;
    }
    const nextSlotActive = getIsActive(slots[index + 1]);
    if (nextSlotActive) {
      propsData.activeNext = true;
    }
  });
  return slots;
};
var COMPONENT_NAME = "va-timeline";
var _sfc_main112 = {
  name: COMPONENT_NAME,
  props: {
    ...useComponentPresetProp,
    vertical: { type: Boolean },
    centered: { type: Boolean },
    alignTop: { type: Boolean }
  },
  setup(props, { slots }) {
    return () => h(
      "div",
      {
        class: {
          [COMPONENT_NAME]: true,
          [`${COMPONENT_NAME}--vertical`]: props.vertical,
          [`${COMPONENT_NAME}--align-top`]: props.alignTop
        }
      },
      processSlots({ props, slots })
    );
  }
};

// node_modules/vuestic-ui/dist/es/src/components/va-timeline/index.js
var VaTimeline = withConfigTransport$1(_sfc_main112);

// node_modules/vuestic-ui/dist/es/src/components/va-timeline/VaTimelineSeparator/VaTimelineSeparator.vue_vue_type_script_lang.js
import "D:/Github/DONGTIAN/ui/node_modules/vuestic-ui/dist/es/VaTimelineSeparator.css";
var componentName = "va-timeline-separator";
var _sfc_main113 = defineComponent({
  name: componentName,
  props: {
    ...useComponentPresetProp,
    color: { type: String, default: "primary" },
    vertical: { type: Boolean },
    active: { type: Boolean },
    activePrevious: { type: Boolean },
    activeNext: { type: Boolean }
  },
  setup(props) {
    const { getColor } = useColors();
    return () => h(
      "div",
      {
        class: {
          [componentName]: true,
          [`${componentName}--vertical`]: props.vertical
        }
      },
      [
        h("div", {
          class: {
            [`${componentName}__line`]: true,
            [`${componentName}__line--active`]: props.activePrevious
          },
          style: {
            backgroundColor: getColor(props.activePrevious ? props.color : "divider")
          }
        }),
        h("div", {
          class: {
            [`${componentName}__center`]: true,
            [`${componentName}__center--active`]: props.active
          },
          style: {
            backgroundColor: getColor(props.active ? props.color : "divider")
          }
        }),
        h("div", {
          class: {
            [`${componentName}__line`]: true,
            [`${componentName}__line--active`]: props.activeNext
          },
          style: {
            backgroundColor: getColor(props.activeNext ? props.color : "divider")
          }
        })
      ]
    );
  }
});

// node_modules/vuestic-ui/dist/es/src/components/va-timeline/VaTimelineSeparator/index.js
var VaTimelineSeparator = withConfigTransport$1(_sfc_main113);

// node_modules/vuestic-ui/dist/es/src/components/va-timeline/VaTimelineItem/VaTimelineItem.vue_vue_type_script_lang.js
import "D:/Github/DONGTIAN/ui/node_modules/vuestic-ui/dist/es/VaTimelineItem.css";
var COMPONENT_NAME2 = "va-timeline-item";
var VaTimelineSeparatorProps = extractComponentProps(VaTimelineSeparator);
var _sfc_main114 = defineComponent({
  name: COMPONENT_NAME2,
  props: {
    ...useComponentPresetProp,
    ...VaTimelineSeparatorProps,
    color: { type: String, default: "primary" },
    isFirst: { type: Boolean },
    isLast: { type: Boolean },
    inverted: { type: Boolean }
  },
  setup(props, { slots }) {
    const children = [
      h(
        VaTimelineSeparator,
        { ...filterComponentProps(VaTimelineSeparatorProps).value }
      )
    ];
    const before = props.inverted ? slots.after : slots.before;
    if (before) {
      children.unshift(
        h(
          "div",
          { class: `${COMPONENT_NAME2}__before` },
          before()
        )
      );
    }
    const after = props.inverted ? slots.before : slots.after;
    if (after) {
      children.push(
        h(
          "div",
          { class: `${COMPONENT_NAME2}__after` },
          after()
        )
      );
    }
    return () => h(
      "div",
      {
        class: [
          { [COMPONENT_NAME2]: true },
          { [`${COMPONENT_NAME2}--vertical`]: props.vertical },
          { [`${COMPONENT_NAME2}--is-first`]: props.isFirst },
          { [`${COMPONENT_NAME2}--is-last`]: props.isLast }
        ]
      },
      children
    );
  }
});

// node_modules/vuestic-ui/dist/es/src/components/va-timeline/VaTimelineItem/index.js
var VaTimelineItem = withConfigTransport$1(_sfc_main114);

// node_modules/vuestic-ui/dist/es/src/components/va-time-picker/index.js
var VaTimePicker = withConfigTransport$1(_sfc_main110);

// node_modules/vuestic-ui/dist/es/src/components/va-tree-view/hooks/useTreeHelpers.js
var useTreeViewProps = {
  nodes: {
    type: Array,
    default: []
  },
  stateful: {
    type: Boolean,
    default: true
  },
  selectable: {
    type: Boolean,
    default: false
  },
  selectionType: {
    type: String,
    default: "leaf",
    validator: (v) => ["leaf", "independent"].includes(v)
  },
  valueBy: {
    type: [String, Function],
    default: "id"
  },
  textBy: {
    type: [String, Function],
    default: "label"
  },
  trackBy: {
    type: [String, Function],
    default: "id"
  },
  iconBy: {
    type: [String, Function],
    default: "icon"
  },
  disabledBy: {
    type: [String, Function],
    default: "disabled"
  },
  expandedBy: {
    type: [String, Function],
    default: "expanded"
  },
  checkedBy: {
    type: [String, Function],
    default: "checked"
  },
  childrenBy: {
    type: [String, Function],
    default: "children"
  },
  expandAll: {
    type: Boolean,
    default: false
  },
  expanded: {
    type: Array,
    default: []
  },
  expandNodeBy: {
    type: String,
    default: "leaf"
  },
  filter: {
    type: String,
    default: ""
  },
  filterMethod: {
    type: Function,
    default: void 0
  },
  checked: {
    type: Array,
    default: []
  },
  color: {
    type: String,
    default: "primary"
  }
};
var useTreeViewEmits = ["update:modelValue", "update:checked", "update:expanded", "update:selected"];
var useTreeHelpers = (props) => {
  const isStringOrNumber = (node) => {
    const typeOfNode = typeof node;
    return typeOfNode === "string" || typeOfNode === "number";
  };
  const getNodeProperty = (node, key) => !key || isStringOrNumber(node) ? node : getValueByKey(node, key);
  const getValue = (node) => getNodeProperty(node, props.valueBy);
  const getNodeByValue = (value) => {
    if (!props.valueBy) {
      return value;
    }
    return props.nodes.find((node) => value === getValue(node)) || value;
  };
  const getText = (node) => getNodeProperty(node, props.textBy);
  const getChecked = (node) => getNodeProperty(node, props.checkedBy);
  const getDisabled = (node) => getNodeProperty(node, props.disabledBy);
  const getExpanded = (node) => getNodeProperty(node, props.expandedBy);
  const getTrackBy = (node) => getNodeProperty(node, props.trackBy);
  const getChildren = (node) => getNodeProperty(node, props.childrenBy) ?? [];
  const iterateNodes = (nodes, cb) => {
    nodes.forEach((node) => {
      const children = node.children || [];
      if (children.length) {
        iterateNodes(children, cb);
      }
      cb(node);
    });
  };
  return {
    getText,
    getValue,
    getChecked,
    getTrackBy,
    getChildren,
    getDisabled,
    getExpanded,
    iterateNodes,
    getNodeByValue,
    getNodeProperty
  };
};

// node_modules/vuestic-ui/dist/es/src/components/va-tree-view/types.js
var TreeViewKey = Symbol("TreeView");

// node_modules/vuestic-ui/dist/es/src/components/va-tree-view/hooks/useTreeKeyboardNavigation.js
var useTreeKeyboardNavigation = (props, methods) => {
  const { emit, toggleNode, toggleCheckbox } = methods;
  const isElementExpanded = (currentElement) => (currentElement == null ? void 0 : currentElement.getAttribute("aria-expanded")) === "true";
  const getParentElement = (currentElement) => {
    var _a2;
    return ((_a2 = currentElement == null ? void 0 : currentElement.parentElement) == null ? void 0 : _a2.closest(".va-tree-node")) || null;
  };
  const getPreviousElement = (currentElement) => currentElement == null ? void 0 : currentElement.previousElementSibling;
  const findPreviousElement = (currentElement) => {
    if (!currentElement) {
      return null;
    }
    let previousElement = getPreviousElement(currentElement);
    let lastChildElement = isElementExpanded(previousElement) && getLastChildElement(previousElement);
    if (lastChildElement) {
      do {
        if (isElementExpanded(lastChildElement)) {
          lastChildElement = getLastChildElement(lastChildElement);
          if (lastChildElement) {
            continue;
          } else {
            break;
          }
        } else {
          previousElement = lastChildElement;
          break;
        }
      } while (true);
    }
    if (!previousElement) {
      return getParentElement(currentElement);
    }
    return previousElement;
  };
  const getNextElement = (currentElement) => currentElement == null ? void 0 : currentElement.nextElementSibling;
  const findNextElement = (currentElement) => {
    if (!currentElement) {
      return null;
    }
    let nextElement = getNextElement(currentElement);
    const isCurrentExpanded = isElementExpanded(currentElement);
    if (!nextElement) {
      let parentElement = getParentElement(currentElement);
      do {
        if (!getNextElement(parentElement)) {
          parentElement = getParentElement(parentElement);
          if (!parentElement) {
            break;
          } else {
            continue;
          }
        } else {
          nextElement = getNextElement(parentElement);
          break;
        }
      } while (true);
    }
    if (isCurrentExpanded) {
      return getFirstChildElement(currentElement);
    }
    return nextElement;
  };
  const getFirstChildElement = (currentElement) => {
    var _a2;
    return ((_a2 = currentElement == null ? void 0 : currentElement.querySelector(".va-tree-node-children")) == null ? void 0 : _a2.firstElementChild) || null;
  };
  const getLastChildElement = (currentElement) => {
    var _a2;
    return ((_a2 = currentElement == null ? void 0 : currentElement.querySelector(".va-tree-node-children")) == null ? void 0 : _a2.lastElementChild) || null;
  };
  const onHorizontalMove = (currentElement, dir, node) => {
    var _a2, _b;
    const isCurrentElementExpanded = isElementExpanded(currentElement);
    if (dir === "left") {
      if (isCurrentElementExpanded) {
        toggleNode(node);
      } else {
        (_a2 = getParentElement(currentElement)) == null ? void 0 : _a2.focus();
      }
    } else {
      if (!isCurrentElementExpanded) {
        toggleNode(node);
      } else {
        (_b = getFirstChildElement(currentElement)) == null ? void 0 : _b.focus();
      }
    }
  };
  const onVerticalMove = (currentElement, dir) => {
    var _a2, _b;
    if (dir === "up") {
      (_a2 = findPreviousElement(currentElement)) == null ? void 0 : _a2.focus();
    } else {
      (_b = findNextElement(currentElement)) == null ? void 0 : _b.focus();
    }
  };
  const handleKeyboardNavigation = (event, node) => {
    const currentElement = event.target;
    switch (event.code) {
      case "ArrowUp":
        onVerticalMove(currentElement, "up");
        break;
      case "ArrowRight":
        onHorizontalMove(currentElement, "right", node);
        break;
      case "ArrowDown":
        onVerticalMove(currentElement, "down");
        break;
      case "ArrowLeft":
        onHorizontalMove(currentElement, "left", node);
        break;
      case "Space":
        if (props.selectable) {
          const state = typeof node.checked !== "undefined" ? !node.checked : null;
          toggleCheckbox(node, state);
        } else {
          emit("update:selected", node);
        }
        break;
      case "Escape":
        if (!props.selectable) {
          emit("update:selected", null);
        }
        currentElement.blur();
        break;
      default:
        currentElement.blur();
    }
  };
  return { handleKeyboardNavigation };
};
var useTreeKeyboardNavigation$1 = useTreeKeyboardNavigation;

// node_modules/vuestic-ui/dist/es/src/components/va-tree-view/hooks/useTreeView.js
var useTreeView = (props, emit) => {
  const { getColor } = useColors();
  const colorComputed = computed(() => getColor(props.color));
  const isLeafSelectionComputed = computed(() => props.selectionType === "leaf");
  const {
    getText,
    getValue,
    getChecked,
    getTrackBy,
    getChildren,
    getDisabled,
    getExpanded,
    iterateNodes,
    getNodeProperty
  } = useTreeHelpers(props);
  const { nodes, expandAll, filter, filterMethod, textBy } = toRefs(props);
  const { valueComputed: expandedList } = useStateful(props, emit, "expanded");
  const { valueComputed: checkedList } = useStateful(props, emit, "checked");
  const selectedNode = ref();
  const selectedNodeComputed = computed({
    get: () => selectedNode.value,
    set: (node) => {
      const value = getValue(node);
      if (selectedNode.value !== value) {
        selectedNode.value = value;
        emit("update:selected", node);
      }
    }
  });
  const updateModel = (model, values, state) => {
    if (state) {
      model.value = model.value.concat(values).filter((value, idx, self) => self.indexOf(value) === idx);
    } else {
      model.value = model.value.filter((v) => !values.includes(v));
    }
  };
  const toggleCheckbox = (node, state) => {
    let stateValue = state === null ? true : state;
    if (state && node.indeterminate) {
      stateValue = false;
    }
    const values = [getValue(node)];
    if (isLeafSelectionComputed.value && node.hasChildren) {
      const toggleChildren = (nodes2) => {
        nodes2.forEach((node2) => {
          if (node2.disabled) {
            return;
          }
          const children = getChildren(node2);
          if (children.length) {
            toggleChildren(children);
          }
          values.push(getValue(node2));
        });
      };
      toggleChildren(getChildren(node));
    }
    updateModel(checkedList, values, stateValue);
  };
  const toggleNode = (node) => {
    if (node.hasChildren) {
      updateModel(expandedList, [getValue(node)], !node.expanded);
    }
  };
  const createNode = ({ node, level, children = [], computedFilterMethod: computedFilterMethod2 }) => {
    var _a2;
    const valueBy = getValue(node);
    let matchesFilter = true;
    const hasChildren = !!children.length;
    const disabled = getDisabled(node) || false;
    let indeterminate = false;
    let checked = checkedList.value.includes(valueBy) || false;
    if (isLeafSelectionComputed.value && hasChildren) {
      const isAllChildrenChecked = children.every((c) => c.checked);
      checked = isAllChildrenChecked;
      indeterminate = !isAllChildrenChecked && children.some((c) => c.indeterminate || c.checked);
      if (indeterminate) {
        checked = null;
      }
    }
    if (filter.value) {
      matchesFilter = (children == null ? void 0 : children.some((c) => c.matchesFilter)) || ((_a2 = computedFilterMethod2.value) == null ? void 0 : _a2.call(computedFilterMethod2, node, filter.value, textBy.value));
    }
    return {
      ...node,
      level,
      checked,
      children,
      disabled,
      expanded: expandedList.value.includes(valueBy) || false,
      hasChildren,
      matchesFilter,
      indeterminate
    };
  };
  const computedFilterMethod = computed(() => {
    if (filterMethod == null ? void 0 : filterMethod.value) {
      return filterMethod.value;
    }
    return (node, filter2) => getText(node).toLowerCase().includes(filter2.toLowerCase());
  });
  const buildTree = (nodes2, level = 0) => nodes2.map((node) => {
    const treeItemChildren = getChildren(node);
    if (treeItemChildren.length) {
      const children = buildTree(treeItemChildren, level + 1);
      return createNode({ node, level, children, computedFilterMethod });
    }
    return createNode({ node, level, computedFilterMethod });
  });
  const getFilteredNodes = (nodes2) => nodes2.filter((node) => {
    if (node.children) {
      node.children = getFilteredNodes(node.children);
    }
    if (node.children.length === 0) {
      node.hasChildren = false;
    }
    return node.matchesFilter;
  });
  const { handleKeyboardNavigation } = useTreeKeyboardNavigation$1(props, { emit, toggleCheckbox, toggleNode });
  provide(TreeViewKey, {
    selectedNodeComputed,
    colorComputed,
    iconBy: props.iconBy,
    selectable: props.selectable,
    expandNodeBy: props.expandNodeBy,
    getText,
    getValue,
    getTrackBy,
    toggleNode,
    toggleCheckbox,
    getNodeProperty,
    handleKeyboardNavigation
  });
  const treeItems = computed(() => buildTree(nodes.value));
  const checkForInitialValues = () => {
    const expandedValues = [];
    const checkedValues = [];
    iterateNodes(nodes.value, (node) => {
      if (expandAll.value) {
        expandedValues.push(getValue(node));
      } else {
        getExpanded(node) && expandedValues.push(getValue(node));
      }
      if (getChecked(node)) {
        checkedValues.push(getValue(node));
      }
    });
    if (expandedValues.length) {
      updateModel(expandedList, expandedValues, true);
    }
    if (checkedValues.length) {
      updateModel(checkedList, checkedValues, true);
    }
  };
  checkForInitialValues();
  return {
    treeItems: computed(() => getFilteredNodes(treeItems.value)),
    getText,
    getTrackBy,
    toggleCheckbox
  };
};
var useTreeView$1 = useTreeView;

// node_modules/vuestic-ui/dist/es/src/components/va-tree-view/components/VaTreeNode/VaTreeNode.vue_vue_type_script_setup_true_lang.js
import "D:/Github/DONGTIAN/ui/node_modules/vuestic-ui/dist/es/VaTreeNode.css";
var _hoisted_167 = ["role", "aria-expanded", "aria-disabled", "aria-checked", "tabindex"];
var _hoisted_233 = { class: "va-tree-node-root" };
var _hoisted_322 = {
  key: 2,
  class: "va-tree-node-content__item"
};
var _hoisted_413 = ["aria-hidden"];
var INJECTION_ERROR_MESSAGE5 = "The VaTreeNode component should be used in the context of VaTreeView component";
var _sfc_main115 = defineComponent({
  ...{
    name: "VaTreeNode"
  },
  __name: "VaTreeNode",
  props: {
    node: {
      type: Object,
      required: true
    }
  },
  setup(__props) {
    const props = __props;
    const {
      iconBy,
      selectable,
      expandNodeBy,
      colorComputed,
      selectedNodeComputed,
      getText,
      getTrackBy,
      toggleNode,
      toggleCheckbox,
      getNodeProperty,
      handleKeyboardNavigation
    } = useStrictInject(TreeViewKey, INJECTION_ERROR_MESSAGE5);
    const labelComputed = computed(() => getText(props.node) || "");
    const isExpandedComputed = computed(() => props.node.hasChildren ? !!props.node.expanded : void 0);
    const iconComputed = computed(() => getNodeProperty(props.node, iconBy));
    const roleComputed = computed(() => props.node.hasChildren ? "group" : "treeitem");
    const treeNodeClassComputed = useBem("va-tree-node", () => ({
      disabled: Boolean(props.node.disabled),
      checked: Boolean(props.node.checked),
      hasChildren: Boolean(props.node.hasChildren),
      [`level-${props.node.level}`]: true,
      [`expand-by-${expandNodeBy}`]: true
    }));
    const expandedClassComputed = useBem("va-tree-node-children", () => ({
      expanded: !!isExpandedComputed.value
    }));
    const indentClassComputed = useBem("va-tree-node-content", () => ({
      indent: props.node.hasChildren === false
    }));
    const cursorClassComputed = useBem("va-tree-node-content", () => ({
      clickable: props.node.hasChildren === true && expandNodeBy === "node"
    }));
    const tabIndexComputed = computed(() => props.node.disabled ? -1 : 0);
    const onNodeClick = (type) => {
      const nodeType = expandNodeBy === "node" && type === "leaf" ? "node" : type;
      if (expandNodeBy === nodeType) {
        toggleNode(props.node);
      }
      selectedNodeComputed.value = props.node;
    };
    return (_ctx, _cache) => {
      const _component_va_tree_node = resolveComponent("va-tree-node", true);
      return openBlock(), createElementBlock("div", {
        class: normalizeClass(["va-tree-node", unref(treeNodeClassComputed)]),
        role: roleComputed.value,
        "aria-expanded": isExpandedComputed.value,
        "aria-disabled": _ctx.$props.node.disabled,
        "aria-checked": !!_ctx.$props.node.checked,
        tabindex: tabIndexComputed.value,
        onKeydown: [
          _cache[4] || (_cache[4] = withKeys(withModifiers(($event) => unref(handleKeyboardNavigation)($event, _ctx.$props.node), ["stop", "prevent"]), ["up"])),
          _cache[5] || (_cache[5] = withKeys(withModifiers(($event) => unref(handleKeyboardNavigation)($event, _ctx.$props.node), ["stop", "prevent"]), ["right"])),
          _cache[6] || (_cache[6] = withKeys(withModifiers(($event) => unref(handleKeyboardNavigation)($event, _ctx.$props.node), ["stop", "prevent"]), ["down"])),
          _cache[7] || (_cache[7] = withKeys(withModifiers(($event) => unref(handleKeyboardNavigation)($event, _ctx.$props.node), ["stop", "prevent"]), ["left"])),
          _cache[8] || (_cache[8] = withKeys(withModifiers(($event) => unref(handleKeyboardNavigation)($event, _ctx.$props.node), ["stop", "prevent"]), ["space"])),
          _cache[9] || (_cache[9] = withKeys(withModifiers(($event) => unref(handleKeyboardNavigation)($event, _ctx.$props.node), ["stop", "prevent"]), ["esc"]))
        ]
      }, [
        createBaseVNode("div", _hoisted_233, [
          createBaseVNode("div", {
            class: normalizeClass(["va-tree-node-content", unref(indentClassComputed)]),
            onClick: _cache[3] || (_cache[3] = ($event) => onNodeClick("node"))
          }, [
            _ctx.$props.node.hasChildren ? (openBlock(), createElementBlock("div", {
              key: 0,
              class: "va-tree-node-content__item va-tree-node-content__item--leaf",
              onClick: _cache[0] || (_cache[0] = withModifiers(($event) => onNodeClick("leaf"), ["stop"]))
            }, [
              renderSlot(_ctx.$slots, "icon-toggle", normalizeProps(guardReactiveProps(_ctx.$props.node)), () => [
                createVNode(unref(VaIcon), {
                  name: isExpandedComputed.value ? "keyboard_arrow_down" : "keyboard_arrow_right",
                  size: "20px"
                }, null, 8, ["name"])
              ])
            ])) : createCommentVNode("", true),
            unref(selectable) ? (openBlock(), createElementBlock("div", {
              key: 1,
              class: "va-tree-node-content__item",
              onClick: _cache[2] || (_cache[2] = withModifiers(() => {
              }, ["stop"]))
            }, [
              renderSlot(_ctx.$slots, "checkbox", normalizeProps(guardReactiveProps(_ctx.$props.node)), () => [
                createVNode(unref(VaCheckbox), {
                  "model-value": _ctx.$props.node.checked,
                  color: unref(colorComputed),
                  indeterminate: "",
                  "onUpdate:modelValue": _cache[1] || (_cache[1] = (v) => unref(toggleCheckbox)(_ctx.$props.node, v)),
                  class: "va-tree-node__checkbox"
                }, null, 8, ["model-value", "color"])
              ])
            ])) : createCommentVNode("", true),
            iconComputed.value ? (openBlock(), createElementBlock("div", _hoisted_322, [
              renderSlot(_ctx.$slots, "icon", normalizeProps(guardReactiveProps(_ctx.$props.node)), () => [
                createVNode(unref(VaIcon), {
                  name: iconComputed.value,
                  size: "small"
                }, null, 8, ["name"])
              ])
            ])) : createCommentVNode("", true),
            createBaseVNode("div", {
              class: normalizeClass(["va-tree-node-content__body", unref(cursorClassComputed)])
            }, [
              renderSlot(_ctx.$slots, "content", normalizeProps(guardReactiveProps(_ctx.$props.node)), () => [
                createTextVNode(toDisplayString(labelComputed.value), 1)
              ])
            ], 2)
          ], 2)
        ]),
        withDirectives(createBaseVNode("div", {
          "aria-hidden": !_ctx.$props.node.expanded,
          class: normalizeClass(["va-tree-node-children", unref(expandedClassComputed)])
        }, [
          (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.$props.node.children, (childNode) => {
            return openBlock(), createBlock(_component_va_tree_node, {
              key: unref(getTrackBy)(childNode),
              node: childNode
            }, createSlots({ _: 2 }, [
              renderList(_ctx.$slots, (_, name) => {
                return {
                  name,
                  fn: withCtx((slotScope) => [
                    renderSlot(_ctx.$slots, name, normalizeProps(guardReactiveProps(slotScope)))
                  ])
                };
              })
            ]), 1032, ["node"]);
          }), 128))
        ], 10, _hoisted_413), [
          [vShow, _ctx.$props.node.hasChildren]
        ])
      ], 42, _hoisted_167);
    };
  }
});

// node_modules/vuestic-ui/dist/es/src/components/va-tree-view/components/VaTreeNode/index.js
var VaTreeNode = withConfigTransport$1(_sfc_main115);

// node_modules/vuestic-ui/dist/es/src/components/va-tree-view/VaTreeView.vue_vue_type_script_setup_true_lang.js
import "D:/Github/DONGTIAN/ui/node_modules/vuestic-ui/dist/es/VaTreeView.css";
var _hoisted_168 = {
  class: "va-tree-view",
  role: "tree"
};
var _sfc_main116 = defineComponent({
  ...{
    name: "VaTreeView"
  },
  __name: "VaTreeView",
  props: { ...useTreeViewProps },
  emits: [...useTreeViewEmits],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const { treeItems, getTrackBy } = useTreeView$1(props, emit);
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_168, [
        _ctx.$props.filter && !unref(treeItems).length ? renderSlot(_ctx.$slots, "not-found", { key: 0 }, () => [
          createTextVNode("No matching nodes found")
        ]) : (openBlock(true), createElementBlock(Fragment, { key: 1 }, renderList(unref(treeItems), (nodeItem) => {
          return openBlock(), createBlock(unref(VaTreeNode), {
            key: unref(getTrackBy)(nodeItem),
            node: nodeItem
          }, createSlots({ _: 2 }, [
            renderList(_ctx.$slots, (_, name) => {
              return {
                name,
                fn: withCtx((slotScope) => [
                  renderSlot(_ctx.$slots, name, normalizeProps(guardReactiveProps(slotScope)))
                ])
              };
            })
          ]), 1032, ["node"]);
        }), 128))
      ]);
    };
  }
});

// node_modules/vuestic-ui/dist/es/src/components/va-tree-view/index.js
var VaTreeView = withConfigTransport$1(_sfc_main116);

// node_modules/vuestic-ui/dist/es/src/components/va-scroll-container/VaScrollContainer.vue_vue_type_script_setup_true_lang.js
import "D:/Github/DONGTIAN/ui/node_modules/vuestic-ui/dist/es/VaScrollContainer.css";
var _hoisted_169 = { class: "va-scroll-container__content" };
var _sfc_main117 = defineComponent({
  ...{
    name: "VaScrollContainer"
  },
  __name: "VaScrollContainer",
  props: {
    ...useSizeProps,
    vertical: { type: Boolean, default: false },
    horizontal: { type: Boolean, default: false },
    color: { type: String, default: "secondary" },
    rtl: { type: Boolean, default: false },
    gradient: { type: Boolean, default: false },
    sizesConfig: {
      type: Object,
      default: () => ({
        defaultSize: 4,
        sizes: { small: 4, medium: 6, large: 8 }
      })
    },
    size: {
      type: String,
      default: "small",
      validator: (v) => ["small", "medium", "large"].includes(v)
    }
  },
  setup(__props) {
    const props = __props;
    const { getColor } = useColors();
    const { sizeComputed } = useSize(props);
    const overflowX = computed(() => props.horizontal ? "auto" : "hidden");
    const overflowY = computed(() => props.vertical ? "auto" : "hidden");
    const scrollColor = computed(() => {
      const color = getColor(props.color);
      return props.gradient ? `linear-gradient(0deg, var(--va-scroll-container-scrollbar-gradient-to) 0%, ${color} 100%)` : color;
    });
    const scrollbarSize = computed(() => sizeComputed.value);
    const scrollbarPosition = computed(() => props.rtl ? "rtl" : "ltr");
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: "va-scroll-container",
        style: normalizeStyle(`--va-scroll-color: ${String(scrollColor.value)};--va-scrollbar-size: ${String(scrollbarSize.value)};--va-overflow-x: ${String(overflowX.value)};--va-overflow-y: ${String(overflowY.value)};--va-scrollbar-position: ${String(scrollbarPosition.value)}`)
      }, [
        createBaseVNode("div", _hoisted_169, [
          renderSlot(_ctx.$slots, "default")
        ])
      ], 4);
    };
  }
});

// node_modules/vuestic-ui/dist/es/src/components/va-scroll-container/index.js
var VaScrollContainer = withConfigTransport$1(_sfc_main117);

// node_modules/vuestic-ui/dist/es/src/components/va-viewer/VaViewer.vue_vue_type_script_setup_true_lang.js
import "D:/Github/DONGTIAN/ui/node_modules/vuestic-ui/dist/es/VaViewer.css";
var _hoisted_170 = { class: "va-viewer-content" };
var _sfc_main118 = defineComponent({
  ...{
    name: "VaViewer",
    inheritAttrs: false
  },
  __name: "VaViewer",
  setup(__props, { expose: __expose }) {
    const content = ref();
    const controls = ref();
    const isMounted = useIsMounted();
    const isClosed = ref(true);
    const isOpened = computed(() => isMounted.value && !isClosed.value);
    const openViewer = () => isClosed.value = false;
    const closeViewer = () => isClosed.value = true;
    const slots = useSlots();
    const handleAnchorClick = () => {
      if (!slots.anchor) {
        openViewer();
      }
    };
    useClickOutside([content, controls], closeViewer);
    const document2 = useDocument();
    const teleportTarget = computed(() => {
      var _a2;
      return (_a2 = document2.value) == null ? void 0 : _a2.body;
    });
    __expose({
      openViewer,
      closeViewer
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock(Fragment, null, [
        createBaseVNode("div", mergeProps({ class: "va-viewer" }, _ctx.$attrs, { onClick: handleAnchorClick }), [
          renderSlot(_ctx.$slots, "anchor", normalizeProps(guardReactiveProps({ openViewer }))),
          !_ctx.$slots.anchor ? renderSlot(_ctx.$slots, "default", { key: 0 }) : createCommentVNode("", true)
        ], 16),
        isOpened.value ? (openBlock(), createBlock(Teleport, {
          key: 0,
          to: teleportTarget.value
        }, [
          createBaseVNode("div", _hoisted_170, [
            createBaseVNode("div", {
              ref_key: "content",
              ref: content,
              class: "va-viewer-content__main-area"
            }, [
              !_ctx.$slots.image ? renderSlot(_ctx.$slots, "default", { key: 0 }) : createCommentVNode("", true),
              renderSlot(_ctx.$slots, "image")
            ], 512),
            createBaseVNode("div", {
              ref_key: "controls",
              ref: controls,
              class: "va-viewer-content__controls-panel"
            }, [
              renderSlot(_ctx.$slots, "controls"),
              renderSlot(_ctx.$slots, "close", normalizeProps(guardReactiveProps({ close: closeViewer })), () => [
                createBaseVNode("button", {
                  class: "va-viewer-content__close-button",
                  onClick: closeViewer
                }, [
                  createVNode(unref(VaIcon), {
                    name: "close",
                    color: "backgroundPrimary"
                  })
                ])
              ])
            ], 512)
          ])
        ], 8, ["to"])) : createCommentVNode("", true)
      ], 64);
    };
  }
});

// node_modules/vuestic-ui/dist/es/src/components/va-viewer/index.js
var VaViewer = withConfigTransport$1(_sfc_main118);

// node_modules/vuestic-ui/dist/es/src/components/va-value/VaValue.vue_vue_type_script_lang.js
var _sfc_main119 = defineComponent({
  name: "VaValue",
  props: {
    defaultValue: { type: null, required: false, default: false }
  },
  setup(props, { slots }) {
    const value = ref(props.defaultValue);
    const slotBind = new Proxy(value, {
      get(target, prop) {
        if (prop === "value") {
          return target.value;
        }
        return target[prop];
      },
      set(target, prop, value2) {
        if (prop === "value") {
          target.value = value2;
        }
        return true;
      }
    });
    return () => {
      return h(Fragment, [renderSlotNodes(slots.default, slotBind)]);
    };
  }
});

// node_modules/vuestic-ui/dist/es/src/components/va-value/index.js
var VaValue = withConfigTransport$1(_sfc_main119);

// node_modules/vuestic-ui/dist/es/src/components/va-textarea/composables/useLineHeight.js
var makeTextElement = (textarea) => {
  const div = document.createElement("div");
  div.style.position = "absolute";
  div.style.top = "0";
  div.style.left = "0";
  div.style.width = "auto";
  const { font } = window.getComputedStyle(textarea);
  div.style.font = font;
  div.textContent = "Vuestic";
  div.style.zIndex = "-1";
  div.style.pointerEvents = "none";
  div.style.opacity = "0";
  div.ariaHidden = "true";
  div.innerText = textarea.value;
  return div;
};
var useTextHeight = (textarea, text) => {
  const textElement = ref();
  const textHeight = ref();
  watch(textarea, (el) => {
    var _a2, _b;
    if (el) {
      textElement.value = makeTextElement(el);
      (_b = (_a2 = textarea.value) == null ? void 0 : _a2.parentElement) == null ? void 0 : _b.appendChild(textElement.value);
    }
  });
  useResizeObserver(textElement, (newElement) => {
    if (!newElement || !textarea.value) {
      return;
    }
    textHeight.value = newElement[0].contentRect.height;
  });
  watch(text, (newText) => {
    if (!textElement.value) {
      return;
    }
    textElement.value.innerText = String(newText);
    textElement.value.innerHTML += "&nbsp;;";
  });
  return textHeight;
};

// node_modules/vuestic-ui/dist/es/src/components/va-textarea/VaTextarea.vue_vue_type_script_setup_true_lang.js
import "D:/Github/DONGTIAN/ui/node_modules/vuestic-ui/dist/es/VaTextarea.css";
var _hoisted_171 = ["rows", "loading", "ariaLabel"];
var positiveNumberValidator = (val) => {
  if (val > 0) {
    return true;
  }
  throw new Error(
    `\`minRows|maxRows\` must be a positive integer greater than 0, but ${val} is provided`
  );
};
var { createEmits: createEmits2, createListeners: createListeners2 } = useEmitProxy([
  "input",
  "change",
  "click",
  "update:modelValue"
]);
var VaInputWrapperProps5 = extractComponentProps(VaInputWrapper);
var _sfc_main120 = defineComponent({
  ...{
    name: "VaTextarea"
  },
  __name: "VaTextarea",
  props: {
    ...useFormFieldProps,
    ...VaInputWrapperProps5,
    ...useStatefulProps,
    ...useValidationProps,
    modelValue: { type: [String, Number], default: "" },
    placeholder: { type: String },
    autosize: { type: Boolean, default: false },
    minRows: {
      type: [Number, String],
      default: 1,
      validator: positiveNumberValidator
    },
    maxRows: {
      type: [Number, String],
      validator: positiveNumberValidator
    },
    resize: {
      type: Boolean,
      default: true
    },
    clearValue: {
      type: [String],
      default: ""
    }
  },
  emits: [...createEmits2(), ...useValidationEmits],
  setup(__props, { expose: __expose, emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const attrs = useAttrs();
    const textarea = shallowRef();
    const { valueComputed } = useStateful(props, emit, "modelValue", {
      defaultValue: ""
    });
    const focus = () => {
      focusElement(textarea.value);
    };
    const blur = () => {
      blurElement(textarea.value);
    };
    const reset = () => withoutValidation(() => {
      emit("update:modelValue", props.clearValue);
      emit("clear");
      resetValidation();
    });
    const {
      isDirty,
      isTouched,
      computedError,
      computedErrorMessages,
      listeners: validationListeners,
      validationAriaAttributes,
      isLoading,
      resetValidation,
      withoutValidation
    } = useValidation(props, emit, {
      value: valueComputed,
      focus,
      reset
    });
    const isResizable = computed(() => {
      return props.resize && !props.autosize;
    });
    const rows = ref(props.minRows);
    const textHeight = useTextHeight(textarea, valueComputed);
    function calculateInputHeight() {
      let minRows = parseFloat(String(props.minRows));
      let maxRows = parseFloat(String(props.maxRows));
      minRows = isNaN(minRows) ? 1 : minRows;
      maxRows = isNaN(maxRows) ? Infinity : maxRows;
      if (!props.autosize) {
        rows.value = Math.max(maxRows, Math.min(minRows, maxRows ?? 0));
        return;
      }
      if (!textHeight.value || !textarea.value) {
        return;
      }
      const style = getComputedStyle(textarea.value);
      const height = textHeight.value;
      const lineHeight = parseFloat(style.lineHeight);
      const minHeight = Math.max(
        minRows * lineHeight,
        minRows + Math.round(lineHeight)
      );
      const maxHeight = maxRows * lineHeight || Infinity;
      const newHeight = Math.max(minHeight, Math.min(maxHeight, height ?? 0));
      rows.value = Math.round(newHeight / lineHeight);
      textarea.value.style.height = `${newHeight + 1}px`;
    }
    watchEffect(() => {
      calculateInputHeight();
    });
    const computedStyle = computed(
      () => ({
        resize: isResizable.value ? void 0 : "none"
      })
    );
    const computedProps = computed(() => ({
      ...pick(props, ["disabled", "readonly", "placeholder", "name"])
    }));
    const computedInputAttributes = computed(() => ({
      ...validationAriaAttributes.value,
      ...omit(attrs, ["class", "style"])
    }));
    const vaInputWrapperProps = filterComponentProps(VaInputWrapperProps5);
    const listeners = createListeners2(emit);
    __expose({
      isDirty,
      isTouched,
      isLoading,
      computedError,
      computedErrorMessages,
      reset,
      focus,
      blur,
      value: valueComputed,
      withoutValidation,
      resetValidation
    });
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(VaInputWrapper), mergeProps({ class: "va-textarea" }, unref(vaInputWrapperProps), {
        error: unref(computedError),
        "error-messages": unref(computedErrorMessages)
      }), {
        default: withCtx(() => [
          createBaseVNode("div", {
            class: normalizeClass(["va-textarea__resize-wrapper", {
              "va-textarea__resize-wrapper--resizable": isResizable.value
            }])
          }, [
            withDirectives(createBaseVNode("textarea", mergeProps({
              "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => isRef(valueComputed) ? valueComputed.value = $event : null)
            }, { ...computedProps.value, ...unref(listeners), ...computedInputAttributes.value, ...unref(validationListeners) }, {
              class: ["va-textarea__textarea", {
                "va-textarea__textarea--autosize": __props.autosize
              }],
              ref_key: "textarea",
              ref: textarea,
              rows: rows.value,
              style: computedStyle.value,
              loading: unref(isLoading),
              ariaLabel: _ctx.$props.label
            }), null, 16, _hoisted_171), [
              [vModelText, unref(valueComputed)]
            ])
          ], 2)
        ]),
        _: 1
      }, 16, ["error", "error-messages"]);
    };
  }
});

// node_modules/vuestic-ui/dist/es/src/components/va-textarea/index.js
var VaTextarea = withConfigTransport(_sfc_main120);

// node_modules/vuestic-ui/dist/es/src/components/va-menu-list/composables/useMenuKeyboardNavigation.js
var NON_DISABLED_MENU_ITEM_SELECTOR = '[role="menuitem"]:not([aria-disabled="true"])';
var FOCUSED_MENU_ITEM_SELECTOR = '[role="menuitem"]:focus';
var makeMenuItemAttributes = (options) => ({
  role: "menuitem",
  tabindex: -1,
  "aria-disabled": Boolean(options.disabled)
});
var makeMenuContainerAttributes = () => ({
  role: "menu",
  tabindex: 0
});
var useMenuKeyboardNavigation = (container) => {
  useEvent("keydown", ({ key }) => {
    if (!container.value) {
      return;
    }
    const items2 = container.value.querySelectorAll(NON_DISABLED_MENU_ITEM_SELECTOR);
    const focusedItem = container.value.querySelector(FOCUSED_MENU_ITEM_SELECTOR);
    if (!items2.length) {
      return;
    }
    if (!focusedItem) {
      const firstItem = container.value.querySelector(NON_DISABLED_MENU_ITEM_SELECTOR);
      if (firstItem) {
        focusElement(firstItem);
      }
      return;
    }
    if (key === "ArrowDown" || key === "ArrowRight") {
      const focusedElementIndex = Array.from(items2).indexOf(focusedItem);
      focusElement(items2[focusedElementIndex + 1]);
    }
    if (key === "ArrowUp" || key === "ArrowLeft") {
      const focusedElementIndex = Array.from(items2).indexOf(focusedItem);
      focusElement(items2[focusedElementIndex - 1]);
    }
  }, container);
};

// node_modules/vuestic-ui/dist/es/src/components/va-menu-list/components/VaMenuItem.vue_vue_type_script_setup_true_lang.js
import "D:/Github/DONGTIAN/ui/node_modules/vuestic-ui/dist/es/VaMenuItem.css";
var _hoisted_172 = { class: "va-menu-item__cell va-menu-item__cell--left" };
var _hoisted_234 = { class: "va-menu-item__cell va-menu-item__cell--center" };
var _hoisted_323 = { class: "va-menu-item__content" };
var _hoisted_414 = { class: "va-menu-item__cell va-menu-item__cell--right" };
var _sfc_main121 = defineComponent({
  ...{
    name: "VaMenuItem"
  },
  __name: "VaMenuItem",
  props: {
    name: { type: String, default: "" },
    icon: { type: String, defatult: "" },
    rightIcon: { type: String, defatult: "" },
    disabled: { type: Boolean, default: false }
  },
  emits: ["selected"],
  setup(__props, { emit: __emit }) {
    const { hasKeyboardFocus, keyboardFocusListeners } = useKeyboardOnlyFocusGlobal();
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("tr", mergeProps({ class: "va-menu-item" }, unref(makeMenuItemAttributes)({ disabled: __props.disabled }), toHandlers(unref(keyboardFocusListeners), true), {
        class: {
          "va-menu-item--disabled": __props.disabled,
          "va-menu-item--keyboard-focus": unref(hasKeyboardFocus)
        },
        onClick: _cache[0] || (_cache[0] = ($event) => _ctx.$emit("selected")),
        onKeydown: _cache[1] || (_cache[1] = withKeys(($event) => _ctx.$emit("selected"), ["enter", "space"]))
      }), [
        createBaseVNode("td", _hoisted_172, [
          renderSlot(_ctx.$slots, "left-icon", {}, () => [
            __props.icon ? (openBlock(), createBlock(unref(VaIcon), {
              key: 0,
              class: "va-menu-item__icon--left",
              name: __props.icon
            }, null, 8, ["name"])) : createCommentVNode("", true)
          ])
        ]),
        createBaseVNode("td", _hoisted_234, [
          renderSlot(_ctx.$slots, "default", {}, () => [
            createBaseVNode("a", _hoisted_323, toDisplayString(__props.name), 1)
          ])
        ]),
        createBaseVNode("td", _hoisted_414, [
          renderSlot(_ctx.$slots, "right-icon", {}, () => [
            __props.rightIcon ? (openBlock(), createBlock(unref(VaIcon), {
              key: 0,
              class: "va-menu-item__icon--right",
              name: __props.rightIcon
            }, null, 8, ["name"])) : createCommentVNode("", true)
          ])
        ])
      ], 16);
    };
  }
});

// node_modules/vuestic-ui/dist/es/src/components/va-menu-list/components/VaMenuGroup.vue_vue_type_script_setup_true_lang.js
import "D:/Github/DONGTIAN/ui/node_modules/vuestic-ui/dist/es/VaMenuGroup.css";
var _hoisted_173 = { class: "va-menu-list__group-name" };
var _sfc_main122 = defineComponent({
  ...{
    name: "VaMenuGroup"
  },
  __name: "VaMenuGroup",
  props: {
    groupName: {
      type: String,
      required: true
    },
    color: {
      type: String,
      default: "secondary"
    }
  },
  setup(__props) {
    const props = __props;
    const { getColor } = useColors();
    const colorComputed = computed(() => getColor(props.color));
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock(Fragment, null, [
        createBaseVNode("div", {
          class: "va-menu-list__group-name-wrapper",
          colspan: "99999",
          style: normalizeStyle(`--va-color-computed: ${String(colorComputed.value)}`)
        }, [
          createBaseVNode("span", _hoisted_173, toDisplayString(__props.groupName), 1)
        ], 4),
        renderSlot(_ctx.$slots, "default", {
          style: normalizeStyle(`--va-color-computed: ${String(colorComputed.value)}`)
        }, void 0, true)
      ], 64);
    };
  }
});

// node_modules/vuestic-ui/dist/es/src/components/va-menu-list/components/VaMenuGroup.js
import "D:/Github/DONGTIAN/ui/node_modules/vuestic-ui/dist/es/VaMenuGroup.css";
var _VaMenuGroup = _export_sfc(_sfc_main122, [["__scopeId", "data-v-4dd1ae9a"]]);

// node_modules/vuestic-ui/dist/es/src/components/va-menu-list/VaMenuList.vue_vue_type_script_setup_true_lang.js
import "D:/Github/DONGTIAN/ui/node_modules/vuestic-ui/dist/es/VaMenuList.css";
var _hoisted_174 = { colspan: "9999" };
var _sfc_main123 = defineComponent({
  ...{
    name: "VaMenuList"
  },
  __name: "VaMenuList",
  props: {
    ...useSelectableListProps,
    options: { type: Array, default: () => [] }
  },
  emits: ["selected"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const container = ref();
    useMenuKeyboardNavigation(container);
    const { getText, getValue, getDisabled, getGroupBy, getTrackBy } = useSelectableList(props);
    const optionGroups = computed(() => props.options.reduce((groups, option) => {
      const groupBy = getGroupBy(option);
      if (!groupBy) {
        groups._noGroup.push(option);
      } else {
        if (!groups[groupBy]) {
          groups[groupBy] = [];
        }
        groups[groupBy].push(option);
      }
      return groups;
    }, { _noGroup: [] }));
    const getUnSlottedVNodes = (nodes) => {
      if (Array.isArray(nodes) && nodes[0].type === Fragment) {
        return nodes[0].children;
      }
      return nodes;
    };
    const getVNodeComponentName = (node) => {
      if (typeof node.type === "object" && "name" in node.type && typeof node.type.name === "string") {
        return node.type.name;
      }
      return "";
    };
    const getVNodeKey = (node) => {
      if (typeof node.type === "string") {
        return node.type;
      }
      if (typeof node.type === "object" && "name" in node.type && typeof node.type.name === "string") {
        return node.type.name;
      }
      return String(node.key);
    };
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("table", mergeProps({
        class: "va-menu-list",
        ref_key: "container",
        ref: container
      }, unref(makeMenuContainerAttributes)()), [
        createBaseVNode("tbody", null, [
          _ctx.$slots.default ? (openBlock(true), createElementBlock(Fragment, { key: 0 }, renderList(getUnSlottedVNodes(_ctx.$slots.default()), (child) => {
            return openBlock(), createElementBlock(Fragment, null, [
              getVNodeComponentName(child) === "VaMenuItem" ? (openBlock(), createBlock(resolveDynamicComponent(child), {
                key: getVNodeKey(child) + "menuitem"
              })) : getVNodeComponentName(child) === "VaDropdown" ? (openBlock(), createBlock(resolveDynamicComponent(child), {
                key: getVNodeKey(child) + "menu-dropdown"
              })) : (openBlock(), createElementBlock("td", {
                colspan: "999",
                key: getVNodeKey(child),
                class: "va-menu-list__virtual-td"
              }, [
                (openBlock(), createBlock(resolveDynamicComponent(child)))
              ]))
            ], 64);
          }), 256)) : renderSlot(_ctx.$slots, "default", { key: 1 }, () => [
            (openBlock(true), createElementBlock(Fragment, null, renderList(optionGroups.value, (options, groupName) => {
              return openBlock(), createElementBlock(Fragment, { key: groupName }, [
                groupName !== "_noGroup" ? renderSlot(_ctx.$slots, "group", { key: 0 }, () => [
                  createBaseVNode("tr", null, [
                    createBaseVNode("td", _hoisted_174, [
                      createVNode(_VaMenuGroup, { "group-name": groupName }, null, 8, ["group-name"])
                    ])
                  ])
                ]) : createCommentVNode("", true),
                (openBlock(true), createElementBlock(Fragment, null, renderList(options, (option) => {
                  return openBlock(), createBlock(_sfc_main121, {
                    key: unref(getTrackBy)(option),
                    name: unref(getText)(option),
                    icon: option.icon,
                    "right-icon": option.rightIcon,
                    disabled: unref(getDisabled)(option),
                    onSelected: ($event) => _ctx.$emit("selected", unref(getValue)(option), option)
                  }, {
                    "left-icon": withCtx((bind) => [
                      renderSlot(_ctx.$slots, "left-icon", normalizeProps(guardReactiveProps(bind)))
                    ]),
                    "right-icon": withCtx((bind) => [
                      renderSlot(_ctx.$slots, "right-icon", normalizeProps(guardReactiveProps(bind)))
                    ]),
                    _: 2
                  }, 1032, ["name", "icon", "right-icon", "disabled", "onSelected"]);
                }), 128))
              ], 64);
            }), 128))
          ])
        ])
      ], 16);
    };
  }
});

// node_modules/vuestic-ui/dist/es/src/components/va-menu-list/index.js
var VaMenuList = withConfigTransport(_sfc_main123);
var VaMenuItem = withConfigTransport(_sfc_main121);
var VaMenuGroup = withConfigTransport(_VaMenuGroup);

// node_modules/vuestic-ui/dist/es/src/composables/useImmediateFocus.js
var useImmediateFocus = (el) => {
  watchEffect(() => {
    if (el.value) {
      nextTick(() => {
        focusElement(unwrapEl(el.value));
      });
    }
  });
};

// node_modules/vuestic-ui/dist/es/src/components/va-menu/VaMenu.vue_vue_type_script_setup_true_lang.js
var VaMenuListProps = extractComponentProps(VaMenuList);
var VaMenuListEmits = extractComponentEmits(VaMenuList);
var VaDropdownProps4 = extractComponentProps(VaDropdown);
var VaDropdownEmits = extractComponentEmits(VaDropdown);
var _sfc_main124 = defineComponent({
  ...{
    name: "VaMenu"
  },
  __name: "VaMenu",
  props: {
    ...useComponentPresetProp,
    ...VaMenuListProps,
    ...VaDropdownProps4,
    stickToEdges: { type: Boolean, default: true }
  },
  emits: [
    ...VaDropdownEmits,
    ...VaMenuListEmits
  ],
  setup(__props, { expose: __expose, emit: __emit }) {
    const menuList = ref();
    const dropdown = ref();
    useImmediateFocus(menuList);
    const close = () => {
      var _a2;
      (_a2 = dropdown.value) == null ? void 0 : _a2.hide();
      nextTick(() => {
        var _a22;
        const el = unwrapEl((_a22 = dropdown.value) == null ? void 0 : _a22.anchorRef);
        if (el) {
          focusFirstFocusableChild(el);
        }
      });
    };
    const onKeydown = (event) => {
      if (event.key === "Escape") {
        close();
      }
      if (event.key === "ArrowDown" || event.key === "ArrowUp") {
        event.preventDefault();
      }
    };
    const menuListProps = filterComponentProps(VaMenuListProps);
    const dropdownProps = filterComponentProps(VaDropdownProps4);
    __expose({
      close
    });
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(VaDropdown), mergeProps(unref(dropdownProps), {
        ref_key: "dropdown",
        ref: dropdown
      }), {
        anchor: withCtx(() => [
          renderSlot(_ctx.$slots, "anchor")
        ]),
        default: withCtx(() => [
          createVNode(unref(VaDropdownContent), { onKeydown }, {
            default: withCtx(() => [
              createVNode(unref(VaMenuList), mergeProps({
                onKeydown: _cache[0] || (_cache[0] = withKeys(withModifiers(() => {
                }, ["prevent", "stop"]), ["enter", "space"]))
              }, unref(menuListProps), {
                ref_key: "menuList",
                ref: menuList,
                onSelected: _cache[1] || (_cache[1] = ($event) => {
                  _ctx.$emit("selected", $event);
                  close();
                })
              }), createSlots({ _: 2 }, [
                _ctx.$slots.default ? {
                  name: "default",
                  fn: withCtx(() => [
                    renderSlot(_ctx.$slots, "default")
                  ]),
                  key: "0"
                } : void 0
              ]), 1040)
            ]),
            _: 3
          })
        ]),
        _: 3
      }, 16);
    };
  }
});

// node_modules/vuestic-ui/dist/es/src/components/va-menu/va-menu.js
var VaMenu = withConfigTransport(_sfc_main124);

// node_modules/vuestic-ui/dist/es/src/composables/useValidation.props.js
var validationPropsDefaults = {
  rules: () => [],
  dirty: false,
  errorCount: 1,
  success: false,
  messages: () => [],
  immediateValidation: false
};

// node_modules/vuestic-ui/dist/es/src/composables/useStateful.props.js
var statefulPropsDefaults = {
  stateful: false
};

// node_modules/vuestic-ui/dist/es/src/components/va-form-field/VaFormField.vue_vue_type_script_setup_true_lang.js
var _sfc_main125 = defineComponent({
  __name: "VaFormField",
  props: mergeDefaults({
    stateful: { type: Boolean },
    modelValue: {},
    name: {},
    rules: {},
    dirty: { type: Boolean },
    error: { type: Boolean },
    errorMessages: {},
    errorCount: {},
    success: { type: Boolean },
    messages: {},
    immediateValidation: { type: Boolean },
    clearValue: {}
  }, {
    ...statefulPropsDefaults,
    ...validationPropsDefaults
  }),
  emits: ["update:error", "update:errorMessages", "update:dirty", "update:modelValue"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const { valueComputed } = useStateful(props, emit, "modelValue");
    const reset = () => {
      valueComputed.value = props.clearValue;
    };
    const focus = () => {
    };
    const {
      computedError,
      computedErrorMessages,
      validate,
      isDirty,
      isLoading,
      isValid,
      resetValidation,
      validationAriaAttributes,
      listeners
    } = useValidation(props, emit, {
      reset,
      focus,
      value: valueComputed
    });
    const messagesComputed = computed(() => computedError.value ? computedErrorMessages.value : props.messages);
    const messagesColor = computed(() => {
      if (!isValid.value) {
        return "danger";
      }
      if (props.success) {
        return "success";
      }
      return "";
    });
    const innerValue = ref(valueComputed.value);
    watchEffect(() => {
      innerValue.value = valueComputed.value;
    });
    const makeSlotRef = () => {
      return new Proxy(innerValue, {
        get(v, key) {
          if (key === "ref") {
            return innerValue.value;
          }
          return Reflect.get(v, key);
        },
        set(_, key, value) {
          if (key === "ref") {
            innerValue.value = value;
            valueComputed.value = value;
            return true;
          }
          return Reflect.set(valueComputed, key, value);
        }
      });
    };
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(VaMessageList), {
        "model-value": messagesComputed.value,
        "has-error": !unref(isValid),
        color: messagesColor.value
      }, createSlots({
        default: withCtx(({ ariaAttributes, attrs }) => [
          renderSlot(_ctx.$slots, "default", normalizeProps(guardReactiveProps({
            error: unref(computedError),
            errorMessages: messagesComputed.value,
            messages: messagesComputed.value,
            validate: unref(validate),
            isDirty: unref(isDirty),
            isLoading: unref(isLoading),
            isValid: unref(isValid),
            resetValidation: unref(resetValidation),
            validationAriaAttributes: unref(validationAriaAttributes),
            ...unref(listeners),
            value: makeSlotRef(),
            modelValue: makeSlotRef(),
            ariaAttributes,
            bind: {
              ...attrs,
              ...ariaAttributes,
              ...unref(listeners)
            }
          })))
        ]),
        _: 2
      }, [
        renderList(["message", "messages"], (name) => {
          return {
            name,
            fn: withCtx((slotScope) => [
              renderSlot(_ctx.$slots, name, normalizeProps(guardReactiveProps(slotScope)))
            ])
          };
        })
      ]), 1032, ["model-value", "has-error", "color"]);
    };
  }
});

// node_modules/vuestic-ui/dist/es/src/components/va-form-field/index.js
var VaFormField = withConfigTransport(_sfc_main125);

// node_modules/vuestic-ui/dist/es/src/services/vue-plugin/components.js
var vuesticComponents = Object.freeze(Object.defineProperty({
  __proto__: null,
  VaAccordion,
  VaAffix,
  VaAlert,
  VaAppBar,
  VaAspectRatio,
  VaAvatar,
  VaAvatarGroup,
  VaBacktop,
  VaBadge,
  VaBreadcrumbs,
  VaBreadcrumbsItem,
  VaButton,
  VaButtonDropdown,
  VaButtonGroup,
  VaButtonToggle,
  VaCard,
  VaCardActions,
  VaCardBlock,
  VaCardContent,
  VaCardTitle,
  VaCarousel,
  VaCheckbox,
  VaChip,
  VaCollapse,
  VaColorIndicator,
  VaColorInput,
  VaColorPalette,
  VaConfig: _sfc_main4,
  VaContent,
  VaCounter,
  VaDataTable,
  VaDateInput,
  VaDatePicker,
  VaDivider,
  VaDropdown,
  VaDropdownContent,
  VaFallback,
  VaFileUpload,
  VaForm,
  VaFormField,
  VaHover,
  VaIcon,
  VaImage,
  VaInfiniteScroll,
  VaInnerLoading,
  VaInput,
  VaInputWrapper,
  VaLayout,
  VaList,
  VaListItem,
  VaListItemLabel,
  VaListItemSection,
  VaListLabel,
  VaListSeparator,
  VaMenu,
  VaMenuGroup,
  VaMenuItem,
  VaMenuList,
  VaMessageList,
  VaModal,
  VaNavbar,
  VaNavbarItem,
  VaOptionList,
  VaPagination,
  VaParallax,
  VaPopover,
  VaProgressBar,
  VaProgressCircle,
  VaRadio,
  VaRating,
  VaScrollContainer,
  VaSelect,
  VaSeparator: _sfc_main5,
  VaSidebar,
  VaSidebarItem,
  VaSidebarItemContent,
  VaSidebarItemTitle,
  VaSkeleton,
  VaSkeletonGroup,
  VaSlider,
  VaSpacer: _sfc_main6,
  VaSplit,
  VaStepper,
  VaStickyScrollbar: _sfc_main7,
  VaSwitch,
  VaTab,
  VaTabs,
  VaTextarea,
  VaTimeInput,
  VaTimePicker,
  VaTimeline,
  VaTimelineItem,
  VaToast,
  VaTreeView,
  VaValue,
  VaViewer,
  VaVirtualScroller
}, Symbol.toStringTag, { value: "Module" }));

// node_modules/vuestic-ui/dist/es/src/services/vue-plugin/utils/use-plugin.js
var isPluginFabric = (plugin) => typeof plugin === "function";
var usePlugin = (app, plugin, ...options) => {
  if (isPluginFabric(plugin)) {
    app.use(plugin(...options));
  } else {
    app.use(plugin);
  }
};

// node_modules/vuestic-ui/dist/es/src/services/vue-plugin/create-vuestic/create-vuestic.js
var createVuestic = defineVuesticPlugin((options = {}) => ({
  install(app) {
    const { config } = options;
    setCurrentApp(app);
    Object.entries(vuesticComponents).forEach(([name, component]) => {
      app.component(name, component);
    });
    usePlugin(app, GlobalConfigPlugin(config));
    usePlugin(app, CachePlugin);
    usePlugin(app, ColorConfigPlugin(config));
    usePlugin(app, ColorsClassesPlugin);
    usePlugin(app, BreakpointConfigPlugin);
    usePlugin(app, VaDropdownPlugin);
    usePlugin(app, VaToastPlugin);
    usePlugin(app, VaModalPlugin);
    setCurrentApp(null);
  }
}));

// node_modules/vuestic-ui/dist/es/src/services/vue-plugin/create-vuestic/create-vuestic-essential.js
var ESSENTIAL_PLUGIN_NAMES = ["GlobalConfigPlugin", "ColorConfigPlugin"];
var createVuesticEssential = defineVuesticPlugin((options = {}) => ({
  install(app) {
    const { config, components, plugins } = options;
    setCurrentApp(app);
    usePlugin(app, (plugins == null ? void 0 : plugins.GlobalConfigPlugin) || GlobalConfigPlugin, config);
    usePlugin(app, (plugins == null ? void 0 : plugins.CachePlugin) || CachePlugin);
    usePlugin(app, (plugins == null ? void 0 : plugins.ColorConfigPlugin) || ColorConfigPlugin, config);
    if (plugins) {
      Object.entries(plugins).forEach(([name, plugin]) => {
        if (ESSENTIAL_PLUGIN_NAMES.includes(name)) {
          return;
        }
        usePlugin(app, plugin);
      });
    }
    if (components) {
      Object.entries(components).forEach(([name, component]) => {
        app.component(name, component);
      });
    }
    setCurrentApp(null);
  }
}));

// node_modules/vuestic-ui/dist/es/src/services/web-components/register-vuestic-web-components-essential.js
var componentsOrder = [
  "VaConfig",
  // VaConfig should be registered before any component, because it provides them config
  "VaForm",
  // VaForm registered before any component, but not before VaConfig
  "VaAccordion",
  "VaFileUpload",
  "VaSidebar",
  "VaTabs"
];
var registerVuesticWebComponentsEssential = (options) => {
  const { css, components } = options;
  Object.entries(components).sort(([nameA], [nameB]) => {
    if (!componentsOrder.includes(nameA) && !componentsOrder.includes(nameB)) {
      return 0;
    }
    let indexA = componentsOrder.indexOf(nameA);
    let indexB = componentsOrder.indexOf(nameB);
    if (indexA === -1) {
      indexA = Number.MAX_SAFE_INTEGER;
    }
    if (indexB === -1) {
      indexB = Number.MAX_SAFE_INTEGER;
    }
    return indexA - indexB;
  }).forEach(([name, component]) => {
    const customElement = defineCustomElement(component);
    if (css && "styles" in component) {
      component.styles.push(css);
    }
    customElements.define(`${camelCaseToKebabCase(name)}`, customElement);
  });
};

// node_modules/vuestic-ui/dist/es/src/services/web-components/register-vuestic-web-components.js
var defaultCSS = `
.material-icons {
  font-family: 'Material Icons';
  font-weight: normal;
  font-style: normal;
  line-height: 1;
  letter-spacing: normal;
  text-transform: none;
  display: inline-block;
  white-space: nowrap;
  word-wrap: normal;
  direction: ltr;
  -webkit-font-smoothing: antialiased;
}`;
var registerVuesticWebComponents = (options = {}) => {
  const { css = defaultCSS } = options;
  registerVuesticWebComponentsEssential({
    css,
    components: vuesticComponents
  });
};

// node_modules/vuestic-ui/dist/es/src/components/va-data-table/fabrics.js
var defineVaDataTableColumns = (columns) => columns;
var defineVaDataTableItems = (items2) => items2;

// node_modules/vuestic-ui/dist/es/src/components/va-modal/hooks/useModal.js
var useModal = () => {
  var _a2;
  const appContext = (_a2 = getCurrentInstance()) == null ? void 0 : _a2.appContext;
  if (!appContext) {
    throw new Error("useModal can be used only in setup function. You can use app.config.globalProperties.$vaModal outside setup function");
  }
  const init = (options) => {
    return createModalInstance(options, appContext);
  };
  const confirm = (options) => {
    if (typeof options === "string") {
      return new Promise((resolve, reject) => {
        createModalInstance({
          message: options,
          onOk() {
            resolve(true);
          },
          onCancel() {
            resolve(false);
          }
        }, appContext);
      });
    }
    return new Promise((resolve, reject) => {
      createModalInstance({
        ...options,
        onOk() {
          var _a22;
          (_a22 = options == null ? void 0 : options.onOk) == null ? void 0 : _a22.call(options);
          resolve(true);
        },
        onCancel() {
          var _a22;
          (_a22 = options == null ? void 0 : options.onCancel) == null ? void 0 : _a22.call(options);
          resolve(false);
        }
      }, appContext);
    });
  };
  return { init, confirm };
};

// node_modules/vuestic-ui/dist/es/src/components/va-rating/components/VaRatingItem/index.js
var VaRatingItem = withConfigTransport$1(_sfc_main88);

// node_modules/vuestic-ui/dist/es/src/composables/useAppContext.js
var useAppContext = () => {
  const currentInstance = getCurrentInstance();
  return computed(() => {
    var _a2;
    return ((_a2 = getCurrentApp()) == null ? void 0 : _a2._context) || (currentInstance == null ? void 0 : currentInstance.appContext);
  });
};

// node_modules/vuestic-ui/dist/es/src/components/va-toast/hooks/useToast.js
var useToast = () => {
  const appContext = useAppContext();
  const createdInThisSetupContext = [];
  const notify = (options) => {
    const id = createToastInstance(options, appContext.value);
    if (id) {
      createdInThisSetupContext.push(id);
    }
    return id;
  };
  const init = (options) => {
    return notify(options);
  };
  const close = (id) => closeById(id);
  const closeAll = (allApps = false) => closeAllNotifications(allApps ? void 0 : appContext.value);
  const closeAllCreatedInThisHook = () => {
    createdInThisSetupContext.forEach((id) => closeById(id));
  };
  return {
    init,
    notify,
    close,
    closeAll,
    closeAllCreatedInThisHook
  };
};

// node_modules/vuestic-ui/dist/es/src/composables/useMount.js
var destroy3 = (el, vNode) => {
  if (el) {
    render(null, el);
    el.remove();
  }
  el = null;
};
var mount3 = (component, { props, appContext } = {}) => {
  const el = document == null ? void 0 : document.createElement("div");
  document.body.appendChild(el);
  const vNode = h(component, {
    ...props,
    stateful: (props == null ? void 0 : props.stateful) ?? true
  });
  if (appContext) {
    vNode.appContext = appContext;
  }
  if (el) {
    render(vNode, el);
  }
  return { vNode, el };
};
var useMount = (component) => {
  var _a2;
  const appContext = (_a2 = getCurrentInstance()) == null ? void 0 : _a2.appContext;
  if (!appContext) {
    throw new Error("useMount can be used only in setup function");
  }
  const createInstance2 = (props) => {
    const { vNode, el } = mount3(component, { props, appContext });
    return () => {
      nextTick(() => {
        destroy3(el);
      });
    };
  };
  return {
    createInstance: createInstance2
  };
};

// node_modules/vuestic-ui/dist/es/src/components/va-menu/hooks/useMenu.js
var useMenu = () => {
  const { createInstance: createInstance2 } = useMount(VaMenu);
  const instances = [];
  const destroyAll = () => instances.forEach((destroy4) => destroy4());
  const show = (props) => {
    destroyAll();
    props.event.preventDefault();
    const destroy4 = createInstance2({
      ...props,
      anchor: props.event.target,
      cursor: {
        getBoundingClientRect() {
          const resX = props.event.clientX;
          const resY = props.event.clientY;
          return {
            width: 0,
            height: 0,
            x: resX,
            y: resY,
            top: resY,
            right: resX,
            bottom: resY,
            left: resX
          };
        },
        contextElement: props.event.target
      },
      stateful: true,
      modelValue: true,
      preset: "context",
      onBeforeUnmount: () => {
        destroy4();
      }
    });
    instances.push(destroy4);
    return () => {
      destroy4();
      instances.splice(instances.indexOf(destroy4), 1);
    };
  };
  onBeforeUnmount(destroyAll);
  return {
    show
  };
};
export {
  BreakpointConfigPlugin,
  CachePlugin,
  ColorConfigPlugin,
  ColorsClassesPlugin,
  GlobalConfigPlugin,
  TabsViewKey,
  VaAccordion,
  VaAffix,
  VaAlert,
  VaAppBar,
  VaAspectRatio,
  VaAvatar,
  VaAvatarGroup,
  VaBacktop,
  VaBadge,
  VaBreadcrumbs,
  VaBreadcrumbsItem,
  VaButton,
  VaButtonDropdown,
  VaButtonGroup,
  VaButtonToggle,
  VaCard,
  VaCardActions,
  VaCardBlock,
  VaCardContent,
  VaCardTitle,
  VaCarousel,
  VaCheckbox,
  VaChip,
  VaCollapse,
  VaColorIndicator,
  VaColorInput,
  VaColorPalette,
  _sfc_main4 as VaConfig,
  VaContent,
  VaCounter,
  VaDataTable,
  VaDateInput,
  VaDatePicker,
  VaDivider,
  VaDropdown,
  VaDropdownContent,
  VaDropdownPlugin,
  VaFallback,
  VaFileUpload,
  VaFileUploadGalleryItem,
  VaFileUploadKey,
  VaFileUploadList,
  VaFileUploadListItem,
  VaFileUploadSingleItem,
  VaFileUploadUndo,
  VaForm,
  VaFormField,
  VaHover,
  VaIcon,
  VaImage,
  VaInfiniteScroll,
  VaInnerLoading,
  VaInput,
  VaInputWrapper,
  VaLayout,
  VaList,
  VaListItem,
  VaListItemLabel,
  VaListItemSection,
  VaListLabel,
  VaListSeparator,
  VaMenu,
  VaMenuGroup,
  VaMenuItem,
  VaMenuList,
  VaMessageList,
  _sfc_main3 as VaMessageListWrapper,
  VaModal,
  VaModalPlugin,
  VaNavbar,
  VaNavbarItem,
  VaOptionList,
  VaPagination,
  VaParallax,
  VaPopover,
  VaProgressBar,
  VaProgressCircle,
  VaRadio,
  VaRating,
  VaRatingItem,
  VaScrollContainer,
  VaSelect,
  VaSelectOption,
  VaSelectOptionList,
  _sfc_main5 as VaSeparator,
  VaSidebar,
  VaSidebarItem,
  VaSidebarItemContent,
  VaSidebarItemTitle,
  VaSkeleton,
  VaSkeletonGroup,
  VaSlider,
  _sfc_main6 as VaSpacer,
  VaSplit,
  VaStepper,
  _sfc_main7 as VaStickyScrollbar,
  VaSwitch,
  VaTab,
  VaTabs,
  VaTextarea,
  VaTimeInput,
  VaTimePicker,
  VaTimeline,
  VaTimelineItem,
  VaTimelineSeparator,
  VaToast,
  VaToastPlugin,
  VaTreeView,
  VaValue,
  VaViewer,
  VaVirtualScroller,
  VuesticIconAliases,
  VuesticIconFonts,
  presets as colorsPreset,
  compareWithMask,
  createDateMask,
  createIconsConfig,
  createNumeralMask,
  createRegexMask,
  createVuestic,
  createVuesticEssential,
  defineVaDataTableColumns,
  defineVaDataTableItems,
  defineVaStepperSteps,
  defineVuesticConfig,
  registerVuesticWebComponents,
  registerVuesticWebComponentsEssential,
  defaultThresholds as thresholdsPreset,
  useBreakpoint,
  useColors,
  useElementTextColor,
  useForm,
  useGlobalConfig,
  useI18nConfig,
  useIcon as useIcons,
  useInputMask,
  useMenu,
  useModal,
  useStickyTableHeaders,
  useToast
};
//# sourceMappingURL=vuestic-ui.js.map
