# -*- coding: utf-8 -*-
#
# Copyright (C) 2021 CERN.
#
# Invenio-OwnCloud is free software; you can redistribute it and/or modify it
# under the terms of the MIT License; see LICENSE file for more details.

"""ownCloud integration for InvenioRDM."""

from .ext import InvenioOwnCloud
from .version import __version__

__all__ = ('__version__', 'InvenioOwnCloud')
