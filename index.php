<!DOCTYPE html>
<html <?php language_attributes(); ?> class="no-js">
<head>
    <meta charset="<?php bloginfo('charset'); ?>" />
    <link rel="pingback" href="<?php bloginfo('pingback_url'); ?>" />
    <link rel="profile" href="http://gmpg.org/xfn/11" />
    <title>
    <?php bloginfo('name'); ?> | <?php (is_home() || is_front_page()) ? bloginfo('description') : wp_title(''); ?>
    </title>
    <?php wp_head(); ?>
    <link rel="stylesheet" href="<?php bloginfo('stylesheet_url'); ?>"  />
</head>
<body <?php body_class(); ?>>


    <?php wp_footer(); ?>
</body>
</html>