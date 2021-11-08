# -*- coding: utf-8 -*-
#
# Copyright (C) 2021 CERN.
#
# Invenio-OwnCloud is free software; you can redistribute it and/or modify it
# under the terms of the MIT License; see LICENSE file for more details.

"""ownCloud integration for InvenioRDM."""

from flask import Blueprint, render_template
from flask_babelex import gettext as _

blueprint = Blueprint(
    'invenio_owncloud',
    __name__,
    template_folder='templates',
    static_folder='static',
)


@blueprint.route("/heipadeg")
def index():
    """Render a basic view."""
    return render_template(
        "invenio_owncloud/index.html",
        module_name=_('Invenio-OwnCloud'))

@blueprint.route("/oidc-callback.html")
def oidc_callback():
    """Render a basic view."""
    return render_template(
        "invenio_owncloud/oidc-callback.html",
        module_name=_('Invenio-OwnCloud'))
