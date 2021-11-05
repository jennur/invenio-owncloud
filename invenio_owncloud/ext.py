# -*- coding: utf-8 -*-
#
# Copyright (C) 2021 CERN.
#
# Invenio-OwnCloud is free software; you can redistribute it and/or modify it
# under the terms of the MIT License; see LICENSE file for more details.

"""ownCloud integration for InvenioRDM."""

from flask_babelex import gettext as _

from . import config


class InvenioOwnCloud(object):
    """Invenio-OwnCloud extension."""

    def __init__(self, app=None):
        """Extension initialization."""
        if app:
            self.init_app(app)

    def init_app(self, app):
        """Flask application initialization."""
        self.init_config(app)
        app.extensions['invenio-owncloud'] = self

    def init_config(self, app):
        """Initialize configuration."""
        # Use theme's base template if theme is installed
        if 'BASE_TEMPLATE' in app.config:
            app.config.setdefault(
                'OWNCLOUD_BASE_TEMPLATE',
                app.config['BASE_TEMPLATE'],
            )
        for k in dir(config):
            if k.startswith('OWNCLOUD_'):
                app.config.setdefault(k, getattr(config, k))
