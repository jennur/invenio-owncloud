# -*- coding: utf-8 -*-
#
# Copyright (C) 2021 CERN.
#
# Invenio-OwnCloud is free software; you can redistribute it and/or modify it
# under the terms of the MIT License; see LICENSE file for more details.

"""JS/CSS bundles for ownCloud.

You include one of the bundles in a page like the example below (using
``base`` bundle as an example):

 .. code-block:: html

    {{ webpack['owncloud.js']}}

"""

from invenio_assets.webpack import WebpackThemeBundle

bundle = WebpackThemeBundle(
    __name__,
    "assets",
    default="semantic-ui",
    themes={
        "semantic-ui": dict(
            entry={
                "owncloud": "./js/invenio_owncloud/index.js",
            },
            dependencies={
                "@ownclouders/file-picker": "^0.10.0",
                "axios": "^0.21.1",
                "semantic-ui-react": "^0.88.0",
                'oidc-client': '^1.11.5'
            },
            aliases={
                '@js/invenio_owncloud': 'js/invenio_owncloud'
            }
        ),
    },
)
