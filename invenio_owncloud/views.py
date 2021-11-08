# -*- coding: utf-8 -*-
#
# Copyright (C) 2021 CERN.
#
# Invenio-OwnCloud is free software; you can redistribute it and/or modify it
# under the terms of the MIT License; see LICENSE file for more details.

"""ownCloud integration for InvenioRDM."""

from flask import Blueprint, render_template, redirect, session, request, current_app
from flask_babelex import gettext as _
import requests
from datetime import datetime, timedelta

blueprint = Blueprint(
    'invenio_owncloud',
    __name__,
    template_folder='templates',
    static_folder='static',
)

def get_bearer_token():
    token = session.get('oauth_token_owncloud', None)
    print(f"\n\nget_bearer_token: {token}\n\n")
    if token is not None:
        fetched_at = token[2]
        expires_in = token[3]
        expires_at = fetched_at + expires_in

        if expires_at < datetime.utcnow():
            print("\n\nToken expired\n\n")
            return "expired"

        return token[0]

    return None

@blueprint.route("/owncloud/file-picker")
def index():
    """Render a basic view."""
    token = get_bearer_token()

    if token == "expired":
        print("\n\nToken is expired, refreshing token\n\n")
        return redirect('/oauth/refresh-token/owncloud?next=/owncloud/file-picker')

    if token is None:
        print("Token is None, logging in")
        return redirect('/oauth/login/owncloud?next=/owncloud/file-picker')


    return render_template(
        "invenio_owncloud/index.html",
        module_name=_('Invenio-OwnCloud'),
        access_token=token)


@blueprint.route("/file-upload-from-url", methods=['GET', 'POST'])
def file_upload_from_url():
    file = request.json
    download_url = file['url']

    token = get_bearer_token()
    file_data = requests.get(download_url, headers={
            'Authorization': f'Bearer {token}'
        }, verify=False)

    # todo: Upload file to storage

    return {
        'key': file['name'],
        'size': file['size'],
        'checksum': '532', #todo: get real value
        'links': {},
        'file_text': file_data.text, #todo: remove this (only for testing)
        'status': file_data.status_code
    }
