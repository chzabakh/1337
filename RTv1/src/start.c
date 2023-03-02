/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   start.c                                            :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: chzabakh <marvin@42.fr>                    +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/10/14 17:39:29 by chzabakh          #+#    #+#             */
/*   Updated: 2020/12/12 20:30:29 by chzabakh         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "rtv1.h"

int			close_window(void *m)
{
	if (m)
	{
		system("clear");
		exit(0);
	}
	return (0);
}

int			keypress(int keycode, void *m)
{
	if (keycode == 53 && m)
	{
		system("clear");
		exit(0);
	}
	return (0);
}

void		ft_work(t_settings *m, t_mlx *hd)
{
	t_mlx	*lights;
	t_ray	ray;
	t_hit	hit;
	int		x;
	int		y;

	ft_camera(m, hd);
	lights = hd;
	y = 0;
	while (y < WIN_H)
	{
		x = 0;
		while (x < WIN_W)
		{
			ray = camera_ray(m->cam, x, y);
			hit.t = INFINITY;
			if (raycast(hd, &ray, &hit))
				m->img_str[(WIN_H - 1 - y) * WIN_W + x] = ft_shade(&hit, \
						lights, hd, &ray);
			x++;
		}
		y++;
	}
}

void		ft_start(t_mlx *hd)
{
	t_settings	m;

	m.mlx_ptr = mlx_init();
	m.win_ptr = mlx_new_window(m.mlx_ptr, WIN_W, WIN_H, "RTv1");
	m.img_ptr = mlx_new_image(m.mlx_ptr, WIN_W, WIN_H);
	m.img_str = (int *)mlx_get_data_addr(m.img_ptr, &m.bpp, &m.l, &m.endin);
	ft_work(&m, hd);
	mlx_put_image_to_window(m.mlx_ptr, m.win_ptr, m.img_ptr, 0, 0);
	mlx_hook(m.win_ptr, 2, 0, keypress, (void *)&m);
	mlx_hook(m.win_ptr, 17, 0, close_window, (void *)&m);
	mlx_loop(m.mlx_ptr);
}
