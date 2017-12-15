# LocGeoPos

## Parameters

This query returns the operating sites ("Betriebsstellen") located in the current map view. `req` has following value

```json
{
  "rect": {
    "llCrd": {
      "x": 13540992.736816406,
      "y": 51613752.957501
    },
    "urCrd": {
      "x": 14005508.422851562,
      "y": 51698310.32893037
    }
  }
}
```

`llCrd` is the lower left corner of the bounding box, `urCrd` is the upper right corner of the bounding box. Coordinates are in WGS84 and follow the coordinate specification explained above.

`req` hat als Wert ein Objekt, mit einem einzigen Attribut – `rect` mit dem Wert

```json
{
  "rect": {
    "llCrd": {
      "x": 13540992.736816406,
      "y": 51613752.957501
    },
    "urCrd": {
      "x": 14005508.422851562,
      "y": 51698310.32893037
    }
  }
}
```

## Response

The result is an object. Only the properties whose value is neither an empty object or an empty array nor an empty string are explained here.

* `version`: 
* `lang`: string, currently `deu`
* `ext`: String, a value also used in the query parameters
* `id`: String, a value which seems to be equal to a value of the query parameters
* `svcResL`: array with one element

### svcResL

Each objects of the array `svcResL` has following properties:

* `err`: string, value `OK`. It is not known if other values are in use.
* `meth`: string, value `LocGeoPos` (name of the queried method)
* `res`: object

### res

The `res` object has following attributes:

* `common`: object with some properties, seems not to be relevant
* `locL`: array with objects, one per operating site. This property contains the real, interseting payload.

### locL

`locL` objects have following properties:

* `crd`: object, represents coordinates
** `type`: string, use coordinate system and geodetic reference, usually `WGS84`
** `x`: numeric, easting in HAFAS coordinate format
** `y`: numeric, northing in HAFAS coordinate format
** `z`: numeric, altitude, usually `0`
* `dist`: numeric, `0` is the only value in use
* `extId`: string, UIC reference (HAFAS number), e.g. 8011542 for Finsterwalde (Niederlausitz). If the operating site is no station or halt served by passenger trains, the number starts with `99`.
* `icoX`: numeric, seems to be always `0`
* `lid`: string, multiple of the attributes of this object encoded as a key value store into a single string, separated by `@`, e.g. `A=1@O=Finsterwalde (Niederlausitz) (BFW)@X=13710411@Y=51636997@u=0@U=80@L=8011542@`
* `name`: string, name and abbreviation (Ril 100 shorting) of the operating site, pattern: `NAME (DS100)`
* `pCls`: integer, not set for blockposts. Stations with passenger service have the value `1930`, other values are `1928` and `512`.
* `type`: string, value usually `S`
* `wt`: integer, `3196` for Luckaitzal, `3272` for Finsterwalde (Niederlausitz)
