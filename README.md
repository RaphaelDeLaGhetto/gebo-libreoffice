gebo-libreoffice
================

A LibreOffice-dependent document converter

# Get LibreOffce

How you do this depends on your OS. On Ubuntu 14.04, simply

```
sudo apt-get install libreoffice
```

# Install

```
npm install gebo-libreoffice
```

# Configure gebo.json

The maximum allowable processing time is set in `gebo.json`:

```
{
    ...
    "libre": {
        "timeout": 20000
    }
    ...
}
```

# Test

```
sudo nodeunit test
```
