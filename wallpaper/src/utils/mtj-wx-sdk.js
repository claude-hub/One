const mtjwxsdk = (function (t) {
  'use strict'
  let e
  let n
  const r = '1.10.23'
  const o = 'https://hmma.baidu.com/mini.gif'
  const a = {
    app: ['onShow', 'onHide', 'onError'],
    page: ['onShow', 'onReady', 'onHide', 'onPageScroll'],
    share: ['onShareAppMessage'],
    behavior: ['tap'],
  }
  const i = 'mtj_uuid'
  const c = 'mtj_user'
  const s = 'mtj_user_property'
  const u = 'mtj_track_status'
  const f = 'mtj_remote_config'
  const l = 'mtj_ab_experiment_list'
  const h = 'mtj_ab_active_experiment_ids'
  const p = {}
  const d = { type: 1 }
  const g = { aso: {} }
  const m = {}
  const y = function (t) {
    if (!1 !== p.trackStatus) {
      const n = t.data.et ? { mtj_ii: t.data.uuid || '', mtj_et: t.data.et, mtj_en: t.data.en } : {}
      return e.request({
        url: t.url,
        data: t.data,
        header: Object.assign({ 'content-type': 'application/json' }, n, t.header),
        method: t.method || 'POST',
        dataType: t.dataType || 'json',
        success: function (e) {
          t.success && t.success(e)
        },
        fail: function (e) {
          t.fail && t.fail(e)
        },
      })
    }
  }
  const v = function () {
    return typeof crypto !== 'undefined' && crypto.getRandomValues
      ? crypto.getRandomValues(new Uint32Array(1))[0]
      : Math.floor(4294967295 * Math.random())
  }
  const b = function (t, e) {
    return '[object ' + e + ']' === {}.toString.call(t)
  }
  const j = function (t, e, n) {
    const r =
      (t = t
        .replace(new RegExp(e + '=[^&]*', 'g'), '')
        .replace(/(\?|&)&/g, '$1')
        .replace(/(\?|&)$/g, '')).indexOf('?') > 0
        ? '&'
        : '?'
    return t + r + e + '=' + encodeURIComponent(n)
  }
  const S = function t(e) {
    return b(e, 'Object') || b(e, 'Array')
      ? (Object.keys(e).forEach(function (n) {
          const r = e[n]
          b(r, 'Object') || b(r, 'Array') ? (e[n] = t(r)) : (e[n] = '' + r)
        }),
        e)
      : e
  }
  const O = function (t) {
    return b(t, 'String') && /^[a-z][a-z0-9_]{0,31}$/.test(t)
  }
  const w = function (t) {
    return b(t, 'String') && /^[a-z0-9_]{1,32}$/.test(t)
  }
  const k = function (t) {
    return b(t, 'String') || b(t, 'Number')
  }
  const x = function (t) {
    return b(t, 'String') && /^\d{11}$/.test(t)
  }
  const P = function (t) {
    return b(t, 'String') && t.length === 28
  }
  let _ = 0
  const T = function (t) {
    return new Promise(function (e, n) {
      return (
        (t.data = t.data || {}),
        p.blacklist &&
        ((p.blacklist.indexOf('all') > -1 && t.data.et) ||
          (p.blacklist.indexOf('behavior') > -1 && t.data.et === 'behavior'))
          ? e()
          : ((t.data.v = r),
            (t.data.rqc = ++_),
            (o = t.data),
            JSON.stringify(o).length <= 204800
              ? ((t.success = function (t) {
                  return e(t)
                }),
                (t.fail = function (t) {
                  return n(t)
                }),
                void y(t))
              : (_--, n(new Error('invalid data'))))
      )
      let o
    })
  }
  const I = function (t, e) {
    const n = b(e, 'Object') ? JSON.stringify(e) : '' + e
    T({
      url: o,
      dataType: 'string',
      data: Object.assign({}, d, { et: 'error', en: t, ep: { ex: n }, rid: v() }),
    })
  }
  const A = function (t) {
    ;(t.rid = v()), (t.aso = t.aso || {})
    const e = { url: o, dataType: 'string', data: Object.assign({}, d, t) }
    T(e),
      (m.circleToken || m.circleByThreeFingers) &&
        ((t.et === 'page' && t.en === 'show') || (t.et === 'behavior' && t.en === 'tap')) &&
        ((e.url = 'https://hmma.baidu.com/mini.gif?circle=1'),
        (e.data.token = m.circleToken),
        T(e).catch(function (t) {
          return console.error(t)
        }))
  }
  function E(t, e) {
    return (
      (function (t) {
        if (Array.isArray(t)) return t
      })(t) ||
      (function (t, e) {
        let n = t && ((typeof Symbol !== 'undefined' && t[Symbol.iterator]) || t['@@iterator'])
        if (n == null) return
        let r
        let o
        const a = []
        let i = !0
        let c = !1
        try {
          for (
            n = n.call(t);
            !(i = (r = n.next()).done) && (a.push(r.value), !e || a.length !== e);
            i = !0
          );
        } catch (t) {
          ;(c = !0), (o = t)
        } finally {
          try {
            i || n.return == null || n.return()
          } finally {
            if (c) throw o
          }
        }
        return a
      })(t, e) ||
      (function (t, e) {
        if (!t) return
        if (typeof t === 'string') return N(t, e)
        let n = Object.prototype.toString.call(t).slice(8, -1)
        n === 'Object' && t.constructor && (n = t.constructor.name)
        if (n === 'Map' || n === 'Set') return Array.from(t)
        if (n === 'Arguments' || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return N(t, e)
      })(t, e) ||
      (function () {
        throw new TypeError(
          'Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.',
        )
      })()
    )
  }
  function N(t, e) {
    ;(e == null || e > t.length) && (e = t.length)
    for (var n = 0, r = new Array(e); n < e; n++) r[n] = t[n]
    return r
  }
  const C = function (t) {
    try {
      return e.getStorageSync(t)
    } catch (t) {
      I('getStorageSync', t)
    }
  }
  const q = function (t, n) {
    try {
      e.setStorageSync(t, n)
    } catch (t) {
      I('setStorageSync', t)
    }
  }
  const U = function (t) {
    try {
      e.removeStorageSync(t)
    } catch (t) {
      I('removeStorageSync', t)
    }
  }
  const D = function () {
    return Promise.resolve().then(function () {
      let t = C(i)
      return (
        (b(t, 'String') && t.length === 32) ||
          ((t = ([1e7] + 1e3 + 4e3 + 8e3 + 1e11).replace(/[018]/g, function (t) {
            return (
              t ^
              ((typeof crypto !== 'undefined' && crypto.getRandomValues
                ? crypto.getRandomValues(new Uint8Array(1))[0]
                : Math.floor(255 * Math.random())) &
                (15 >> (t / 4)))
            ).toString(16)
          })),
          q(i, t),
          p.hasABTest && (U(l), U(h))),
        t
      )
    })
  }
  const B = function (t) {
    return new Promise(function (n) {
      if (!t) return n()
      e.getShareInfo({
        shareTicket: t,
        success: function (t) {
          delete t.errMsg, n(t)
        },
        fail: function () {
          n({})
        },
      })
    })
  }
  const M = function () {
    return (
      n ||
      ((d.sid = v()),
      (d.rqc = 0),
      (n = Promise.all([
        D(),
        new Promise(function (t) {
          e.getSystemInfo({
            success: function (e) {
              delete e.errMsg, t(e)
            },
            fail: function () {
              t({})
            },
          })
        }),
        new Promise(function (t) {
          e.getNetworkType({
            success: function (e) {
              delete e.errMsg, t(e)
            },
            fail: function () {
              t({})
            },
          })
        }),
        Promise.resolve().then(function () {
          const t = C(c)
          const n = b(t, 'Object') ? t : {}
          return new Promise(function (t) {
            e.getSetting({
              success: function (r) {
                r.authSetting && r.authSetting['scope.userInfo']
                  ? e.getUserInfo({
                      success: function (e) {
                        delete e.userInfo.errMsg, t(Object.assign(n, e.userInfo))
                      },
                      fail: function () {
                        t(n)
                      },
                    })
                  : t(n)
              },
              fail: function () {
                t(n)
              },
            })
          })
        }),
        new Promise(function (t) {
          if (!p.getLocation) return t({})
          e.getLocation({
            type: 'wgs84',
            success: function (e) {
              delete e.errMsg, t(e)
            },
            fail: function () {
              t({})
            },
          })
        }),
        Promise.resolve().then(function () {
          const t = C(s)
          return b(t, 'Object') ? t : {}
        }),
      ]).then(function (t) {
        const e = E(t, 6)
        const n = e[0]
        const o = e[1]
        const a = e[2]
        const i = e[3]
        const c = e[4]
        const s = e[5]
        ;(d.uuid = n),
          (g.system = S(o)),
          (g.network = S(a)),
          Object.keys(i).length > 0 && (g.user = S(i)),
          Object.keys(c).length > 0 && (g.location = S(c)),
          Object.keys(s).length > 0 && (g.userProperty = JSON.stringify(s)),
          g.system.platform === 'devtools' &&
            p.latestVersion &&
            (function (t, e) {
              for (let n = t.split('.'), r = e.split('.'), o = 0; o < 3; o++) {
                const a = +n[o] || 0
                const i = +r[o] || 0
                if (a > i) return 1
                if (i > a) return -1
              }
              return 0
            })(r, p.latestVersion) < 0 &&
            console.warn(
              '百度移动统计微信小程序SDK已更新，为不影响您的正常使用，请到SDK下载中心 https://mtj.baidu.com/web/sdk/index 下载最新版本',
            )
      })))
    )
  }
  const R = {
    onShow: function () {
      const t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}
      const e = (g.aso.query || []).filter(function (t) {
        return t.key.indexOf('mtj_') === 0
      })
      return (
        (g.aso.scene = '' + (t.scene || '')),
        t.referrerInfo && t.referrerInfo.appId
          ? (g.aso.referrerInfo = t.referrerInfo)
          : delete g.aso.referrerInfo,
        (g.aso.path = t.path || ''),
        (g.aso.query = Object.keys(t.query || {}).map(function (e) {
          return { key: e, value: t.query[e] }
        })),
        e.length > 0 &&
          !/(^|,)mtj_/.test(Object.keys(t.query || {}).join(',')) &&
          (g.aso.query = g.aso.query.concat(e)),
        (t.query || {}).mtj_ctoken && !p.disableCircling && (m.circleToken = t.query.mtj_ctoken),
        (t.query || {}).mtj_htoken && p.hasHeatmap && (m.heatmapToken = t.query.mtj_htoken),
        M()
          .then(function () {
            return B(t.shareTicket)
          })
          .then(function (t) {
            t ? (g.aso.shareInfo = t) : delete g.aso.shareInfo,
              A(Object.assign({ et: 'app', en: 'show' }, g))
          })
          .catch(function (t) {
            I('app.onShow', t)
          })
      )
    },
    onHide: function () {
      A({ et: 'app', en: 'hide' })
    },
    onError: function (t) {
      const e = b(t, 'Object') ? JSON.stringify(S(t)) : '' + t
      A({ et: 'app', en: 'error', ep: { ex: e } })
    },
  }
  function F() {
    this.options = {
      opacity: 100,
      radius: 30,
      bshadow: 1.5,
      boundVal: 15e3,
      shadowBlur: 15,
      points: { max: 100, data: [] },
      gradient: {
        0.45: 'rgb(0,0,255)',
        0.55: 'rgb(0,255,255)',
        0.65: 'rgb(0,255,0)',
        0.95: 'yellow',
        1: 'rgb(255,0,0)',
      },
    }
  }
  F.prototype = {
    getCanvas: function (t) {
      return new Promise(function (n, r) {
        e.createSelectorQuery()
          .select(t)
          .fields({ node: !0, size: !0 })
          .exec(function (t) {
            n(t[0].node)
          })
      })
    },
    getPageClientRect: function () {
      return new Promise(function (t, n) {
        e.createSelectorQuery()
          .select('.hm-container')
          .boundingClientRect(function (e) {
            t([e.width, e.height])
          })
          .exec()
      })
    },
    init: function () {
      const t = this
      return Promise.all([
        this.getPageClientRect(),
        this.getCanvas('#cvs'),
        this.getCanvas('#cvd'),
      ]).then(function (e) {
        const n = E(e, 3)
        const r = n[0]
        const o = n[1]
        const a = n[2]
        ;(t.options.width = r[0]),
          (t.options.height = r[1]),
          (o.width = t.options.width),
          (o.height = t.options.height),
          t.options.context.setData({ p_width: t.options.width, p_height: t.options.height })
        const i = o.getContext('2d')
        ;(t.options.ctx = i), (a.width = 1), (a.height = 256)
        const c = a.getContext('2d')
        t.options.pctx = c
      })
    },
    renderShadow: function (t, e, n, r) {
      const o = this.options.ctx
      const a = this.options.boundVal
      const i = parseFloat(n / this.options.points.max, 10)
      ;(o.shadowColor = 'rgba(0, 0, 0, ' + i + ')'),
        (o.shadowOffsetX = a),
        (o.shadowOffsetY = a),
        (o.shadowBlur = this.options.shadowBlur),
        o.beginPath(),
        o.arc(t - a, e - a, this.options.radius, 0, 2 * Math.PI, !0),
        o.closePath(),
        o.fill(),
        r || this.cachePoint(t, e, n)
    },
    colorize: function () {
      for (
        var t = this.options.width,
          e = this.options.height,
          n = this.options.ctx,
          r = n.getImageData(0, 0, t, e),
          o = r.data,
          a = o.length,
          i = this.getPalette(),
          c = this.options.opacity,
          s = 3;
        s < a;
        s += 4
      ) {
        const u = o[s]
        const f = 4 * u
        if (f) {
          const l = u < c ? u : c
          ;(o[s - 3] = i[f]), (o[s - 2] = i[f + 1]), (o[s - 1] = i[f + 2]), (o[s] = l)
        }
      }
      n.putImageData(r, 0, 0)
    },
    getPalette: function () {
      const t = this.options.gradient
      const e = this.options.pctx
      const n = this.options.pctx.createLinearGradient(0, 0, 1, 256)
      for (const r in t) t.hasOwnProperty(r) && n.addColorStop(r, t[r])
      return (e.fillStyle = n), e.fillRect(0, 0, 1, 256), e.getImageData(0, 0, 1, 256).data
    },
    cachePoint: function (t, e, n) {
      const r = this.options.points
      const o = r.data
      n > r.max && (r.max = n), o.push([t, e, n])
    },
    addPoint: function (t, e, n) {
      this.options.ctx.clearRect(0, 0, this.options.width, this.options.height),
        this.options.pctx.clearRect(0, 0, 1, 256)
      for (let r = this.options.points.data, o = r.length, a = 0; a < o; a++)
        this.renderShadow(r[a][0], r[a][1], r[a][2], !0)
      this.renderShadow(t, e, n), this.colorize()
    },
    start: function (t, e) {
      const n = this
      ;(this.options.context = e),
        this.init().then(function () {
          for (let e = 0; e < t.length; e++) n.renderShadow(t[e][0], t[e][1], t[e][2])
          n.colorize()
        })
    },
  }
  let J = -1
  let V = -1
  let z = 0
  const H = {
    onShow: function () {
      const t = getCurrentPages()
      const e = t[t.length - 1]
      return (
        (d.path = e.route),
        (d.query = Object.keys(e.options)
          .map(function (t) {
            return { key: t, value: e.options[t] }
          })
          .filter(function (t) {
            return t.key !== 'mtj_qrid' && t.key !== 'mtj_lkid' && t.key !== 'mtj_shuuid'
          })),
        (d.path === m.lastPagePath && JSON.stringify(d.query) === m.lastPageQuery) ||
          ((m.lastPagePath = d.path),
          (m.lastPageQuery = JSON.stringify(d.query)),
          (m.pageScrollTop = 0)),
        M()
          .then(function () {
            A(Object.assign({ et: 'page', en: 'show' }, g))
          })
          .catch(function (t) {
            I('page.onShow', t)
          })
      )
    },
    onReady: function () {
      const t = this
      p.hasHeatmap &&
        m.heatmapToken &&
        M()
          .then(function () {
            let e
            const n = ''
              .concat('https://hmma.baidu.com/analytics/ajax/cors', '?corsToken=')
              .concat(m.heatmapToken)
            const r = d.query
              .filter(function (t) {
                return t.key !== 'mtj_htoken'
              })
              .map(function (t) {
                return ''.concat(t.key, '=').concat(t.value)
              })
              .join('&')
            const o = d.path
            y({
              url: n,
              data: {
                method: 'heatmap/heatmapData',
                displayUrl: ''.concat(o).concat(r ? '?' + r : ''),
                screenWidth: (e = g.system) === null || void 0 === e ? void 0 : e.windowWidth,
              },
              method: 'POST',
              success: function (e) {
                let n
                let r
                const o =
                  (e == null ||
                  (n = e.data) === null ||
                  void 0 === n ||
                  (r = n.data) === null ||
                  void 0 === r
                    ? void 0
                    : r.points) || []
                o.length &&
                  setTimeout(function () {
                    new F().start(o, t)
                  }, 1e3)
              },
              fail: function () {
                console.error('热力图数据请求失败')
              },
            })
          })
          .catch(function (t) {
            I('get heatmap', t)
          })
    },
    onHide: function () {
      let t
      let n
      let r
      let o
      let a
      const i = S({
        scrollTop: m.pageScrollTop,
        height:
          (t = g.system) === null || void 0 === t || (n = t.safeArea) === null || void 0 === n
            ? void 0
            : n.height,
        width:
          (r = g.system) === null || void 0 === r || (o = r.safeArea) === null || void 0 === o
            ? void 0
            : o.width,
      })
      const c = Object.keys(i).map(function (t) {
        return { key: t, value: i[t] }
      })
      if ((A({ et: 'page', en: 'hide', ep: { data: c } }), p.getComponentScroll))
        try {
          ;(a = JSON.parse(JSON.stringify(d))),
            e
              .createSelectorQuery()
              .selectAll('.mtj-scroll')
              .fields({ id: !0, size: !0, scrollOffset: !0 })
              .exec(function (t) {
                Object.keys(t[0]).length > 0 &&
                  A(Object.assign({ et: 'page', en: 'scroll', ep: S(t[0]) }, a))
              })
        } catch (t) {
          I('page.trackComponentScrollEvent', t)
        }
    },
    onPageScroll: function (t) {
      ;(!m.pageScrollTop || t.scrollTop > m.pageScrollTop) && (m.pageScrollTop = t.scrollTop)
    },
    onShareAppMessage: function (t) {
      const e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}
      const n = { from: t.from, path: e.path }
      if (!n.path) {
        const r = d.query
          .map(function (t) {
            return t.key + '=' + t.value
          })
          .join('&')
        n.path = d.path + (r ? '?' + r : '')
      }
      e.title && (n.title = '' + e.title),
        t.target && (n.target = JSON.stringify(t.target)),
        A(Object.assign({ et: 'share', en: 'action', ep: n }, g))
      const o = g.aso.query.filter(function (t) {
        return t.key === 'mtj_shuuid'
      })
      const a = o[0] ? o[0].value.split('_') : []
      d.uuid !== a[a.length - 1] && a.push(d.uuid)
      const i = a.slice(Math.max(0, a.length - 3)).join('_')
      return (e.path = j(n.path, 'mtj_shuuid', i)), e
    },
    onAction: function (t, e) {
      if (t && t.type && t.currentTarget) {
        const n = '#' + (t.currentTarget.id || e)
        if (t.type === 'tap') {
          const r = [{ key: 'xpath', value: n }]
          const o = t.detail
          const a = o.x
          const i = o.y
          let c = {}
          return (
            void 0 !== a && void 0 !== i && (c = { x: Math.floor(a), y: Math.floor(i) }),
            void A(Object.assign({ et: 'behavior', en: 'tap', ep: { data: r }, posi: c }, g))
          )
        }
        if (
          t.type === 'touchmove' &&
          J === -1 &&
          t.touches instanceof Array &&
          t.touches.length === 3
        ) {
          if (((z += 1), clearTimeout(V), z === 3))
            return (
              (m.circleByThreeFingers = !0),
              (m.circleToken = void 0),
              void A(Object.assign({ et: 'page', en: 'show' }, g))
            )
          J = setTimeout(function () {
            ;(J = -1),
              (V = setTimeout(function () {
                z = 0
              }, 500))
          }, 1e3)
        }
      }
    },
  }
  const L = {
    trackEvent: function (t) {
      const e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}
      if (!O(t)) return Promise.reject(new Error('事件名称不合法'))
      const n = Object.keys(e)
        .filter(function (t) {
          return w(t) && k(e[t])
        })
        .map(function (t) {
          return { key: '' + t, value: '' + e[t], type: b(e[t], 'String') ? 'string' : 'number' }
        })
      return M()
        .then(function () {
          A(Object.assign({ et: 'event', en: '' + t, ep: { data: n } }, g))
        })
        .catch(function (t) {
          I('trackEvent', t)
        })
    },
    setTrackStatus: function (t) {
      b(t, 'Boolean') && ((p.trackStatus = t), q(u, t))
    },
    setUserInfo: function () {
      const t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}
      const e = t.tel
      const n = t.openId
      return M()
        .then(function () {
          const t = C(c)
          const r = b(t, 'Object') ? t : {}
          x(e) && (r.tel = g.user.tel = e.substr(e.length - 11)),
            P(n) && (r.openId = g.user.openId = n),
            (r.tel || r.openId) && q(c, r),
            b(e, 'Undefined') || x(e) || console.error('手机号 '.concat(e, ' 不合法')),
            b(n, 'Undefined') || P(n) || console.error('openid '.concat(n, ' 不合法'))
        })
        .catch(function (t) {
          I('setUserInfo', t)
        })
    },
    setUserId: function (t) {
      return Promise.resolve().then(function () {
        if (!(b(t, 'String') || (b(t, 'Number') && Number.isFinite(t))))
          return Promise.reject(new Error('userId只能是字符串或数字'))
        const e = '' + t
        const n = C(s)
        const r = b(n, 'Object') ? n : {}
        if (!r.uid_ || r.uid_[0] !== e) {
          ;(r.uid_ = [e, '1']), q(s, r), (g.userProperty = JSON.stringify(r))
          const o = [{ key: 'uid', value: e }]
          return M()
            .then(function () {
              A(Object.assign({ et: 'api', en: 'setUserId', ep: { data: o } }, g))
            })
            .catch(function (t) {
              I('setUserId', t)
            })
        }
      })
    },
    setUserProperty: function (t) {
      return Promise.resolve().then(function () {
        const e = C(s)
        const n = b(e, 'Object') ? e : {}
        if (b(t, 'Null'))
          Object.keys(n).forEach(function (t) {
            t.charAt(0) !== '_' && t.charAt(t.length - 1) !== '_' && delete n[t]
          })
        else if (!b(t, 'Object')) return Promise.reject(new Error('userProperty必须是对象'))
        let r = Object.keys(n).filter(function (t) {
          return t.charAt(0) !== '_' && t.charAt(t.length - 1) !== '_'
        }).length
        Object.keys(t || {}).forEach(function (e) {
          const o = t[e]
          e === '' ||
            e.charAt(0) === '_' ||
            (e.charAt(e.length - 1) === '_' && e !== 'ab_' && e !== 'ab_filter_') ||
            (b(o, 'Null')
              ? n[e] && (delete n[e], r--)
              : !(b(o, 'String') || (b(o, 'Number') && Number.isFinite(o))) ||
                e.length > 256 ||
                ('' + o).length > 256 ||
                (!n[e] && r >= 100) ||
                (n[e] || r++, (n[e] = [o, '1'])))
        }),
          q(s, n),
          (g.userProperty = JSON.stringify(n))
      })
    },
  }
  const $ = {
    data: [],
    init: function () {
      const t = this
      const e = d.uuid
      e
        ? this.startFetch(e)
        : D().then(function (e) {
            ;(d.uuid = e), t.startFetch(e)
          })
    },
    startFetch: function (t) {
      console.log('---您的设备ID---', t), this.fetchTest()
    },
    getExpDataByParamName: function (t) {
      const e = C(l)
      if ((this.setLocalData(e), !e || !b(e, 'Array'))) return {}
      const n = e.find(function (e) {
        return e && b(e.params, 'Object') && !b(e.params[t], 'Undefined')
      })
      return n && n.params ? { expValue: n.params[t], expId: n.e } : {}
    },
    fetchTest: function (t, e, n) {
      const r = this
      const o = d.uuid
      const a = d.key
      y({
        url: 'https://hm.baidu.com/v1/diversion/',
        data: { cid: o, tid: a },
        method: 'GET',
        success: function (o) {
          b(o, 'Object') && o.statusCode === 200 && b(o.data, 'Object') && o.data.status === 0
            ? r.handleFetchResponse(o.data, t, e, n)
            : n && n(e)
        },
        fail: function () {
          console.error('请求分流实验失败'), n && n(e)
        },
      })
    },
    handleFetchResponse: function (t, e, n, r) {
      let o = []
      if (
        (b(t, 'Object') && b(t.data, 'Object') && b(t.data.expr, 'Array') && (o = t.data.expr),
        this.updateStorage(o),
        this.setLocalData(o),
        r)
      ) {
        const a = this.getExpDataByParamName(e)
        const i = a.expValue
        const c = a.expId
        b(i, 'Null') || b(i, 'Undefined') ? r(n) : this.handleInTest(i, c, r)
      }
    },
    handleInTest: function (t, e, n) {
      n(t), this.updateUserProperty(e)
    },
    updateStorage: function (t) {
      q(l, t)
    },
    setLocalData: function (t) {
      this.data = t || []
    },
    updateUserProperty: function (t) {
      const e = this
      const n = this.getActiveExpIds(t) || []
      let r = { ab_: null, ab_filter_: null }
      const o = {}
      const a = []
      if (
        (n.forEach(function (t) {
          const n = e.getExpDataFromId(t)
          b(n, 'Object') && ((o[n.e] = n.g), a.push(n.h || 0))
        }),
        a.length)
      ) {
        let i = 0
        a.forEach(function (t) {
          i = (function (t, e) {
            const n = '00000000000000000000000000000000'
            function r(t) {
              const e = (n + n + Number(t).toString(2)).slice(-64)
              return [parseInt(e.slice(0, 32), 2), parseInt(e.slice(-32), 2)]
            }
            function o(t) {
              return (n + t.toString(2)).slice(-32)
            }
            const a = r(t)
            const i = r(e)
            return parseInt(o((a[0] | i[0]) >>> 0) + o((a[1] | i[1]) >>> 0), 2)
          })(i, t)
        }),
          (r = { ab_: JSON.stringify(o), ab_filter_: i })
      }
      L.setUserProperty(r)
    },
    getExpDataFromId: function (t) {
      return C(l).find(function (e) {
        return String(e.e) === String(t)
      })
    },
    setActiveExperimentIds: function (t) {
      q(h, t)
    },
    getActiveExpIds: function (t) {
      const e = this
      let n = C(h) || []
      return (
        b(t, 'Undefined') || n.indexOf(t) !== -1 || n.push(t),
        (n = (n = n.filter(function (t) {
          return !!e.getExpDataFromId(t)
        })).filter(function (t, e) {
          return n.indexOf(t) === e
        })),
        this.setActiveExperimentIds(n),
        n
      )
    },
  }
  const K = function (t) {
    if (p.hasABTest)
      if (b(t, 'Object')) {
        const e = t.paramName
        if (e != null) {
          const n = t.defaultValue
          if (b(n, 'Undefined')) console.error('请设置参数默认值')
          else {
            const r = t.callback
            if (b(r, 'Function')) {
              const o = $.getExpDataByParamName(e)
              const a = o.expValue
              const i = o.expId
              b(a, 'Null') || b(a, 'Undefined') ? $.fetchTest(e, n, r) : $.handleInTest(a, i, r)
            } else console.error('callback必须为函数')
          }
        } else console.error('请设置实验参数名称')
      } else console.error('传递参数请设置为对象')
  }
  const Q = function (t, e, n) {
    const r = e[t]
    e[t] = function (e) {
      if ((n.call(this, e, t), r)) return r.apply(this, arguments)
    }
  }
  const G = App
  const W = function (t) {
    a.app.forEach(function (e) {
      Q(e, t, R[e])
    }),
      (t.mtj = L),
      (t.mtj.pageEvent = H),
      (t.mtj.fetchABTest = K),
      G(t)
  }
  const X = Page
  const Y = function (t) {
    a.page.forEach(function (e) {
      Q(e, t, H[e])
    }),
      a.share.forEach(function (e) {
        !(function (t, e, n) {
          const r = e[t]
          e[t] = function (t) {
            const e = r && r.apply(this, arguments)
            return n.call(this, t, e)
          }
        })(e, t, H[e])
      }),
      Object.keys(t).forEach(function (e) {
        typeof t[e] === 'function' &&
          a.page.indexOf(e) === -1 &&
          a.share.indexOf(e) === -1 &&
          Q(e, t, H.onAction)
      }),
      X(t)
  }
  const Z = Behavior
  const tt = function (t) {
    return (
      a.page.forEach(function (e) {
        Q(e, t.methods, H[e])
      }),
      Z(t)
    )
  }
  tt.prototype.constructor = Behavior
  const et = Component
  const nt = function (t) {
    return (
      a.page.forEach(function (e) {
        Q(e, t.methods, H[e])
      }),
      et(t)
    )
  }
  const rt = function () {
    let t, n
    ;(t = wx), (e = t)
    try {
      n = require('./mtj-wx-sdk.config')
    } catch (t) {
      return void console.error('请把mtj-wx-sdk.config.js文件拷贝到utils目录中')
    }
    n && n.appKey
      ? ((d.key = n.appKey),
        (p.getLocation = n.getLocation || !1),
        (p.getComponentScroll = n.getComponentScroll || !1),
        (p.disableCircling = n.disableCircling || !1),
        (p.trackStatus = !(!1 === C(u))),
        (p.hasABTest = n.hasABTest || !1),
        (p.hasHeatmap = n.hasHeatmap || !1),
        p.hasABTest && $.init(),
        (function () {
          const t = C(f)
          if (t) {
            Object.keys(t).forEach(function (e) {
              p[e] = t[e]
            })
            const e = t.updateTimestamp || 0
            if (+new Date() - e < 864e5) return Promise.resolve()
          }
          T({
            url: 'https://hmma.baidu.com/mini.conf',
            method: 'POST',
            header: { 'content-type': 'application/x-www-form-urlencoded' },
            data: { type: 'wx', key: d.key },
          })
            .then(function (t) {
              if (t && t.data) {
                const e = t.data
                Object.keys(e).forEach(function (t) {
                  p[t] = e[t]
                }),
                  (e.updateTimestamp = +new Date()),
                  q(f, e)
              } else I('remoteConfig', t)
            })
            .catch(function (t) {
              I('sendRequest', t)
            })
        })(),
        n.hasPlugin || ((App = W), (Page = Y)),
        (module.exports = { App: W, Page: Y, Behavior: tt, Component: nt }))
      : console.error('请设置mtj-wx-sdk.config.js文件中的appKey字段')
  }
  return rt(), (t.init = rt), Object.defineProperty(t, '__esModule', { value: !0 }), t
})({})
